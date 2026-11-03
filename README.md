# Agentic Build Lab

*How this lab works · 5 minutes to read*

In one day you build a ServiceNow app, the **HR Case Router**. An AI agent
moves each new HR case to the group or HR service that should work it, with
a work note saying why. A case it can't route, or whose move a check stops,
stays put, with a note. Fulfillers can click **Reroute**. It's the customer's own
use case. Claude Code writes the code. You make the decisions, and checks
decide whether work may go on.

**The method is what you learn**: the AI types, people and checks decide.
Modules 1 to 8 each have one **catch**, a moment where the process stops a
mistake. Those moments are the lesson.

## The day

| When | Module | You leave with |
|---|---|---|
| Before the day, about 2 hours | [0 · Pre-work](MODULE-0-prework.md) | Tools, your instance, your app's private repo, and the inputs read |
| 08:50 · 10 min | Kickoff | The customer, the use case, and how the day runs |
| 09:00 · 40 min | [1 · Inputs to PRD](MODULE-1-prd.md) | An accepted PRD |
| 09:40 · 30 min | [2 · Consult](MODULE-2-consult.md) | `CONSULT.md`: what to build, and how |
| 10:10 · 75 min | [3 · Research and LLD](MODULE-3-research-and-lld.md) | A low-level design |
| 11:25 · 10 min | Break | |
| 11:35 · 55 min | [4 · Design challenge](MODULE-4-design.md) | A design record |
| 12:30 · 25 min | [5 · Check and plan](MODULE-5-fence-and-plan.md) | A plan on GitHub |
| 12:55 · 30 min | [6 · Build loop](MODULE-6-build-loop.md) | Your first story, merged |
| 13:25 · lunch | 6, continued | Claude builds the next stories while you eat |
| 14:15 · 60 min | 6, continued | The app installed, and the AI agent working live |
| 15:15 · 10 min | Break | |
| 15:25 · 40 min | [8 · Grade](MODULE-8-grade-and-handoff.md) | `GRADE.md`, a preview |
| 16:05 · 15 min | [9 · Debrief](MODULE-9-debrief.md) | Your count of catches |
| Afterwards | [After the workshop](AFTER-THE-WORKSHOP.md) Part 1, then [7 · Break it](MODULE-7-break-it.md), then the rest of After the workshop | A finished app, attacked and handed over |
| Then | [Your own PRD](OWN-PRD.md), [to production](PROMOTE.md) | The method on your own work |

The buffer, 16:20–17:00, is for catching up. Behind? Ask your instructor
for a checkpoint to start the next module from.

To read this guide as one page, after Module 0 step 5, run this in a
terminal: `open ~/projects/hr-case-router-lab-guide/LAB.html`

You work alone on the day. Your partner joins you after the workshop, to
attack your app and to test your runbook.

## What you need

- Admin on a ServiceNow instance with HR Service Delivery, its demo data and
  AI Agent Studio. Your instructor gives you one. Never a production instance.
- A Mac. Linux works too; Windows (WSL) only by arrangement with your
  instructor.
- A Claude plan: Max, Team, Enterprise or a Claude Console account. Pro
  works, with one sub-agent at a time: Module 6 shows how. On Pro or Max,
  first turn off model training in claude.ai **Settings > Privacy**.
- A personal GitHub account, or a company one only if it can create private
  repos. Send your instructor its user name, and accept their invite to this
  guide.

Module 0 installs everything else, including the prove-it kit: the Claude
Code plugin the lab runs on. You don't need to write code.

## Where you act

Every action starts with one of these labels.

| Label | What you do |
|---|---|
| 🤖 **Claude** | Type it into Claude Code |
| ⌨️ **Terminal** | Type it into a normal terminal, never into Claude |
| ✏️ **Editor** | Open or change the file yourself, in VS Code |
| 🌐 **Browser** | Use GitHub, or your instance as admin unless a step says to impersonate `hr.demo` |
| ✅ **Check** | What you should see |

Under some checks there's a closed 🛟 box. Open it only if what you see is
different. ℹ️ boxes say why, if you want to know.

While Claude runs in a Terminal window, that window is Claude's. For ⌨️
steps, use a second window: press **Cmd+N**.

