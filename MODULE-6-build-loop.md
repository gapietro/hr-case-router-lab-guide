# Module 6 — The build loop

*⏱ 30 min, the batch runs over lunch, then 60 min*
<!-- DRY RUN: time. Part 3's waits (three minutes for the two cases, then about two minutes a run) are
estimates: does 60 min from 14:15 hold? -->

You build one story by hand. Claude builds more over lunch. Then you try the
app live. **The idea:** the checks on a run and on a move are plain code
working on plain data. ServiceNow is a thin layer around them, so their tests
need no instance. **The catch:** a work note can look right and still come
from the wrong case. Does the live check prove the agent read this one?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** every story is built the same way. The tests come first,
  and you watch them fail. Then code is written until they pass. Then the
  work is reviewed.
- **Why it matters:** a test you never saw fail proves nothing. The builder
  is also the worst judge of their own code, and that includes Claude.
- **Your mindset:** Claude types. Tests and reviews decide. Read the
  evidence, not Claude's summary of it.

</details>

<details><summary>ℹ️ Why tests first, then the least code</summary>

- **The test comes first,** so it says what the story must do before any
  code exists. A test written after the code tends to describe what the code
  happens to do, mistakes included.
- **You watch it fail,** because a test that has never failed may test
  nothing. Its check may be wrong, or it may never run.
- **Then the least code that passes it,** so every line is there because a
  test asked for it. Code that no test asked for is untested. That's where
  bugs hide.
- **With Claude it matters more.** Claude writes code that looks right, and
  writes it fast. Tests it writes alongside that code tend to share the
  code's mistakes. Tests written first, and seen failing, are your check on
  its work.
- **What they can't prove:** the tests run on your laptop, without
  ServiceNow. Step 11's live check proves the rest.

</details>

## Part 1 — Your first story, by hand

### 1. Open the session

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A fresh session in your app's folder starts Claude with your repo's own rules
and files. Nothing is left over from earlier chats. Asking for the top three
items makes Claude rank the work in your backlog and in the open issues. It
ranks them by gate distance, how close each one is to the next gate. So you
build what matters most first.

</details>

⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps. First
check that the earlier modules left what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 6
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, including the check's script. `-q` means it prints
   only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 6`:
   Checks that each earlier module left what it promised, such as your
   files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 6.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names. Then run the check again.

If you can't fix one, tell your instructor before you go on. Every later
step builds on it.

- They can help you fix it.
- Or they can give you a checkpoint, the finished work so far, to start
  this module from.

</details>


<div data-show="surface:terminal">

**In the terminal:** ⌨️ in the Claude window. If Claude is open, type
`/exit` first. Then run:

```
cd ~/projects/hr-case-router/app && claude
```

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session:

- Press
  <kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>.
- In the row under the prompt box, pick the top entry under **Local**.
- Click the folder control, choose **Open folder…** and pick
  `~/projects/hr-case-router/app`.
- Press **Ctrl+O** until the view is **Verbose**.

</div>

🤖 **Claude:**

```
Read BACKLOG.md and SESSION-NOTE.md, and check them against the open
issues. Tell me the top three items by gate distance, one line each.
```

✅ Three lines. The top one is the thin path. That's a new case's whole run,
from start to end, built thin: its agent only leaves a note naming the
service and group it would choose.

<details><summary>🛟 It says the files are only on docs/plan</summary>

Module 5's plan was never shipped. ⌨️ **Terminal**, in your window:

```
git switch docs/plan
```

🤖 **Claude:** paste the ship-it prompt from [step 5](#5-ship-it), and type
`go`. It closes no issue, because the plan isn't a story. When it's merged,
type `/clear` and start this step again.

</details>

### 2. 🔮 Guess, then take the top story

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Guessing the tests before Claude writes them gives you something to compare.
You see what Claude thought of that you didn't, and the other way round.
Then the prompt starts the story the lab's way. The tests come first, on a
branch of their own. Each test is named after the design term it proves.
When the kit grades your app later, it counts a term as tested only when the
term's number appears in a test's name or test file.

</details>

Guess three test cases for the top story. Make one of them unusual. You'll
compare them with Claude's tests in step 3.

<details><summary>🔮 The answer, once you've guessed</summary>

They depend on your story. It's usually the thin path, where the agent only
leaves a note.

Typical ones:

- With routing switched off, a new case gets a `skipped` row and no note.
- A service ticked "Never send to AI" is refused with a note.
- A run's target, the record the platform starts the run on, is its log
  row, never the case. The run log is the app's table with one row per run.

Unusual ones:

- A case whose text comes back empty is an error, not empty text.
- A case with `transferred_from` set starts no run.
- If the agent calls `leave_note`, its tool for writing the note, twice in
  one run, the second call is refused.

Bugs hide in unusual cases, because builders test the path they pictured.

Each test must fail before the code exists. A test you never saw fail
proves nothing.

</details>

🤖 **Claude:** whatever the top story is, paste this, type `go` after it,
and press **Enter**:

```
Take the top one. Restate it in five bullets, then build it tests first,
without waiting for me:
- on a new branch from main, never on main;
- add Vitest and the "test" script if they're missing;
- start each test's name with the design term it proves, like "C<n>: a
  run's target is its log row, never the case", using the term's real
  number from docs/DESIGN-HRCaseRouter.md, one number per term, never a
  range like "C30 to C38"; if the story proves no term, say so and name
  the tests after the story.
Run them, show me them failing, and stop before any implementation.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude takes the top story and restates it in five bullets. It writes the
story's tests on a new branch, and adds Vitest, the tool that runs them, if
it's missing. It runs the tests, shows you them failing, and stops before
writing any code. A test you've seen fail can catch a mistake, and its name
ties it to the design term it proves.

</details>

<details><summary>ℹ️ What C1, C2… mean</summary>

