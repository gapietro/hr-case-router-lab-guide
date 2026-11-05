# Module 9 — What the process caught

*⏱ 15 min · 16:05*

Count your catches from the file, not memory, decide what to take home, and
close the day's session.

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** after a build, the team counts what the process caught,
  and where, to see which steps earned their time.
- **Why it matters:** the count, not opinion, is the case for working this
  way, or against it.
- **Your mindset:** evidence, not memory, and honesty about what's real.

</details>

### 1. Count your catches

⌨️ **Terminal**, in your window:

```
grep -c '|' ~/projects/hr-case-router/catches.md
grep '|' ~/projects/hr-case-router/catches.md | cut -d'|' -f2 | tr -d ' ' | sort | uniq -c
```

✅ Your total, then a count per kind, such as `3 design`.

### 2. Add yours to the room's board

Add your counts to your instructor's columns. Then ask together:

1. **Which column is biggest?** There the process paid for itself.
2. **Which came before any code?** `prd`, `consult`, `research`, `design`:
   the cheapest.
3. **Which came from an inspection?** `review` today; `grade`, `partner` and
   `drill` after the workshop. Your own tests had passed first.

### 3. Sort out what's real

Sort your app into three short lists:

- **Real:** what you watched work live, as `hr.demo`.
- **Staged:** what only tests or the grade's checks have shown.
- **Not built:** anything not merged yet, such as the weekly numbers (9),
  the override rule (7, after the workshop), what your grade left open,
  the runbook, the drill and the verdict.

Your app is a teaching copy, on a lab instance. The customer's way to production
is the method again: [your own PRD](OWN-PRD.md) on the customer's dev instance,
then [to production](PROMOTE.md).

### 4. Take it home

Decide, in one sentence each: the next real work you'll build this way, the
one stage you'd keep, and the building block you're missing at work. Short
of time? Do it at home.

Ask your instructor for your instance's end date: After the workshop
needs the instance until then.

### 5. Close the session

Claude closed? <span data-show="surface:terminal">**In the terminal:** ⌨️
in the Claude window: `cd ~/projects/hr-case-router/app && claude`</span>
<span data-show="surface:desktop">**In the Code tab:** 🤖 start a new
session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>)
on `~/projects/hr-case-router/app`, with the top **Local** entry and
**Open folder…** under the prompt box, then **Verbose** (**Ctrl+O**).</span>

1. 🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

   ```
   We're stopping here. Update SESSION-NOTE.md: what's proven, what's
   open, the exact next step, and the top three next items. Commit only
   SESSION-NOTE.md, on a new branch docs/session-note.
   ```
2. 🤖 **Claude:** then paste this, type `go` after it, and press **Enter**:

   ```
   ship it. Review the diff without checking it out. Fix real findings in
   the code once. Never edit docs/, GRADE.md, RUNBOOK.md, HANDOFF.md or
   BACKLOG.md to answer a finding, and don't stop to ask me: file it as a
   register issue instead. There's no CI: merge once now-sdk build passes,
   and npm test too once there's a test script. Then switch to main and
   pull, and give me the pull request link and one line per finding: fixed,
   filed, or not a problem and why.
   ```

🌐 **Browser:** open the pull request link. ✅ It shows **Merged**.

<details><summary>🛟 It stops and asks you something anyway</summary>

🤖 **Claude:** type this:

```
Take your recommendation, file it as a register issue if it's about the
design, and finish ship it.
```

</details>

<details><summary>🛟 It isn't merged: a test or the build failed</summary>

🤖 **Claude:** type `Fix it once, then finish ship it.` If it fails again,
tell your instructor.

</details>

## The three things to remember

1. **The AI is the crew, not the inspector.** People and checks decide.
2. **A check only counts if it could have failed.**
3. **Everything is written down.** Someone else could pick your app up.

## After the lab: put your machine back

Used a separate user account? Skip this part. Going straight on to
[After the workshop](AFTER-THE-WORKSHOP.md) in the buffer? Skip steps 6 to
8 until you've finished it.

### 6. Put your settings back

