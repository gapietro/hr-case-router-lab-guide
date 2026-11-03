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

Which capabilities need AI? What may the agent change? Keep your guess
in your head: step 5 checks it.

### 2. Start the consult

⌨️ **Terminal:** if asked to trust the folder, pick **Yes**.

```
cd ~/projects/hr-case-router && claude
```

🤖 **Claude:** type this, with nothing after it:

```
/prove-it:consult
```

✅ It restates the brief in five bullets or fewer, asks questions, and stops.

<details><summary>🛟 It writes CONSULT.md before you confirm</summary>

The kit broke its rule. Tell your instructor, type `/exit`, run
`rm CONSULT.md` and `claude`, and type `/prove-it:consult` again.

</details>

### 3. Answer its questions, then confirm

Don't type `confirmed` yet. 🤖 **Claude:** paste this, for all its questions:

```
My answers: size is one release, built on the day except the override
rule. Assume AI Agent Studio. Modalities: agent, tool (a script the agent
calls) or plain code. Run no commands; mark anything unchecked VERIFY.
Anything only the customer can answer, record as an open decision; never
guess. Yes, raise any other open decisions you find.
```

It restates the brief. Read each bullet against the PRD; if one's wrong,
tell it which and why. Then type `confirmed` alone.

### 4. Let it run

It runs for several minutes and writes only `CONSULT.md`. Don't run the
`/prove-it:design-challenge` it suggests: research comes first. If that
shows as grey text, ignore it: **Tab** or **Right arrow** would accept it.

⌨️ **Terminal**, in a second window (**Cmd+N**), when it's done:

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

✏️ **Editor:** open `hr-case-router/CONSULT.md`. Don't change it.

✅ A row per capability: agent (AI that plans its steps), tool or plain
code, with a reason. Then **Data and ownership**, **Cost** and
**Readiness**. **VERIFY** marks what Module 3 checks on your instance.

Look for capability 3's choice, each write's owner, and any requirement
not **ready**. Compare with your guess.

### 6. Push back

🤖 **Claude:** ask this, whatever the consult said:

```
Name the owner of each write to a case in Data and ownership. The agent
never writes; a deterministic tool or plain code does. If that changes
your advice, update CONSULT.md and show me the change.
```

✅ Each write to a case has a tool or plain code as its owner, and it
shows any change to `CONSULT.md`.

### 7. Log it

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

Keep a line for each gap in the PRD the consult found, before step 6 or
after it. Your own answers and corrections aren't catches. Then reply
`keep`.

✅ ⌨️ `tail -n 5 ~/projects/hr-case-router/catches.md` shows the lines you
kept. Then type `/exit` in Claude.

## You now have

- `CONSULT.md` in `~/projects/hr-case-router`, and this module's catches in
  `catches.md`.
