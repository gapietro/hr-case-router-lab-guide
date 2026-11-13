# Module 3 — Research, then the LLD

*⏱ 75 min · 10:10*

Claude checks its facts about the ServiceNow platform on your instance. You
read the raw rows it gets back, the records just as your instance returns
them. Then you write the LLD, the low-level design. It says how the app will
be built, part by part. **The catch:** Claude's research will be confident
and mostly right. Which of its claims does your instance contradict? Does
Claude's reading of each answer match the rows it got back?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** before anyone designs, someone checks what the platform
  really does. They check on the customer's own instance, not from memory.
- **Why it matters:** Claude's facts are confident guesses. One wrong fact
  breaks the build at install time, after the work is done.
- **Your mindset:** you're the auditor. A claim is true only when your
  instance shows it, in rows you've read yourself. Claude's summary of a
  query isn't the query. "Couldn't check" is an honest answer.

</details>

### 1. 🔮 Guess, then ask Claude for the facts

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The design can only use what the platform really offers. Claude lists the
platform facts that the lab's decisions rest on. For each one, it says how
sure it is and how to check it. Nothing is checked yet. Your guess gives you
a list of your own to compare with Claude's.

</details>

⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps: first
check that the earlier modules left what this one needs.

```
git -C ~/projects/hr-case-router-lab-guide pull -q
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 3
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `git -C ~/projects/hr-case-router-lab-guide pull -q`: Gets the newest
   copy of this guide, including the check's script. `-q` means it prints
   only errors.
2. `bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 3`:
   Checks that each earlier module left what it promised, such as your
   files, your GitHub repo and a clean `main`. It changes nothing. Each
   failed line names the step that fixes it.

</details>

✅ The last line is `Ready for Module 3.`

<details><summary>🛟 It prints a ❌</summary>

Do the step each ❌ names. Then run the check again. If you can't fix one,
tell your instructor before you go on. Every later step builds on it. They
can help you fix it. Or they can give you a checkpoint, the work so far
ready made, to start this module from.

</details>


Guess first: what does an agent that moves HR cases need from the platform?

<details><summary>🔮 The answer, once you've guessed</summary>

The agent needs:

- a way for code to transfer a case to another HR service;
- a way for code to start the agent in the background;
- a user to run as, `hr.router`, with the roles an AI user needs;
- tools that really run as that user;
- a run aimed at the app's own log row, not the case. Then the case never
  lands in the prompt, the text the AI is sent.

Two more are about the HR case table. Do its assignment rules, the rules
that pick a group for a case, fill an empty group? May the app stop anyone
changing the group from a list?

Claude states each one confidently. A fact counts only when rows on your
instance show it. Four of them only a run or the install can show: the
tools' user, the log row, an assignment rule filling an empty group, and
the app's list rule. For now, "Couldn't check" is the honest mark for those
four. A mark is the verdict on a fact, such as confirmed or contradicted.

Research should also find ServiceNow's own "Predict service and transfer
HR Cases" workflow. Its triggers stay off, so nothing starts it. It always
transfers, with none of the checks.

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
   workspace. Then it makes two folders there, `inputs` and `docs`. `&&` runs
   the second command only if the first one worked.
2. `cp ../hr-case-router-lab-guide/files/inputs/TECH-NOTES.md inputs/`: Copies
   the customer's technical notes on their HR case setup into `inputs`. Claude
   reads that copy, never this guide. `..` means the folder above,
   `projects`.
3. `cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/`: Copies the
   template for the low-level design (LLD) into `docs`. You fill it in with
   Claude later in this module.
4. `cp ../hr-case-router-lab-guide/files/DECISIONS.md docs/`: Copies the lab's
   technical decisions into `docs`. They're already made, and Claude's design
   follows them.
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
   workspace. Then it makes two folders there, `inputs` and `docs`. `&&` runs
   the second command only if the first one worked.
2. `cp ../hr-case-router-lab-guide/files/inputs/TECH-NOTES.md inputs/`: Copies
   the customer's technical notes on their HR case setup into `inputs`. Claude
   reads that copy, never this guide. `..` means the folder above,
   `projects`.
3. `cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/`: Copies the
   template for the low-level design (LLD) into `docs`. You fill it in with
   Claude later in this module.
4. `cp ../hr-case-router-lab-guide/files/DECISIONS.md docs/`: Copies the lab's
   technical decisions into `docs`. They're already made, and Claude's design
   follows them.

</details>

Then 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**.
Click the folder control, choose **Open folder…** and pick
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

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude reads the PRD, the consult, the customer's technical notes and the
lab's decisions. It lists, as numbered facts, every decision that depends on
research or a first live check. For each, it says how sure it is and how to
check it by reading records only. It designs, runs and writes nothing yet,
because your instance checks this list next.

</details>

✅ Claude lists eight rows of `DECISIONS.md`. It may split them into 20 or
more numbered facts. Among them are Transfer Case
(`ReclassifyCaseTransfer`) and the start in the background
(`AiAgentRuntimeUtil`). Others are the tools running as `hr.router`, its
roles, and P12. Two are about the assignment group: the assignment rules
for an empty group, and the `list_edit` rule, the app's rule that stops
lists changing the group. The last is ServiceNow's "Predict service and
transfer HR Cases" workflow. Its triggers are off, so it never starts, and
the app doesn't use it. The design record you write in Module 4 says why.
Compare the list with your guess.

<details><summary>ℹ️ What P12 means</summary>

`P1` to `P15` are the platform rules in `docs/DECISIONS.md`. Each is
something your instance really does that the build must allow for, with its
reason. P12 says a run's record is the app's own log row, never the case.
That way the platform never copies the whole case into the AI's request,
personal data included. Lower-case `p0` to `p2` are something else, which
you'll meet in Module 5.
[All the labels](APPENDIX.md#p1-to-p15-platform-rules).

</details>

### 2. Have Claude check them on your instance

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A fact counts only when your own instance shows it. Claude runs read-only
queries and prints the raw rows under each mark. You judge the evidence
yourself, rather than trust Claude's summary.

</details>

`now-sdk query` comes with the SDK plugin. It reads records through your
`lab-pdi` login and changes nothing.

🤖 **Claude:**

```
Check every one of those facts on my instance, in order, using only
now-sdk query: its --help, and read-only queries with --auth lab-pdi,
--fields, --display-value true and --limit 50, as many as each fact
needs. Narrow each query to its fact: one user, one table, one name. A
query that returns 50 rows may have missed some: narrow it and run it
again. No scripts, no other command. For each fact: the fact; each
command exactly as run; the raw rows it returned, or that none came
back; then one mark: confirmed, contradicted, couldn't check (say why),
or production only (true in inputs/TECH-NOTES.md, not on my instance).
Something this app will create, or only a run can show, finds nothing
yet: mark it couldn't check, never contradicted. End with a table of
every fact and its mark. Change nothing on the instance and write no
file.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude checks every fact on your `lab-pdi` login with read-only
`now-sdk query` commands, as many per fact as it needs, and changes nothing.
For each fact you get the commands exactly as run, the raw rows and one mark,
then a table of every mark. Names come back as names, not record ids, and a
query that may have missed rows is narrowed and run again. Anything the app
hasn't created yet, or only a run can show, is marked couldn't check, so an
honest gap isn't reported as a contradiction.

