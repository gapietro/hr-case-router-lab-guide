# Module 6 — The build loop

*⏱ 30 min · 12:55, the batch runs over lunch, then 60 min · 14:15*
<!-- DRY RUN: time. Part 3's waits (warm-up, then about two minutes a run) are
estimates: does 60 min from 14:15 hold? -->

Build one story by hand, let Claude build more over lunch, then try the app
live. **The idea:** the checks on a run and a move are plain code on plain
data, with ServiceNow a thin layer outside, so their tests need no instance.
**The catch:** a plausible work note can come from the wrong case: does the
live check prove the agent read this one?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** every story is built the same way: tests first, seen
  failing, then code until they pass, then a review.
- **Why it matters:** a test you never saw fail proves nothing, and the
  builder is the worst judge of their own code, Claude included.
- **Your mindset:** Claude types; tests and reviews decide. Read the evidence,
  not Claude's summary of it.

</details>

<details><summary>ℹ️ Why tests first, then the least code</summary>

- **The test comes first,** so it says what the story must do before any
  code exists. Written after, a test tends to describe what the code
  happens to do, mistakes included.
- **You watch it fail,** because a test that has never failed may test
  nothing: a wrong check, or one that never runs.
- **Then the least code that passes it,** so every line is there because a
  test asked for it. Code no test asked for is untested, and that's where
  bugs hide.
- **With Claude it matters more.** It writes plausible code fast, and tests
  it writes alongside its code tend to agree with that code's mistakes.
  Tests first, seen failing, are your check on its work.
- **What they can't prove:** the tests run on your laptop, without
  ServiceNow. Step 11's live check proves the rest.

</details>

## Part 1 — Your first story, by hand

### 1. Open the session

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A fresh session in your app's folder starts Claude with your repo's own rules
and files, and nothing left over from earlier chats. Asking for the top three
items makes it rank the work from your backlog and the live issues, by how
close each is to the next gate, so you build what matters most first.

</details>

⌨️ **Terminal**, in your window: first check that the earlier modules left
what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 6
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, the check's script included. `-q` prints only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 6`:
   Checks that each earlier module left what its checks promise, such as
   your files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 6.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names, then run the check again. Can't fix one? Tell your
instructor before you go on: every later step builds on it. They can help you
fix it, or give you a checkpoint to start this module from.

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

🤖 **Claude:**

```
Read BACKLOG.md and SESSION-NOTE.md, and check them against the open
issues. Tell me the top three items by gate distance, one line each.
```

✅ Three lines. The top one is the thin path: a new case's run, end to end,
whose agent only leaves a note naming the service and group it would choose.

<details><summary>🛟 It says the files are only on docs/plan</summary>

Module 5's plan was never shipped. ⌨️ **Terminal**, in your window:

```
git switch docs/plan
```

