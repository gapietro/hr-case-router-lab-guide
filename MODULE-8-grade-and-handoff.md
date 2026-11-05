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

Guess first: the score out of 100, and the one weakness it will find.

### 2. Start from a clean main

⌨️ **Terminal**, in your window:

```
cd ~/projects/hr-case-router/app
git switch main && git pull && git status --short
```

✅ `git status --short` prints nothing.

<details><summary>🛟 It lists GRADE.md, .gitignore or BACKLOG.md</summary>

A grade was cut short. Put those back:

```
git restore .gitignore BACKLOG.md
rm -f GRADE.md
```

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

Then run `git status --short` again.

</details>

### 3. Run the grade, in a fresh session

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
