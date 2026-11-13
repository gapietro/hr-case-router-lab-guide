# Module 7 — Grade: could someone else own this?

*⏱ 40 min · 15:25*

Run the grade from the prove-it kit. It acts like a demanding senior
engineer who has never met you. It runs the build and the tests before it
scores your app. Anything it couldn't run is **unverified**, and scores
zero. **The catch:** what does a stranger find that you didn't?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before a team hands an app over, someone who's never
  seen it judges it. Could a stranger run it, fix it and trust it?
- **Why it matters:** the builder can't see what's missing. A grader who runs
  everything can.
- **Your mindset:** a low, honest score beats a high one you can't back up.

</details>

### 1. 🔮 Guess the grade

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Guessing first shows how far your own view of the build is from a stranger's.
You compare the two once the grade writes `GRADE.md`, its report.

</details>

⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps. First
check that the earlier modules left what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 7
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, including the check's script. `-q` means it prints
   only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 7`:
   Checks that each earlier module left what it promised, such as your
   files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 7.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names. Then run the check again. If you can't fix one,
tell your instructor before you go on. Every later step builds on it. They
can help you fix it. Or they can give you a checkpoint, the work so far
ready made, to start this module from.

</details>


Guess the score out of 100, and the one weakness the grade will find.

<details><summary>🔮 The answer, once you've guessed</summary>

It's usually a preview that scores about 60. A preview is a grade of a
milestone you haven't reached yet. The weakness: design terms in open
stories have no test yet. The weekly numbers are one example. That caps
the score at 74.

A cap is a ceiling, not the score. The rubric, the grade's fixed list of
checks, has 18 rows. There are six rows for each of three dimensions:
design, code quality and readiness. The score is the average of the three.
Today design typically misses two rows, code quality two and readiness
three. That's (67 + 67 + 50) ÷ 3 = 61. If the build, the test run or the
secrets scan fails or is skipped, the score is capped at 49. A secrets scan
looks for passwords and keys left in the code. A low score is honest. The
grader scores only what it ran or can cite.

</details>

### 2. Start from a clean main

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The grade judges what's in your repo. Leftover files would be graded too,
or get in its way. With a clean, up-to-date `main`, it scores exactly what's
merged.

</details>

⌨️ **Terminal**, in your window:

```
cd ~/projects/hr-case-router/app
git switch main && git pull && git status --short
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router/app`: Goes into your app's repo, the `app`
   folder in your workspace.
2. `git switch main && git pull && git status --short`: Switches to `main`,
   downloads what's been merged into it on GitHub, then lists every file
   that's changed but not committed. `&&` runs each command only if the one
   before it worked. Nothing listed means your folder holds exactly what's on
   `main`.

</details>

✅ `git status --short` prints nothing.

<details><summary>🛟 It lists GRADE.md, .gitignore or BACKLOG.md</summary>

A grade was cut short. Put those back:

```
git restore .gitignore BACKLOG.md
rm -f GRADE.md
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `git restore .gitignore BACKLOG.md`: Puts `.gitignore` and `BACKLOG.md`
   back as they were at your last commit. That drops what the cut-short
   grade changed in them.
2. `rm -f GRADE.md`: Deletes the unfinished `GRADE.md`. `-f` means it
   doesn't complain if the file is already gone.

</details>

Then run `git status --short` again.

</details>

<details><summary>🛟 It lists any other file</summary>

It's left over from the build. Keep it on a new branch, never on `main`:

```
git switch -c chore/leftovers
git add -A
git commit -m "chore: leftovers"
git switch main
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `git switch -c chore/leftovers`: Makes a new branch, `chore/leftovers`, and
   switches to it. The changed files come with you, so they never land on
   `main`.
2. `git add -A`: Marks every change git lists for the next commit,
   including new files.
3. `git commit -m "chore: leftovers"`: Saves those changes as one commit on
   `chore/leftovers`. The text after `-m` is its message. Your repo's guard,
   the check that runs on each commit, looks for secrets first.
4. `git switch main`: Switches back to `main`. It has none of the leftovers,
   so the grade starts from a clean `main`.

</details>

Then run `git status --short` again.

</details>

### 3. Run the grade, in a fresh session

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A fresh session has never seen your app, just like a new owner. The grade
runs the build, the tests and a secrets scan itself. Then it scores a fixed
rubric of 18 rows. The score rests on what it ran, not on what anyone says.
`merge` names the milestone it grades, the MERGE gate.

</details>

<div data-show="surface:terminal">

**In the terminal:** if Claude is open in the Claude window, type `/exit`
first. Then ⌨️ in the Claude window:

```
cd ~/projects/hr-case-router/app && claude
```

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**. Click
the folder control, choose **Open folder…** and pick
`~/projects/hr-case-router/app`.
Then press **Ctrl+O** until the view is **Verbose**.

</div>

🤖 **Claude:** before anything else, type this on its own:

```
/prove-it:grade merge
```

Don't explain the app to it. It reads the repo cold, with no help from
you. It may say `This milestone is not reached` and ask whether to grade
anyway. If it does, reply `yes`. That makes it a preview, a grade of work
that isn't finished yet.

### 4. Answer its questions

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The grade asks before it touches your instance. It installs only to the
alias you name, so it never reaches the wrong instance. An alias is the name
your computer saves your instance's sign-in under. If you name `lab-pdi`,
the grade can prove the install itself. With no alias, that row is
unverified.

</details>

- **"Which alias should I install to?"** Reply `lab-pdi`. Have you used
  your instructor's finished build since 14:30? Then reply `no alias`
  instead, so your instance keeps only one app. The install is then
  **unverified**.
- When it asks permission to run `now-sdk install --auth lab-pdi`, choose
  **Yes**, for that command only.

✅ `GRADE.md` has a score, the arithmetic behind it, every **unverified**
item and any **cap**. A preview is headed `Preview: milestone not reached`.

<details><summary>🛟 The install says 401, or times out</summary>

Your instance is asleep. Open it in your browser. If its page offers a
wake-up link, click it and wait. Waking can take up to 20 minutes. If
there's no link, or it's still asleep, ask your instructor. Then 🤖
**Claude:** type `It's awake now: run the install to lab-pdi again.` Choose
**Yes** again, for that command only.

