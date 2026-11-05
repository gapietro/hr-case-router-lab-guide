# Module 3 — Research, then the LLD

*⏱ 75 min · 10:10*

Claude checks its own platform facts on your instance, you read the raw
rows, then you write the low-level design (LLD). **The catch:** Claude's
research will be confident and mostly right. Which of its claims does your
instance contradict? And does Claude's reading of each answer match the rows
it got back?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before anyone designs, someone checks what the platform
  really does, on the customer's own instance, not from memory.
- **Why it matters:** Claude's facts are confident guesses. One wrong one
  breaks the build at install time, after the work is done.
- **Your mindset:** you're the auditor. A claim is true only when your
  instance shows it, in rows you've read yourself. Claude's summary of a
  query isn't the query. "Couldn't check" is an honest answer.

</details>

### 1. 🔮 Guess, then ask Claude for the facts

Guess first: what does an agent that moves HR cases need from the platform?

<details><summary>🔮 The answer, once you've guessed</summary>

A way for code to transfer a case to another service; a way to start the
agent from code, in the background; a user to run as, `hr.router`, with
the roles an AI user needs; tools that really run as that user; and a run
aimed at the app's log row, so the case never lands in the prompt.

Two more are about the HR case table: whether its assignment rules fill
an empty group, and whether the app may stop lists changing the group.

Claude states each one confidently. It counts only when rows on your
instance show it. Four only a run or the install can show: the tools'
user, the log row, an assignment rule filling an empty group, and the
app's list rule. "Couldn't check" is the honest mark for those for now.
Research should also find ServiceNow's own "Predict service and transfer
HR Cases" workflow. It stays off: it always transfers, with none of the
checks.

</details>

<div data-show="surface:terminal">

**In the terminal:** ⌨️ copy the inputs, and start Claude:

```
cd ~/projects/hr-case-router && mkdir -p inputs docs
cp ../hr-case-router-lab-guide/files/inputs/TECH-NOTES.md inputs/
cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/
cp ../hr-case-router-lab-guide/files/DECISIONS.md docs/
claude
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router && mkdir -p inputs docs`: Goes into your
   workspace, then makes two folders in it, `inputs` and `docs`. `&&` runs the
   second command only if the first worked.
2. `cp ../hr-case-router-lab-guide/files/inputs/TECH-NOTES.md inputs/`: Copies
   the customer's technical notes on their HR case setup into `inputs`, so
   Claude reads its own copy, never this guide. `..` means the folder above,
   `projects`.
3. `cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/`: Copies the
   template for the low-level design (LLD) into `docs`. You fill it in with
   Claude later in this module.
4. `cp ../hr-case-router-lab-guide/files/DECISIONS.md docs/`: Copies the lab's
   technical decisions, already made, into `docs`, so Claude's design follows
   them.
5. `claude`: Starts Claude Code in the folder you're in. This window is now
   the Claude window.

</details>

</div>

<div data-show="surface:desktop">

**In the Code tab:** ⌨️ in your window, copy the inputs:

```
cd ~/projects/hr-case-router && mkdir -p inputs docs
cp ../hr-case-router-lab-guide/files/inputs/TECH-NOTES.md inputs/
cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/
cp ../hr-case-router-lab-guide/files/DECISIONS.md docs/
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router && mkdir -p inputs docs`: Goes into your
   workspace, then makes two folders in it, `inputs` and `docs`. `&&` runs the
   second command only if the first worked.
2. `cp ../hr-case-router-lab-guide/files/inputs/TECH-NOTES.md inputs/`: Copies
   the customer's technical notes on their HR case setup into `inputs`, so
   Claude reads its own copy, never this guide. `..` means the folder above,
   `projects`.
3. `cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/`: Copies the
   template for the low-level design (LLD) into `docs`. You fill it in with
   Claude later in this module.
4. `cp ../hr-case-router-lab-guide/files/DECISIONS.md docs/`: Copies the lab's
   technical decisions, already made, into `docs`, so Claude's design follows
   them.

