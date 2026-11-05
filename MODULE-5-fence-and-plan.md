# Module 5 — Check and plan

*⏱ 25 min · 12:30*

Your signed design comes into your repo, gets one last check, and becomes a
plan on GitHub. **The idea:** a check only counts if it could have failed,
so you answer five questions before the plan is filed. **The catch:** does
the plan's review find something real?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** the signed design becomes small stories, each tied to a
  milestone.
- **Why it matters:** a plan ordered by what blocks the next milestone
  shows real progress.
- **Your mindset:** you're the last check before the plan is filed.

</details>

### 1. Bring the design in, and check it's ready

1. Bring in the lab's platform-rules test (P1-P5, P12, P13), the second
   line, and start Claude in your app:

   <div data-show="surface:terminal">

   **In the terminal:** ⌨️ this window becomes the Claude window:

   ```
   cd ~/projects/hr-case-router/app
   cp ../../hr-case-router-lab-guide/files/platform-rules.test.ts src/
   claude
   ```

   </div>

   <div data-show="surface:desktop">

   **In the Code tab:** ⌨️ in your window:

   ```
   cd ~/projects/hr-case-router/app
   cp ../../hr-case-router-lab-guide/files/platform-rules.test.ts src/
   ```

   Then 🤖 start a new session
   (<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
   In the row under the prompt box, pick the top entry under **Local**, click
   the folder control, choose **Open folder…**, and pick
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

   <details><summary>🛟 It says BLOCKED: … look like a secret</summary>

   The files name your instance, and the guard stopped the commit.
   🤖 **Claude:**

   ```
   In docs/, replace my instance's host name, such as
   dev123456.service-now.com, with the text INSTANCE_HOST. Then make the
   commit again, and delete the three originals only after it succeeds.
   ```

   </details>

3. 🤖 **Claude:**

   ```
   Read docs/DESIGN-HRCaseRouter.md and check it's ready to build. Change
   nothing. Answer yes or no for each: every gate in §7 can pass as
   written; no term needs a ruling before code can be written; no term
   number clashes with an id in docs/LLD-HRCaseRouter.md.
   ```

4. ⌨️ **Terminal**, in your window:

   ```
   cd ~/projects/hr-case-router/app
   git diff --stat main HEAD
   grep -nE 'OPEN|VERIFY' docs/DESIGN-HRCaseRouter.md
   grep -n -i 'service-now' docs/*.md
   ```

✅ Claude answers three yeses. The last line of `git diff` starts
`4 files changed`, and both `grep` lines print nothing.

<details><summary>🛟 The second grep prints a line</summary>

🤖 **Claude:**

```
In docs/, replace my instance's host name, such as
dev123456.service-now.com, with the text INSTANCE_HOST. Commit only
those files on docs/plan.
```

Then run sub-step 4 again.

</details>

<details><summary>🛟 There's a no, or the first grep prints a line</summary>

🤖 **Claude:** type
`/prove-it:design-challenge amend docs/DESIGN-HRCaseRouter.md`. When it
asks what changed, paste this:

```
Make it ready to build: fix each no from your check, and anything that
says OPEN or VERIFY. For each problem, give me 3 or 4 numbered answers,
your recommended one first.
```

Reply with a number, usually `1`. At the read-back, type `Confirmed.`
alone. When it asks your name and role, type them, such as
`Sam Lee, developer`. Then type
`Commit only docs/DESIGN-HRCaseRouter.md on docs/plan.` and run
sub-steps 3 and 4 again.

</details>

### 2. Preview the plan, and answer five questions

🤖 **Claude:** type this, alone:

```
/prove-it:build-plan docs/DESIGN-HRCaseRouter.md
```

It shows a **preview** and files nothing. If it asks to write `plan.json`
one folder up, allow it. Then 🤖 paste this, for question 4:

```
Show each story's honest limit, one line each.
```

Read the preview and that list, and answer each yes or no:

1. Every pass criterion in §7 has a story whose "done when" checks it.
2. The first story is the thin path in DECISIONS' Build order. After it,
   priority comes only from closeness to the next gate.
3. Every "done when" can be checked: a run from its log row, work notes
   and execution plan, never from what the agent said.
4. Every story's honest limit says what passing it doesn't prove.
5. Every check `apply_route` runs itself is in a "done when", and the
   preview's coverage line names none of them.

Any no? Tell Claude in one line, such as `Story 4's done-when can't be
checked.`, and answer the new preview. A term marked "pending ruling — no
test yet" is a no too: open the 🛟 below. **Never approve a preview you
answered no to.**

<details><summary>🛟 It refuses the record, or shows "pending ruling"</summary>

🤖 **Claude:** type
`/prove-it:design-challenge amend docs/DESIGN-HRCaseRouter.md`. When it
asks what changed, paste this:

```
Rule on each OPEN item, and sign what's unsigned. For each ruling, give
me 3 or 4 numbered answers, your recommended one first.
```

Reply with a number, usually `1`. At the read-back, type `Confirmed.`
alone. When it asks your name and role, type them, such as
`Sam Lee, developer`. Then type
`Commit only docs/DESIGN-HRCaseRouter.md on docs/plan.` and run
`/prove-it:build-plan docs/DESIGN-HRCaseRouter.md` again.

</details>

### 3. File the plan, and take your first count

🤖 **Claude:** type `approve`. When it asks "Dry run first (recommended),
or apply now?", type `Dry run first.`, which files nothing; read the count
of writes; then type `apply`.

✅ 🌐 GitHub's **Issues** tab lists your stories, with milestones and labels.

⌨️ **Terminal**, in your window:

```
git diff .gitignore
gh issue list --state open --label "gate:merge" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length'
head -5 BACKLOG.md
```

✅ The diff adds just `+!/BACKLOG.md`. The number `gh` prints matches the
one after **Blockers:** in the last line. That's your first honest count,
and the lab's only progress number.

### 4. Close the session, and ship the plan

1. 🤖 **Claude:**

   ```
   We're stopping here. Update SESSION-NOTE.md: what's proven, what's
   open, the exact next step, and the top three next items. On docs/plan,
   commit .gitignore, BACKLOG.md and SESSION-NOTE.md as "docs: backlog and
   first session note".
   ```

2. 🤖 **Claude:** paste this, type `go` after it, and press **Enter**. A
   register issue is a watch-list issue that blocks no gate.

   ```
   ship it. Review the diff without checking it out. Fix real findings in
   the code once. Never edit docs/, GRADE.md, RUNBOOK.md, HANDOFF.md or
   BACKLOG.md to answer a finding, and don't stop to ask me: file it as a
   register issue instead. There's no CI: merge once now-sdk build passes,
   and npm test too once there's a test script. Then switch to main and
   pull, and give me the pull request link and one line per finding: fixed,
   filed, or not a problem and why.
   ```

   It pushes, opens a pull request, runs `/code-review`, and merges, in a
   few minutes.

3. ⌨️ **Terminal**, in your window:

   ```
   git status --short --branch
   ```

✅ Read every finding line: a real one marked **fixed** is this module's
catch. 🌐 The pull request link shows **Merged**, and no issue is closed:
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

Confirm a `review` line for each real finding on the plan's pull request
that got fixed, then reply `keep`.

⌨️ **Terminal**, in your window:

```
tail -n 5 ~/projects/hr-case-router/catches.md
```

✅ It shows the lines you kept.

## You now have

- The design record, the LLD and `DECISIONS.md` in your repo's
  `docs/`, the lab's `src/platform-rules.test.ts`, and `BACKLOG.md` and
  `SESSION-NOTE.md`, on a clean `main`.
- Your stories on GitHub, your first honest count, and this module's
  catches in `catches.md`.
