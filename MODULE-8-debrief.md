# Module 8 — What the process caught

*⏱ 15 min · 16:05*

Count your catches from the file, not from memory. Decide what to take
home. Then close the day's session.

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** after a build, the team counts what the process caught,
  and where. That shows which steps earned their time.
- **Why it matters:** the count makes the case for working this way, or
  against it. Opinion doesn't.
- **Your mindset:** trust evidence over memory, and be honest about what's
  real.

</details>

### 1. Count your catches

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The count comes from `catches.md`, the file you added a line to in each
module. So it rests on what you wrote down at the time, not on memory. It
also shows which parts of the method caught the most.

</details>

⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps: first
check that the earlier modules left what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 8
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, including the check's script. `-q` means it prints
   only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 8`:
   Checks that each earlier module left what it promised, such as your
   files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 8.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names. Then run the check again. If you can't fix one,
tell your instructor before you go on. Every later step builds on it. They
can help you fix it. Or they can give you a checkpoint, the work so far
ready made, to start this module from.

</details>


⌨️ **Terminal**, in your window:

```
grep -c '|' ~/projects/hr-case-router/catches.md
grep '|' ~/projects/hr-case-router/catches.md | cut -d'|' -f2 | tr -d ' ' | sort | uniq -c
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `grep -c '|' ~/projects/hr-case-router/catches.md`: Counts the lines in
   `catches.md` that hold a `|`. Each catch is one such line. So the count
   is your total.
2. `grep '|' … | cut -d'|' -f2 | tr -d ' ' | sort | uniq -c`: Takes the same
   lines and keeps only what caught each mistake: the part between the
   first and second `|`, such as `design`. Then it removes the spaces, sorts
   the words and counts each kind. Each `|` between two commands passes what
   the first prints to the next.

</details>

✅ It prints your total. Then it prints a count for each kind, such as
`3 design`.

### 2. Add yours to the room's board

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your count alone is small. Added up across the room, it shows which parts of
the day caught the most mistakes. That's the evidence for working this way,
or against it.

</details>

Your instructor has a board with one column for each kind of catch. The
kinds are the words your second command in step 1 printed, such as
`design` or `review`. Each one names what caught the mistake.

1. Add your numbers to the board's columns, as your instructor asks.
2. Then talk it through with the room:
   - **Where did most catches come from?** That part of the day earned its
     time.
   - **How many came before any code was written?** Those are `prd`,
     `consult`, `research` and `design`. A mistake caught there costs a
     sentence to fix, not a rebuild.
   - **How many came from someone checking finished work?** Today that's
     `review`. Claude's code review found those mistakes after your own
     tests had already passed. The `grade`, `partner` and `drill` catches
     come after the workshop.

### 3. Sort out what's real

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A demo can make unfinished work look done. Be honest about which parts
you've actually seen work. Then you, and anyone you show the app to, know
what's left before it's real.

</details>

Go through the parts of your app. Put each one in one of three groups.
Write them down, or say them with the room:

- **Proven:** you watched it work live on your instance, as `hr.demo`. For
  example, you saw a new case routed to `Lab HR Team`, with its work note.
- **Only tested:** your tests or the grade say it works. You haven't seen
  it happen live yet.
- **Not built yet:** anything that isn't merged, and anything your grade
  left open. For example:
  - the weekly numbers;
  - the rule that records when a person overrides the router;
  - the runbook, the steps for running and fixing the app;
  - the failure drill, where your partner breaks the app and you fix it
    from the runbook;
  - the handover verdict, the kit's ruling on whether someone else could
    take the app over.

  You build these in [After the workshop](AFTER-THE-WORKSHOP.md).

Your app is a practice copy on a lab instance. To build your company's real
one, use the same method again. Start with [your own PRD](OWN-PRD.md), the
document that says what your app must do, on your company's dev instance.
Then take the app [to production](PROMOTE.md), the instance real people
use.

### 4. Take it home

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The day only pays off if you use the method again. One sentence for each
answer turns it into a next step you can act on at work.

</details>

Decide three things, in one sentence each:

- the next real work you'll build this way;
- the one stage of the method you'd keep;
- the building block you're missing at work.

Short of time? Do it at home.

Ask your instructor when your instance ends. You need it for
[After the workshop](AFTER-THE-WORKSHOP.md) until that date.