`C<n>` in the prompt stands for a design term's number, such as `C7`. Claude
puts the real number at the start of each test's name. It takes the number
from section 3 of your design record, `docs/DESIGN-HRCaseRouter.md`. The
grade counts a term as tested only when a test names it.
[All the labels](APPENDIX.md#c1-c2-design-terms).

</details>

<details><summary>🛟 It says the top story is a ruling, not code</summary>

A ruling story asks for a decision, not for code. `<n>` is the story's
number, from step 1.

🤖 **Claude:**

- Type `/clear`.
- Type `/prove-it:design-challenge amend docs/DESIGN-HRCaseRouter.md`.

🤖 **Claude:** when it asks what changed, paste this:

```
Story #<n> is a ruling. Rule its term. For each question, give me 3 or 4
numbered answers, your recommended one first.
```

- Reply with a number, usually `1`.
- At the read-back, where Claude reads the change back to you, type
  `Confirmed.` alone.
- When it asks your name and role, type them, such as `Sam Lee, developer`.

🤖 **Claude:** then paste this, then the ship-it prompt from
[step 5](#5-ship-it), then `go`:

```
Commit only docs/DESIGN-HRCaseRouter.md, on a new branch docs/ruling,
for a pull request that closes #<n>.
```

When it's merged, type `/clear` and start again from step 1.

</details>

### 3. Check the failing tests

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

This is your check on Claude's work before any code exists. A wrong test is
still cheap to fix now. Working on a branch other than `main` keeps the
story off `main` until it's reviewed. Tests that fail now prove they test
something. A test that passes before the code exists can't catch anything.

</details>

⌨️ **Terminal**, in your window:

```
git branch --show-current
```

✅ It prints the name of a new branch, never `main`.

<details><summary>🛟 It prints main</summary>

🤖 **Claude:** type this:

```
Never work on main. Create a new branch for this story first.
```

</details>

✅ The tests ran and **failed**.

This is test-driven development: the tests come first and fail, then the
code makes them pass.

Read the five bullets and check them against your design. Then compare the
tests with your three guesses.

<details><summary>🛟 A bullet or a test is wrong</summary>

🤖 **Claude:** type `Not right: ` and what's wrong, then `Fix the tests to
match, and show me them failing again.`

</details>

### 4. Make them pass, and check the shape

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Now Claude writes the code, only as much as the tests need. The shape check
puts this module's idea into practice. A check written as plain code on
plain data can be tested on your laptop, with no instance. `GlideRecord`,
`gs.` and `current.` are ServiceNow calls. A check that uses them can only
be tested on an instance.

</details>

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

```
Make them pass with the least code that does it, then run npm test and
now-sdk build. Tell me in one line which file holds a plain-code check, or
"none in this story". Stop before ship it.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude writes the least code that makes the failing tests pass. Then it runs
the tests and the ServiceNow build. It names the file that holds a
plain-code check, if there is one, and stops before shipping. You see the
passing run and the build's result before anything is merged.

</details>

✅ In Claude's output, `npm test` passes and `now-sdk build` ends with no
errors.

<details><summary>🛟 A test fails or the build has errors</summary>

🤖 **Claude:** type `Fix it, then run npm test and now-sdk build again.`

</details>

Read Claude's one line about the plain-code check:

- **It names a file:** ✏️ **Editor:** open the file.

  ✅ No check function in it uses `GlideRecord`, `gs.` or `current.`.
- **It says "none in this story":** the checks come in a later story. Move
  on.

### 5. Ship it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Shipping takes your branch to `main` through a pull request and a review. So
nothing reaches `main` without a review. When the pull request merges, it
closes the story's issue. Then the board shows only what's left.

</details>

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

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

Claude pushes your branch and opens a pull request. It reviews its own diff
without checking it out, and posts the review on the pull request. It fixes
real findings once, files the rest, and merges when the build and tests
pass. You get the pull request link and one line per finding.

</details>

It pushes, opens a pull request, runs `/code-review`, fixes what it finds,
and merges. That takes a few minutes.

✅ Read every finding line. The ones marked **fixed** are this step's catch.
Claude was sure of that code, and the review found it wrong.

🌐 **Browser:** open the pull request link.

✅ It shows **Merged**.

In its description, click the issue number after **Closes**.

✅ The issue shows **Closed**.

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

🤖 **Claude:** type this. Put the story's number from step 1 in place of
`<n>`:

```
Close issue #<n>, citing the pull request that built it.
```

</details>

🤖 **Claude:** type `/clear`.

## Part 2 — The batch, over lunch

### 6. Start the batch

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

You've built one story by hand. Now you hand the rest of the thin path to
Claude while you eat. The prompt sets the rules you just followed: tests
first, a review, and no merge while anything fails. So the batch builds the
way you did. The laptop must stay awake. If it sleeps, the batch stops.

</details>

If you're still on step 4 or 5 when lunch starts, finish ship it first. Then type
`/clear`.

Leave the laptop open and plugged in. Then stop it from sleeping:

<div data-show="os:mac">

**On Mac:** ⌨️ in your window:

```
caffeinate -i
```

</div>

<div data-show="os:win">

**On Windows:**

- Open **Settings > System > Power & battery**, then **Screen, sleep, &
  hibernate timeouts**.
- Note what **When plugged in, put my device to sleep after** says.
- Set it to **Never**.

If your company locks this setting, tell your instructor.

</div>

Writing a prompt like the next one is called loop engineering. It gives
Claude a goal, a stop condition, the rules it must never break, and what to
report at the end.

The prompt uses two words you may not know:

- A sub-agent is a helper Claude starts for part of the work.
- A git worktree is a separate working copy of your repo, in its own
  folder.

🤖 **Claude:** paste this, type `go` after it, and press **Enter**. On a
Pro plan, type `Use one sub-agent at a time.` at the end, before `go`.

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
Vitest through npm test, named "C<n>: …", one number per term, never a
range, with an it.todo naming any
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

Claude gives each open story to a sub-agent, in the order the stories depend
on each other. Each sub-agent builds its story the way you built yours and
opens a pull request, and Claude then tests again and merges them one at a
time. Claude skips stories that need instance work, a design change or a
business decision, and stops a story after three failures. You'll see a
failing test run early, then at the end a table of every story with its
pull request and outcome, and the next gate's count of open stories.

</details>

Stay until a failing test run appears, or until it stops with its table.
Then lock the screen
(<kbd data-mac="Ctrl+Cmd+Q" data-win="Win+L">Ctrl+Cmd+Q (Mac) · Win+L (Windows)</kbd>).
The batch keeps running.

### 7. Read the evidence, after lunch

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Claude's summary can say anything. The pull requests show what really ran.
Look at two of them. If each has a failing run, a passing run and its
findings, the batch kept the rules while you were away. Then you update
your own copy of `main` and run the tests yourself. So what you install is
what was merged.

</details>

🌐 **Browser:** in your repo's **Pull requests** tab, click **Closed**. Open
two merged ones:

- `apply_route`'s. `apply_route` is the agent's tool that moves a case.
- Reroute's. Reroute is the button that routes a case again.

✅ Each has:

- five bullets;
- a failing run, then a passing run;
- its review findings. Each finding is marked fixed, filed or not a
  problem.

Between them, the bullets say three things:

- Only `apply_route` changes a case.
- It runs every check itself.
- Reroute only queues a run.

<details><summary>🛟 One has no failing run, or no findings</summary>

🤖 **Claude:** type this:

```
Run /code-review on each pull request from the batch that has no failing
run or no findings.
```

</details>

About 15 minutes after lunch, the batch ends with its table.

✅ It shows these three merged:

- `apply_route` with its checks and the group move;
- Reroute;
- the seed data. The seed data is the records the app brings with it: two
  routing rules, and a knowledge article the agent reads.

Skipped stories and register issues are expected. A register issue is a
watch-list issue that blocks no gate. Both get their turn after the
workshop.

<details><summary>🛟 No table yet</summary>

- **Claude is still working:** let it finish.
  <span data-show="surface:terminal">**In the terminal:** it shows
  `esc to interrupt`.</span> <span data-show="surface:desktop">**In the
  Code tab:** the stop button shows by the prompt box.</span>
- **It stopped, or closed:** if it closed, reopen it.
  <span data-show="surface:terminal">**In the terminal:** ⌨️ in the Claude
  window, run `cd ~/projects/hr-case-router/app && claude --continue`. It
  reopens the conversation where it stopped.</span>
  <span data-show="surface:desktop">**In the Code tab:** open the desktop
  app again and click the session in the sidebar. The session still holds
  the conversation.</span> Then 🤖 type `Carry on with the batch.`
- **Still stuck:** 🤖 type `/clear`. Then paste this, then the
  [step 6](#6-start-the-batch) prompt, then `go`. On a Pro plan, add that
  prompt's extra line before `go`:

  ```
  Resume a batch that stopped. Merged pull requests are done. Finish the
  batch's open pull requests first, and don't retry a story that stopped
  after three failures. Then carry on with this:
  ```

  <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

  Claude treats merged pull requests as done and finishes the batch's open
  ones first. It leaves alone any story that already stopped after three
  failures. The batch prompt you paste after it then carries on with the
  stories that are left. You get the same table at the end as a batch that
  never stopped.

  </details>

</details>

<details><summary>🛟 The batch has ended, and one of those three isn't merged</summary>

Tell your instructor. They give you their finished build and its scope, the
app's own name prefix on the instance.

- At step 8, install it **instead of** your own app, with the commands they
  give you. Never install both, or two routers run on every case.
- In steps 9 to 11, use that scope wherever the steps say `<SCOPE>`.

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

## Part 3 — Install and try it live

### 8. Build and install

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Until now the app has existed only as code and tests on your laptop.
Building turns the merged source into an app. Installing puts it on your lab
instance, where it meets live HR cases for the first time. You install from
a clean, up-to-date `main`, so the instance gets exactly what was reviewed.

</details>

⌨️ **Terminal**, in your window:

```
git switch main && git pull && git status --short
now-sdk build && now-sdk install --auth lab-pdi
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git switch main && git pull && git status --short`: Switches to `main`
   and downloads what's been merged into it on GitHub. Then it lists every
   file that's changed but not committed. Nothing listed means your folder
   holds exactly what's on `main`. `&&` runs each command only if the one
   before it worked.
2. `now-sdk build && now-sdk install --auth lab-pdi`: Builds your app from
   its source. Then it installs the app on your instance, with the SDK
   sign-in you saved as `lab-pdi`. `&&` installs only if the build worked.

</details>

✅ `git status` prints nothing. The build says
`Build completed successfully`. The install ends with a link to your app.

<details><summary>🛟 It says 401, or times out</summary>

Your instance is asleep. To wake it:

1. Open it in your browser.
2. If its page offers a wake-up link, click it and wait. Waking can take up
   to 20 minutes.
3. If there's no link, or it's still asleep, ask your instructor.
4. Run the same two lines again.

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

The install leaves the router switched off. It can also leave the
dispatcher, the job that starts each run, without the trigger that runs it
every minute. If either is missing, new cases sit unrouted, often with no
message. Without the role, `hr.demo` can't use Reroute. And a new lab
instance can come with its AI not yet switched on: until the Now Assist
Panel is activated, no AI agent on the instance gets an answer.

</details>

An admin does these by hand, so nothing goes live or gets a role without
someone seeing it. `<SCOPE>` is your app's scope, its own name prefix on the
instance. It's the `scope` line in `app/now.config.json`, such as
`x_123456_hcr_ga`.

1. 🌐 **Browser**, as admin, the on switch:
   - Open `sys_properties.list`.
   - Filter **Name** by `<SCOPE>.enabled`, and open it.
   - Set **Value** to `true`, and click **Update**.

   ✅ The list shows `<SCOPE>.enabled` with **Value** `true`.

<details><summary>🛟 It's read-only, with a banner about another application</summary>

Click the banner's link to switch to your app. Set **Value** and click
**Update**. Then switch back to **Global** with the application picker, the
globe icon in your instance's header.

</details>

2. 🌐 **Browser**, as admin, the role for `hr.demo`, the lab's test user:
   - Click **All**, type `User Administration`, and click **Users**.
   - Open `hr.demo`.
   - In its **Roles** tab, click **Edit...**.
   - Move `<SCOPE>.user` from the left list to the right, and click
     **Save**.

   ✅ The **Roles** tab lists `<SCOPE>.user`. It takes effect the next time
   you impersonate `hr.demo`.

3. 🌐 **Browser**, as admin, the dispatcher's trigger: open
   `sys_trigger.list`. Filter **Name** by `HR case router dispatcher`.

   ✅ One row. The job runs every minute.

<details><summary>🛟 No row</summary>

An installed job sometimes gets no trigger until it's saved. Open
`sysauto_script.list`, open the job, and click **Update** once. Then
filter `sys_trigger.list` again.

</details>

4. 🌐 **Browser**, as admin, the instance's AI. You do this once:
   - Click **All**, type `AI Agent Studio`, and open it. Click **Testing**.
   - Look for a banner: "Now Assist Panel is not configured". No banner?
     The AI is already on: this sub-step is done.
   - Click **Set up** in the banner. Assistant Designer opens in a new
     tab, with a notice that the Now Assist Panel needs to be activated.
     Click **Activate**.
   - Go back to the AI Agent Studio tab and reload the page. If a dialog
     box appears, close it with its **X**.

   ✅ The **Testing** page shows no banner.

After every install, do sub-steps 1 and 3 again. An install turns the switch
off, and it can leave the job without a trigger. The role and the AI stay.

### 10. Run two cases

**Before you start: be patient here.** This is the first time your app
meets a live AI, and an AI doesn't give the same answer twice. Your app was
also written by an AI, so it isn't the same as your neighbour's. What you
see may differ from what this page shows, and it may not work the first
time. That's normal, and it isn't your mistake. When something fails, you
use Claude to find the cause and fix it: the 🛟 boxes in this step and the
next give you the prompts.

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Until now your app has only run in tests on your computer. Those prove the
checks on made-up data. Only a real case on your instance proves the rest:
that a run starts, the AI answers, the tools work as `hr.router`, and a note
lands on the case. You make two cases the guidance article was written for:
one the router should move, and one its checks should stop.

</details>

You create two HR cases by hand, as someone in HR would. Step 11 reads what
the app did to each:

- **Case A** is on the `Direct Deposit Inquiry` service, which
  `Lab HR Team` handles. The agent should move it there.
- **Case B** is on the `Payroll Discrepancy` service, which
  `Lab Locked Out` handles. The agent should pick that group. The checks
  should then stop the move, because `Lab Locked Out` can't open this kind
  of case.

The first runs after an install can each fail once per HR table (DECISIONS,
P8). If one does, step 11 has you run the case again.

<details><summary>ℹ️ What P8, P14… mean</summary>

`P1` to `P15` are the platform rules in `docs/DECISIONS.md`. P8: the first
runs after an install may each fail once per HR table, so run them again.
P14: while `hr.router` has a conversation open, no new run starts. Step 11
cites two more. P6: the note must show the agent read that case. P10: only
the log, the notes and the execution plan prove a run.
[All the labels](APPENDIX.md#p1-to-p15-platform-rules).

</details>
<!-- DRY RUN: time. Two runs, one a minute: about three minutes. -->

🌐 **Browser**, as admin:

1. Open `<SCOPE>_routing_rule.list`.

   ✅ Two active rows. One routes **HR service** `Direct Deposit Inquiry`
   to `Lab HR Team`. The other routes `Payroll Discrepancy` to
   `Lab Locked Out`. Both services come with every instance's HR demo data.
   The groups were made for the lab.
2. Open `kb_knowledge.list`, the list of knowledge articles, and find the
   guidance article:

   - In the **Short description** search box, type `HR routing guidance`
     and press **Enter**.
   - Open the top row. Its **Number** shows **(empty)**.
   - Scroll inside the article body.

   ✅ **Workflow** is **Published**. The article has a section for
   `Direct Deposit Inquiry`, handled by `Lab HR Team`, and another for
   `Payroll Discrepancy`, handled by `Lab Locked Out`. Each ends in an
   "Example request:" line, which the steps below paste.

   If there's no article, or sub-step 1 showed no rows, see the 🛟 box below.

🌐 **Browser**, impersonate `hr.demo`, which means acting as that user:

- Click your avatar, at the top right of your instance, then
  **Impersonate user**.
- Type `hr.demo`, pick **HR Demo**, and click **Impersonate user**.
- Close any welcome pop-up.

3. **Create case A.** Paste this into the address bar and press
   **Enter**:

   `https://dev123456.service-now.com/nav_to.do?uri=sn_hr_core_case_payroll.do%3Fsys_id%3D-1`

   A blank **HR Payroll Case** form opens. Set three fields:

   - **Opened for:** `HR Demo`.
   - **HR service:** `Direct Deposit Inquiry`. Click the magnifier to pick
     it. Not in the list? See the 🛟 box below.
   - **Short description:**
     <code data-copy>My direct deposit didn't arrive this pay period. Can you check which bank account it went to?</code>

   Leave every other field as the form has it. The short description is
   the article's "Example request:" line for this service, exactly as
   written.

   Then click **Submit**, at the top right of the form. The text must be
   there before you click Submit, because the app starts a run as the case
   is saved.

   As it saves, the platform fills **Assignment group**, such as
   **HR Tier 1**, and **Assigned to** itself. That's fine. Changing that
   group is the agent's job.
4. **Create case B.** Paste the same address into the address bar and
   press **Enter**:

   `https://dev123456.service-now.com/nav_to.do?uri=sn_hr_core_case_payroll.do%3Fsys_id%3D-1`

   A blank **HR Payroll Case** form opens. Set three fields:

   - **Opened for:** `HR Demo`.
   - **HR service:** `Payroll Discrepancy`. Click the magnifier to pick it.
   - **Short description:**
     <code data-copy>My last paycheck was short by eight hours of overtime. Please correct the amount.</code>

   Then click **Submit**.
5. Wait about three minutes. Nothing is instant: the dispatcher starts one
   run a minute, and a run takes about a minute. Then paste this into the
   address bar and press **Enter**:

   `https://dev123456.service-now.com/nav_to.do?uri=sn_hr_core_case_list.do%3Fsysparm_query%3Dshort_descriptionLIKEdirect%20deposit%5EORshort_descriptionLIKEpaycheck%5Eopened_by.user_name%3Dhr.demo%5EORDERBYDESCsys_created_on`

   It lists both cases, newest first, and not the build's old test cases.

   - If the list is empty as `hr.demo`, end impersonation and paste it
     again as admin. `hr.demo` can't see a case once the platform hands it
     to a group it isn't in.
   - Click a row's number, and look at the newest entry in the activity
     stream below the form. Find it in the **Notes** tab, or scroll down.
   - Go back to the list and do the same for the other case.

   ✅ Each case has a work note by `hr.router`, the user the router runs
   as. What the notes say is step 11's job.

   No note on a case? See the 🛟 box "No note after three minutes".

<details><summary>🛟 No note after three minutes</summary>

End impersonation. As admin, do these in order:

1. In `sys_properties.list`, set `<SCOPE>.enabled` to `true`.
2. If `sys_trigger.list` has no dispatcher row, open the job in
   `sysauto_script.list` and click **Update**.
3. Paste `https://dev123456.service-now.com/nav_to.do?uri=sys.scripts.modern.do`
   into the address bar, press **Enter**, and pick **global**. Then ⌨️ run
   <span data-show="os:mac">**On Mac:**
   `pbcopy < ~/projects/hr-case-router-lab-guide/files/close-router-conversations.js`</span>
   <span data-show="os:win">**On Windows:**
   `clip < ~/projects/hr-case-router-lab-guide/files/close-router-conversations.js`</span>.
   Paste it there, and click **Run script**.

Then, as `hr.demo`, click **Reroute** on the case and wait two minutes.
One case at a time: wait for its note before you reroute the other.

If Reroute says a run is already in progress, wait for the note saying the
router didn't finish. It comes five minutes after the case was created.
Then click **Reroute** again.

</details>

<details><summary>🛟 The HR service isn't in the list</summary>

The form's **HR service** list holds only the services for that form's kind
of case. Both lab services are Payroll ones, so check the address. It must
name `sn_hr_core_case_payroll.do`, not `sn_hr_core_case.do`. Close the form
without submitting, and paste the address again.

Is it the right form, and the service shows for admin but not for
`hr.demo`? Then the service is turned off, or its **HR criteria**, the rules
for who can use it, leave `HR Demo` out.

End impersonation, open
`sn_hr_core_service.list`, and open the service. ✅ **Active** is ticked,
and **HR criteria** is empty or covers `HR Demo`. If not, tell your
instructor the service's name.

Don't use **HR Case Management › Create New Case** for these cases. Its
**Create case** button saves the case before you can type a short
description. The agent's first run would then read an empty case. You'd
have to click **Reroute** after adding the text.

Does neither routing rule have a service, or is
`<SCOPE>_routing_rule.list` empty? Then the seed found no groups named
`Lab HR Team` and `Lab Locked Out` on your instance. The pre-work checks
for these groups (DECISIONS, seed data). Tell your instructor.

</details>

<details><summary>🛟 No routing rules, or no "HR routing guidance" article</summary>

The seed data isn't on your instance. It's a story like any other: the two
routing rules, the knowledge base and the article, written as code in
`src/`. Either it isn't merged yet, or it's merged but not installed.

⌨️ **Terminal**, in your window:
`git switch main && git pull && git log --oneline -15`.

If a line mentions seed data, routing rules or the article, do step 8 again
to build and install.

If no line does, 🤖 **Claude:** paste this, then `go`:

```
Which story holds the seed data: the routing rules for the demo HR services Direct Deposit Inquiry (to Lab HR Team) and Payroll Discrepancy (to Lab Locked Out), found by name, the "Lab HR routing" knowledge base and the published article? If it isn't merged, take it next, the same way as the last story.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude finds the story that seeds the routing rules, the knowledge base and
the article. If that story isn't merged yet, Claude takes it next, through
the usual loop.

</details>

When it's merged, do step 8 again. Then come back to sub-steps 1 and 2
here.

The article may be there while its knowledge base isn't: its
**Knowledge base** field is empty. That gets the same fix. The seed must
create the knowledge base in `src/` (DECISIONS, seed data).

</details>

### 11. Read the results

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

You work as `hr.demo`, a fulfiller rather than an admin. Fulfillers are the
people who work HR cases. Working as one shows the app works with the
access real HR staff have. What you check here is what your design's DEMO
gate asks for: a routed case, a stopped one, and a Reroute that starts a
run.

</details>

The agent read each case and the article. Then `apply_route` checked its
choice before anything moved. The checks should pass case A and stop
case B.

🌐 **Browser**, as `hr.demo`, in the list from step 10's sub-step 5:

1. Open case A, the one about a direct deposit. Look at two things:

   - The **Assignment group** field.
   - The newest work note by `hr.router`, in the activity stream below the
     form.

   ✅ **Assignment group** is `Lab HR Team`, no longer what the form set,
   such as `HR Tier 1`. The newest work note, by `hr.router`, gives three
   things: a reason that quotes this case's own "Example request:" line, a
   confidence, and the service and group before the move. That's proof the
   agent read this case.
2. Go back to the list and open case B, the one about a paycheck.

   ✅ **Assignment group** is still what the form set, such as `HR Tier 1`,
   not `Lab Locked Out`. The newest work note, by `hr.router`, names the
   access check. It says `Lab Locked Out` can't open this HR table, so the
   code stopped the move.

<div data-ask="m6-both-right" data-options="yes|no" data-labels="Yes, both|No, one or both didn't">

**Did both cases get that result?**

</div>

<div data-show="choice.m6-both-right:no">

**If one or both didn't:** that's common on a first try, and it isn't your
mistake. The first run after an install can fail once (DECISIONS, P8). A
run that fails can also leave `hr.router` a conversation open, and while
one is open no new run starts (P14). So close the conversations, then run
the case again.

**First, close the router's conversations.**
End impersonation. 🌐 **Browser**, as admin: paste this into the address bar and press
**Enter**:

`https://dev123456.service-now.com/nav_to.do?uri=sys.scripts.modern.do`

The **Scripts - Background** page opens. Set the scope picker above the
script to **global**.

Then copy the script. Do this last, so nothing else replaces it on your
clipboard:

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

🌐 **Browser**, on the **Scripts - Background** page: paste it into the
script box, and click **Run script**.

✅ It prints `Closed <n> open conversation(s) of hr.router` and `Closed <n>
in-progress interaction(s) of hr.router`. Any count is fine, 0 included.

**Then run the case again.** 🌐 **Browser**, impersonate `hr.demo` again.
Open one case that didn't get its result, and click **Reroute**.

✅ It says **Routing queued**. Wait about two minutes, reload, and read the
newest work note. Do one case at a time: wait for its note before you
reroute the other.

**Both right now?** Go on to sub-step 3.

**Still not right?** Read the case's newest work note, and open the 🛟 box
below that matches:

- There's no note by `hr.router` at all, or it says something "wasn't
  found": "No note by hr.router: read the run's state".
- It "ran past its time limit", twice: "The run timed out twice: activate
  the Now Assist Panel".
- The case text was empty, or the confidence isn't a number: the box with
  that name.
- Case B moved, or case A's reason doesn't fit the case: "It moved the Lab
  Locked Out case, or the reason doesn't fit the case".
- Anything else: "The note says the router didn't finish, or no box here
  fits". There, Claude finds the cause with you.

After a fix, come back here. Close the conversations, and reroute, until
both cases have their result.

</div>

<details><summary>🛟 No note by hr.router: read the run's state</summary>

Every case the app sees gets a row in its run log. The row's **State** says
how far the run got. End impersonation. As admin, open
`<SCOPE>_run_log.list`, newest first, and find the case's row:

| State | What it means | What to do |
|---|---|---|
| No row at all | The app never saw the case. Its insert rule, which starts a run when a case is created, didn't run | Check that the address in step 10's sub-step 3 named `sn_hr_core_case_payroll.do`. Then check in `sys_script.list` that the app's insert rule is **Active**. If it isn't, do step 8 again. Create the case again. |
| `skipped` | The router was off, or a run was already going on the case | Set `<SCOPE>.enabled` to `true`, or wait for the other run. Then click **Reroute** |
| `refused` | Stopped before any AI ran. Either the service has no active routing rule, the rule's **Never send to AI** box is ticked, a cap on runs per hour or per day was reached, or the article isn't published exactly once | The case's work note says which. Fix that one as admin, then click **Reroute** |
| `queued`, for minutes | The dispatcher isn't starting runs | Step 10's 🛟 box "No note after three minutes" |
| `start_failed` | The dispatcher couldn't start the AI agent workflow | Read the system log, below |
| `running` or `applying` | A run is still going | Wait two minutes, and reload |
| `timed_out`, and the note says it ran past its time limit | The run started, but the AI didn't answer in time. It also left `hr.router` a conversation open | Close the router's conversations again, with the script above. Then click **Reroute**, once. If that run times out too, the AI on your instance may not be switched on yet: see the 🛟 box "The run timed out twice: activate the Now Assist Panel" |
| `timed_out`, and the note says it waited in the queue | Another run was in the way, or `hr.router` had a conversation open | Close the router's conversations again, with the script above. Then click **Reroute** |
| `routed`, `stopped` or `left`, and still no note | The note couldn't be written. The first write to an HR table can be refused (DECISIONS, P8) | Click **Reroute** |

No work note to say why? The app's first write to an HR table can be
refused, so the note may be missing too. Look here instead:

1. Open `<SCOPE>_run_detail.list`, newest first. The run's detail row
   keeps what it can.
2. Read the system log. Type `syslog.list` in the filter navigator and
   press **Enter**.
3. In the **Message** search box, type `*<SCOPE>` and press **Enter**.
4. Sort by **Created**, newest first. The rows from the time of the run
   say what failed.

A `start_failed` line may say
`Illegal access to package_private script include function AIASharedDao`.
That means the dispatcher starts the workflow from a Fluent module, a file
of the app's code in `src/server/`. The start must be in classic script,
the script in the job's own record (DECISIONS, How it starts the workflow).

That's a defect. 🤖 **Claude:** paste this, then `go`:

```
File a GitHub issue in plain words: every run is start_failed with "Illegal access to package_private script include function AIASharedDao: caller not in scope sn_aia". DECISIONS says the dispatcher job's own classic script makes the start call, after the module claims the run; never a Fluent module or anything it calls. Show me first; file after I say yes. No code.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts an issue for the start failure, quoting the error and the
DECISIONS rule it breaks. It shows you the issue before filing it, and
writes no code. You then take that issue through the loop like any other
story. After that you build, install and come back to sub-step 1.

</details>

Or the case's work note may say that something wasn't found: the
"AI Agent Background" channel, or the workflow "HR case router". As admin,
open the list for the one it names, and look for that name:

- The channel: `sys_cs_channel.list`.
- The workflow: `sn_aia_usecase.list`.

Then:

- **It's in the list:** the build looks it up the wrong way. It filters on
  `active`, a column that table doesn't have, so the lookup finds nothing
  (DECISIONS, How it starts the workflow). That's a defect: use the prompt
  below. Fixing one can uncover the other: the prompt covers both.
- **The channel isn't in the list:** stop, and tell your instructor. The
  instance needs its setup run again.
- **The workflow isn't in the list:** the install didn't finish. Do step 8
  again.

🤖 **Claude:** paste this, then `go`:

```
File a GitHub issue in plain words: every run is start_failed because the dispatcher says the "AI Agent Background" channel or the workflow "HR case router" wasn't found, but the instance has both. DECISIONS says the dispatcher finds each by name alone, never with a filter on active: neither sys_cs_channel nor sn_aia_usecase has that column, and a filter on a column a table lacks matches no rows. Check every other column the server code filters on against the instance too, with now-sdk query, read-only. The tests' stand-ins for those tables must have no field the real table lacks. Show me first; file after I say yes. No code.
```

Take that issue through the loop like any other story. Then build and
install (step 8), switch the router on again (step 9), and click
**Reroute** on each case.

</details>

<details><summary>🛟 The note says the case text was empty</summary>

A first read of an HR table can come back empty (DECISIONS, P8). On the
case, click **Reroute**. ✅ It says **Routing queued**. Wait about two
minutes, and reload.
<!-- DRY RUN: the note's exact words for read_case's empty-text error. -->

</details>

<details><summary>🛟 The note's confidence isn't a number</summary>

The AI sometimes sends a word, such as `fmt_error`, where its confidence
should go. The code stops the move and leaves the case where it was. That's
a check doing its job, not a defect.

On the case, click **Reroute**. ✅ It says **Routing queued**. Wait about
two minutes, and reload. The new note gives a number.

In sub-step 4, that case then has one more row, with **State** `stopped`.
That row is the run that sent the word.

If it happens on three runs in a row, tell your instructor.

</details>

<details><summary>🛟 It moved the Lab Locked Out case, or the reason doesn't fit the case</summary>

That's a real defect. You saw one of these:

- The `Lab Locked Out` case moved.
- The reason quotes words that aren't in this case's article line.

Either way, the checks or the agent never saw this case (DECISIONS, P6).
🤖 **Claude:** paste this, then `go`:

```
File a GitHub issue in plain words: <what you saw, such as "it moved
the Lab Locked Out case">, labelled for the gate it holds up. Show me
first; file after I say yes. No code.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts a GitHub issue that describes the defect in plain words,
labelled for the gate it holds up. It shows you the issue before filing it,
and writes no code. Filing it first puts the defect on the board. Its fix
then goes through the same tests and review as any story.

</details>

Reply `yes`. Then 🤖 **Claude:** paste this, with the issue's number in
place of `<n>`, then `go`:

```
Take issue #<n>. Restate it in five bullets, then build it tests first,
without waiting for me: on a new branch from main; tests in Vitest
through npm test, named after the design term they prove; show them
failing, then make them pass, and run now-sdk build. Then ship it: fix
real findings once, file design findings as register issues, merge when
npm test and now-sdk build pass, and give me one line per finding.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude restates the issue in five bullets. It builds it the way you built
your first story: tests first on a new branch, seen failing, then code until
they pass and the build is clean. After that it ships it: a review, real
findings fixed, design findings filed as register issues, and a merge once
the tests and the build pass. You get one line per finding, and the change
is on `main`, ready to install.

</details>

When it's merged, ⌨️ **Terminal**, in your window:

```
git switch main && git pull && git status --short
now-sdk build && now-sdk install --auth lab-pdi
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git switch main && git pull && git status --short`: Switches to `main`
   and downloads what's been merged into it on GitHub. Then it lists every
   file that's changed but not committed. Nothing listed means your folder
   holds exactly what's on `main`. `&&` runs each command only if the one
   before it worked.
2. `now-sdk build && now-sdk install --auth lab-pdi`: Builds your app from
   its source. Then it installs the app on your instance, with the SDK
   sign-in you saved as `lab-pdi`. `&&` installs only if the build worked.

</details>

🌐 **Browser**, as admin, do step 9's sub-steps 1 and 3 again. Close the
router's conversations again, with the script above. Then, as `hr.demo`,
click **Reroute** on each case, one at a time.

</details>

<details><summary>🛟 The run timed out twice: activate the Now Assist Panel</summary>

Until the Now Assist Panel is activated, no AI agent on the instance gets
an answer, and every run ends `timed_out`. As admin:

1. Do step 9's sub-step 4 again, and check its ✅: the **Testing** page in
   AI Agent Studio shows no banner.
2. Prove the AI answers. On that page:
   - Under **Name of the AI agent or agentic workflow**, choose
     `HR case router`.
   - In **Task**, type
     `Route the HR case of run test: use test as run_id in every tool call.`
   - Click **Continue to test chat response**.

   The agent replies within a minute. There's no run called "test", so
   expect it to say it can't route anything: that's fine. Any reply shows
   the AI is on.
3. Close the router's conversations again, with the script above. Each timed-out run left one open, and it holds every
   later run.
4. Open one case and click **Reroute**. Wait for its note before you
   reroute the next case.

No reply in 2, or the run times out again? Tell your instructor.

</details>

<details><summary>🛟 The note says the router didn't finish, or no box here fits</summary>

The agent didn't route the case, and none of the boxes above names what
you see. Have Claude find the cause before anything is changed.

Copy the case's newest work note by `hr.router`, if it has one.

🤖 **Claude:** paste the note, then this, then `go`:

```
The HR case router didn't work on my instance. Troubleshoot it and find the root cause. Change nothing and install nothing. Read the newest rows of the run log and the run detail table, and the system log rows that name the app's scope, with now-sdk query, read-only. Quote the rows. Check that each table and column the failing code reads is really on the instance. Compare what you find with the code and with docs/DECISIONS.md. Then tell me in plain words: the cause, the evidence for it, what you couldn't check, and the smallest fix. Draft a GitHub issue for that fix, labelled for the gate it holds up. Show me first; file after I say yes. No code.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude reads what the failed run left behind on your instance: its log
row, its detail row and the system log. It only reads. It checks the
instance against the code, because a table or a column the code expects
may not be there. Then it names the cause, shows the rows that prove it,
and says what it couldn't check. It drafts an issue for the fix and shows
you before filing. It writes no code yet.

</details>

Read the cause and the evidence. If the evidence doesn't show the cause,
say so, and ask for the row that would.

Then reply `yes`, and fix it the way the box above does, "It moved the Lab
Locked Out case, or the reason doesn't fit the case", from its "Take
issue" prompt on: build it tests first, install, switch the router on
again, close the router's conversations, and **Reroute**.

Still stuck after one fix? Tell your instructor, and show them Claude's
answer.

</details>

3. On case A, as `hr.demo`, click **Reroute**. A fulfiller uses it to ask
   the router to look again.

   ✅ It says **Routing queued**. Wait about two minutes, and reload.
   There's a new work note by `hr.router`, and the case is still in
   `Lab HR Team`.

🌐 **Browser**, end impersonation. Click your avatar, then **End
impersonation**. Then, as admin:

4. Open `<SCOPE>_run_log.list`, newest first.

   ✅ Case A's two newest rows both have **State** `routed`. The newer one
   came from Reroute. Case B's newest row has **State** `stopped`. If you
   ran a case again above, its earlier tries are older rows, with other
   states.
5. Open the **Execution plan** field of one of case A's `routed` rows. The
   execution plan is the platform's record of what the agent did in the
   run. Only look: change nothing there.

   ✅ **State** is `completed`, created by `hr.router`. The plan, the log
   row and the note prove a run. The agent's own word never does
   (DECISIONS, P10).

### 12. See what you built

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

You've watched stories merge and a case get routed. Nothing so far shows
the whole app in one picture. Here Claude draws it from your code and your
instance. An AI can draw a convincing picture of an app that isn't quite
the one you built. So every box in the picture names where it comes from,
and you check three of them yourself.

</details>

1. 🤖 **Claude:** type this on its own:

   ```
   /prove-it:as-built lab-pdi
   ```

   It reads your code, and reads your instance through `lab-pdi` without
   changing it. That takes about five minutes.

   ✅ It says it wrote `docs/AS-BUILT.md` and `docs/AS-BUILT.html`. Then it
   counts the pieces it found on your instance.
2. Open the page it built.

   <div data-show="os:mac">

   **On Mac:** ⌨️ **Terminal**, in your window:

   ```
   open ~/projects/hr-case-router/app/docs/AS-BUILT.html
   ```

   </div>

   <div data-show="os:win">

   **On Windows:** ⌨️ **Terminal**, in your window:

   ```
   start ~/projects/hr-case-router/app/docs/AS-BUILT.html
   ```

   </div>

   ✅ Your browser shows two diagrams. **The pieces** is everything your app
   is made of. **One record's path** follows one HR case from the moment
   it's created to its work note, with the branch where a move is stopped.
3. Check the picture against the real thing. Under **The pieces** is a
   table with a row for every box. One row can cover several pieces of a
   kind. Find the rows that name these three:

   - the AI agent;
   - `apply_route`, the tool that makes the move;
   - the run log, the table whose name ends `_run_log`.

   For each one, look in the two places its row names:

   - ✏️ **Editor:** open the file in the **Where it comes from** column,
     and find the piece's name in it.
   - 🌐 **Browser**, as admin: the **On the instance** column names a
     table, such as `sn_aia_agent`. Type that name with `.list` after it in
     the filter navigator, press **Enter**, and find the piece in the list.

   ✅ All three are in both places, under the names the diagram gives them.
4. Read the last two sections of the page.

   - **As built against as designed** lists places where your app differs
     from your design record.
   - **Not verified** lists what Claude couldn't confirm. It read how the
     app is wired, and it didn't watch a case go through.

   Change nothing now. Each difference is a decision for after the
   workshop: change the build, or change the design.
5. 🤖 **Claude:**

   ```
   Commit docs/AS-BUILT.md and docs/AS-BUILT.html together on a new branch
   docs/as-built.
   ```
6. 🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

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

   ✅ It gives you the pull request link, and the pull request shows
   **Merged**.

<details><summary>🛟 A box in the diagram isn't in the file or on the instance</summary>

Then the picture is wrong, and that's this step's catch. A wrong diagram
looks like a right one. Only the check finds it.

🤖 **Claude:** type this. Put the box's name in place of `<box>`:

```
The box <box> in docs/AS-BUILT.md isn't where its row says. Read the file and query the instance again, read-only. Tell me what you find. Then correct docs/AS-BUILT.md, and build the page again.
```

Then do sub-step 3 again for that box.

</details>

<details><summary>🛟 A diagram shows as text, or the page says it could not be drawn</summary>

The page keeps every diagram as text, so nothing is lost. Have Claude
draw it again.

🤖 **Claude:** type this:

```
A diagram in docs/AS-BUILT.html didn't draw. Simplify that diagram in docs/AS-BUILT.md, keep its sources table, and build the page again.
```

Then reload the page in your browser.

</details>

<details><summary>🛟 It says "Not checked" for every row</summary>

Claude couldn't read your instance, so it drew the picture from the code
alone. Your instance may be asleep. 🌐 **Browser:** open your instance, and
wake it if its page offers to.

Then 🤖 **Claude:** type `/prove-it:as-built lab-pdi` again.

</details>

<details><summary>🛟 It says it doesn't know /prove-it:as-built</summary>

Your kit is an earlier version. ⌨️ **Terminal**, in your window:

```
claude plugin marketplace remove prove-it
claude plugin marketplace add 'gapietro/prove-it-kit#v0.2.2'
claude plugin install prove-it@prove-it
```

Then close Claude and open it again in `~/projects/hr-case-router/app`,
and type `/prove-it:as-built lab-pdi`.

</details>

<details><summary>🛟 It isn't merged: a test or the build failed</summary>

🤖 **Claude:** type `Fix it once, then finish ship it.` If it fails again,
tell your instructor.

</details>

### 13. Log it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A catch only counts if it's written down. In Module 8, the debrief, you
count the lines in this file, not what you remember. Logging now, while the
session still holds the details, records each catch with what caught it.

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

Claude drafts this module's catches from what happened in this session, one
line each, in the catch log's format. You read them and reply `keep`, or say
what to change. They go in your catch log, the record of what the process
caught.

</details>

Read the lines Claude shows:

- Look for a `review` line for each fixed review finding, step 5's
  included.
- Look for a `test` line for each defect step 11 found.

Then reply `keep`, or say what to change.

⌨️ **Terminal**, in your window:

```
tail -n 5 ~/projects/hr-case-router/catches.md
```

✅ It shows the lines you kept.

## Results

**You now have**

- The thin path, `apply_route` with its checks and the group move, Reroute
  and the seed data. All of it is merged, installed and switched on.
- The agent routing a new case live, as `hr.demo`. Its note, its log row and
  its execution plan prove it.
- `docs/AS-BUILT.md` and `docs/AS-BUILT.html` on `main`: two diagrams of what
  you built, each box with where it comes from.
- This module's catches in `catches.md`.
