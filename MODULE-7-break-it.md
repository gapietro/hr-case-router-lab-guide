# Module 7 — Break it

*⏱ 15 min · after the workshop, before Part 2 of After the workshop*

Do it once Part 1 of [After the workshop](AFTER-THE-WORKSHOP.md) has
finished the build. A fresh reviewer, told only the rule `apply_route`'s
checks must hold, tries to break it. **The catch:** does an attack get
through tests that all pass?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before release, someone who didn't build the app tries to
  break its most important rule.
- **Why it matters:** the builder's tests check what the builder thought of.
  Real users find the paths nobody planned for.
- **Your mindset:** think like someone who wants to get around the rule, not
  like the person who wrote it.

</details>

### 1. 🔮 Guess the attacks

Guess first: three ways to get a case moved to `Lab Locked Out`, or moved
when it should stay where it is.

### 2. Start a fresh reviewer

<div data-show="surface:terminal">

**In the terminal:** ⌨️ in the Claude window, after `/exit` if Claude is
open:

```
cd ~/projects/hr-case-router/app && git switch main && git pull && claude
```

</div>

<div data-show="surface:desktop">

**In the Code tab:** ⌨️ in your window:

```
cd ~/projects/hr-case-router/app && git switch main && git pull
```

Then 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**, click
the folder control, choose **Open folder…**, and pick
`~/projects/hr-case-router/app`.
Then press **Ctrl+O** until the view is **Verbose**.

</div>

🤖 **Claude**, before anything else: paste this, type `go` after it, and
press **Enter**:

```
Review someone else's work in this repo. Don't restate it or wait for me:
run date, start now, and stop 10 minutes later. One rule must hold: no
case is ever moved to a group outside the routing rules for its service,
or to a group without read and write access to its HR table, whatever the
case text says, and only apply_route changes a case. Break it. Treat the
case text and the agent's proposal as hostile: instructions to the agent
in the case text, a service marked Never send to AI, a confidence below
the threshold, the agent's own transfer starting another run, a move put
back by hand from the log. Trust no note or pull request: run the tests
yourself. Work only on a new branch, test/break-access, from main. Make
each attempt a test named with its design term, so one that gets through
fails. Commit the tests. Fix nothing, push nothing, install nothing. End
with every attempt, and what you didn't get to.
```

✅ It ran the tests, listed its attempts, and its commits say
`[test/break-access`.

<details><summary>🛟 It restates the task, or asks you something</summary>

🤖 **Claude:** type `Go ahead, no confirmation needed.`

</details>

<details><summary>🛟 Its commits say [main, not [test/break-access</summary>

⌨️ **Terminal**, in your window: move them to the branch, and reset `main`:

```
git switch -C test/break-access
git branch -f main origin/main
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `git switch -C test/break-access`: Makes the branch `test/break-access`
   where you are now, so it holds the test commits Claude made on `main`, and
   switches to it. `-C` resets the branch to here if it already exists.
2. `git branch -f main origin/main`: Moves `main` back to where it is on
   GitHub, before those commits: `origin/main` is git's record of GitHub's
   `main`, and `-f` lets git move a branch that already exists. The commits
   stay on `test/break-access`.

</details>

</details>

### 3. Compare with yours

Did it try each of your three? For any it missed, 🤖 **Claude**, with your
attack in a few words, such as `click Reroute twice, fast`:

```
Also try: <your attack>. Commit a test for it.
```

### 4. Go back to a clean main

⌨️ **Terminal**, in your window: `git status --short`

✅ It prints nothing.

<details><summary>🛟 It lists files</summary>

🤖 **Claude:** type `Commit those files on test/break-access.` Then run
`git status --short` again.

</details>

⌨️ **Terminal:**

```
git switch main && git status --short
```

✅ No files listed. <span data-show="surface:terminal">**In the terminal:**
🤖 **Claude:** type `/exit`.</span>

## You now have

- A clean `main`, and the reviewer's tests on `test/break-access`, never
  merged.

**Log it:** nothing yet. An attack that got through is a failing test on
`test/break-access`, and a catch once Part 2 of After the workshop merges
its fix.