Enter sends a message to Claude. For a new line inside one, type `\` and
then press **Enter**. **Sending:** paste a 🤖 box, type `go` after it, press
**Enter**. A line starting with `/`, and one-word replies such as `yes`,
`keep`, `approve`, `apply` and `ship it` (alone), are typed on their own,
with no `go`. Some replies must be exact, such as `Confirmed.`: each step
gives the words.

When Claude runs a command, Claude Code shows it on a line starting with ⏺,
and its output under it, on lines starting with ⎿. Read that output, not
Claude's summary. If it says `… +N lines`, press **Ctrl+O** to see it all.

<details><summary>🛟 Claude closed, or the window crashed, mid-step?</summary>

In the same folder, run `claude --continue`. It reopens the conversation
where it stopped.

</details>

## Rules for the whole lab

1. **Never paste this guide into Claude.** Only the text in 🤖 boxes goes
   in. If Claude sees the checks, they stop being checks.
2. **Passwords go into your own terminal or browser**, never into Claude.
3. **Claude never runs `now-sdk auth`.** You install the app yourself. The
   only install Claude runs is the grade's, to `lab-pdi`, and it asks you
   first.
4. **Never use a production instance.**
5. **Trust what a command prints**, not what Claude says about it.
6. **Follow what really happens.** Don't re-run a prompt to get a nicer
   answer. Write down what happened, and carry on.

**When Claude asks permission**, read the command, then:

- **1. Yes** for `git`, `gh`, `npm`, `node`, `now-sdk build`,
  `now-sdk explain` (the SDK's docs, nothing live) and
  `now-sdk query --auth lab-pdi` (reads records on your instance, writes
  nothing), or their `npx @servicenow/sdk …` forms, and for files in
  `~/projects/hr-case-router`, Module 1's
  `~/projects/hr-case-router-prd-review` or the kit's copy,
  `~/projects/prove-it-kit`.
- **No** for `now-sdk auth`; for `now-sdk install`, `deploy`, `exec`, `run`,
  `move` or `cicd`, and `npm run deploy`, except the grade's install to
  `lab-pdi`; for any alias but `lab-pdi`, anything that names
  your instance, and anything in this guide's folder.
- Not sure? **No**, then ask Claude what it was for.
- **Never choose "Yes, and don't ask again".** The asking is the check.
- **Auto mode** asks less and blocks instead, showing
  `Denied by auto mode classifier`. Blocked the step's own action? Reply
  `yes,` and the action, such as `yes, push the branch`. If not, reply
  `no, stop`.
- **Asked once** "Allow this read outside the working directories?", choose
  **Yes, and keep allowing any reads outside the working directories**: the
  lab's settings still keep Claude out of this guide, your notes and your
  keys.

## Words you'll meet

- **Repo:** a folder whose history git keeps. Your app's repo is
  `~/projects/hr-case-router/app`.
- **Commit:** one saved snapshot in that history.
- **Branch:** a separate line of commits. `main` changes only through pull
  requests.
- **Pull request:** a request on GitHub to merge a branch into `main`. It's
  reviewed first.
- **Story:** one small piece of work, filed as a GitHub issue.
- **Gate:** a milestone that stories hold up: MERGE, INSTALL, DEMO, HANDOFF.
- **Design term:** one numbered rule in your design record, such as `C3`.
  Every test names the term it proves.
- **Catch:** a real problem the process found **and that got fixed**, or
  that changed a decision. A check firing on something you planted to test
  it isn't a catch.

## Your folders and your catches

After Module 0, `~/projects` holds:

```
hr-case-router-lab-guide/   this guide: you read it, Claude never does
hr-case-router/              your workspace: Claude works here
  app/                        your app's repo, private on GitHub
  brief/                      the PRD, from Module 1
  catches.md                  one line per catch
hr-case-router-notes/        what Module 9 restores: Claude never reads it
prove-it-kit/                 a copy of the kit
```

You write no notes. At the end of each module, a **Log it** prompt has
Claude draft that module's catches, one line each. Reply `keep`, or say
what to change:

```
<module> | <what caught it> | <what it caught, and what was done>
```

For example: `1 | prd | An input asked for something the PRD left out; I listed it under Open decisions`. Module 9 counts them.

<details><summary>ℹ️ New to ServiceNow? Four moves cover every step</summary>

- **The filter navigator** is the search box at the top left (click **All**
  to see it). Type a table name and `.list`, such as
  `sn_hr_core_case.list`, and press **Enter** to open that table as a list.
- **To filter a list**, type in the search box at the top of a column and
  press **Enter**.
- **To make a record**, click **New** on a list, fill in the form, and click
  **Submit**.
- **A reference field** has a 🔍 beside it. Click it and pick a record.

</details>
