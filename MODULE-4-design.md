# Module 4 — Design challenge

*⏱ 55 min · 11:35*

Claude questions your design, one question at a time. Then you confirm the
result. Your design is already written down. The PRD says what the app must
do. Your LLD says how each part will be built. `docs/DECISIONS.md` holds the
lab's settled decisions. **The idea:** it's like agreed building plans. Once
they're agreed, moving a wall needs a written change order. **The catch:**
which questions can't your PRD, LLD and decisions answer?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before anyone writes code, the design is questioned
  hard. Then it's agreed as the contract between the builder and the
  customer.
- **Why it matters:** a gap found by a question costs a sentence to fix.
  Found in code, it costs a rebuild.
- **Your mindset:** answer as the owner, who'll have to defend each
  decision. If your design can't answer a question, you've found a gap.

</details>

### 1. Start the challenge

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The design challenge is a skill from the prove-it kit: steps written in
advance that Claude follows. It asks about your design one question at a
time. Then it writes the design record you agree to. That record is the
contract the build plan and every later check rely on. You point it at your
PRD, LLD and decisions, so it asks only what those files leave open. You
don't have to type your design again.

</details>

⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps: first
check that the earlier modules left what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 4
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, including the check's script. `-q` means it prints
   only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 4`:
   Checks that each earlier module left what it promised, such as your
   files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 4.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names. Then run the check again. If you can't fix one,
tell your instructor before you go on. Every later step builds on it. They
can help you fix it. Or they can give you a checkpoint, the work so far
ready made, to start this module from.

</details>


<div data-show="surface:terminal">

**In the terminal:** ⌨️ start Claude in your workspace:

```
cd ~/projects/hr-case-router
claude
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router`: Goes into your workspace. The accepted
   PRD and your LLD are there, so the design challenge can read them.
2. `claude`: Starts Claude Code in the folder you're in. This window is now
   the Claude window.

</details>

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**. Click
the folder control, choose **Open folder…** and pick
`~/projects/hr-case-router`.
Then press **Ctrl+O** until the view is **Verbose**.

</div>

🤖 **Claude:** type this, alone:

```
/prove-it:design-challenge
```

🤖 When it asks you to confirm the feature name, paste this:

```
HRCaseRouter. My design is the PRD in brief/,
docs/LLD-HRCaseRouter.md and docs/DECISIONS.md: what they decide
is my answer. For every question, give me 3 or 4 numbered answers drawn
from them and CONSULT.md, the one they give first. If none of them
answers it, say so first, then put your recommended answer first. After
my design, for failure, security, cost and boundaries, ask only what none
of them answers, one question at a time; only what a file states counts
as answered, not what you'd infer. If a topic has nothing open, ask one
question to confirm it. Then gates. Nothing is OPEN: anything waiting on
the customer is out of scope for this record.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

This names the feature HRCaseRouter and points Claude at your design: the
PRD, your LLD and `DECISIONS.md`. Each question comes with 3 or 4 numbered
answers from those files, with their own answer first, or with Claude's
recommended answer first if they don't answer it. Then Claude asks about
what could go wrong, who may see or change what, what the app costs to run
and what's left out, but only where your files leave a gap, and then about
the gates. Anything still waiting on the customer stays out of this design.

</details>

### 2. Answer each question

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Each answer you pick becomes a rule in the signed design. So it should come
from your files, not from a new idea. If you pick your files' own answer,
the design record and the LLD say the same thing.

</details>

🤖 When it asks you to describe your design, paste this:

```
It's in the PRD, my LLD and docs/DECISIONS.md.
```

Then check each question's options against those files. Reply with a
number, usually `1`. Sometimes none of the files answers a question, or
your LLD and `docs/DECISIONS.md` disagree. That's a catch: pick the answer
you'd defend. The override rule records when a person changes a case's
group or service after the agent moved it. For the override rule, pick
built after the workshop, as `docs/DECISIONS.md` says. Never press **Tab**
or **Right arrow**. Grey text in the box is only a guess, and those keys
would accept it.

🤖 For gates, paste this instead of a number:

```
Use the gates in docs/DECISIONS.md, word for word.
```

✅ Before the read-back, it has asked about failure, security, cost,
boundaries and gates (milestones). The read-back is the list of terms
Claude shows you before it writes anything. It may not ask what stops the
agent checking one route and applying another. `docs/DECISIONS.md` already
answers that, and step 3 makes it terms.

<details><summary>🛟 It skipped one</summary>

🤖 **Claude:**

```
Ask me about each topic or question you skipped, one at a time, first.
```

</details>

### 3. Check the read-back

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The read-back is the exact list of terms the record will hold. A decision
missing here is missing from the contract. So now is the time to make the
list complete. Nothing is written until you agree to a list.

</details>

Claude lists every term and asks `Confirm these N terms, or correct any.`
Whatever it lists, 🤖 paste this:

