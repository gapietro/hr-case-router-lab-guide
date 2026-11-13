# Module 2 — Consult

*⏱ 30 min · 09:40*

Nothing gets built in this module. The consult, one of the kit's skills,
advises how to build each capability. A capability is one of the things the
PRD says the app must do. **The catch:** anything that writes is a
deterministic tool, never the agent. Deterministic means it does the same
thing every time.

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** an architect advises how to build each request before
  anyone writes code. Each one can be an agent, a tool the agent calls, or
  plain code. An agent is AI that plans its own steps. A tool is a script
  the agent calls. Plain code is ordinary code that runs without AI. The
  architect gives a reason for each choice.
- **Why it matters:** the choice decides what the app costs to run, how
  predictable it is, and what can go wrong. Now is when it's cheapest to
  change.
- **Your mindset:** you're the reviewer, not the author. Question each
  recommendation as if you'll have to defend it to the customer.

</details>

### 1. 🔮 Guess first

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

If you guess before you read the advice, you have something to measure it
against. Where the consult's advice and your guess differ, look hardest when
you review it.

</details>

⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps: first
check that the earlier modules left everything this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 2
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, including the check's script. `-q` means it prints
   only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 2`:
   Checks that each earlier module left what it promised, such as your
   files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 2.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names. Then run the check again. If you can't fix one,
tell your instructor before you go on. Every later step builds on it. They
can help you fix it. Or they can give you a checkpoint, the work so far
ready made, to start this module from.

</details>


Which capabilities need AI? What may the agent change? Keep your guess
in your head. You'll check it in step 5.

<details><summary>🔮 The answer, once you've guessed</summary>

Only routing needs AI. That's capability 3's agent. Reroute, capability 5,
runs the same agent again on a case. The Reroute button itself is plain
code. The agent may change nothing. It proposes a service and a group, and
its tools do the writing.

AI is good at reading case text that people wrote in their own words. A
write must be predictable and testable, so it belongs to plain code. The
`apply_route` tool runs every check itself, and only then moves the case.
It checks the routing rules, the group's access, restricted services and
the 0.7 confidence threshold. The rules, the caps, the log and the weekly
numbers are plain code too. The caps are the limits on runs per hour and
per day. AI proposes. Plain code decides.

</details>

### 2. Start the consult

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The consult is one of the kit's skills. It reads your accepted PRD in
`brief` and advises how to build each capability. It also says what each
one costs and how ready it is. First it restates the brief in a few bullets
and stops. That lets you correct its understanding before it writes
anything.

</details>

<div data-show="surface:terminal">

**In the terminal:** ⌨️ run this. If it asks whether to trust the folder,
pick **Yes**.

```
cd ~/projects/hr-case-router && claude
```

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**. Click
the folder control, choose **Open folder…** and pick
`~/projects/hr-case-router`.
Then press **Ctrl+O** until the view is **Verbose**.

</div>

🤖 **Claude:** type this, with nothing after it:

```
/prove-it:consult
```

✅ It restates the brief in five bullets or fewer. Then it asks questions
and stops.

<details><summary>🛟 It writes CONSULT.md before you confirm</summary>

That breaks the kit's rule. It should wait until you confirm. Tell your
instructor. Then:

<div data-show="surface:terminal">

**In the terminal:** type `/exit`. Run `rm CONSULT.md`, then `claude`.
Type `/prove-it:consult` again.

</div>

<div data-show="surface:desktop">

**In the Code tab:** ⌨️ in your window, run
`rm ~/projects/hr-case-router/CONSULT.md`. Start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>)
on `~/projects/hr-case-router`. Use the top **Local** entry and **Open
folder…**, under the prompt box. Press **Ctrl+O** until the view is
**Verbose**. Then type `/prove-it:consult` again.

</div>

</details>

### 3. Answer its questions, then confirm

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your answers set the ground rules for the advice. They give the size of the
release, the platform and the three ways to build something. They also tell
it to flag what it hasn't checked, rather than guess. Confirming tells the
consult its restatement of the brief is right. Until then it writes nothing.

</details>

Don't type `confirmed` yet. 🤖 **Claude:** paste this as your answer to all
its questions:

```
My answers: size is one release, built on the day except capability 7's
override rule. Assume AI Agent Studio. Modalities: agent, tool (a script the agent
calls) or plain code. Run no commands; mark anything unchecked VERIFY.
Anything only the customer can answer, record as an open decision; never
guess. Yes, raise any other open decisions you find.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