</details>

<details><summary>🛟 It wants to replace ../plan-grade.json</summary>

An earlier grade left it. 🤖 **Claude:** type
`yes, replace ../plan-grade.json`

</details>

### 5. Read it like a stranger would

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The reasons matter more than the score. The unverified rows and the caps
show what a new owner couldn't check, or would trip over. They tell you
what's left to do before someone else could own this app.

</details>

✏️ **Editor:** in `GRADE.md`, compare the score and the main weakness with
your guess. Then read each **unverified** row under **Rubric**. Read each
row under **Caps applied** too. There, one serious problem limits the whole
score. Today's preview is likely to show:

- **Caps applied:** 74, for `design.terms-tested` and
  `design.gates-evidenced`. Open MERGE stories, such as the weekly numbers
  (9), hold design terms that no test names yet. `design.gates-evidenced`
  also names any pull request with no review posted on it.
- **Unverified:** `code.lint`, because there's no lint script. Lint, a tool
  that checks how code is written, isn't one of the MERGE gate's criteria.
  `ready.real-user` is unverified too, until an issue or pull request
  records a check you did as `hr.demo`.
- **Fail:** `ready.gate-clear`, because of those open stories. That's what
  makes it a preview. `ready.config-documented` fails because `README.md`
  lists nothing until its MERGE story is built. `code.logic-off-instance`
  fails because your server code calls the platform. The design doesn't
  ask for that, so the grade puts it on the register. The register is a
  watch list that blocks no gate.
- **Pass:** `ready.ai-bounded`, citing `<SCOPE>.runs_per_hour`,
  `<SCOPE>.runs_per_day` and `<SCOPE>.enabled`. `<SCOPE>` is your app's
  scope, the prefix its names start with, such as `x_123456_hcr_ga`.

<details><summary>ℹ️ What design.terms-tested and (9) mean</summary>

Each row is one of the grade's checks. Its name is the area it looks at, a
dot, then what it checks. `design.terms-tested` checks that a test names every design term
(`C1`, `C2`…). `(9)` is capability 9, the weekly numbers. The milestone
graded is the merge gate's, such as `M1 · merge`.
[All the labels](APPENDIX.md#designterms-tested-the-grades-checks).

</details>

<details><summary>🛟 Caps applied says 49</summary>

The build, the tests or the secrets scan failed, or didn't run. **Checks
run** says which. If one failed, the problem is real. Tell your instructor
before you go on. If one didn't run because it was denied, blocked or timed
out, 🤖 **Claude:**

```
Run the checks that didn't run again, and update GRADE.md.
```

</details>

<details><summary>🛟 Your grade shows something else</summary>

If **Caps applied** isn't 49, that's fine. The list above is a forecast,
not a test. Note what differs, for the debrief in
[Module 8](MODULE-8-debrief.md). Step 6 files whatever the grade found.

</details>

### 6. File its findings

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A finding that isn't filed gets forgotten. Filing puts each one on the board,
as a story with a gate or as a register issue. It also rewrites `BACKLOG.md`
to match. The dry run shows what would be written before anything is.

</details>

1. 🤖 **Claude:** it shows its findings as proposed stories, then stops.
   Lint isn't one of this gate's criteria. Gate-clear passes once the other
   stories close. Type this to put both on the register:

   ```
   File the code.lint and ready.gate-clear stories as register, keeping
   their keys.
   ```
2. When it shows them again, type `approve`.
3. When it asks "Dry run first (recommended), or apply now?", type
   `Dry run first.`. Read the count of writes. Then type `apply`.
4. ⌨️ **Terminal**, in your window: `git diff .gitignore`

   ✅ Below the header, the only line starting with `+` is `+!/GRADE.md`.

### 7. Merge the grade

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The grade goes to `main` through a pull request and a review, like any
change. The next person to open the repo then sees the score and what
limits it.

</details>

1. 🤖 **Claude:**

   ```
   Commit GRADE.md, .gitignore and BACKLOG.md together on a new branch
   chore/grade.
   ```
2. 🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

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
⌨️ **Terminal**, in your window: `git status --short` ✅ prints nothing.

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

## You now have

- `GRADE.md` on `main`: the MERGE grade, or its preview.
- Its findings filed as stories, and listed in `BACKLOG.md`.
- A clean `main`.

**Log it:** nothing yet. Each grade finding is now a story on GitHub. It
becomes a catch once its fix merges, after the workshop.

[After the workshop](AFTER-THE-WORKSHOP.md), you run the real grade. You
write a runbook, the steps for running and fixing the app. Then comes the
drill: your partner breaks one thing, and Claude finds it using only your
runbook. Last, the verdict checks the design, the runbook and the drill. It
says whether the app is ready to hand over.
