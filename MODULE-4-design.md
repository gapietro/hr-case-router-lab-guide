# Module 4 — Design challenge

*⏱ 55 min · 11:35*

Claude challenges your design, question by question; you confirm the
result. **The idea:** agreed building plans. Once agreed, moving a wall needs
a written change order. **The catch:** can the agent check one route, then
apply another?

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

This confirms the feature name, HRCaseRouter, and tells the challenge your
design is already written down: the PRD, your LLD and `DECISIONS.md`. For each
question, Claude offers 3 or 4 numbered answers drawn from those files, with
their own answer first; if none answers it, it says so and puts its
recommendation first. On failure, security, cost and boundaries it asks only
what your files leave open, then moves on to gates, and anything still waiting
on the customer stays out of this record.

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
boundaries and gates (milestones), and what stops the agent checking one
route and applying another.

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
apply_route changes a case; every table the app writes has one owner.
Replace any weaker term that says the same. Nothing in the record says
OPEN or VERIFY. Read the terms back again.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

This asks Claude to add a term for each decision in `DECISIONS.md` it left
out, and to cover the seed data, the run states, the build order, the
out-of-scope rows as boundaries, capability 4's checks, and one owner for each
table the app writes. It replaces weaker terms that say the same thing and
leaves nothing marked OPEN or VERIFY. Then it reads the whole list back again,
so you check the new version before anything is written.

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
- No term says `OPEN` or `VERIFY`.

Anything wrong? Reply `Not agreed yet.` and the change, until it's right.

<details><summary>🛟 Still wrong after two rounds</summary>

🤖 **Claude:**

```
Not agreed yet. List each row of docs/DECISIONS.md from How a run
starts to Caps and retention, with the number of the term that covers it,
or MISSING. Add a term for each MISSING row, then read the terms back
again.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude lists each row of `DECISIONS.md`, from How a run starts to Caps and
retention, beside the number of the term that covers it, or MISSING. It adds a
term for every MISSING row and reads the whole list back, so you can see at a
glance that nothing was dropped.

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
any code exists. Module 9 counts them.

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
where your LLD and DECISIONS disagreed, with the term it added. Terms you
added at the read-back aren't catches. Reply `keep`.
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
