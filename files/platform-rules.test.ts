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

/** The index just past the quoted string or template literal at text[i], or i if none starts there. An unclosed
 *  quote ends at the line, or at `stop` (a template's closing backtick, when the quote is inside one). */
function skipString(text: string, i: number, stop = ''): number {
    const q = text[i]
    if (q !== "'" && q !== '"' && q !== '`') return i
    for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '\\') j++
        else if (text[j] === q) return j + 1
        else if (q !== '`' && (text[j] === '\n' || text[j] === stop)) return j
    }
    return text.length
}

/** The text without comments, so a comment that names a rule never trips it. Quoted strings stay as they are,
 *  '//' and '/*' inside them included; a template literal is read as code, since tool and job scripts live in them. */
function stripComments(text: string): string {
    let out = ''
    let inTemplate = false
    for (let i = 0; i < text.length; ) {
        const c = text[i]
        if (c === '\\' && inTemplate) {
            out += text.slice(i, i + 2)
            i += 2
        } else if (c === "'" || c === '"') {
            const end = skipString(text, i, inTemplate ? '`' : '')
            out += text.slice(i, end)
            i = end
        } else if (c === '`') {
            inTemplate = !inTemplate
            out += c
            i++
        } else if (c === '/' && text[i + 1] === '/' && text[i - 1] !== ':') {
            while (i < text.length && text[i] !== '\n' && !(inTemplate && text[i] === '`')) i++
        } else if (c === '/' && text[i + 1] === '*') {
            const end = text.indexOf('*/', i + 2)
            i = end < 0 ? text.length : end + 2
        } else {
            out += c
            i++
        }
    }
    return out
}

/** The code without comments. */
function code(path: string): string {
    return stripComments(readFileSync(path, 'utf8'))
}

const files = walk(SRC)
const fluent = files.filter((f) => f.endsWith('.now.ts'))
const server = files.filter((f) => !f.endsWith('.now.ts'))
const at = (f: string) => relative(SRC, f)
const escape = (name: string) => name.replace(/[$]/g, '\\$')

/** The index of the bracket that closes the one at text[open], strings skipped; -1 if none does. */
function closing(text: string, open: number): number {
    const pairs: Record<string, string> = { '(': ')', '[': ']', '{': '}' }
    const want: string[] = []
    for (let i = open; i < text.length; i++) {
        const end = skipString(text, i)
        if (end !== i) {
            i = end - 1
            continue
        }
        if (pairs[text[i]]) want.push(pairs[text[i]])
        else if (text[i] === ')' || text[i] === ']' || text[i] === '}') {
            if (want.pop() !== text[i]) return -1
            if (want.length === 0) return i
        }
    }
    return -1
}

/** The text inside each `Name( ... )` call, brackets matched. */
function calls(text: string, name: string): string[] {
    const out: string[] = []
    for (const m of text.matchAll(new RegExp(`\\b${name}\\(`, 'g'))) {
        const open = (m.index ?? 0) + m[0].length - 1
        const close = closing(text, open)
        out.push(text.slice(open + 1, close < 0 ? text.length : close))
    }
    return out
}

/** The text inside the first `key: [ ... ]` of a block, brackets matched. */
function list(text: string, key: string): string {
    const start = text.search(new RegExp(`\\b${key}\\s*:\\s*\\[`))
    if (start < 0) return ''
    const open = text.indexOf('[', start)
    const close = closing(text, open)
    return close < 0 ? '' : text.slice(open + 1, close)
}

/** The top-level `{ ... }` objects in a list's text, braces matched. */
function objects(text: string): string[] {
    const out: string[] = []
    for (let i = 0; i < text.length; i++) {
        const end = skipString(text, i)
        if (end !== i) {
            i = end - 1
            continue
        }
        if (text[i] !== '{') continue
        const close = closing(text, i)
        if (close < 0) break
        out.push(text.slice(i, close + 1))
        i = close
    }
    return out
}

