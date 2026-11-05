# Module 2 — Consult

*⏱ 30 min · 09:40*

Nothing gets built: the consult advises how to build each capability.
**The catch:** anything that writes is a deterministic tool, never the agent.

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before any code, an architect advises how to build each
  request: an agent, a tool the agent calls, or plain code, with reasons.
- **Why it matters:** that choice sets what the app costs to run, how
  predictable it is, and what can go wrong. It's cheapest to change now.
- **Your mindset:** you're the reviewer, not the author. Question each
  recommendation as if you'll defend it to the customer.

</details>

### 1. 🔮 Guess first

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A guess made before you read the advice gives you something to measure it
against. Where the consult and your instinct differ is exactly where to look
hardest when you review it.

</details>

Which capabilities need AI? What may the agent change? Keep your guess
in your head: step 5 checks it.

<details><summary>🔮 The answer, once you've guessed</summary>

Only capabilities 3 and 5, routing a new case and Reroute, need AI. The
agent itself may change nothing: it proposes a service and a group, and its
tools write.

Reading loose case text is what AI is good at. A write must be predictable
and testable, so it belongs to plain code: the `apply_route` tool runs every
check itself (the routing rules, the group's access, restricted services,
the 0.7 threshold), and only then moves the case. The rules, the caps, the
log and the weekly numbers are plain code too. AI proposes; plain code
decides.

</details>

### 2. Start the consult

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The consult is a kit skill: it reads your accepted PRD in `brief` and advises
how to build each capability, with its cost and how ready it is. It first
restates the brief in a few bullets and stops, so you can correct its
understanding before it writes anything.

</details>

<div data-show="surface:terminal">

**In the terminal:** ⌨️ if asked to trust the folder, pick **Yes**.

```
cd ~/projects/hr-case-router && claude
```

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**, click
the folder control, choose **Open folder…**, and pick
`~/projects/hr-case-router`.
Then press **Ctrl+O** until the view is **Verbose**.

</div>

🤖 **Claude:** type this, with nothing after it:

```
/prove-it:consult
```

✅ It restates the brief in five bullets or fewer, asks questions, and stops.

<details><summary>🛟 It writes CONSULT.md before you confirm</summary>

The kit broke its rule. Tell your instructor. Then:

<div data-show="surface:terminal">

**In the terminal:** type `/exit`, run `rm CONSULT.md` and `claude`, and
type `/prove-it:consult` again.

</div>

<div data-show="surface:desktop">

**In the Code tab:** ⌨️ in your window, run
`rm ~/projects/hr-case-router/CONSULT.md`. Start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>)
on `~/projects/hr-case-router`, with the top **Local** entry and **Open
folder…** under the prompt box. Press **Ctrl+O** until the view is
**Verbose**, and type `/prove-it:consult` again.

</div>

</details>

### 3. Answer its questions, then confirm

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your answers set the ground rules for the advice: the size of the release, the
platform, the three ways to build something, and a rule to flag what it hasn't
checked rather than guess. Confirming tells the consult its restatement of the
brief is right; until then it writes nothing.

</details>

Don't type `confirmed` yet. 🤖 **Claude:** paste this, for all its questions:

```
My answers: size is one release, built on the day except the override
rule. Assume AI Agent Studio. Modalities: agent, tool (a script the agent
calls) or plain code. Run no commands; mark anything unchecked VERIFY.
Anything only the customer can answer, record as an open decision; never
guess. Yes, raise any other open decisions you find.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

This answers all the consult's questions in one message: one release, built on
AI Agent Studio, and three ways to build each capability, an agent, a tool or
plain code. It tells Claude to run no commands, to mark anything it hasn't
checked VERIFY, and to record anything only the customer can answer as an open
decision, never a guess. Claude replies with its restatement of the brief, for
you to check against the PRD.

</details>

It restates the brief. Read each bullet against the PRD; if one's wrong,
tell it which and why. Then type `confirmed` alone.

### 4. Let it run

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The consult now works on its own and writes its advice to `CONSULT.md`.
Listing the workspace when it's done shows it kept to its job: advice only, no
code and no design.

</details>

It runs for several minutes and writes only `CONSULT.md`. Don't run the
`/prove-it:design-challenge` it suggests: research comes first. If that
shows as grey text, ignore it: **Tab** or **Right arrow** would accept it.

⌨️ **Terminal**, in your window, when it's done:

```
ls -A ~/projects/hr-case-router
```

✅ It lists `app`, `brief`, `catches.md` and `CONSULT.md`, maybe `.claude`,
and nothing else.

<details><summary>🛟 It lists something else</summary>

Claude wrote a file it shouldn't have. ⌨️ **Terminal:** remove it by the
name it listed, such as `rm ~/projects/hr-case-router/notes.md`.

</details>

<details><summary>🛟 It shows an error, or stalls</summary>

Press **Esc** and type `/prove-it:consult` alone. Paste step 3's answers
again, and type `confirmed` when it restates. Third failure? Stop and ask
your instructor.

</details>

### 5. Read it like a reviewer

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

`CONSULT.md` is advice, and you're the one who'll have to defend it to the
customer. Reading it row by row is where you spot a choice you disagree with,
or a requirement that can't start yet. Its VERIFY marks become your research
list in the next module.

</details>

✏️ **Editor:** open `hr-case-router/CONSULT.md`. Don't change it.

✅ A row per capability: agent (AI that plans its steps), tool or plain
code, with a reason. Then **Data and ownership**, **Cost** and
**Readiness**. **VERIFY** marks what Module 3 checks on your instance.

Look for capability 3's choice, each write's owner, and any requirement
not **ready**. Compare with your guess.

### 6. Push back

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Every change to an HR case needs one clear owner, so it can be tested and
traced later. Asking for each write's owner by name makes the consult commit
to one, whatever it said the first time.

</details>

🤖 **Claude:** ask this, whatever the consult said:

```
Name the owner of each write to a case in Data and ownership. The agent
never writes; a deterministic tool or plain code does. If that changes
your advice, update CONSULT.md and show me the change.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude names, for each write to a case in the Data and ownership section, the
tool or plain code that owns it, so the agent owns none. If that changes its
advice, it updates `CONSULT.md` and shows you exactly what changed. The lab
asks this every time: a write must be predictable and testable, which plain
code is and an agent isn't.

</details>

✅ Each write to a case has a tool or plain code as its owner, and it
shows any change to `CONSULT.md`.

### 7. Log it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A catch here is a gap in the PRD that the consult brought to light and that
changed a decision. Logging it now, while you remember it, adds to the record
Module 9 counts.

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

Claude drafts this module's catches as one line each, in the catch log's
format, from what happened in this session. You read them and reply `keep`, or
say what to change. Module 9 counts them.

</details>

Keep a line for each gap in the PRD the consult found, before step 6 or
after it. Your own answers and corrections aren't catches. Then reply
`keep`.

✅ ⌨️ `tail -n 5 ~/projects/hr-case-router/catches.md` shows the lines you
kept. <span data-show="surface:terminal">**In the terminal:** then type
`/exit` in Claude.</span>

## You now have

- `CONSULT.md` in `~/projects/hr-case-router`, and this module's catches in
  `catches.md`.