### 5. Close the session

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The session note lets the next session, or the next person, pick up without
guessing. Shipping it puts it on `main`. Whoever opens the repo next will
find it there.

</details>

Claude closed? <span data-show="surface:terminal">**In the terminal:** ⌨️
in the Claude window: `cd ~/projects/hr-case-router/app && claude`</span>
<span data-show="surface:desktop">**In the Code tab:** 🤖 start a new
session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**. Click
the folder control, choose **Open folder…** and pick
`~/projects/hr-case-router/app`. Then press **Ctrl+O** until the view is
**Verbose**.</span>

1. 🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

   ```
   We're stopping here. Update SESSION-NOTE.md: what's proven, what's
   open, the exact next step, and the top three next items. Commit only
   SESSION-NOTE.md, on a new branch docs/session-note.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude writes down in SESSION-NOTE.md where the work stands. A fresh
   session, or you after a break, can then pick up exactly here.

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

   Claude pushes your branch and opens a pull request. It reviews its own
   diff without checking it out, and posts the review on the pull request.
   It fixes real findings once, files the rest, and merges when the build
   and tests pass. You get the pull request link and one line per finding.

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

Used a separate user account for the lab? Skip this part. Going straight on
to [After the workshop](AFTER-THE-WORKSHOP.md) in the catch-up time, 16:20
to 17:00? Skip steps 6 to 8 until you've finished it.

### 6. Put your settings back

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The lab added its own Claude Code settings, which limit what Claude may do.
It also kept a backup of yours. This step puts yours back, so Claude works
for you as it did before the lab.

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
   `hr-case-router-lab-guide`. `-C` runs git as if you were in that folder.
   You don't have to go there first.
2. `node …/merge-claude-settings.mjs --restore`: Runs the lab's settings
   script to put your own Claude Code settings back. If you had a settings
   file before the lab, you get your backup exactly. If you didn't, you
   keep your settings without the lab's.
3. `node …/merge-claude-settings.mjs --check`: Runs the same script to check
   whether the lab's settings are in place. It changes nothing. Now you want
   them gone.

</details>

✅ The last command says `Lab settings NOT in place:`. That's what you want.

### 7. Switch back on what the pre-work switched off

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The pre-work set aside your own instructions, plugins, MCP servers and
GitHub sign-in, so they couldn't steer the lab. MCP servers are connections
that give Claude extra tools. Each sub-step puts one of these back, but only
where the pre-work saved how it was. Anything you never switched off is
left alone.

</details>

⌨️ **Terminal:** put back only what the pre-work saved. It's in
`~/projects/hr-case-router-notes`, your notes folder.

1. Rename back each file or folder that the pre-work gave an `.off` ending:

   ```
   for f in ~/CLAUDE.md ~/projects/CLAUDE.md ~/.claude/CLAUDE.md \
            ~/.claude/skills ~/.claude/agents ~/.claude/commands; do
     [ -e "$f.off" ] && [ ! -e "$f" ] && mv "$f.off" "$f"
   done
   ```

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `for f in ~/CLAUDE.md … \`: Starts a loop, which runs the same command
      once for each item in a list. The list starts with your own
      instruction files, the ones Claude reads in every session. The `\` at
      the end carries the list on to the next line.
   2. `~/.claude/skills ~/.claude/agents ~/.claude/commands; do`: Ends the
      list with your own skills, agents and commands folders. `do` starts
      what runs for each one. The loop calls each one `$f`.
   3. `[ -e "$f.off" ] && [ ! -e "$f" ] && mv "$f.off" "$f"`: Renames the
      `.off` copy back to its own name. It does this only if the `.off` copy
      is there and nothing has taken the name since. Anything you never
      switched off is left alone.
   4. `done`: Ends the loop.

   </details>

2. Turn back on each plugin that `plugins-before-lab.txt` shows as
   `✔ enabled`. Run `claude plugin enable <name>` for each one. For
   `<name>`, use what follows `❯` on that plugin's line.
3. Only if `mcp-before-lab.json` is there, add its MCP servers back:

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
      `hr-case-router-notes`, where the pre-work saved how things were
      before the lab. Claude never reads it.
   2. `node -e '`: Runs the next three lines as a small Node.js script. The
      `'` here and the one at the end of the script's last line mark where
      it starts and ends.
   3. `for (const [n, c] of Object.entries(require("./mcp-before-lab.json")))`:
      Reads `mcp-before-lab.json`, the list of MCP servers you had before
      the lab. It goes through them one by one. `n` is a server's name and
      `c` its settings.
   4. `require("child_process").execFileSync("claude", ["mcp", "add-json",`:
      Runs `claude mcp add-json` for each server. That command adds a server
      to Claude Code from its settings.
   5. `"--scope", "user", n, JSON.stringify(c)], { stdio: "inherit" })'`: Ends
      that command. `--scope user` adds each server for every folder, as it
      was before, with its own name and settings. `stdio: "inherit"` shows
      you what `claude` prints.
   6. `claude mcp list`: Lists the MCP servers Claude Code can use now, so you
      can see yours are back.

   </details>

   ✅ It lists your servers again.