Close Claude everywhere first:
<span data-show="surface:terminal">**In the terminal:** type `/exit` in
every Claude window.</span>
<span data-show="surface:desktop">**In the Code tab:** close every session
(<kbd data-mac="Cmd+W" data-win="Ctrl+W">Cmd+W (Mac) · Ctrl+W (Windows)</kbd>).</span>

⌨️ **Terminal**, in your window:

```
git -C ~/projects/hr-case-router-lab-guide pull
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs --restore
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs --check
```

✅ The last command says `Lab settings NOT in place:`. That's what you want.

### 7. Switch back on what Module 0 switched off

⌨️ **Terminal:** only what Module 0 saved, in
`~/projects/hr-case-router-notes`.

1. Rename back each file or folder Module 0 gave an `.off`:

   ```
   for f in ~/CLAUDE.md ~/projects/CLAUDE.md ~/.claude/CLAUDE.md \
            ~/.claude/skills ~/.claude/agents ~/.claude/commands; do
     [ -e "$f.off" ] && [ ! -e "$f" ] && mv "$f.off" "$f"
   done
   ```
2. Each plugin `plugins-before-lab.txt` shows `✔ enabled`:
   `claude plugin enable <name>`, with its line after `❯` as `<name>`.
3. Only if `mcp-before-lab.json` is there, add its servers back:

   ```
   cd ~/projects/hr-case-router-notes
   node -e '
   for (const [n, c] of Object.entries(require("./mcp-before-lab.json")))
     require("child_process").execFileSync("claude", ["mcp", "add-json",
       "--scope", "user", n, JSON.stringify(c)], { stdio: "inherit" })'
   claude mcp list
   ```

   ✅ It lists your servers again.
4. `cat ~/projects/hr-case-router-notes/gh-before-lab.txt`. Is the account
   above `Active account: true` not your lab one? Switch back to it:
   `gh auth switch --user <that account>`. Does it say you weren't logged
   in to any GitHub hosts? Sign the lab account out: `gh auth logout`.
5. Put back how git signed in to GitHub. Module 0's `gh auth setup-git`
   changed it for every repo on this computer:

   ```
   cd ~/projects/hr-case-router-notes
   for h in https://github.com https://gist.github.com; do
     git config --global --unset-all "credential.$h.helper"
   done
   grep -E '^credential\.https://(gist\.)?github\.com\.helper( |$)' git-credentials-before-lab.txt |
     while read -r k v; do git config --global --add "$k" "$v"; done
   git config --global --get-regexp '^credential\.' | diff - git-credentials-before-lab.txt && echo same
   ```

   ✅ It prints `same`.

   <details><summary>🛟 It says No such file or directory</summary>

   Module 0 didn't save how git signed in, so git now signs in to GitHub
   the way it does for every site: the Keychain on a Mac, Credential
   Manager on Windows. Used something else for GitHub before the lab?
   Add it back: `git config --global --add credential.https://github.com.helper <it>`.

   </details>

   <details><summary>🛟 It prints lines starting with &lt; or &gt;</summary>

   Those lines are what differs from before the lab. Same lines in another
   order, or a `credential` setting you changed yourself during the lab?
   That's fine. It says `could not lock config file`? Close VS Code and run
   the block again: running it twice is safe.

   </details>

### 8. Remove the plugins and the SDK login

⌨️ **Terminal**, once you're done with the lab for good, After the workshop
included. The `rm` line deletes the MCP settings Module 0 saved, as they
can hold keys:

```
claude plugin uninstall prove-it@prove-it
claude plugin marketplace remove prove-it
now-sdk auth --delete lab-pdi
rm -f ~/projects/hr-case-router-notes/mcp-before-lab.json
claude plugin list
```

✅ The list no longer shows `prove-it@prove-it`.

Won't build with the SDK again? Remove ServiceNow's plugin too:

```
claude plugin uninstall servicenow-sdk@claude-plugins-official
```

## You now have

- Your catches counted, the day's session note merged, and your settings
  put back.
- Coming back for [After the workshop](AFTER-THE-WORKSHOP.md)? Start at the
  top of that page: it sets the lab up again.
