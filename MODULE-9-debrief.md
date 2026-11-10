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

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The count comes from `catches.md`, the lines you kept in each module, so it
rests on what was written down at the time, not on memory. It shows which
parts of the method caught the most.

</details>

⌨️ **Terminal**, in your window: first check that the earlier modules left
what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 9
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, the check's script included. `-q` prints only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 9`:
   Checks that each earlier module left what its checks promise, such as
   your files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 9.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names, then run the check again. Can't fix one? Tell your
instructor before you go on: every later step builds on it. They can help you
fix it, or give you a checkpoint to start this module from.

</details>


⌨️ **Terminal**, in your window:

```
grep -c '|' ~/projects/hr-case-router/catches.md
grep '|' ~/projects/hr-case-router/catches.md | cut -d'|' -f2 | tr -d ' ' | sort | uniq -c
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `grep -c '|' ~/projects/hr-case-router/catches.md`: Counts the lines in
   `catches.md` that hold a `|`. Each catch is one such line, so this is your
   total.
2. `grep '|' … | cut -d'|' -f2 | tr -d ' ' | sort | uniq -c`: Takes the same
   lines and keeps only what caught each one, the part between the first and
   second `|`, such as `design`. It then removes the spaces, sorts them, and
   counts each kind. Each `|` between two commands passes what the first
   prints to the next.

</details>

✅ Your total, then a count per kind, such as `3 design`.

### 2. Add yours to the room's board

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

One person's count is small. The room's columns together show which parts of
the method paid off across many builds, not only yours.

</details>

Add your counts to your instructor's columns. Then ask together:

1. **Which column is biggest?** There the process paid for itself.
2. **Which came before any code?** `prd`, `consult`, `research`, `design`:
   the cheapest.
3. **Which came from an inspection?** `review` today; `grade`, `partner` and
   `drill` after the workshop. Your own tests had passed first.

### 3. Sort out what's real

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A demo can make staged work look finished. Sorting honestly tells you, and
anyone you show the app to, what still has to be built or proved before it's
real.

</details>

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

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The day only pays off if you use the method again. One sentence each turns it
into a next step you can act on at work.

</details>

Decide, in one sentence each: the next real work you'll build this way, the
one stage you'd keep, and the building block you're missing at work. Short
of time? Do it at home.

Ask your instructor for your instance's end date: After the workshop
needs the instance until then.

### 5. Close the session

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The session note is how the next session, or the next person, picks up without
guessing. Shipping it puts it on `main`, where whoever opens the repo next
will find it.

</details>

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

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude writes down where the work stands in SESSION-NOTE.md, so a fresh
   session, or you after a break, can pick up exactly here.

   </details>

2. 🤖 **Claude:** then paste this, type `go` after it, and press **Enter**:

   ```
   ship it. Review the diff without checking it out, and post the review's
   findings on the pull request as a comment, even if there are none. Fix
   real findings in the code once. Never edit docs/, GRADE.md, RUNBOOK.md,
   HANDOFF.md or BACKLOG.md to answer a finding, and don't stop to ask me:
   file it as a register issue instead. There's no CI: merge once now-sdk
   build passes, and npm test too once there's a test script. Then switch to
   main and pull, and give me the pull request link and one line per
   finding: fixed, filed, or not a problem and why.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude pushes your branch, opens a pull request, reviews its own
   diff without checking it out, posts the review on it, fixes real findings once and files the rest,
   then merges when the build and tests pass. You get the pull request link
   and one line per finding.

   </details>

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

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The lab added its own Claude Code settings, which limit what Claude may do,
and kept a backup of yours. This puts yours back, so Claude works for you as
it did before the lab.