4. Run `cat ~/projects/hr-case-router-notes/gh-before-lab.txt`. Is the
   account above `Active account: true` someone other than your lab
   account? Switch back to it with `gh auth switch --user <that account>`.
   Does it say you weren't logged in to any GitHub hosts? Then sign the lab
   account out with `gh auth logout`.
5. Put back how git signed in to GitHub. The pre-work's `gh auth setup-git`
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
      `hr-case-router-notes`, where the pre-work saved how things were
      before the lab. Claude never reads it.
   2. `for h in …; do`: Starts a loop over GitHub's two web addresses:
      GitHub itself and its gists, GitHub's site for sharing short files.
      The pre-work's `gh auth setup-git` set how git signs in to both.
   3. `git config --global --unset-all "credential.$h.helper"`: Removes
      every sign-in helper git has for that address, `gh` included. A
      sign-in helper is the program that gives git your GitHub sign-in. They
      go from git's settings for every repo on this computer.
   4. `done`: Ends the loop.
   5. `grep -E '^credential\.… git-credentials-before-lab.txt |`: Reads the
      file the pre-work saved. It picks out the sign-in helpers git had for
      GitHub before the lab. The `|` at the end passes them to the next line.
   6. `while read -r k v; do git config --global --add "$k" "$v"; done`: Adds
      each of those helpers back, one at a time. `k` is the setting's name
      and `v` its value.
   7. `git config --global --get-regexp '^credential\.' | diff - … && echo same`:
      Compares how git signs in now with the saved file. `diff` prints each
      line that differs. When none does, `echo same` prints `same`.

   </details>

   ✅ It prints `same`.

   <details><summary>🛟 It says No such file or directory</summary>

   The pre-work didn't save how git signed in. So git now signs in to GitHub
   the way it does for every other site. That's the Keychain on a Mac and
   Credential Manager on Windows. Used something else for GitHub before the
   lab? Add it back:
   `git config --global --add credential.https://github.com.helper <it>`.

   </details>

   <details><summary>🛟 It prints lines starting with &lt; or &gt;</summary>

   Those lines are what differs from before the lab. Are they the same lines
   in another order? Or a `credential` setting you changed yourself during
   the lab? That's fine. Does it say `could not lock config file`? Close VS
   Code and run the block again. Running it twice is safe.

   </details>

### 8. Remove the plugins and the SDK login

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Once you're done with the lab, you no longer need its kit, the prove-it
plugin, or your instance's sign-in on this computer. Removing them leaves
nothing that can reach the lab instance. It also deletes a saved file that
can hold keys, the secret codes some MCP servers sign in with.

</details>

⌨️ **Terminal**, once you're done with the lab for good, including After
the workshop. The `rm` line deletes the MCP settings the pre-work saved,
because they can hold keys:

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
   copy of your MCP server settings that the pre-work saved, because it can
   hold keys. `-f` means it doesn't complain if the file isn't there.
5. `claude plugin list`: Lists the plugins Claude Code still has, so you can
   see the kit is gone.

</details>

✅ The list no longer shows `prove-it@prove-it`.

Won't build ServiceNow apps with the SDK again? Remove ServiceNow's plugin
too:

```
claude plugin uninstall servicenow-sdk@claude-plugins-official
```

## You now have

- Your catches counted, the day's session note merged, and your settings
  put back.
- Coming back for [After the workshop](AFTER-THE-WORKSHOP.md)? Start at the
  top of that page. It sets the lab up again.