🤖 **Claude:** paste the ship-it prompt from [step 5](#5-ship-it), and type
`go`. It closes no issue: the plan isn't a story. When it's merged, type
`/clear` and start this step again.

</details>

### 2. 🔮 Guess, then take the top story

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Guessing the tests before Claude writes them gives you something to compare:
what it thought of that you didn't, and the other way round. Then the prompt
starts the story the lab's way: tests first, on a branch of its own, each
named after the design term it proves. The kit's grade counts a term as tested
only when its number appears in a test's name or test file.

</details>

Guess three test cases for the top story, one of them unusual. Step 3
compares.

<details><summary>🔮 The answer, once you've guessed</summary>

They depend on your story, usually the thin path: a new case's run, end to
end, whose agent only leaves a note. Typical: with routing switched off, a
new case gets a `skipped` row and no note; a service ticked "Never send to
AI" is refused with a note; a run's target is its log row, never the case.

Unusual: a case whose text comes back empty is an error, not empty text; a
case with `transferred_from` set starts no run; a second `leave_note` on
the same run is refused. Unusual cases are where bugs hide: the builder
tests the path they pictured. Each test must fail before the code exists:
a test you never saw fail proves nothing.

</details>

🤖 **Claude:** paste this, whatever the top story is, type `go` after it,
and press **Enter**:

```
Take the top one. Restate it in five bullets, then build it tests first,
without waiting for me:
- on a new branch from main, never on main;
- add Vitest and the "test" script if they're missing;
- start each test's name with the design term it proves, like "C<n>: a
  run's target is its log row, never the case", using the term's real
  number from docs/DESIGN-HRCaseRouter.md; if the story proves no term,
  say so and name the tests after the story.
Run them, show me them failing, and stop before any implementation.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude takes the top story, restates it in five bullets, and writes its tests
on a new branch, adding Vitest if it's missing. It runs them, shows you them
failing, and stops before writing any code. A test you've seen fail is one
that can catch a mistake, and its name ties it to the design term it proves.

</details>

<details><summary>ℹ️ What C1, C2… mean</summary>

`C<n>` in the prompt stands for a design term's number, such as `C7`: Claude
puts the real one at the start of each test's name, from section 3 of your
design record. The grade counts a term as tested only when a test names it.
[All the labels](APPENDIX.md#c1-c2-design-terms).

</details>

<details><summary>🛟 It says the top story is a ruling, not code</summary>

`<n>` is the story's number, from step 1. 🤖 **Claude:** type `/clear`,
then `/prove-it:design-challenge amend docs/DESIGN-HRCaseRouter.md`. When
it asks what changed, paste this:

```
Story #<n> is a ruling. Rule its term. For each question, give me 3 or 4
numbered answers, your recommended one first.
```

Reply with a number, usually `1`. At the read-back, type `Confirmed.`
alone. When it asks your name and role, type them, such as
`Sam Lee, developer`. Then paste this, then the ship-it prompt from
[step 5](#5-ship-it), then `go`:

```
Commit only docs/DESIGN-HRCaseRouter.md, on a new branch docs/ruling,
for a pull request that closes #<n>.
```

When it's merged, type `/clear` and start again from step 1.

</details>

### 3. Check the failing tests

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

This is your check on Claude's work before any code exists, while a wrong test
is still cheap to fix. A branch other than `main` keeps the story away from
`main` until it's reviewed. Tests that fail now prove they test something: a
test that passes before the code exists can't catch anything.

</details>

⌨️ **Terminal**, in your window:

```
git branch --show-current
```

✅ It prints a new branch, never `main`.

<details><summary>🛟 It prints main</summary>

🤖 **Claude:** type this:

```
Never work on main. Create a new branch for this story first.
```

</details>

✅ The tests ran and **failed**. Read the five bullets against your design,
then compare the tests with your three guesses.

<details><summary>🛟 A bullet or a test is wrong</summary>

🤖 **Claude:** type `Not right: ` and what's wrong, then `Fix the tests to
match, and show me them failing again.`

</details>

### 4. Make them pass, and check the shape

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Now Claude writes the code, only as much as the tests need. The shape check is
this module's idea in practice: a check written as plain code on plain data
can be tested on your laptop, with no instance. `GlideRecord`, `gs.` and
`current.` are ServiceNow calls, so a check that uses them can only be tested
on an instance.

</details>

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

```
Make them pass with the least code that does it, then run npm test and
now-sdk build. Tell me in one line which file holds a plain-code check, or
"none in this story". Stop before ship it.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude writes the least code that makes the failing tests pass, then runs the
tests and the ServiceNow build. It names the file that holds a plain-code
check, if there is one, and stops before shipping. You see the passing run and
the build's result before anything is merged.

</details>

✅ In Claude's output, `npm test` passes and `now-sdk build` ends with no
errors.

<details><summary>🛟 A test fails or the build has errors</summary>

🤖 **Claude:** type `Fix it, then run npm test and now-sdk build again.`

</details>

✏️ **Editor:** if it names a file, open it. ✅ Any check function in it has
no `GlideRecord`, `gs.` or `current.`. If it says "none in this story", the
checks come in a later story: move on.

### 5. Ship it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Shipping takes your branch to `main` through a pull request and a review, so
nothing reaches `main` unreviewed. When the pull request merges, it closes the
story's issue, so the board shows only what's left.

</details>

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

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
then merges when the build and tests pass. You get the pull request link and
one line per finding.

</details>

It pushes, opens a pull request, runs `/code-review`, fixes, and merges:
a few minutes.

✅ Read every finding line. The ones marked **fixed** are this step's catch:
code Claude was sure of, and the review found wrong.

🌐 **Browser:** open the pull request link. ✅ It shows **Merged**. In its
description, click the issue number after **Closes**. ✅ The issue shows
**Closed**.

<details><summary>🛟 It stops and asks you something anyway</summary>

🤖 **Claude:** type this:

```
Take your recommendation, file it as a register issue if it's about the design, and finish ship it.
```

</details>

<details><summary>🛟 It isn't merged: a test or the build failed</summary>

🤖 **Claude:** type `Fix it once, then finish ship it.` If it fails again,
tell your instructor.

</details>

<details><summary>🛟 There's no Closes line, or the issue is still open</summary>

🤖 **Claude:** type this, with the story's number from step 1 for `<n>`:

```
Close issue #<n>, citing the pull request that built it.
```

</details>

🤖 **Claude:** type `/clear`.

## Part 2 — The batch, over lunch (start at 13:25)

### 6. Start the batch

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

With one story built by hand, you hand the rest of the thin path to Claude
while you eat. The prompt sets the rules you just followed, tests first, a
review, no merge while anything fails, so the batch builds the way you did.
The laptop must stay awake: if it sleeps, the batch stops.

</details>

Still on step 4 or 5 at 13:25? Finish ship it first, then type `/clear`.

Leave the laptop open and plugged in, and stop it sleeping:

<div data-show="os:mac">

**On Mac:** ⌨️ in your window:

```
caffeinate -i
```

</div>

<div data-show="os:win">

**On Windows:** open **Settings > System > Power & battery**, then
**Screen, sleep, & hibernate timeouts**. Note what **When plugged in, put
my device to sleep after** says, then set it to **Never**. Your company may
lock this setting: then tell your instructor.

</div>

🤖 **Claude:** paste this, type `go` after it, and press **Enter**. On a Pro
plan, type `Use one sub-agent at a time.` at the end, before `go`.
Sub-agents are helpers Claude starts; a git worktree is a separate working
copy, in its own folder.

```
Run the build loop with sub-agents through the open stories, until a new
HR case is moved to a group by apply_route after its checks, or left
with a work note naming the check, and Reroute queues a run, with the
seed data in src/, all merged; or until no story is left that you can
build. Build first the stories others depend on, across gates. I'm at
lunch: ask me nothing until the end, and never start a design change.
If the design record doesn't cover something, build what's closest to it
and file it as a register issue. docs/DECISIONS.md overrides the now-sdk
plugin's guide: don't ask its questions, and skip its install step and
the steps after it. Seed records, properties, roles, the workflow, the agent
and its tools in src/ are code, not instance work. Skip a story that needs
instance work (now-sdk install, background scripts, or writing live
records; now-sdk explain, now-sdk query --auth lab-pdi and now-sdk build
are fine), a design change or a business decision. Build a story that
depends on a skipped one if its code can still be written and tested;
otherwise skip it too. You only plan, delegate, merge and report. Per
story: one sub-agent, in its own git worktree and branch; a five-bullet
restatement in the pull request, not confirmed with me; tests first in
Vitest through npm test, named "C<n>: …", with an it.todo naming any
term that needs no code; the failing run saved; code until the whole
suite passes and now-sdk build is clean; no new npm packages besides
Vitest. The sub-agent pushes, opens the pull request with "Closes
#<story>", both runs and every /code-review finding, fixes findings
once, and stops: it never merges. File findings about the design record
as register issues; never stop a merge for them. Parallel only without
shared files. You merge one at a time, after updating from main and
re-testing. Never merge red or skip /code-review. Three failures on one
step stop that story, its pull request left open. If a command is
denied, don't retry it: note it in the table and go on. Never run
now-sdk install or now-sdk auth. Apart from register issues, don't
create, close or relabel issues by hand. Leave this checkout on main.
End with a table (story, pull request, failing/passing counts, findings
and actions, outcome and why, skipped ones too) and the next gate's live
count of open stories.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude takes the open stories in the order they depend on each other and gives
each to a sub-agent, on its own branch and worktree, side by side only where
stories share no files. Each sub-agent builds its story the way you built
yours: tests first with their failing run saved, code until every test passes
and the build is clean, then a pull request with both runs and its review
findings; it never merges: Claude does, one at a time, after re-testing.
Claude skips stories that need instance work, a design change or a business
decision, stops a story after three failures, and ends once the code that
moves a new case with `apply_route`, or leaves a note naming the check,
Reroute and the seed data are all merged, or once nothing it can build is
left. You'll see a failing test run early, then, at the end, a table of every
story with its pull request and outcome, and the next gate's count of open
stories.

</details>

Stay until a failing test run appears, or it stops with its table. Then
lock the screen
(<kbd data-mac="Ctrl+Cmd+Q" data-win="Win+L">Ctrl+Cmd+Q (Mac) · Win+L (Windows)</kbd>):
the batch keeps running.

### 7. Read the evidence, from 14:15

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Claude's summary can say anything; the pull requests show what really ran. Two
of them, each with a failing run, a passing run and its findings, tell you the
batch kept the rules while you were away. Then you update your own copy of
`main` and run the tests yourself, so what you install is what was merged.

</details>

🌐 **Browser:** in your repo's **Pull requests** tab, click **Closed**, and
open two merged ones: `apply_route`'s and Reroute's. ✅ Each has five
bullets, a failing run then a passing run, and its review findings, each
marked fixed, filed or not a problem. Between them, the bullets say that
only `apply_route` changes a case, that it runs every check itself, and
that Reroute only queues a run.

<details><summary>🛟 One has no failing run, or no findings</summary>

🤖 **Claude:** type this:

```
Run /code-review on each pull request from the batch that has no failing
run or no findings.
```

</details>

By 14:30 the batch ends with its table. ✅ It shows these merged:
`apply_route` with its checks and the group move, Reroute, and the seed
data. Skipped stories and register issues are expected: they get their
turn after the workshop.

<details><summary>🛟 No table yet</summary>

- **Claude is still working:** let it finish.
  <span data-show="surface:terminal">**In the terminal:** it shows
  `esc to interrupt`.</span> <span data-show="surface:desktop">**In the
  Code tab:** the stop button shows by the prompt box.</span>
- **It stopped, or closed:** if closed,
  <span data-show="surface:terminal">**In the terminal:** ⌨️ in the Claude
  window, run `cd ~/projects/hr-case-router/app && claude --continue`.</span>
  <span data-show="surface:desktop">**In the Code tab:** open the desktop
  app again, and click the session in the sidebar.</span> Then 🤖 type
  `Carry on with the batch.`
- **Still stuck:** 🤖 type `/clear`, paste this, then the
  [step 6](#6-start-the-batch) prompt (on a Pro plan, with its extra line),
  then `go`:

  ```
  Resume a batch that stopped. Merged pull requests are done. Finish the
  batch's open pull requests first, and don't retry a story that stopped
  after three failures. Then carry on with this:
  ```

  <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

  Claude treats merged pull requests as done, finishes the batch's open ones
  first, and leaves alone any story that already stopped after three failures.
  The batch prompt you paste after it then carries on with the stories that
  are left. You get the same table at the end as a batch that never stopped.

  </details>

</details>

<details><summary>🛟 At 14:30, one of those three isn't merged</summary>

Tell your instructor. They give you their finished build and its scope.
Install it **instead of** your own app at step 8, with the commands they
give you: never both, or two routers run on every case. In steps 9 to 11,
use that scope wherever the steps say `<SCOPE>`.

</details>

<div data-show="os:mac">

**On Mac:** in your window, press **Ctrl+C** to stop `caffeinate`.

</div>

<div data-show="os:win">

**On Windows:** in **Settings > System > Power & battery**, set **When
plugged in, put my device to sleep after** back to what it was.

</div>

⌨️ **Terminal**, in your window:

```
git switch main && git pull && npm install && npm test
```

✅ Vitest's `Tests` line shows `passed`, and no `failed`.

## Part 3 — Install and try it live (by 14:30)

### 8. Build and install

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Until now the app has existed only as code and tests on your laptop. Building
turns the merged source into an app, and installing puts it on your lab
instance, where it meets live HR cases for the first time. You install from a
clean, up-to-date `main`, so the instance gets exactly what was reviewed.

</details>

⌨️ **Terminal**, in your window:

```
git switch main && git pull && git status --short
now-sdk build && now-sdk install --auth lab-pdi
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git switch main && git pull && git status --short`: Switches to `main`,
   downloads what's been merged into it on GitHub, then lists every file
   that's changed but not committed. `&&` runs each command only if the one
   before it worked. Nothing listed means your folder holds exactly what's on
   `main`.
2. `now-sdk build && now-sdk install --auth lab-pdi`: Builds your app from its
   source, then installs it on your instance, with the SDK sign-in you saved
   as `lab-pdi`. `&&` installs only if the build worked.

</details>

✅ Status prints nothing, the build says `Build completed successfully`, and
the install ends with a link to your app.

<details><summary>🛟 It says 401, or times out</summary>

Your instance is asleep. Ask your instructor to wake it, then run the same
two lines again.

</details>

<details><summary>🛟 It says fetch failed, or certificate</summary>

That's your company network, not the instance. Tell your instructor.

</details>

<details><summary>🛟 Any other error</summary>

🤖 **Claude:** paste the error, then this, then `go`:

```
Tell me this error's cause in plain words. Change nothing.
```

Then tell your instructor what it says.

</details>

### 9. Switch it on

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The install leaves the router switched off, and can leave the dispatcher, the
job that starts each run, without its every-minute trigger: without either,
new cases sit unrouted, often with no message. Without the role, `hr.demo`
can't use Reroute.

</details>

An admin does these by hand, so nothing goes live or gets a role unseen.
`<SCOPE>` is the `scope` line in `app/now.config.json`, such as
`x_123456_hcr_ga`.

1. 🌐 **Browser**, as admin, the on switch:
   - Open `sys_properties.list`.
   - Filter **Name** by `<SCOPE>.enabled`, and open it.
   - Set **Value** to `true`, and click **Update**.

   ✅ The list shows `<SCOPE>.enabled` with **Value** `true`.

<details><summary>🛟 It's read-only, with a banner about another application</summary>

Click the banner's link to switch to your app, set **Value**, and click
**Update**. Then switch back to **Global** with the application picker (the
globe, top right).

</details>

2. 🌐 **Browser**, as admin, `hr.demo`'s role:
   - Click **All**, type `User Administration`, and click **Users**.
   - Open `hr.demo`.
   - In its **Roles** tab, click **Edit...**.
   - Move `<SCOPE>.user` from the left list to the right, and click
     **Save**.

   ✅ The **Roles** tab lists `<SCOPE>.user`. It takes effect the next time
   you impersonate `hr.demo`.

3. 🌐 **Browser**, as admin, the dispatcher's trigger: open
   `sys_trigger.list`, and filter **Name** by `HR case router dispatcher`.

   ✅ One row: the job runs every minute.

<details><summary>🛟 No row</summary>

An installed job sometimes gets no trigger until it's saved. Open
`sysauto_script.list`, open the job, and click **Update** once. Then
filter `sys_trigger.list` again.

</details>

After every install, do sub-steps 1 and 3 again: an install turns the
switch off, and can leave the job without a trigger. The role stays.

### 10. Warm it up

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The warm-up keeps those first failures out of the cases you'll judge. Closing
the router's leftover conversations matters too: while `hr.router` has one
open, the dispatcher starts no new run.

</details>

The first runs after an install can each fail once per HR table (DECISIONS,
P8). Two warm-up cases take those failures.

<details><summary>ℹ️ What P8, P14… mean</summary>

`P1` to `P15` are the platform rules in `docs/DECISIONS.md`. P8: the first
runs after an install may each fail once per HR table, so run again. P14: while
`hr.router` has a conversation open, no new run starts. Step 11 cites P6 (the
note must show the agent read that case) and P10 (only the log, the notes and
the execution plan prove a run).
[All the labels](APPENDIX.md#p1-to-p15-platform-rules).

</details>
<!-- DRY RUN: time. Two runs, one a minute: about three minutes. -->

🌐 **Browser**, as admin:

1. Open `<SCOPE>_routing_rule.list`.

   ✅ Two active rows: **HR service** `Direct Deposit Inquiry` routed to
   `Lab HR Team`, and `Payroll Discrepancy` routed to `Lab Locked Out`.
   Both services come with every instance's HR demo data; the groups are the
   lab's.
2. Open `kb_knowledge.list`. In the **Short description** search box, type
   `HR routing guidance` and press **Enter**. Open the top row: its
   **Number** shows **(empty)**.

   ✅ **Workflow** is **Published**. Scroll inside the article body: a
   section for `Direct Deposit Inquiry`, handled by `Lab HR Team`, and one
   for `Payroll Discrepancy`, handled by `Lab Locked Out`, each ending in
   the "Example request:" line the steps below paste. No article, or no rows
   in sub-step 1? See the 🛟 box below.

🌐 **Browser**, impersonate `hr.demo`: click your avatar (top right), then
**Impersonate user**. Type `hr.demo`, pick **HR Demo**, and click
**Impersonate user**. Close any welcome pop-up.

3. Create two warm-up cases. Paste this into the address bar and press
   **Enter**:
   `https://dev123456.service-now.com/nav_to.do?uri=sn_hr_core_case_payroll.do%3Fsys_id%3D-1`.
   On the blank **HR Payroll Case** form: **Opened for**
   `HR Demo`; **HR service** `Direct Deposit Inquiry` (click the
   magnifier); **Short description**
   `My direct deposit didn't arrive this pay period. Can you check which bank account it went to?`;
   then **Submit**, top right. The text must be there before Submit: the app
   starts a run as the case is saved. Then the same address again with HR
   service `Payroll Discrepancy` and short description
   `My last paycheck was short by eight hours of overtime. Please correct the amount.`.
   Step 11 does this with more detail.

   ✅ Within about three minutes, each case has a work note by `hr.router`,
   whatever it says. To see it: paste
   `https://dev123456.service-now.com/nav_to.do?uri=sn_hr_core_case_list.do%3Fsysparm_query%3Dshort_descriptionLIKEdirect%20deposit%5Eopened_by.user_name%3Dhr.demo%5EORDERBYDESCsys_created_on`
   into the address bar (empty as `hr.demo`? end impersonation and paste it
   as admin), click the top row's number, and look at the newest entry in the
   activity stream below the form; for the other case, use `paycheck`
   in place of `direct%20deposit` in that address. No note? See step 11's
   🛟 box "No note by hr.router".

<details><summary>🛟 No note after three minutes</summary>

End impersonation. As admin, in this order, then as `hr.demo` click
**Reroute** on the case and wait two minutes: 1. in `sys_properties.list`,
set `<SCOPE>.enabled` to `true`; 2. no dispatcher row in `sys_trigger.list`?
open the job in `sysauto_script.list` and click **Update**; 3. ⌨️ run
<span data-show="os:mac">**On Mac:**
`pbcopy < ~/projects/hr-case-router-lab-guide/files/close-router-conversations.js`</span>
<span data-show="os:win">**On Windows:**
`clip < ~/projects/hr-case-router-lab-guide/files/close-router-conversations.js`</span>,
then in `sys.scripts.do` pick **global**, paste, and click **Run script**.
Reroute says a run is already in progress? Wait for the note saying the
router didn't finish, five minutes from creation, then click it again.

</details>

4. End impersonation. When both notes are there, close any conversation
   the warm-up left open (DECISIONS, P14). Copy the script:

   <div data-show="os:mac">

   **On Mac:** ⌨️ **Terminal**, your window:

   ```
   pbcopy < ~/projects/hr-case-router-lab-guide/files/close-router-conversations.js
   ```

   </div>

   <div data-show="os:win">

   **On Windows:** ⌨️ **Terminal**, your window:

   ```
   clip < ~/projects/hr-case-router-lab-guide/files/close-router-conversations.js
   ```

   </div>

   🌐 **Browser**, as admin: type `sys.scripts.do` in the filter navigator
   and press **Enter**. Set the scope picker above the script to
   **global**, paste, and click **Run script**.

   ✅ It prints `Closed <n> open conversation(s) of hr.router` and `Closed <n>
   in-progress interaction(s) of hr.router`, with any count, 0 included.

<details><summary>🛟 No routing rules, or no "HR routing guidance" article</summary>

The seed data isn't on your instance. It's a story like any other: the two
routing rules, the knowledge base and the article, as code in `src/`. Either
it isn't merged yet, or it's merged but not installed. ⌨️ **Terminal**, in
your window: `git switch main && git pull && git log --oneline -15`. A line
about seed data, routing rules or the article? Do step 8 again: build and
install. No such line? 🤖 **Claude:** paste this, then `go`:

```
Which story holds the seed data: the routing rules for the demo HR services Direct Deposit Inquiry (to Lab HR Team) and Payroll Discrepancy (to Lab Locked Out), found by name, the "Lab HR routing" knowledge base and the published article? If it isn't merged, take it next, the same way as the last story.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude finds the story that seeds the routing rules, the knowledge base and
the article, and if it isn't merged yet, takes it next through the usual
loop.

</details>

When it's merged, do step 8 again, then come back to sub-steps 1 and 2 here.
An article that's there but whose knowledge base isn't (its **Knowledge
base** field is empty) gets the same fix: the seed must create the knowledge
base in `src/` (DECISIONS, seed data).

</details>

### 11. Watch it route, as `hr.demo`

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Working as `hr.demo`, a fulfiller rather than an admin, shows the app works
with the access real HR staff have. What you check here is what your design's
DEMO gate asks for: a routed case, a stopped one, and a Reroute that starts a
run.

</details>

The agent reads the case and the article; `apply_route` checks its choice
before anything moves. One case the checks pass, one they stop. Nothing is
instant: the dispatcher starts a run a minute, and a run takes about one.

You create two HR cases by hand, as an HR agent would, and watch what the
app does to each. Case A is on the `Direct Deposit Inquiry` service, which
`Lab HR Team` handles: the agent should move it there. Case B is on the
`Payroll Discrepancy` service, which `Lab Locked Out` handles: the agent
should pick that group, and the checks should stop the move, because
`Lab Locked Out` can't open this kind of case.

🌐 **Browser**, impersonate `hr.demo` again (your avatar, then
**Impersonate user**, and pick **HR Demo**).

1. **Create case A.** Paste this into the address bar and press **Enter**:
   `https://dev123456.service-now.com/nav_to.do?uri=sn_hr_core_case_payroll.do%3Fsys_id%3D-1`.
   It's a blank **HR Payroll Case** form, the kind both lab
   services belong to. Fill in these three fields; leave every other field as
   the form has it:
   - **Opened for:** `HR Demo`, if it isn't already.
   - **HR service:** click the magnifier and pick `Direct Deposit Inquiry`.
     Not in the list? See the 🛟 box below.
   - **Short description:** paste
     `My direct deposit didn't arrive this pay period. Can you check which bank account it went to?`,
     the article's "Example request:" line for this service, exactly as
     written.

   Click **Submit**, at the top right. The app starts a run the moment a case
   is saved, so the text has to be there before this one click: don't create
   the case first and add the text after. The platform fills **Assignment
   group** (such as **HR Tier 1**) and **Assigned to** itself as it saves:
   fine. Changing that group is the agent's job, and what you check next.
2. **Create case B** the same way: the same address, **Opened for**
   `HR Demo`, **HR service** `Payroll Discrepancy`, **Short
   description**
   `My last paycheck was short by eight hours of overtime. Please correct the amount.`,
   then **Submit**.
3. Wait about two minutes, then open case A. Paste this into the address bar:
   `https://dev123456.service-now.com/nav_to.do?uri=sn_hr_core_case_list.do%3Fsysparm_query%3Dshort_descriptionLIKEdirect%20deposit%5Eopened_by.user_name%3Dhr.demo%5EORDERBYDESCsys_created_on`.
   It lists the HR cases `hr.demo` opened whose short description has "direct
   deposit" in it, newest first: yours, not the build's old test cases. Click
   the top row's number. The list is empty? `hr.demo` can't see a case once
   the platform hands it to a group it isn't in: end impersonation and paste
   the address again as admin.

   On the case, look at two things: the **Assignment group** field, and the
   newest entry in the activity stream below the form (the **Notes** tab, or
   scroll down), which is a work note by `hr.router`.

   ✅ **Assignment group** is `Lab HR Team`, no longer what the form set
   (such as `HR Tier 1`). The newest work note, by `hr.router`, gives a
   reason quoting this case's own "Example request:" line, a confidence, and
   the service and group before: proof the agent read this case.
4. Open case B the same way, a minute or two later, with
   `https://dev123456.service-now.com/nav_to.do?uri=sn_hr_core_case_list.do%3Fsysparm_query%3Dshort_descriptionLIKEpaycheck%5Eopened_by.user_name%3Dhr.demo%5EORDERBYDESCsys_created_on`.

   ✅ **Assignment group** is still what the form set (such as `HR Tier 1`),
   not `Lab Locked Out`. The newest work note, by `hr.router`, names the
   access check: `Lab Locked Out` can't open this HR table, and the code
   stopped the move.

<details><summary>🛟 No note by hr.router: read the run's state</summary>

Every case the app sees gets a row in its run log, and the row's **State**
says how far the run got. End impersonation. As admin, open
`<SCOPE>_run_log.list`, newest first, and find the case's row:

| State | What it means | What to do |
|---|---|---|
| No row at all | The app never saw the case: the insert rule didn't run | Check that the address in sub-step 1 named `sn_hr_core_case_payroll.do`. Then, in `sys_script.list`, the app's insert rule is **Active**; if not, do step 8 again. Create the case again. |
| `skipped` | The router was off, or a run was already going on the case | Set `<SCOPE>.enabled` to `true`, or wait for the other run; then **Reroute** |
| `refused` | Stopped before any AI ran: the service has no active routing rule, the rule's **Never send to AI** box is ticked, a cap was reached, or the article isn't published exactly once | The case's work note says which. Fix that one, as admin, then **Reroute** |
| `queued`, for minutes | The dispatcher isn't starting runs | Step 10's 🛟 box "No note after three minutes" |
| `start_failed` | The dispatcher couldn't start the AI agent workflow | Read the system log, below |
| `running` or `applying` | A run is still going | Wait two minutes, and reload |
| `routed`, `stopped` or `left`, and still no note | The note write was refused: the first write to an HR table can be (DECISIONS, P8) | **Reroute** |

No work note to say why? The app's first write to an HR table can be refused,
so the note may be missing too. Open `<SCOPE>_run_detail.list`, newest first:
the run's detail row keeps what it can. Then read the system log: type
`syslog.list` in the filter navigator and press **Enter**. In the
**Message** search box, type `*<SCOPE>` and press **Enter**; sort by
**Created**, newest first. The rows at the run's time say what failed.

`Illegal access to package_private script include function AIASharedDao`
in a `start_failed` line means the dispatcher starts the workflow from a
Fluent module. The start must be in classic script (DECISIONS, How it starts
the workflow). That's a defect: 🤖 **Claude:** paste this, then `go`:

```
File a GitHub issue in plain words: every run is start_failed with "Illegal access to package_private script include function AIASharedDao: caller not in scope sn_aia". DECISIONS says the dispatcher job's own classic script makes the start call, after the module claims the run; never a Fluent module or anything it calls. Show me first; file after I say yes. No code.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts an issue for the start failure, quoting the error and the
DECISIONS rule it breaks, and shows it to you before filing. It writes no
code. You then take that issue through the loop like any other story, build,
install, and come back to sub-step 1.

</details>

</details>

<details><summary>🛟 The HR service isn't in the list</summary>

The form's **HR service** list holds only the services of that form's kind of
case. Both lab services are Payroll ones, so check the address: it must name
`sn_hr_core_case_payroll.do`, not `sn_hr_core_case.do`.
Close the form without submitting and paste the address again.

Right form, and the service is listed as admin but not as `hr.demo`? The
service is turned off, or its **HR criteria** leave `HR Demo` out. End
impersonation, open `sn_hr_core_service.list`, and open the service:
✅ **Active** is ticked, and **HR criteria** is empty or covers `HR Demo`.
Otherwise tell your instructor, with the service's name.

Avoid **HR Case Management › Create New Case** for these cases: its
**Create case** button saves the case before you can type a short
description, so the agent's first run reads an empty case and you'd have to
click **Reroute** after adding the text.

Neither routing rule has a service, or `<SCOPE>_routing_rule.list` is empty?
The seed found no groups named `Lab HR Team` and `Lab Locked Out` on your
instance: Module 0's check (DECISIONS, seed data). Tell your instructor.

</details>

<details><summary>🛟 The note says the case text was empty</summary>

A first read of an HR table can come back empty (DECISIONS, P8). On the
case, click **Reroute**. ✅ It says **Routing queued**. Wait about two
minutes, and reload.
<!-- DRY RUN: the note's exact words for read_case's empty-text error. -->

</details>

<details><summary>🛟 It moved the Lab Locked Out case, or the reason doesn't fit the case</summary>

That's a real defect. A move on the `Lab Locked Out` case, or a reason
that quotes words that aren't in this case's article line, means the
checks or the agent never saw this case (DECISIONS, P6). 🤖 **Claude:**
paste this, then `go`:

```
File a GitHub issue in plain words: <what you saw, such as "it moved
the Lab Locked Out case">, labelled for the gate it holds up. Show me
first; file after I say yes. No code.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts a GitHub issue that describes the defect in plain words,
labelled for the gate it holds up, and shows it to you before filing. It
writes no code. Filing it first puts the defect on the board, so its fix goes
through the same tests and review as any story.

</details>

Reply `yes`. Then 🤖 **Claude:** paste this, with the issue's number for `<n>`, then `go`:

```
Take issue #<n>. Restate it in five bullets, then build it tests first,
without waiting for me: on a new branch from main; tests in Vitest
through npm test, named after the design term they prove; show them
failing, then make them pass, and run now-sdk build. Then ship it: fix
real findings once, file design findings as register issues, merge when
npm test and now-sdk build pass, and give me one line per finding.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude restates the issue in five bullets, then builds it the way you built
your first story: tests first on a new branch, seen failing, then code until
they pass and the build is clean. Then it ships it: a review, real findings
fixed, design findings filed as register issues, and a merge once the tests
and the build pass. You get one line per finding, and the change is on `main`,
ready to install.

</details>

When it's merged, ⌨️ **Terminal**, in your window:

```
git switch main && git pull && git status --short
now-sdk build && now-sdk install --auth lab-pdi
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git switch main && git pull && git status --short`: Switches to `main`,
   downloads what's been merged into it on GitHub, then lists every file
   that's changed but not committed. `&&` runs each command only if the one
   before it worked. Nothing listed means your folder holds exactly what's on
   `main`.
2. `now-sdk build && now-sdk install --auth lab-pdi`: Builds your app from its
   source, then installs it on your instance, with the SDK sign-in you saved
   as `lab-pdi`. `&&` installs only if the build worked.

</details>

🌐 **Browser**, as admin, do step 9's sub-steps 1 and 3, and step 10,
again. Then create the two cases again, as `hr.demo`.

</details>

5. On the first case, click **Reroute**.

   ✅ It says **Routing queued**. Wait about two minutes, and reload: a new
   work note by `hr.router`.

🌐 **Browser**, end impersonation: your avatar, then **End
impersonation**. As admin:

6. Open `<SCOPE>_run_log.list`, newest first.

   ✅ The three newest rows: the first case's two, both **State** `routed`,
   the newer one from Reroute, and the second case's `stopped`.
7. Open the first case's older `routed` row's **Execution plan** field.
   Only look: never start a test run in AI Agent Studio.

   ✅ **State** `completed`, created by `hr.router`. The plan, the log row
   and the note prove a run, never the agent's word (DECISIONS, P10).

### 12. Log it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A catch only counts if it's written down: Module 9 counts this file, not your
memory. Logging now, while the session still holds the details, gets each
catch down with what caught it.

</details>

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. Read ~/projects/hr-case-router/catches.md first and skip any
line already there. One line each, as "6 | <what caught it> | <what, and
what was done>", where what caught it is one of prd, consult, research,
design, guard, test, review, partner, grade, drill. Show me the lines,
and when I reply keep, append them to
~/projects/hr-case-router/catches.md.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts this module's catches as one line each, in the catch log's
format, from what happened in this session. You read them and reply `keep`, or
say what to change. They go in your catch log, the record of what the process
caught.

</details>

Look for a `review` line per fixed review finding, step 5's too, and a
`test` line per defect step 11 found. Reply `keep`, or say what to change.

⌨️ **Terminal**, in your window:

```
tail -n 5 ~/projects/hr-case-router/catches.md
```

✅ It shows the lines you kept.

## You now have

- The thin path, `apply_route` with its checks and the group move, Reroute
  and the seed data, merged, installed and switched on.
- The agent routing a new case live, as `hr.demo`, proved from its note,
  its log row and its execution plan.
- This module's catches in `catches.md`.