</details>

If it asks permission for `now-sdk query --auth lab-pdi`, choose **Yes**.
Don't choose "Yes, and don't ask again". An alias is the short name of an
instance login. For any other alias, or for `now-sdk auth`, choose **No**.

<div data-show="surface:terminal">

**In the terminal:** ✅ Under each fact, a ⏺ line runs `query` with
`--auth lab-pdi` on the table the fact is about. The rows it returned are
under it, on ⎿ lines. If it says `… +N lines`, press **Ctrl+O** to see them
all. The rows are the evidence. The mark is only Claude's reading of them.

</div>

<div data-show="surface:desktop">

**In the Code tab:** ✅ In the **Verbose** view, each fact has a `query`
call with `--auth lab-pdi` on the table it's about. The rows it printed are
under it. To get that view, press **Ctrl+O** until it shows. The rows are
the evidence. The mark is only Claude's reading of them.

</div>

<details><summary>🛟 now-sdk query fails, or Claude won't run it</summary>

Use a background script instead: code you paste into your instance and run
yourself, as admin. 🤖 **Claude:**

```
Write a read-only background script to research-script.js in this
folder, checking each of those facts. Use only new GlideRecord, new
GlideAggregate, addQuery, addEncodedQuery, setLimit, query, next, get,
getValue, getDisplayValue, getRowCount, getTableName and gs.print, and
no functions of your own. Per fact, gs.print its number, the table and
query, and the raw values, never "confirmed".
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude writes a background script, `research-script.js`, that only reads
records. It uses only a short list of allowed calls. For each fact it prints
the table, the query and the raw values, never a verdict. You check the
script and run it yourself as admin, so the evidence still comes from your
instance.

</details>

✏️ **Editor:** open `hr-case-router/research-script.js`. ✅ Every word just
before a `(`, and every word after `new`, is one of those calls. `if (`,
`while (` and `for (` are fine too. If you find another word, don't run the
script. Type `Read-only, please: use only the allowed calls.` and check
again.

🌐 **Browser**, as admin: type `sys.scripts.modern.do` in the filter
navigator, the search box at the top left. Press **Enter**. In the Editor,
copy the script with
<kbd data-mac="Cmd+A" data-win="Ctrl+A">Cmd+A (Mac) · Ctrl+A (Windows)</kbd>
and then
<kbd data-mac="Cmd+C" data-win="Ctrl+C">Cmd+C (Mac) · Ctrl+C (Windows)</kbd>.
Paste it into the page and click **Run script**. Copy the output lines, but
leave out any URL or instance name. 🤖 **Claude:** paste this, then the
lines:

```
Mark each fact from the script output below only: confirmed,
contradicted, couldn't check, or production only (in inputs/TECH-NOTES.md,
not on my instance). Facts it didn't look up are not checked.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude marks each fact only from the script output you pasted: confirmed,
contradicted, couldn't check, or production only. A fact the script didn't
look up stays unchecked, so no mark rests on Claude's memory.

</details>

</details>

<details><summary>🛟 One fact can't be queried</summary>

Look it up by hand, then tell Claude what you found. For example:
`Fact 3: contradicted. My instance shows …`. Each line below names a fact,
then the list to open for it.

- `AiAgentRuntimeUtil`: `sys_script_include.list`. Its **Accessible from**
  reads "All application scopes".
- The "AI Agent Background" channel: `sys_cs_channel.list`.
- `hr.router`: `sys_user.list`. Open the user and read its **Roles** and
  **Groups** tabs.
- HR services and their groups: `sn_hr_core_service.list`.
- Assignment rules: `sysrule_assignment.list`, where **Table** starts with
  `sn_hr`.
- List-edit rules: `sys_security_acl.list`, where **Name** starts with
  `sn_hr_core_case` and **Operation** is `list_edit`.
- The Predict workflow: `sn_aia_usecase.list`, where **Name** is "Predict
  service and transfer HR Cases". Its triggers:
  `sn_aia_trigger_configuration.list`, where **Usecase** is that name. Each
  shows **Active** false.
- Transfer methods, `ReclassifyCaseTransfer` among them:
  `sn_hr_core_transfer_case_config.list`.

</details>

### 3. Audit each mark against its rows

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A mark is Claude's reading of the rows. A reading can be wrong even when the
query ran fine. Checking each mark against its own rows is the audit. The
facts and your corrections go into a file that the LLD copies as it is. That
way the design rests only on what you've checked.

</details>

For each fact, read the rows first, then the mark. Correct the mark if you
find a query in the wrong table, no rows marked `confirmed`, or a row that
says the opposite. Write each correction in one line, such as
`Fact 2: contradicted. The rows show no "AI Agent Background" channel.` or
`Fact 6: couldn't check. The query read sys_script; the fact is about a
workflow.`

🤖 **Claude:** send all your corrections in one message. If every mark held,
skip this. When Claude has answered, paste:

```
Write every fact you checked to research-facts.md in this folder: its
final mark, mine where I corrected yours, the command exactly as run, and
the rows that back it. Those go into the LLD as they are. Name my instance
only as lab-pdi: no web address and no user name.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude writes every fact it checked to `research-facts.md`, with its final
mark, the command exactly as run and the rows behind it. Where you corrected
a mark, yours is the one it keeps. It names your instance only as `lab-pdi`,
because the guard that checks each commit would refuse its address and your
user name. The LLD copies the file as it is, so what you audited is what the
design relies on.

</details>

✏️ **Editor:** open `hr-case-router/research-facts.md`. ✅ Every fact you
checked is there, and each mark matches its rows. Each `production only`
fact cites TECH-NOTES.md, not a query. A `production only` fact is true in
the customer's notes but not on your instance. Compare the facts with your
guess in step 1.

### 4. Draft the LLD

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The LLD says how each part of the app will be built. It ties each part to a
PRD capability. Claude drafts it only from the PRD, the consult, your
audited facts and the decisions already made. That way nothing in it is new
or unbacked. A summary first lets you fix its shape before the file is
written.

</details>

✏️ **Editor:** skim `hr-case-router/docs/DECISIONS.md`. It holds the
technical decisions already made, so the build has nothing left to ask.

🤖 **Claude:**

```
Draft docs/LLD-HRCaseRouter.md in this folder, not in app/, and don't
commit it: Module 5 moves it into the app. Use docs/LLD-TEMPLATE.md, the PRD,
CONSULT.md and research-facts.md. Every component cites a PRD capability,
written as "capability 3", never C3: C numbers are the design record's.
Take every decision in docs/DECISIONS.md as made. Section 7 copies
every fact from research-facts.md, with its mark and command, as audited.
Anything still undecided goes in section 8, numbered D1, D2…: never
invent a business decision. Show me a summary first; don't write the file
yet.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts `docs/LLD-HRCaseRouter.md` from the template, in your
workspace rather than in `app/`, where Module 5 moves it. It takes every
decision in `DECISIONS.md` as made, and every component cites a PRD
capability in words. Section 7 copies your audited facts, and anything still
undecided goes in section 8 as D1, D2 and so on, never an invented business
decision. It shows you a summary first and writes the file only when you say
so.

</details>

✅ The summary covers capabilities 1 to 9, the numbered things the PRD says
the app must do. Capability 3 is the agent and its three tools. Only
`apply_route` moves a case, after capability 4's checks. Capability 7's
override rule comes after the workshop. Section 7 is `research-facts.md`.
Fix the summary if it needs it. Then type `Looks right. Write the file.`

✏️ **Editor:** open `hr-case-router/docs/LLD-HRCaseRouter.md`. ✅ Its
tools table has `read_case`, `apply_route` and `leave_note`. Section 7
matches `research-facts.md`, fact for fact.

<details><summary>ℹ️ What D1, §7 and C3 mean</summary>

`D1`, `D2`… are your LLD's open decisions, in its section 8. They're
questions the LLD can't settle yet. The customer decides them, or you do in
Module 4. `§` means section, so if Claude writes `§7`, it means section 7,
the research log. `C3` is rule 3 of the design record you write in
Module 4. That's why the LLD writes capabilities in words, such as
"capability 3".
[All the labels](APPENDIX.md#d1-d2-open-decisions-in-your-lld).

</details>

### 5. Log it

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

A wrong platform fact found now costs one line. Found at install time, it
costs rework. Logging this module's catches adds to the record you count at
the end of the day.

</details>

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

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude drafts this module's catches from what happened in this session, one
line each, in the catch log's format. You read them and reply `keep`, or say
what to change. They go in your catch log, the record of what the process
caught.

</details>

Keep a `research` line for each claim your instance contradicted or didn't
support, if it changed your LLD. Keep one too for each mark you corrected
against its rows in step 3. Then reply `keep`.

✅ ⌨️ `tail -n 5 ~/projects/hr-case-router/catches.md` shows the lines you
kept. <span data-show="surface:terminal">**In the terminal:** then type
`/exit` in Claude.</span>

## You now have

- `research-facts.md` and `docs/LLD-HRCaseRouter.md`. Their facts are
  backed by queries you read. This module's catches are in `catches.md`.
- The full LLD review is on [After the workshop](AFTER-THE-WORKSHOP.md).
