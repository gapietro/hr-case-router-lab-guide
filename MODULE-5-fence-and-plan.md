# Module 5 — Check and plan

*⏱ 25 min · 12:30*

Your design record, the design you signed in Module 4, comes into your repo.
It gets one last check. Then it becomes a plan on GitHub: the stories you'll
build. **The idea:** a check only counts if it could have failed. So you
answer five questions before the plan is filed. **The catch:** does the
plan's review find something real?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** the signed design is split into small stories. Each one
  belongs to a milestone, the group of stories that one gate needs.
- **Why it matters:** a plan that puts first what holds up the next
  milestone shows real progress.
- **Your mindset:** you're the last check before the plan is filed.

</details>

### 1. Bring the design in, and check it's ready

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Until now your design files lived in your workspace, the
`~/projects/hr-case-router` folder. The build works from your app's repo, the
`app` folder inside it. So the files move into the repo on a branch, with the
lab's platform-rules test. Then a last check makes sure the record can be
built as written, with nothing left open. Only then does it become a plan.

</details>

⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps. First,
check that the earlier modules left what this one needs:

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 5
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, including the check's script. `-q` means it prints
   only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 5`:
   Checks that each earlier module left what it promised, such as your
   files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 5.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names. Then run the check again. If you can't fix one,
tell your instructor before you go on. Every later step builds on it. They
can help you fix it. Or they can give you a checkpoint, the work so far ready
made, to start this module from.

</details>


1. Bring in the lab's platform-rules test, and start Claude in your app. The
   test checks platform rules P1 to P5, P12 and P13. Platform rules are
   things your instance really does that the build must allow for. The
   second line below copies the test in.

   <div data-show="surface:terminal">

   **In the terminal:** ⌨️ in your window. It then becomes the Claude window:

   ```
   cd ~/projects/hr-case-router/app
   cp ../../hr-case-router-lab-guide/files/platform-rules.test.ts src/
   claude
   ```

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `cd ~/projects/hr-case-router/app`: Goes into your app's repo, the `app`
      folder in your workspace.
   2. `cp ../../hr-case-router-lab-guide/files/platform-rules.test.ts src/`:
      Copies the lab's platform-rules test, which nobody edits, into your
      app's `src` folder. `../..` goes up two folders, to `projects`. The test
      checks rules P1 to P5, P12 and P13 each time `npm test` runs.
   3. `claude`: Starts Claude Code in the folder you're in. This window is now
      the Claude window.

   </details>

   </div>

   <div data-show="surface:desktop">

   **In the Code tab:** ⌨️ in your window:

   ```
   cd ~/projects/hr-case-router/app
   cp ../../hr-case-router-lab-guide/files/platform-rules.test.ts src/
   ```

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `cd ~/projects/hr-case-router/app`: Goes into your app's repo, the `app`
      folder in your workspace.
   2. `cp ../../hr-case-router-lab-guide/files/platform-rules.test.ts src/`:
      Copies the lab's platform-rules test, which nobody edits, into your
      app's `src` folder. `../..` goes up two folders, to `projects`. The test
      checks rules P1 to P5, P12 and P13 each time `npm test` runs.

   </details>

   Then 🤖 start a new session
   (<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
   In the row under the prompt box, pick the top entry under **Local**. Click
   the folder control, choose **Open folder…** and pick
   `~/projects/hr-case-router/app`.
   Then press **Ctrl+O** until the view is **Verbose**.

   </div>

2. 🤖 **Claude:**

   ```
   Create and switch to a branch, docs/plan. Copy DESIGN-HRCaseRouter.md,
   LLD-HRCaseRouter.md and DECISIONS.md from ../docs/ into docs/,
   unchanged, and commit those three and src/platform-rules.test.ts as
   "docs: design record, LLD, decisions and platform rules". Only after
   that commit succeeds, delete the three originals.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude makes a branch, docs/plan. It copies the design record, the LLD and
   `DECISIONS.md` unchanged into the repo's `docs` folder, and commits them
   with the platform-rules test. It deletes the originals in your workspace
   only after the commit succeeds, so nothing is lost if the commit is
   refused. The repo copy then becomes the only live one.

   </details>

   <details><summary>🛟 It says BLOCKED: … look like a secret</summary>

   The files name your instance. The guard, the script that checks each
   commit for secrets, stopped the commit. 🤖 **Claude:**

   ```
   In docs/, replace my instance's host name, such as
   dev123456.service-now.com, with the text INSTANCE_HOST. Then make the
   commit again, and delete the three originals only after it succeeds.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude swaps your instance's host name in the `docs` files for the
   placeholder INSTANCE_HOST. Then the repo's guard no longer sees a secret.
   Claude commits again, and deletes the originals only once that commit
   succeeds.

   </details>

   </details>

3. 🤖 **Claude:**

   ```
   Read docs/DESIGN-HRCaseRouter.md and check it's ready to build. Change
   nothing. Answer yes or no for each: every gate in §7 can pass as
   written; no term needs a ruling before code can be written; no term
   number clashes with an id in docs/LLD-HRCaseRouter.md; no two terms
   contradict each other. For each no, name the terms.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude reads the design record, changes nothing, and answers four
   readiness checks yes or no. It checks that every gate in §7 can pass as
   written, that no term needs a ruling before code, and that no term number
   clashes with an id in the LLD. It also checks that no two terms
   contradict each other, such as one saying a tool writes nothing and
   another having it log something. For each no, Claude names the terms, and
   a signed amendment fixes it before the plan is drafted.

   </details>

   <details><summary>ℹ️ What §7, term numbers and P1… mean</summary>

   `§7` is section 7 of the design record: its gates. A term number is a
   design term's `C` number, such as `C4`. The check makes sure your LLD,
   the low-level design, uses none of them. The LLD's own numbers are `D1`,
   `D2` and so on. `P1` to `P15`, in sub-step 1, are the platform rules in
   `docs/DECISIONS.md`.
   [All the labels](APPENDIX.md#c1-c2-design-terms).

   </details>

4. ⌨️ **Terminal**, in your window:

   ```
   cd ~/projects/hr-case-router/app
   git diff --stat main HEAD
   grep -nE 'OPEN|VERIFY' docs/DESIGN-HRCaseRouter.md
   grep -n -i 'service-now' docs/*.md
   git remote get-url origin
   ```

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `cd ~/projects/hr-case-router/app`: Goes into your app's repo, the `app`
      folder in your workspace.
   2. `git diff --stat main HEAD`: Lists the files that differ between `main`
      and your branch, `docs/plan`. It shows how many lines each one changed.
      You expect four: the three design files and the platform-rules test.
   3. `grep -nE 'OPEN|VERIFY' docs/DESIGN-HRCaseRouter.md`: Prints, with its
      line number, each line of your design record that still says OPEN or
      VERIFY. Each marks a question nobody has settled yet. `-E` lets `|`
      mean "or".
   4. `grep -n -i 'service-now' docs/*.md`: Prints each line of the files in
      `docs` that names a `service-now` address, such as your instance's. The
      repo's guard treats your instance's name as a secret, so it stays out of
      the repo. `-i` matches upper and lower case.
   5. `git remote get-url origin`: Prints your repo's address on GitHub, which
      Pre-work step 18 saved as `origin`. Step 3 files your plan there.

   </details>

✅ Claude answers four yeses. The last line of `git diff` starts
`4 files changed`. Both `grep` lines print nothing. The last command prints
your `hr-case-router` repo's address.

⛔ **Any no, a line from a `grep`, or an error from `git remote`? Don't start
step 2.** Fix it first with its 🛟 below. The plan is built from the record as
it stands. A gap left here becomes a guess in the plan.

<details><summary>🛟 git remote prints an error</summary>

Your repo isn't on GitHub yet. Pre-work step 18 didn't run. ⌨️ **Terminal**,
in your window:

```
git switch main
gh repo create hr-case-router --private --source . --remote=origin --push
git switch docs/plan
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `git switch main`: Goes to `main`. `gh` pushes only the branch you're on,
   and GitHub makes the first branch it gets the repo's main branch.
2. `gh repo create hr-case-router --private … --push`: Makes your private
   repo on GitHub, saves its address as `origin`, and pushes `main`.
3. `git switch docs/plan`: Goes back to your plan's branch.

</details>

If the name already exists, Pre-work step 18's 🛟 says what to do. Then run
sub-step 4 again.

</details>

<details><summary>🛟 The second grep prints a line</summary>

🤖 **Claude:**

```
In docs/, replace my instance's host name, such as
dev123456.service-now.com, with the text INSTANCE_HOST. Commit only
those files on docs/plan.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude swaps your instance's host name in the `docs` files for the placeholder
INSTANCE_HOST. It commits only those files, on docs/plan. The repo's guard
treats your instance's name as a secret, so the name stays out of the repo.

</details>

Then run sub-step 4 again.

</details>

<details><summary>🛟 It says a term number clashes with the LLD</summary>

Your LLD numbered the capabilities `C1`, `C2`…, the same way as the design
record's terms. A capability is one of the nine things the PRD asks the app
to do. Only the labels change, not what the LLD says. 🤖 **Claude:**

```
In docs/LLD-HRCaseRouter.md, write each capability labelled C1 to C9 as
capability 1 to capability 9, and change nothing else. Commit only that
file on docs/plan. Then answer the four questions again.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude renames the LLD's capability labels, `C1` to `C9`, to capability 1 to
capability 9. Then they no longer share numbers with the design record's
terms. Claude changes nothing else in the LLD, commits only that file, and
answers the four readiness questions again.

</details>

</details>

<details><summary>🛟 Another no, or the first grep prints a line</summary>

🤖 **Claude:** type
`/prove-it:design-challenge amend docs/DESIGN-HRCaseRouter.md`. When it
asks what changed, paste this:

```
Make it ready to build: fix each no from your check, and anything that
says OPEN or VERIFY. For each problem, give me 3 or 4 numbered answers,
your recommended one first.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

This tells the design challenge, in amend mode, what to change: each no from
the readiness check, and anything marked OPEN or VERIFY. For each problem,
Claude offers 3 or 4 numbered answers, its recommendation first. Then it reads
the changed terms back to you. Your confirmation signs the amendment, a change
to the signed record, just as it signed the record.

</details>

Reply with a number, usually `1`. When Claude reads the changes back, type
`Confirmed.` alone. When it asks your name and role, type them, such as
`Sam Lee, developer`. Then type
`Commit only docs/DESIGN-HRCaseRouter.md on docs/plan.` Run sub-steps 3
and 4 again.

</details>

### 2. Preview the plan, and answer five questions

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The build plan turns your design's terms and gates into stories on GitHub.
First it shows a preview and files nothing. Your five answers are a check that
can really fail. A story nobody can check, or a term no story tests, is caught
here, before it becomes work.

</details>

🤖 **Claude:** type this, alone:

```
/prove-it:build-plan docs/DESIGN-HRCaseRouter.md
```

It shows a **preview** and files nothing. If it asks to write `plan.json`
one folder up, allow it. Then 🤖 paste this. Question 4 below needs its
answer:

```
Show each story's honest limit, one line each.
```

Read the preview and that list. A story's "done when" is the check that says
it's finished. Answer each question yes or no:

1. Every pass criterion in §7, each thing a gate must pass, has a story
   whose "done when" checks it.
2. The first story is the thin path in DECISIONS' Build order: the whole
   path, built thin. After it, priority comes only from closeness to the
   next gate.
3. Every "done when" can be checked. A run is checked from its log row, work
   notes and execution plan, never from what the agent said.
4. Every story's honest limit says what passing it doesn't prove.
5. Every check `apply_route` runs itself is in a "done when". The preview's
   coverage line, which names what no story checks, names none of them.

If any answer is no, tell Claude in one line, such as `Story 4's done-when
can't be checked.` Then answer the questions again for the new preview.

Some things are a no too. A term marked "pending ruling — no test yet", or a
story titled "Ruling: …", means the record still needs a ruling, a decision
not made yet. A list of where the plan departs from the record is a no as
well. For any of these, open the 🛟 below. **Never approve a preview you
answered no to.**

<details><summary>ℹ️ What M1 · merge and p0… mean</summary>

The plan files one GitHub milestone per gate, in order, such as `M1 · merge`.
A milestone holds the stories that gate needs. Each story also gets a
priority label. `p0` holds up the next gate, `p1` the gate after, and `p2` is
further out. Lower-case `p` isn't a platform rule.
[All the labels](APPENDIX.md#m1--merge-milestones).

</details>

<details><summary>🛟 It refuses the record, or shows a ruling it needs</summary>

🤖 **Claude:** type
`/prove-it:design-challenge amend docs/DESIGN-HRCaseRouter.md`. When it
asks what changed, paste this:

```
Rule on each OPEN item and each ruling the build plan asked for, and
sign what's unsigned. For each ruling, give me 3 or 4 numbered answers,
your recommended one first.
```

Reply with a number, usually `1`. When Claude reads the changes back, type
`Confirmed.` alone. When it asks your name and role, type them, such as
`Sam Lee, developer`. Then type
`Commit only docs/DESIGN-HRCaseRouter.md on docs/plan.` Run
`/prove-it:build-plan docs/DESIGN-HRCaseRouter.md` again.

</details>

### 3. File the plan, and take your first count

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

When you approve, the kit, the prove-it plugin, files the stories, milestones
and labels on GitHub. A dry run first shows how many writes that means,
without making any. The kit also writes `BACKLOG.md`, a snapshot of your
stories. At its top is the blocker count: how many stories still hold up the
next gate. Checking that count against GitHub's own list shows the two agree
before you rely on it.

</details>

🤖 **Claude:** type `approve`. It asks "Dry run first (recommended), or
apply now?" Type `Dry run first.`, which files nothing. Read the count of
writes. Then type `apply`.

✅ 🌐 GitHub's **Issues** tab lists your stories, with milestones and labels.

⌨️ **Terminal**, in your window:

```
git diff .gitignore
gh issue list --state open --label "gate:merge" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
head -5 BACKLOG.md
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `git diff .gitignore`: Shows what the plan changed in `.gitignore`, your
   repo's allow list. Git tracks only the files it admits. The plan should
   add one line, which admits `BACKLOG.md`.
2. `gh issue list --state open --label "gate:merge" …`: Counts the open GitHub
   issues that hold up the MERGE gate, leaving out register issues, which
   block no gate. `--json` and `--jq` pick out each issue's labels and count
   the issues without `register`. `--limit 5000` makes sure none is missed.
3. `head -5 BACKLOG.md`: Prints the first five lines of `BACKLOG.md`, the
   plan's list of your stories. The number after **Blockers:** should be the
   same count.

</details>

✅ The diff adds just `+!/BACKLOG.md`. The number `gh` prints matches the
one after **Blockers:** in the last line. That's your first honest count,
checked against GitHub. It's the lab's only progress number.

### 4. Close the session, and ship the plan

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Every change reaches `main` through a pull request. Shipping the plan now
rehearses the loop each story will use. The loop is commit, pull request,
review and merge, with a note of where you stopped.

</details>

1. 🤖 **Claude:**

   ```
   We're stopping here. Update SESSION-NOTE.md: what's proven, what's
   open, the exact next step, and the top three next items. On docs/plan,
   commit .gitignore, BACKLOG.md and SESSION-NOTE.md as "docs: backlog and
   first session note".
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude writes down in SESSION-NOTE.md where the work stands. A fresh
   session, or you after a break, can then pick up exactly here. Claude
   commits the note with `.gitignore` and `BACKLOG.md` on docs/plan.

   </details>

2. 🤖 **Claude:** paste this, type `go` after it, and press **Enter**. A
   register issue is a watch-list issue that blocks no gate.

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
   It fixes real findings once, files the rest, and merges when the build and
   tests pass. You get the pull request link and one line per finding.

   </details>

   It pushes, opens a pull request, runs `/code-review` and merges. That
   takes a few minutes. `/code-review` is the command that reviews the
   changes.

3. ⌨️ **Terminal**, in your window:

   ```
   git status --short --branch
   ```

✅ Read every finding line. A real finding marked **fixed** is this module's
catch. 🌐 The pull request link shows **Merged**. No issue is closed, because
the plan isn't a story. `git status` prints only `## main...origin/main`.

<details><summary>🛟 It stops and asks you something anyway</summary>

🤖 **Claude:**

```
Take your recommendation, file it as a register issue if it's about the
design, and finish ship it.
```

</details>

<details><summary>🛟 It isn't merged: a test or the build failed</summary>

🤖 **Claude:** type `Fix it once, then finish ship it.` If it fails again,
tell your instructor.

</details>

### 5. Log it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Claude reviews the plan's pull request before it merges. Logging only what
that review really found, and what got fixed, keeps your catch log honest.
You'll count your catches at the end of the day.

</details>

🤖 **Claude:**

```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. Read ~/projects/hr-case-router/catches.md first and skip any
line already there. One line each, as "5 | <what caught it> | <what, and
what was done>", where what caught it is one of prd, consult, research,
design, guard, test, review, partner, grade, drill. Show me the lines,
and when I reply keep, append them to
~/projects/hr-case-router/catches.md.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts this module's catches from what happened in this session, one
line each, in the catch log's format. You read them and reply `keep`, or say
what to change. They go in your catch log, the record of what the process
caught.

</details>

Check there's a `review` line for each real finding on the plan's pull
request that got fixed. Then reply `keep`.

⌨️ **Terminal**, in your window:

```
tail -n 5 ~/projects/hr-case-router/catches.md
```

✅ It shows the lines you kept.

## You now have

- On a clean `main`: the design record, the LLD and `DECISIONS.md` in your
  repo's `docs/`, the lab's `src/platform-rules.test.ts`, `BACKLOG.md` and
  `SESSION-NOTE.md`.
- Your stories on GitHub, your first honest count, and this module's
  catches in `catches.md`.
