// Platform rules: what the instance does that unit tests with fakes can't see.
// This file belongs to the lab (docs/DECISIONS.md, Platform rules). Never edit,
// rename or skip it: if a rule fails, change the code. Each rule comes from a real failure or a platform finding.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const SRC = fileURLToPath(new URL('.', import.meta.url))
const SKIP_DIRS = new Set(['node_modules', 'generated', 'testing'])

function walk(dir: string): string[] {
    const out: string[] = []
    for (const name of readdirSync(dir)) {
        if (SKIP_DIRS.has(name) || name.startsWith('.')) continue
        const path = join(dir, name)
        if (statSync(path).isDirectory()) out.push(...walk(path))
        else if (/\.(ts|js|mjs)$/.test(path) && !/\.(test|spec)\.[a-z]+$/.test(path) && !path.endsWith('.d.ts')) out.push(path)
    }
    return out
}

/** The code without comments, so a comment that names a rule never trips it. */
function code(path: string): string {
    return readFileSync(path, 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1')
}

const files = walk(SRC)
const fluent = files.filter((f) => f.endsWith('.now.ts'))
const server = files.filter((f) => !f.endsWith('.now.ts'))
const at = (f: string) => relative(SRC, f)

/** Each `Name(` call's text, up to the next call of the same name. */
function calls(text: string, name: string): string[] {
    return text.split(new RegExp(`\\b${name}\\(`)).slice(1)
}

/** The text inside the first `key: [ ... ]` of a block, brackets matched. */
function list(text: string, key: string): string {
    const start = text.search(new RegExp(`\\b${key}\\s*:\\s*\\[`))
    if (start < 0) return ''
    let depth = 0
    for (let i = text.indexOf('[', start); i < text.length; i++) {
        if (text[i] === '[') depth++
        else if (text[i] === ']' && --depth === 0) return text.slice(text.indexOf('[', start) + 1, i)
    }
    return ''
}

/** The top-level `{ ... }` objects in a list's text, braces matched. */
function objects(text: string): string[] {
    const out: string[] = []
    let depth = 0
    let from = -1
    for (let i = 0; i < text.length; i++) {
        if (text[i] === '{' && depth++ === 0) from = i
        else if (text[i] === '}' && --depth === 0 && from >= 0) out.push(text.slice(from, i + 1))
    }
    return out
}

/** A tool's script: inline, a constant in the same file, or a file named by Now.include. */
function toolScript(tool: string, whole: string, file: string): string | undefined {
    const m = /\bscript\s*:\s*(`(?:\\[\s\S]|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|Now\.include\(\s*['"]([^'"]+)['"]\s*\)|([A-Za-z_$][\w$]*))/.exec(tool)
    if (!m) return undefined
    if (m[2]) {
        const path = join(dirname(file), m[2])
        return existsSync(path) ? readFileSync(path, 'utf8') : undefined
    }
    if (m[3]) {
        const constant = new RegExp(`\\b(?:const|let|var)\\s+${m[3]}\\s*=\\s*(\`(?:\\\\[\\s\\S]|[^\`\\\\])*\`|'(?:\\\\.|[^'\\\\])*'|"(?:\\\\.|[^"\\\\])*")`).exec(whole)
        return constant?.[1]
    }
    return m[1]
}

describe('Platform rules (docs/DECISIONS.md)', () => {
    it('P1: a client UI action is List v2 and v3 compatible, or the classic form never shows it', () => {
        const bad: string[] = []
        for (const f of fluent) {
            for (const call of calls(code(f), 'UiAction')) {
                if (!/isClient\s*:\s*true/.test(call)) continue
                if (!/isUi11Compatible\s*:\s*true/.test(call) || !/isUi16Compatible\s*:\s*true/.test(call)) bad.push(at(f))
            }
        }
        expect(bad, 'set isUi11Compatible: true and isUi16Compatible: true').toEqual([])
    })

    it('P2: a server module imports another by its exact file name, or it fails to load on the instance', () => {
        const bad: string[] = []
        const spec = /(?:\bfrom\s*|\bimport\s*\(\s*|\brequire\s*\(\s*|^\s*import\s+)['"](\.{1,2}\/[^'"]+)['"]/gm
        for (const f of server) {
            for (const m of code(f).matchAll(spec)) {
                const target = join(dirname(f), m[1])
                if (!existsSync(target) || !statSync(target).isFile()) bad.push(`${at(f)}: '${m[1]}'`)
            }
        }
        expect(bad, "name the file as it is, such as './limits.ts', never './limits'").toEqual([])
    })

    it('P3: no API that scoped apps may not call', () => {
        const banned: Record<string, string> = {
            'setTimeZone(': 'use GlideScheduleDateTime.convertTimeZone for the instance day',
            'gs.print(': 'use gs.info',
            'gs.log(': 'use gs.info',
        }
        const bad: string[] = []
        for (const f of files) {
            const text = code(f)
            for (const [call, instead] of Object.entries(banned)) {
                if (text.includes(call)) bad.push(`${at(f)}: ${call} (${instead})`)
            }
        }
        expect(bad).toEqual([])
    })

    it('P4: each script tool reads exactly its inputs, by the same lower-case names', () => {
        const bad: string[] = []
        for (const f of fluent) {
            const whole = code(f)
            for (const call of calls(whole, 'AiAgent')) {
                for (const tool of objects(list(call, 'tools'))) {
                    if (!/\btype\s*:\s*['"]script['"]/.test(tool)) continue
                    const name = /\bname\s*:\s*['"]([^'"]+)['"]/.exec(tool)?.[1] ?? '(unnamed)'
                    const inputs = [...list(tool, 'inputs').matchAll(/\bname\s*:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
                    const script = toolScript(tool, whole, f)
                    if (script === undefined) {
                        bad.push(`${at(f)}: tool '${name}': write its script inline, as a constant in this file, or with Now.include, so this rule can read it`)
                        continue
                    }
                    const read = new Set([...script.matchAll(/\binputs\s*(?:\.\s*([A-Za-z_$][\w$]*)|\[\s*['"]([^'"]+)['"]\s*\])/g)].map((m) => m[1] ?? m[2]))
                    for (const input of inputs) {
                        if (!/^[a-z0-9_]+$/.test(input)) bad.push(`${at(f)}: tool '${name}': input '${input}' must be lower case with underscores`)
                        if (!read.has(input)) bad.push(`${at(f)}: tool '${name}': input '${input}' is never read as inputs.${input}`)
                    }
                    for (const key of read) {
                        if (!inputs.includes(key)) bad.push(`${at(f)}: tool '${name}': the script reads inputs.${key}, which no input supplies`)
                    }
                }
            }
        }
        expect(bad, 'a key that matches no input arrives empty, and the tool works on nothing').toEqual([])
    })

    it('P5: server code reads an HR table itself, never through a dot-walk into it', () => {
        const bad: string[] = []
        for (const f of server) {
            for (const m of code(f).matchAll(/\bsecurity_policy\.[a-z_]+/g)) bad.push(`${at(f)}: ${m[0]}`)
        }
        expect(bad, 'read sn_hr_core_coe_security_policy with its own GlideRecord: dot-walked fields come back empty').toEqual([])
    })

    it('P12 and P13: a run starts with the log row as its target, never an HR case, and with conversationUser', () => {
        const bad: string[] = []
        for (const f of files) {
            const text = code(f)
            if (!text.includes('startAiAgentConversation(')) continue
            if (!/\bconversationUser\b/.test(text)) bad.push(`${at(f)}: pass conversationUser (P13), or the start fails with ER0004`)
            if (/\btargetTable['"]?\s*[:=]\s*['"]sn_hr_/.test(text)) bad.push(`${at(f)}: the target is an HR table (P12): the platform copies the whole case into the prompt; target the run's log row`)
            if (!/\btargetTable\b/.test(text)) bad.push(`${at(f)}: set targetTable and targetRecordId to the run's log row (P12)`)
        }
        expect(bad).toEqual([])
    })
})