</details>

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

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull`: Downloads the newest
   version of this guide from GitHub into its folder,
   `hr-case-router-lab-guide`. `-C` runs git as if you were inside that
   folder, so you don't have to go there first.
2. `node …/merge-claude-settings.mjs --restore`: Runs the lab's settings
   script to put your own Claude Code settings back: your backup exactly, or,
   if you had no settings file before the lab, yours without the lab's
   settings.
3. `node …/merge-claude-settings.mjs --check`: Runs the same script to check,
   changing nothing, whether the lab's settings are in place. Now you want
   them gone.

</details>

✅ The last command says `Lab settings NOT in place:`. That's what you want.

### 7. Switch back on what Module 0 switched off

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Module 0 set aside your own instructions, plugins, MCP servers and GitHub
sign-in, so they couldn't steer the lab. Each sub-step puts one back, only
where Module 0 saved how it was, and leaves alone anything you never switched
off.

</details>

⌨️ **Terminal:** only what Module 0 saved, in
`~/projects/hr-case-router-notes`.

1. Rename back each file or folder Module 0 gave an `.off`:

   ```
   for f in ~/CLAUDE.md ~/projects/CLAUDE.md ~/.claude/CLAUDE.md \
            ~/.claude/skills ~/.claude/agents ~/.claude/commands; do
     [ -e "$f.off" ] && [ ! -e "$f" ] && mv "$f.off" "$f"
   done
   ```

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `for f in ~/CLAUDE.md … \`: Starts a loop over your own instruction
      files and folders, the ones Claude reads in every session. The `\` at
      the end carries the list on to the next line.
   2. `~/.claude/skills ~/.claude/agents ~/.claude/commands; do`: Ends the
      list with your own skills, agents and commands folders. `do` starts what
      runs for each one, which the loop calls `$f`.
   3. `[ -e "$f.off" ] && [ ! -e "$f" ] && mv "$f.off" "$f"`: Renames the
      `.off` copy back to its own name, but only if the `.off` one is there
      and nothing has taken the name since. Anything you never switched off is
      left alone.
   4. `done`: Ends the loop.

   </details>

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

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `cd ~/projects/hr-case-router-notes`: Goes into your notes folder,
      `hr-case-router-notes`, where Module 0 saved how things were before the
      lab. Claude never reads it.
   2. `node -e '`: Runs the next three lines as a small Node.js script. The
      `'` here and the one at the end of the script's last line wrap it.
   3. `for (const [n, c] of Object.entries(require("./mcp-before-lab.json")))`:
      Reads `mcp-before-lab.json`, the MCP servers you had before the lab, and
      goes through them one by one: `n` is a server's name and `c` its
      settings.
   4. `require("child_process").execFileSync("claude", ["mcp", "add-json",`:
      Runs `claude mcp add-json` for each server, which adds a server to
      Claude Code from its settings.
   5. `"--scope", "user", n, JSON.stringify(c)], { stdio: "inherit" })'`: Ends
      that command: `--scope user` adds the server in every folder, as it was
      before, under its name and with its settings. `stdio: "inherit"` shows
      you what `claude` prints.
   6. `claude mcp list`: Lists the MCP servers Claude Code can use now, so you
      can see yours are back.

   </details>

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

   <details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

   1. `cd ~/projects/hr-case-router-notes`: Goes into your notes folder,
      `hr-case-router-notes`, where Module 0 saved how things were before the
      lab. Claude never reads it.
   2. `for h in …; do`: Starts a loop over GitHub's two web addresses, GitHub
      itself and its gists: Module 0's `gh auth setup-git` set how git signs
      in to both.
   3. `git config --global --unset-all "credential.$h.helper"`: Removes every
      sign-in helper git has for that address, `gh` included, from the
      settings for every repo on this computer.
   4. `done`: Ends the loop.
   5. `grep -E '^credential\.… git-credentials-before-lab.txt |`: Picks out,
      from the file Module 0 saved, the sign-in helpers git had for GitHub
      before the lab. The `|` at the end passes them to the next line.
   6. `while read -r k v; do git config --global --add "$k" "$v"; done`: Adds
      each of those helpers back, one at a time: `k` is the setting's name and
      `v` its value.
   7. `git config --global --get-regexp '^credential\.' | diff - … && echo same`:
      Compares how git signs in now with the saved file. `diff` prints each
      line that differs; when none does, `echo same` prints `same`.

   </details>

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

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Once you're done with the lab, its kit and your instance's sign-in have no
more use on this computer. Removing them leaves nothing that can reach the lab
instance, and deletes a saved file that can hold keys.

</details>

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

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `claude plugin uninstall prove-it@prove-it`: Uninstalls the lab's kit, the
   `prove-it` plugin, from Claude Code.
2. `claude plugin marketplace remove prove-it`: Removes the kit's marketplace:
   the list of plugins Claude Code installed the kit from.
3. `now-sdk auth --delete lab-pdi`: Deletes the SDK's saved sign-in to your
   lab instance, `lab-pdi`, from this computer.
4. `rm -f ~/projects/hr-case-router-notes/mcp-before-lab.json`: Deletes the
   copy of your MCP server settings that Module 0 saved, as it can hold keys.
   `-f` means no complaint if the file isn't there.
5. `claude plugin list`: Lists the plugins Claude Code still has, so you can
   see the kit is gone.

</details>

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