```
Not agreed yet. Add any missing terms, one per decision in
docs/DECISIONS.md from How a run starts to Caps and retention, with its
Names: rows that decide the same thing share one term. Include the seed
data, the run states and the build order; each row that's out of scope
for this record, as a boundary term; capability 4's checks, each run by
apply_route itself on the route it applies, as consecutive terms; only
apply_route changes a case's service, group or Assigned to; each table the
app writes, with its writers as docs/DECISIONS.md names them.
Replace any weaker term that says the same. Nothing in the record says
OPEN or VERIFY. Read the terms back again.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude's first list of terms often misses decisions. This asks for a term
for each decision in `DECISIONS.md`: the starting records the app installs,
the stages a run goes through, the build order, each thing this release
leaves out, each check on a move the agent wants to make (one term per
check), that only the `apply_route` tool changes a case's service, group or
assignee, and which parts of the app write each table. Where two terms say
the same thing, Claude keeps the more exact one, and no term may stay
undecided (OPEN) or unchecked (VERIFY). Then Claude reads the whole list
back, so you can check it before anything is written.

</details>

✅ ✏️ Check the new read-back against
`hr-case-router/docs/DECISIONS.md`, open in VS Code:

- **How a run starts** to **Failures:** every row is in a term, including
  the seed data and the build order. The gates stay in §7.
- **Caps and retention:** every row is in a term, with 10 runs an hour,
  100 a day, 0.7 and 300 seconds.
- Each row that's out of scope is a boundary term, a term that says what
  the app leaves out.
- Capability 4's checks sit together, one per term. Each is run by
  `apply_route` on the route it applies.
- Each table's writers are the ones **Who writes each table** names. There's
  no new module, such as a shared writer.
- A row that lists things keeps every item in its term. For example, the
  term for **Access across scopes** names each table, including the HR
  security policies.
- No term says `OPEN` or `VERIFY`.

If anything is wrong, reply `Not agreed yet.` and the change. Do this until
it's right.

Then, before you confirm, have Claude check the terms against the files they
come from. 🤖 Paste this:

```
Not agreed yet. Check these terms against docs/DECISIONS.md and
docs/LLD-HRCaseRouter.md. Match each DECISIONS row from How a run starts
to Caps and retention to the term that covers it, and show only the rows
with none, as MISSING. Then answer yes or no: no two terms contradict
each other; every term says what its DECISIONS row says, no more and no
less; every way a run can end names the state its log row ends in; no
term needs a ruling before code can be written; no term number clashes
with an id in the LLD; each gate in Tests and gates can pass with these
terms. For each MISSING row and each no, name the terms and the row, fix
the terms, and read them back again.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude checks the terms against `DECISIONS.md` and your LLD before anything
is signed. It lists any decision no term covers, then answers six yes-or-no
questions: do two terms contradict each other, does a term say more or less
than its decision, does every way a run ends say what state it ends in,
does a term still need a ruling, does a term number clash with the LLD's,
and can every gate pass. It fixes each problem and reads the terms back
again. A gap caught here costs one reply, but after signing it costs a
signed amendment, a written change to the record.

</details>

✅ No row is MISSING, and it answers yes six times. If it answers no,
Claude fixes the terms and reads them back. Paste the check again until it
answers six yeses.

<details><summary>ℹ️ What C1, §7… mean</summary>

Claude numbers each term `C1`, `C2` and so on. Each is one rule of your
design record that a test or a person can check. Think of `C` as
*contract*. It isn't a capability: capability 3 is never `C3`. `§` means
section. `§3` is the record's list of terms, `§7` its gates and `§9` its
sign-off. [All the labels](APPENDIX.md#c1-c2-design-terms).

</details>

<details><summary>🛟 Still wrong after two rounds</summary>

🤖 **Claude:**

```
Not agreed yet. List each row of docs/DECISIONS.md from How a run
starts to Caps and retention, with the number of the term that covers it,
or MISSING. Add a term for each MISSING row, then read the terms back
again.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude lists each decision in `DECISIONS.md`, from How a run starts to Caps
and retention. Beside each, it shows the number of the term that covers it,
or MISSING if no term does. Then it adds a term for each missing one and
reads the whole list back, so you can see at a glance that nothing was left
out.

</details>

If it's still wrong after that, tell your instructor.

</details>

### 4. Confirm

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your confirmation is your signature. Claude writes the record with exactly
the terms you agreed, and puts your name on its approval. After that,
changing a term needs a written, signed amendment.

</details>

🤖 **Claude:** At the read-back, type `Confirmed.` alone. When it asks your
name and role, type them, such as `Sam Lee, developer`.

✅ In VS Code, `hr-case-router/docs/DESIGN-HRCaseRouter.md` exists. §3 has
as many terms as the last read-back listed, and §9 has your name.

Claude may then offer to run `/prove-it:build-plan`, or to move the record
into the repo. Not yet: you'll do both in
[Module 5](MODULE-5-fence-and-plan.md).

### 5. Log it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Logging the design's catches now shows what the questions were worth,
before any code exists. You'll count them at the end of the day.

</details>

🤖 **Claude:**

```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. Read ~/projects/hr-case-router/catches.md first and skip any
line already there. One line each, as "4 | <what caught it> | <what, and
what was done>", where what caught it is one of prd, consult, research,
design, guard, test, review, partner, grade, drill. Show me the lines,
and when I reply keep, append them to
~/projects/hr-case-router/catches.md.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts this module's catches from what happened in this session, one
line each, in the catch log's format. You read them and reply `keep`, or
say what to change. They go in your catch log, the record of what the
process caught.

</details>

Check that there's a `design` line for each question none of your files
answered, and for each place your LLD and `DECISIONS.md` disagreed. Each
line names the term it added. Terms added at the read-back aren't catches.
If a line is about one, 🤖 reply:

```
Drop the lines about terms added at the read-back, then append the rest.
```

Otherwise reply `keep`.
<span data-show="surface:terminal">**In the terminal:** then type
`/exit`.</span>

⌨️ **Terminal**, in your window:

```
tail -n 5 ~/projects/hr-case-router/catches.md
```

✅ It shows the lines you kept.

## You now have

- `docs/DESIGN-HRCaseRouter.md` in your workspace, with your name in §9.
- This module's catches in `catches.md`.