</details>

Then 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**, click
the folder control, choose **Open folder…**, and pick
`~/projects/hr-case-router`.
Then press **Ctrl+O** until the view is **Verbose**.

</div>

🤖 **Claude:**

```
Read brief/, CONSULT.md, inputs/TECH-NOTES.md and docs/DECISIONS.md.
List, as numbered facts, every row in docs/DECISIONS.md that says "your
research confirms", "your research should find", "first live check
proves" or "From code on Australia Patch 5". For each, say how sure you are and how to check it by reading
records only. Design nothing, run nothing, write no file.
```

✅ Eight facts: Transfer Case (`ReclassifyCaseTransfer`); the start in the
background (`AiAgentRuntimeUtil`); the tools as `hr.router`; its roles;
P12; the assignment rules for an empty group; the `list_edit` rule on the
assignment group; and ServiceNow's "Predict service and transfer HR Cases"
workflow, inactive and not used: your design record says why. Compare with
your guess.

### 2. Have Claude check them on your instance

The SDK plugin's `now-sdk query` reads records through your `lab-pdi`
login and changes nothing.

🤖 **Claude:**

```
Check each of those facts on my instance, using only now-sdk query: its
--help, and read-only queries with --auth lab-pdi, --fields and --limit 5,
one or two per fact. No scripts, no other command. For each fact, in
order: the fact; each command exactly as run; the raw rows it returned,
or that none came back; then one mark: confirmed, contradicted, couldn't
check (say why), or production only (true in inputs/TECH-NOTES.md, not on
my instance). Something this app will create, or only a run can show,
finds nothing yet: mark it couldn't check, never contradicted. Change
nothing on the instance and write no file.
```

If it asks permission for `now-sdk query --auth lab-pdi`, choose **Yes**
(not "Yes, and don't ask again").
Any other alias, or `now-sdk auth`: **No**.

<div data-show="surface:terminal">

**In the terminal:** ✅ Under each fact, a ⏺ line runs `query` on the table
the fact is about, with `--auth lab-pdi`, and ⎿ rows under it. If it says
`… +N lines`, press **Ctrl+O**: the rows are the evidence; the mark is only
Claude's reading.

</div>

<div data-show="surface:desktop">

**In the Code tab:** ✅ in the **Verbose** view (**Ctrl+O** until it shows),
each fact has a `query` call on the table it's about, with `--auth lab-pdi`,
and the rows it printed. The rows are the evidence; the mark is only
Claude's reading.

</div>

<details><summary>🛟 now-sdk query fails, or Claude won't run it</summary>

Fall back to a script you run yourself, as admin. 🤖 **Claude:**

```
Write a read-only background script to research-script.js in this
folder, checking each of those facts. Use only new GlideRecord, new
GlideAggregate, addQuery, addEncodedQuery, setLimit, query, next, get,
getValue, getDisplayValue, getRowCount, getTableName and gs.print, and
no functions of your own. Per fact, gs.print its number, the table and
query, and the raw values, never "confirmed".
```

✏️ **Editor:** open `hr-case-router/research-script.js`. ✅ Every word just
before a `(`, and after `new`, is one of those calls; `if (`, `while (` and
`for (` are fine too. Another word? Don't run it: type
`Read-only, please: use only the allowed calls.` and check again.

🌐 **Browser**, as admin: type `sys.scripts.do` in the filter
navigator, press **Enter**, paste the script
(<kbd data-mac="Cmd+A" data-win="Ctrl+A">Cmd+A (Mac) · Ctrl+A (Windows)</kbd>,
<kbd data-mac="Cmd+C" data-win="Ctrl+C">Cmd+C (Mac) · Ctrl+C (Windows)</kbd>
in the Editor) and click **Run script**. Copy the output lines, minus any URL or
instance name. 🤖 **Claude:** paste this, then the lines:

```
Mark each fact from the script output below only: confirmed,
contradicted, couldn't check, or production only (in inputs/TECH-NOTES.md,
not on my instance). Facts it didn't look up are not checked.
```

