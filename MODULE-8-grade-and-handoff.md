# Module 8 — Grade: could someone else own this?

*⏱ 40 min · 15:25*

Run the kit's grade: a demanding senior engineer who has never met you. It
runs the build and the tests before it scores, and anything it couldn't run
is **unverified** and scores zero. **The catch:** what does a stranger find
that you didn't?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before a handover, someone who's never seen the app judges
  whether a stranger could run, fix and trust it.
- **Why it matters:** the builder can't see what's missing. A grader who runs
  everything can.
- **Your mindset:** a low, honest score beats a high one you can't back up.

</details>

### 1. 🔮 Guess the grade

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Guessing first shows how far your own view of the build is from a stranger's.
You compare the two once `GRADE.md` is written.

</details>

⌨️ **Terminal**, in your window: first check that the earlier modules left
what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 8
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, the check's script included. `-q` prints only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 8`:
   Checks that each earlier module left what its checks promise, such as
   your files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 8.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names, then run the check again. Can't fix one? Tell your
instructor before you go on: every later step builds on it. They can help you
fix it, or give you a checkpoint to start this module from.

</details>


Guess first: the score out of 100, and the one weakness it will find.

<details><summary>🔮 The answer, once you've guessed</summary>

Usually a preview scoring around 70. The weakness: design terms in open
stories, such as the weekly numbers, have no test yet, which caps the score
at 74.

A cap is a ceiling, not the score. The rubric's 18 rows are six per
dimension, and the score is the dimensions' average: if design misses two
rows, code quality one and readiness two, as is typical today, that's
(67 + 83 + 67) ÷ 3 = 72. A failed or skipped build, test run or secrets
scan caps it at 49. Low is honest: the grader scores only what it ran or
can cite.

</details>

### 2. Start from a clean main

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The grade judges what's in your repo, so leftover files would be graded too,
or get in its way. A clean, up-to-date `main` means it scores exactly what's
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
   back as they were at your last commit, dropping what the cut-short grade
   changed in them.
2. `rm -f GRADE.md`: Deletes the unfinished `GRADE.md`. `-f` means no
   complaint if it's already gone.

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
2. `git add -A`: Marks every change git lists, new files included, to go into
   the next commit.
3. `git commit -m "chore: leftovers"`: Saves those changes as one commit on
   `chore/leftovers`, with the message after `-m`. Your repo's guard checks it
   for secrets first.
4. `git switch main`: Switches back to `main`, which now has none of the
   leftovers, so the grade starts from a clean `main`.

</details>

Then run `git status --short` again.

</details>

### 3. Run the grade, in a fresh session

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A fresh session has never seen your app, like a new owner. The grade runs the
build, the tests and a secrets scan itself, and scores a fixed rubric of 18
rows, so the score rests on what it ran, not on what anyone says. `merge`
names the milestone it grades: the MERGE gate.

</details>

<div data-show="surface:terminal">

**In the terminal:** ⌨️ in the Claude window, after `/exit` if Claude is
open:

```
cd ~/projects/hr-case-router/app && claude
```

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**, click
the folder control, choose **Open folder…**, and pick
`~/projects/hr-case-router/app`.
Then press **Ctrl+O** until the view is **Verbose**.

</div>

🤖 **Claude**, before anything else: type this, alone:

```
/prove-it:grade merge
```

Don't explain the app to it: it reads the repo cold. If it says
`This milestone is not reached` and asks whether to grade anyway, reply
`yes`. That makes it a preview.

### 4. Answer its questions

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The grade asks before it touches your instance, and installs only to the alias
you name, so it never reaches the wrong one. Naming `lab-pdi` lets it prove
the install itself; with no alias, that row is unverified.

</details>

- **"Which alias should I install to?"** Reply `lab-pdi`. Using your
  instructor's finished build since 14:30? Reply `no alias` instead, so
  your instance keeps one app: the install is then **unverified**.
- When it asks permission to run `now-sdk install --auth lab-pdi`, choose
  **Yes**, for that command only.

✅ `GRADE.md` has a score, the arithmetic behind it, every **unverified**
item and any **cap**. A preview is headed `Preview: milestone not reached`.

<details><summary>🛟 The install says 401, or times out</summary>

Your instance is asleep. Ask your instructor to wake it, then 🤖
**Claude:** type `It's awake now: run the install to lab-pdi again.` Choose
**Yes** again, for that command only.

