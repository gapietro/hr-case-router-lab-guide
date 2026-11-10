# Module 4 — Design challenge

*⏱ 55 min · 11:35*

Claude challenges your design, question by question; you confirm the
result. **The idea:** agreed building plans. Once agreed, moving a wall needs
a written change order. **The catch:** which questions can't your PRD, LLD
and decisions answer?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before code, the design is questioned hard, then agreed as
  the contract between the builder and the customer.
- **Why it matters:** a gap found in a question costs a sentence; found in
  code, a rebuild.
- **Your mindset:** answer as the owner who'll have to defend each decision. A
  question your design can't answer is a find.

</details>

### 1. Start the challenge

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The design challenge is a kit skill. It questions your design one question at
a time, then writes the agreed design record: the contract the build plan and
every later check rely on. Pointing it at your PRD, LLD and decisions means it
asks only what those files leave open, instead of having you retype the
design.

</details>

⌨️ **Terminal**, in your window: first check that the earlier modules left
what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 4
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, the check's script included. `-q` prints only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 4`:
   Checks that each earlier module left what its checks promise, such as
   your files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 4.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names, then run the check again. Can't fix one? Tell your
instructor before you go on: every later step builds on it. They can help you
fix it, or give you a checkpoint to start this module from.

</details>


<div data-show="surface:terminal">

**In the terminal:** ⌨️ start Claude in your workspace:

```
cd ~/projects/hr-case-router
claude
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router`: Goes into your workspace, where the
   accepted PRD and your LLD are, so the design challenge can read them.
2. `claude`: Starts Claude Code in the folder you're in. This window is now
   the Claude window.

</details>

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**, click
the folder control, choose **Open folder…**, and pick
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

This names the feature HRCaseRouter and tells Claude your design is already
written down, in the PRD, your LLD (how each part will be built) and
`DECISIONS.md`. For each question, Claude offers 3 or 4 numbered answers taken
from those files, with the files' own answer first; if they don't answer it,
Claude says so and puts the answer it recommends first. Then it asks about what
could go wrong, who may see or change what, what the app costs to run and
what's left out, but only where your files leave a gap, and then about the
gates, the checkpoints the build must pass. Anything still waiting on the
customer stays out of this design.

</details>

### 2. Answer each question

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Each answer you pick becomes a rule in the signed design, so it should come
from your files, not a fresh idea. Picking your files' own answer keeps the
design record and the LLD saying the same thing.

</details>

🤖 When it asks you to describe your design, paste this:

```
It's in the PRD, my LLD and docs/DECISIONS.md.
```

Then check each question's options against those files, and reply with a
number, usually `1`. If none of them answers it, or your LLD and DECISIONS
disagree, that's a catch: pick the one you'd defend. For the override rule,
pick built after the workshop, per `docs/DECISIONS.md`. Never press **Tab**
or **Right arrow**: grey text is only a guess.

🤖 For gates, paste this instead of a number:

```
Use the gates in docs/DECISIONS.md, word for word.
```

✅ Before the read-back, it has asked about failure, security, cost,
boundaries and gates (milestones). It may not ask what stops the agent
checking one route and applying another: `docs/DECISIONS.md` already
answers that, and step 3 makes it terms.

<details><summary>🛟 It skipped one</summary>

🤖 **Claude:**

```
Ask me about each topic or question you skipped, one at a time, first.
```

</details>

### 3. Check the read-back

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The read-back is the exact list of terms the record will hold, each a numbered
rule a test or a person can check. A decision missing here is missing from the
contract, so this is the moment to make the list complete. Nothing is written
until you agree to a list.

</details>

It lists every term and asks `Confirm these N terms, or correct any.`
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

Claude's first list of terms, the numbered rules your design record will hold,
often misses decisions, so this tells it to add one for every decision in
`DECISIONS.md`. That includes the starting records the app installs, the stages
a run goes through, the order you build in, each thing this release leaves out,
each check on a move the agent wants to make (one term per check), that only
the `apply_route` tool changes a case's service, group or assignee, and which
parts of the app write to each table, as `DECISIONS.md` names them. Where two terms say the same thing it keeps the more exact one, and no
term may stay undecided (OPEN) or unchecked (VERIFY). Then Claude reads the
whole list back, so you can check it before anything is written.

</details>

✅ ✏️ Check the new read-back against
`hr-case-router/docs/DECISIONS.md`, open in VS Code:

- **How a run starts** to **Failures:** every row is in a term, the seed
  data and the build order among them. The gates stay in §7.
- **Caps and retention:** every row is in a term, with 10 runs an hour,
  100 a day, 0.7 and 300 seconds.
- Each out-of-scope row is a boundary term.
- Capability 4's checks sit together, one per term, each run by
  `apply_route` on the route it applies.
- Each table's writers are the ones **Who writes each table** names: no
  new module, such as a shared writer.
- A row that lists things keeps every item in its term, such as each table
  in **Access across scopes**, the HR security policies included.
- No term says `OPEN` or `VERIFY`.

Anything wrong? Reply `Not agreed yet.` and the change, until it's right.

Then, before you confirm, have Claude check the terms against the files they
come from. 🤖 paste this:

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

Claude checks the terms it read back against `DECISIONS.md` and your LLD
before anything is signed. It lists any decision no term covers, then answers
six yes-or-no questions: do two terms contradict each other, does any term
say more or less than its decision, does every way a run ends say what state
it ends in, does any term still need a ruling, does any term number clash
with the LLD's, and can every gate pass. It fixes each problem and reads the
terms back again. A gap caught here costs one reply; caught after signing,
it costs a signed amendment.

</details>

✅ No row is MISSING, and six yeses. A no? Claude fixes the terms and reads
them back: paste the check again until it answers six yeses.

<details><summary>ℹ️ What C1, §7… mean</summary>

Claude numbers each term `C1`, `C2`…: one rule of your design record that a
test or a person can check. Think of `C` as *contract*: it isn't a capability,
and capability 3 is never `C3`. `§` means section: `§3` is the record's list
of terms, `§7` its gates and `§9` its sign-off.
[All the labels](APPENDIX.md#c1-c2-design-terms).

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
and retention, next to the number of the term that covers it, or the word
MISSING if no term does. Then it adds a term for each missing one and reads the
whole list back, so you can see at a glance that nothing was left out.

</details>

Still wrong after that? Tell your instructor.

</details>

### 4. Confirm

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your confirmation is the signature: Claude writes the record with exactly the
terms you agreed, and puts your name on its approval. From then on, changing a
term needs a written, signed amendment.

</details>

🤖 **Claude:** At the read-back, type `Confirmed.` alone. When it asks your
name and role, type them, such as `Sam Lee, developer`.

✅ In VS Code, `hr-case-router/docs/DESIGN-HRCaseRouter.md` exists, with
as many terms in §3 as the last read-back listed, and your name in §9.

It may then offer `/prove-it:build-plan`, or moving the record into the
repo. Not yet: that's Module 5.

### 5. Log it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Logging the design's catches now records what questioning it was worth, before
any code exists. Module 8 counts them.

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

Claude drafts this module's catches as one line each, in the catch log's
format, from what happened in this session. You read them and reply `keep`, or
say what to change. They go in your catch log, the record of what the process
caught.

</details>

Confirm a `design` line for each question none of your files answered, or
where your LLD and DECISIONS disagreed, with the term it added. Terms
added at the read-back aren't catches. Any line about one? 🤖 Reply:

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

- `docs/DESIGN-HRCaseRouter.md` in your workspace, with your name in §9,
  and this module's catches in `catches.md`.