</details>

<details><summary>🛟 One fact can't be queried</summary>

Look it up by hand and tell Claude, such as
`Fact 3: contradicted. My instance shows …`.

- `AiAgentRuntimeUtil`: `sys_script_include.list`. Read **Accessible from**.
- The "AI Agent Background" channel: `sys_cs_channel.list`.
- `hr.router`: `sys_user.list`, open it, and read its **Roles** and
  **Groups** tabs.
- HR services and their groups: `sn_hr_core_service.list`.
- Assignment rules: `sysrule_assignment.list`, **Table** starting
  `sn_hr`.
- List-edit rules: `sys_security_acl.list`, **Name** starting
  `sn_hr_core_case`, **Operation** `list_edit`.
<!-- DRY RUN: confirm the AiAgentRuntimeUtil line; which lists show the
Predict workflow and the ReclassifyCaseTransfer method? -->

</details>

### 3. Audit each mark against its rows

For each fact, read the rows first, then the mark. A query in the wrong
table, no rows marked `confirmed`, or a row that says the opposite: correct
it in one line, such as
`Fact 2: contradicted. The rows show no "AI Agent Background" channel.` or
`Fact 6: couldn't check. The query read sys_script; the fact is about a
workflow.`

🤖 **Claude:** send your corrections as one message; skip this if every
mark held. When Claude has answered, paste:

```
Write every fact you checked to research-facts.md in this folder: its
final mark, mine where I corrected yours, the command exactly as run, and
the rows that back it. Those go into the LLD as they are.
```

✏️ **Editor:** open `hr-case-router/research-facts.md`. ✅ Every fact you
checked is there, each mark matches its rows, and each `production only`
fact cites TECH-NOTES.md, not a query. Compare with your guess in step 1.

### 4. Draft the LLD

✏️ **Editor:** skim `hr-case-router/docs/DECISIONS.md`: the technical
decisions already made, so the build has nothing left to ask.

🤖 **Claude:**

```
Draft docs/LLD-HRCaseRouter.md from docs/LLD-TEMPLATE.md, the PRD,
CONSULT.md and research-facts.md. Every component cites a PRD capability.
Take every decision in docs/DECISIONS.md as made. Section 7 copies
every fact from research-facts.md, with its mark and command, as audited.
Anything still undecided goes in section 8, numbered D1, D2…: never
invent a business decision. Show me a summary first; don't write the file
yet.
```

✅ The summary covers capabilities 1 to 9: 3 is the agent and its three
tools, and only `apply_route` moves a case, after 4's checks; 7's override
rule comes after the workshop; section 7 is `research-facts.md`.
Fix the summary if needed, then type `Looks right. Write the file.`

✏️ **Editor:** open `hr-case-router/docs/LLD-HRCaseRouter.md`. ✅ Its
tools table has `read_case`, `apply_route` and `leave_note`, and section 7
matches `research-facts.md`, fact for fact.

### 5. Log it

🤖 **Claude:**

```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. Read ~/projects/hr-case-router/catches.md first and skip any
line already there. One line each, as "3 | <what caught it> | <what, and
what was done>", where what caught it is one of prd, consult, research,
design, guard, test, review, partner, grade, drill. Show me the lines,
and when I reply keep, append them to
~/projects/hr-case-router/catches.md.
```

Keep a `research` line for each claim your instance contradicted or didn't
support, if it changed your LLD, and for each mark you corrected against
its rows in step 3. Then reply `keep`.

✅ ⌨️ `tail -n 5 ~/projects/hr-case-router/catches.md` shows the lines you
kept. <span data-show="surface:terminal">**In the terminal:** then type
`/exit` in Claude.</span>

## You now have

- `research-facts.md` and `docs/LLD-HRCaseRouter.md`, with facts backed
  by queries you read, and this module's catches in `catches.md`.
- The full LLD review is on [After the workshop](AFTER-THE-WORKSHOP.md).