</details>

<details><summary>🛟 It wants to replace ../plan-grade.json</summary>

An earlier grade left it. 🤖 **Claude:** type
`yes, replace ../plan-grade.json`

</details>

### 5. Read it like a stranger would

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The reasons matter more than the score: the unverified rows and the caps show
what a new owner couldn't check, or would trip over. Reading them tells you
what's left before someone else could own this app.

</details>

✏️ **Editor:** in `GRADE.md`, compare the score and the main weakness with
your guess. Then read each **unverified** row under **Rubric**, and each row
under **Caps applied**: one serious problem limits the whole score. On
today's preview, it's likely to show:

- **Caps applied:** 74, for `design.terms-tested` and
  `design.gates-evidenced`: open MERGE stories, such as the weekly numbers
  (9), hold design terms no test names yet.
- **Unverified:** `code.lint`, with no lint script, as lint isn't a
  criterion here; `ready.real-user`, until an issue or pull request records
  a check you did as `hr.demo`.
- **Fail:** `ready.gate-clear`, for those open stories: that makes it a
  preview.
- **Pass:** `ready.ai-bounded`, citing `<SCOPE>.runs_per_hour`,
  `<SCOPE>.runs_per_day` and `<SCOPE>.enabled`, `<SCOPE>` being your scope,
  such as `x_123456_hcr_ga`.

<details><summary>ℹ️ What design.terms-tested and (9) mean</summary>

Each row is one of the grade's checks: the area it looks at, a dot, then what
it checks. `design.terms-tested` checks that a test names every design term
(`C1`, `C2`…). `(9)` is capability 9, the weekly numbers. The milestone
graded is the merge gate's, such as `M1 · merge`.
[All the labels](APPENDIX.md#designterms-tested-the-grades-checks).

</details>

<details><summary>🛟 Caps applied says 49</summary>

The build, the tests or the secrets scan failed, or didn't run: **Checks
run** says which. Failed? It's real: tell your instructor before you go on.
Didn't run, as it was denied, blocked or timed out? 🤖 **Claude:**

```
Run the checks that didn't run again, and update GRADE.md.
```

</details>

<details><summary>🛟 Your grade shows something else</summary>

Caps applied isn't 49? That's fine: the list above is a forecast, not a
test. Note what differs, for the debrief. Step 6 files whatever it found.

</details>

### 6. File its findings

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A finding that isn't filed gets forgotten. Filing puts each one on the board,
as a story with a gate or as a register issue, and rewrites `BACKLOG.md` to
match. The dry run shows what would be written before anything is.

</details>

1. 🤖 **Claude:** it shows its findings as proposed stories, then stops.
   Lint isn't a criterion here, and gate-clear passes once the rest close,
   so type this:

   ```
   File the code.lint and ready.gate-clear stories as register, keeping
   their keys.
   ```
2. When it shows them again, type `approve`.
3. When it asks "Dry run first (recommended), or apply now?", type
   `Dry run first.`; read the count of writes; then type `apply`.
4. ⌨️ **Terminal**, in your window: `git diff .gitignore`

   ✅ Below the header, the only line starting with `+` is `+!/GRADE.md`.

### 7. Merge the grade

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The grade goes to `main` through a pull request and a review, like any change,
so the next person to open the repo sees the score and what limits it.

</details>

1. 🤖 **Claude:**

   ```
   Commit GRADE.md, .gitignore and BACKLOG.md together on a new branch
   chore/grade.
   ```
2. 🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

   ```
   ship it. Review the diff without checking it out. Fix real findings in
   the code once. Never edit docs/, GRADE.md, RUNBOOK.md, HANDOFF.md or
   BACKLOG.md to answer a finding, and don't stop to ask me: file it as a
   register issue instead. There's no CI: merge once now-sdk build passes,
   and npm test too once there's a test script. Then switch to main and
   pull, and give me the pull request link and one line per finding: fixed,
   filed, or not a problem and why.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude pushes your branch, opens a pull request, reviews its own
   diff without checking it out, fixes real findings once and files the rest,
   then merges when the build and tests pass. You get the pull request link
   and one line per finding.

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

**Log it:** nothing yet. A grade finding is a story on GitHub, and a catch
once its fix merges, after the workshop.

The real grade, the runbook, the drill and the verdict are on
[After the workshop](AFTER-THE-WORKSHOP.md).