/** A tool's script, without its quotes or comments: inline, a constant in the same file, or a file named by Now.include. */
function toolScript(tool: string, whole: string, file: string): string | undefined {
    const m = /\bscript\s*:\s*(`(?:\\[\s\S]|[^`\\])*`|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|Now\.include\(\s*(['"`])([^'"`]+)\2\s*\)|([A-Za-z_$][\w$]*))/.exec(tool)
    if (!m) return undefined
    if (m[3]) {
        const path = join(dirname(file), m[3])
        return existsSync(path) ? stripComments(readFileSync(path, 'utf8')) : undefined
    }
    if (m[4]) {
        const constant = new RegExp(`\\b(?:const|let|var)\\s+${escape(m[4])}\\s*=\\s*(\`(?:\\\\[\\s\\S]|[^\`\\\\])*\`|'(?:\\\\.|[^'\\\\])*'|"(?:\\\\.|[^"\\\\])*")`).exec(whole)
        return constant ? stripComments(constant[1].slice(1, -1)) : undefined
    }
    return stripComments(m[1].slice(1, -1))
}

/** The input keys a tool script reads: inputs.key, inputs['key'], const { key } = inputs, and the same through an alias. */
function inputsRead(script: string): Set<string> {
    const names = ['inputs', ...[...script.matchAll(/\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*inputs\s*(?:;|\n|$)/g)].map((m) => m[1])]
    const keys = new Set<string>()
    for (const name of names) {
        const n = escape(name)
        for (const m of script.matchAll(new RegExp(`(?<![\\w$])${n}\\s*(?:\\.\\s*([A-Za-z_$][\\w$]*)|\\[\\s*['"]([^'"]+)['"]\\s*\\])`, 'g'))) keys.add(m[1] ?? m[2])
        for (const m of script.matchAll(new RegExp(`\\{([^{}]*)\\}\\s*=\\s*${n}(?![\\w$])`, 'g'))) {
            for (const part of m[1].split(',')) {
                const key = /^\s*([A-Za-z_$][\w$]*)/.exec(part)?.[1]
                if (key) keys.add(key)
            }
        }
    }
    return keys
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
                    const read = inputsRead(script)
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

    // P5 covers every HR table. A test can't tell which reference fields lead into one, so it checks the dot-walk the
    // lab saw fail, into the security policy; code review checks the rest.
    it('P5: server code reads the security policy with its own GlideRecord, never through a dot-walk into it', () => {
        const bad: string[] = []
        for (const f of server) {
            for (const m of code(f).matchAll(/\bsecurity_policy\.[a-z_]+/g)) bad.push(`${at(f)}: ${m[0]}`)
        }
        expect(bad, 'read sn_hr_core_coe_security_policy with its own GlideRecord: dot-walked fields come back empty').toEqual([])
    })

    // The request is often built in a server module and the call made in the dispatcher job's script (DECISIONS,
    // "How it starts the workflow"), so the request's fields are checked across the app, and the call must be one.
    it('P12 and P13: a run starts with the log row as its target, never an HR case, and with conversationUser', () => {
        const bad: string[] = []
        const texts = files.map((f) => ({ f, text: code(f) }))
        // A call is a method call, `x.startAiAgentConversation(`; a type or a fake that declares the method isn't one.
        const starts = texts.flatMap(({ f, text }) => [...text.matchAll(/\.\s*startAiAgentConversation\s*\(/g)].map(() => at(f)))
        if (starts.length > 1) bad.push(`the start is called ${starts.length} times (${[...new Set(starts)].join(', ')}): call it once, in the dispatcher job's script, so this rule checks the call that runs`)
        if (starts.length > 0) {
            const app = texts.map(({ text }) => text).join('\n')
            if (!/\bconversationUser\b/.test(app)) bad.push('pass conversationUser in the start request (P13), or the start fails with ER0004')
            if (!/\btargetTable\b/.test(app)) bad.push("set the start request's targetTable and targetRecordId to the run's log row (P12)")
        }
        for (const { f, text } of texts) {
            if (/\btargetTable['"]?\s*[:=]\s*['"]sn_hr_/.test(text)) bad.push(`${at(f)}: the target is an HR table (P12): the platform copies the whole case into the prompt; target the run's log row`)
        }
        expect(bad).toEqual([])
    })
})