This answers all the consult's questions at once: one release, on AI Agent
Studio. All of it is built on the day except capability 7's override rule,
and each capability is an agent, a tool or plain code. Claude runs no
commands, marks anything it hasn't checked VERIFY, and records what only the
customer can answer as an open decision, not a guess. It then restates the
brief, for you to check against the PRD.

</details>

It restates the brief. Read each bullet against the PRD. If one is wrong,
tell it which one and why. Then type `confirmed` on its own.

### 4. Let it run

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The consult now works on its own and writes its advice to `CONSULT.md`.
When it's done, you list what's in the project folder. That shows it kept
to its job: advice only, no code and no design.

</details>

It runs for several minutes and writes only `CONSULT.md`. At the end it
suggests `/prove-it:design-challenge`. Don't run it: research comes first.
If the suggestion shows as grey text, ignore it. **Tab** or **Right arrow**
would accept it.

⌨️ **Terminal**, in your window, when it's done:

```
ls -A ~/projects/hr-case-router
```

✅ It lists `app`, `brief`, `catches.md` and `CONSULT.md`, and nothing
else. It may also list `.claude`.

<details><summary>🛟 It lists something else</summary>

Claude wrote a file it shouldn't have. ⌨️ **Terminal:** remove it, using
the name the list shows. For example:
`rm ~/projects/hr-case-router/notes.md`.

</details>

<details><summary>🛟 It shows an error, or stalls</summary>

Press **Esc**, then type `/prove-it:consult` on its own. Paste step 3's
answers again. When it restates the brief, type `confirmed`. If it fails a
third time, stop and ask your instructor.

</details>

### 5. Read it like a reviewer

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

`CONSULT.md` is advice. You're the one who'll have to defend it to the
customer. Read it row by row to spot a choice you disagree with, or a
requirement that can't start yet. Its VERIFY marks show what it hasn't
checked. They become your research list in the next module.

</details>

✏️ **Editor:** open `hr-case-router/CONSULT.md`. Don't change it.

✅ It has a row for each capability. Each row says agent, tool or plain
code, with a reason. An agent is AI that plans its own steps. After the
rows come **Data and ownership**, **Cost** and **Readiness**. **VERIFY**
marks what you'll check on your instance in Module 3.

Look for capability 3's choice and any requirement that isn't **ready**.
Look too for each write's owner, the part of the app that makes that
change. Compare what you find with your guess.

<details><summary>ℹ️ What the row numbers mean</summary>

Each row of `CONSULT.md` is one of the PRD's nine capabilities. They're
numbered as in section 3 of the PRD, so row 3 is capability 3, routing a
new case. If Claude writes `C3` here, it means capability 3. From Module 4
on, `C3` means rule 3 of the design record you write there, never a
capability.
[All the labels](APPENDIX.md#capabilities-1-to-9-no-letter).

</details>

### 6. Push back

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Every change to an HR case needs one clear owner. Then it can be tested and
traced later. When you ask for each write's owner by name, the consult must
commit to one, whatever it said the first time.

</details>

🤖 **Claude:** ask this, whatever the consult said:

```
Name the owner of each write to a case in Data and ownership. The agent
never writes; a deterministic tool or plain code does. A tool the agent
calls, which runs its own checks, owns its writes. If that changes your
advice, update CONSULT.md and show me the change.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

For each write to a case in the Data and ownership section, Claude names the
tool or plain code that owns it, so the agent owns none. A tool the agent
calls still owns its own writes, because its code decides, not the agent. If
that changes the advice, Claude updates `CONSULT.md` and shows you exactly
what changed. The lab always asks this because a write must be predictable
and testable: plain code is, and an agent isn't.

</details>

✅ Each write to a case has a tool or plain code as its owner. Claude shows
you any change to `CONSULT.md`.

### 7. Log it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A catch here is a gap in the PRD that the consult found, and that changed a
decision. Log it now, while you remember it. It goes in the record you'll
count in Module 8, at the end of the day.

</details>

🤖 **Claude:**

```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. Read ~/projects/hr-case-router/catches.md first and skip any
line already there. One line each, as "2 | <what caught it> | <what, and
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

Keep a line for each gap in the PRD that the consult found, before step 6
or after it. Your own answers and corrections aren't catches. Then reply
`keep`.

✅ ⌨️ `tail -n 5 ~/projects/hr-case-router/catches.md` shows the lines you
kept. <span data-show="surface:terminal">**In the terminal:** then type
`/exit` in Claude.</span>

## You now have

- `CONSULT.md` in `~/projects/hr-case-router`, and this module's catches in
  `catches.md`.
