# Agentic Build Lab

*How this lab works · 5 minutes to read*

In one day you'll build a ServiceNow app called the **HR Case Router**.

<div class="usecase">

**Use case**

<div class="usecase-box">

When a new HR case comes in, an AI agent moves it to the assignment group or
HR service that should work it. It adds a work note that says why it chose
that one. If it can't route a case or a safety check stops the move, the
case stays where it is. The work note says why.

All of this happens on its own as soon as the case is created. A fulfiller
is someone who works HR cases. If a fulfiller thinks a case is in the wrong
place, they can click **Reroute**. The agent then routes it again in the
same way.

</div>

</div>

You'll tell Claude Code how the app should work and which checks it must
pass, and it will write the code.

**What you learn** is a way to build with AI that you can trust:

- **Agree:** Settle the design before anything is built.
- **Catch:** Find mistakes before any code exists.
- **Check:** Work moves on only when its checks pass, not because someone
  says it's done.
- **Trust:** Rely on evidence you can run again. A
  <span data-term="command-output">command's output</span> is evidence, but
  Claude's summary of it is not.
- **Log:** Document decisions and progress so the next person can pick up
  where you left off.

Each time the process stops a real mistake, that's a
**<span data-term="catch">catch</span>**. You'll total your catches up at
the end of the day.

You'll work alone through every module on lab day. After the workshop, a
partner will attack your app and test your runbook. Your runbook is your
steps for running and fixing the app.

## Lab day agenda

| When | Module | Result |
|---|---|---|
| Before the lab · ~2 hours | [Pre-work](MODULE-0-prework.md) | Everything installed, your instance ready, your app's private repo, and the inputs read |
| 08:50 · 10 min | Kickoff | The customer, the use case, and how the day runs |
| 09:00 · 40 min | [1 · Inputs to PRD](MODULE-1-prd.md) | An accepted product requirements document (PRD) |
| 09:40 · 30 min | [2 · Consult](MODULE-2-consult.md) | `CONSULT.md`: what to build, and how |
| 10:10 · 75 min | [3 · Research and LLD](MODULE-3-research-and-lld.md) | A low-level design (LLD) |
| 11:25 · 10 min | Break | |
| 11:35 · 55 min | [4 · Design challenge](MODULE-4-design.md) | A design record |
| 12:30 · 25 min | [5 · Check and plan](MODULE-5-fence-and-plan.md) | A plan on GitHub |
| 12:55 · 30 min | [6 · Build loop](MODULE-6-build-loop.md) | Your first story, merged |
| 13:25 · lunch | [6, continued](MODULE-6-build-loop.md#part-2--the-batch-over-lunch-start-at-1325) | Claude builds the next stories while you eat |
| 14:15 · 60 min | [6, continued](MODULE-6-build-loop.md#7-read-the-evidence-from-1415) | The app installed, and the AI agent working live |
| 15:15 · 10 min | Break | |
| 15:25 · 40 min | [7 · Grade](MODULE-7-grade-and-handoff.md) | `GRADE.md`, a preview |
| 16:05 · 15 min | [8 · Debrief](MODULE-8-debrief.md) | Your count of catches |
| 16:20 · 40 min | Catch-up time | Any module you're behind on, finished |
| Afterwards | [After the workshop](AFTER-THE-WORKSHOP.md) | A finished app, attacked and handed over |
| Afterwards | [PRD](OWN-PRD.md) to [PROD](PROMOTE.md) | The method on your own app: write its PRD, build it, then take it to production |

If you fall behind, ask your instructor for a checkpoint.

Before the lab, do the [pre-work](MODULE-0-prework.md). It starts with what
you need and the skills you should already have.

## Lab rules

1.  **Never paste this guide into Claude.** Only the text in 🤖 boxes goes
   in. *Why:* if Claude can see the checks, it can write work that only
   passes them. Then they stop being real checks.
2.  **Keep passwords out of Claude.** Type them only into your own terminal
   or your browser. Claude never runs `now-sdk auth`. That's the command
   that asks for your instance's password. *Why:* everything you type into
   Claude goes to the AI model and stays in the conversation's history.

   <details data-detail="extra"><summary>ℹ️ Where a password does go</summary>

   You type your instance's password in only two places: its login page in
   your browser, and the `now-sdk auth` command in your own terminal window.
   You'll run that command for the first time during the pre-work. The lab's
   settings stop Claude from running `now-sdk auth`, so it can't ask for your
   password by mistake.
   <span data-show="os:mac">**On Mac:** if `sudo` asks for your Mac's password,
   type it in your own terminal window too.</span>

   </details>

3.  **Keep two terminal windows open: one for Claude Code and one for you.**
   This guide calls yours your window. Do ⌨️ Terminal steps there. The
   pre-work shows you how to open it. *Why:* anything you type in Claude's
   window goes to Claude. Your window keeps your passwords and the checks
   you run yourself separate from Claude.
4.  **You decide when your instance changes.** You install the app yourself.
   The only install Claude runs is the one for your grade near the end of
   the day. It installs to `lab-pdi`, which is your instance's short name.
   Claude asks you before it runs that install. *Why:* an install changes a
   live system. A person decides when that happens, as they would in real
   work.
5.  **Never use a production instance.** *Why:* the agent you build moves HR
   cases and writes notes on them. On a production instance, those are real
   people's cases.
6.  **Read what a command printed. Don't rely on Claude's summary of it.**
   *Why:* Claude's summary is its best guess, and it can be wrong. The
   output is evidence. You can check it or run the command again.
7.  **Keep the answer Claude gives you. Don't ask again to get a better
   one.** Don't send the same 🤖 box a second time: carry on with the answer
   you got. If a step went wrong, ask your instructor for a checkpoint.
   *Why:* Claude can answer differently each time. Re-running until it looks
   right hides the mistakes the lab is built to catch.

## What each step's label means

Each step uses one or more of these labels.

| Label | What you do |
|---|---|
| 🤖 **Claude** | Type it into Claude Code |
| ⌨️ **Terminal** | Type it into a separate terminal window, not the one Claude Code is running in |
| ✏️ **Editor** | Open or change the file yourself in Visual Studio Code (VSC) |
| 🌐 **Browser** | Do it in your web browser on GitHub or your instance. On your instance, stay signed in as admin unless the step says to impersonate (act as) the test user `hr.demo` |
| ✅ **Check** | What you should see |
| 🛟 **Fix box** | Open it only if you see something different from the check |
| ℹ️ **Info box** | Open it if you want to know why |

<span data-show="surface:desktop">**In the Code tab:** your window is a
separate terminal app. Never use the Code tab's own terminal pane, because
passwords must stay out of Claude.</span>

**New words:** the guide explains each new word the first time it appears.
To see them all, click **Show words**. The same button is at the top of
**Notes**.

**Short labels:** Claude writes short labels to point at things. For
example, `C3` is the third rule in your design record. `P8` is platform rule
8, and `§7` is section 7 of a document. The [appendix](APPENDIX.md) explains
each kind. Every step that uses one also has an ℹ️ box.

To see more or less help at any time, change **Detail level** in the top bar.

## Working with Claude

#### Typing to Claude

You type to Claude in the box at the bottom of Claude Code. Press **Enter**
to send. To add a new line without sending, type `\` and then press
**Enter**.

You'll type three kinds of things there:

- **A 🤖 (code) box from this guide.** Paste the contents of the box. Type
  `go` after it and press **Enter**.

- **A line starting with `/`.** This runs a ready-made command instead of
  asking Claude a question. For example, `/status` shows which version of
  Claude Code you have. The lab's own commands start with `/prove-it:`.
  Each one runs a skill. A skill is a set of step-by-step instructions that
  Claude follows. Type `/` to see the list. Keep typing to narrow it, then
  press **Enter**.

- **An answer to Claude's question.** Sometimes Claude stops to ask you
  something, such as whether to keep a line. Reply with the word the step
  gives you, such as `keep` or `yes`.

Lines that start with `/` and short replies don't need `go` after them.
Short replies include `yes`, `keep`, `approve`, `apply` and `ship it`. Some
must be typed exactly. For example, type `Confirmed.` with its period.

#### Reading Claude's work

<div data-show="surface:terminal">

**In the terminal:** When Claude runs a command, Claude Code shows the
command on a line that starts with ⏺. What the command printed appears
under it on lines that start with ⎿. Trust that output, not Claude's
summary of it. If you see `… +N lines`, press **Ctrl+O** to see everything.

</div>

<div data-show="surface:desktop">

**In the Code tab:** In each new session, switch the view to **Verbose**.
Open the session menu with the arrow beside the session title. Choose
**Transcript view**, then choose **Verbose**. You can also press **Ctrl+O**
until it appears. The normal view folds each command into a summary.
**Verbose** shows everything Claude runs and what each command printed.
Trust that output, not Claude's summary of it.

</div>

<details data-help="general"><summary>🛟 Did Claude close or crash in the middle of a step?</summary>

<div data-show="surface:terminal">

**In the terminal:** Go back to the folder Claude was working in and run
`claude --continue`.
It reopens the conversation where it stopped.

</div>

<div data-show="surface:desktop">

**In the Code tab:** Open the desktop app again and click the session in
the sidebar. The conversation is still there.

</div>

</details>

## Answering Claude's permission requests

In **auto mode**, a safety check decides whether Claude can run each
command. It blocks risky commands and shows `Denied by auto mode classifier`,
so Claude rarely needs to ask you. The lab uses auto mode by default. If it
blocked what the step told Claude to do, reply `yes,` followed by the
action. For example, reply `yes, push the branch`. If it blocked anything
else, reply `no, stop`.

<div class="warnbox">

- **Never choose "Yes, and don't ask again".** Each time Claude asks, you
  get to check what it's about to do. That choice stops it asking for good.

</div>

When Claude does ask, read the request. Then find it in the table below or
type the command into **Search the guide** at the top of the page. If two
rows match, **No** wins. The one exception is the grade's own install to
`lab-pdi`. It has its own row.

| The request | Answer | Why |
|---|---|---|
| `git …` or `gh …` | **Yes** | Your repo and your GitHub: commits, branches, issues and pull requests |
| `npm …` or `node …`, except `npm run deploy` | **Yes** | Installs, builds and tests on your computer |
| `now-sdk build`, `now-sdk explain` or `now-sdk query --auth lab-pdi`, or their `npx @servicenow/sdk …` forms | **Yes** | `build` runs on your computer. `explain` reads the SDK's docs. `query` reads your instance and changes nothing |
| Reading or changing files in `~/projects/hr-case-router`, `~/projects/hr-case-router-prd-review` (the PRD review folder) or `~/projects/prove-it-kit` (the kit's copy) | **Yes** | Claude's workspace |
| `now-sdk auth` | **No** | It takes your password (rule 2) |
| `now-sdk install`, `deploy`, `exec`, `execute`, `run`, `move` or `cicd`, in any form, or `npm run deploy` | **No** | They change your instance, and you decide when (rule 4) |
| The grade asks to run `now-sdk install --auth lab-pdi` (near the end of the lab day and again after the workshop) | **Yes**, for that command only | The one install Claude runs, after asking |
| Any alias but `lab-pdi`, or anything that names your instance | **No** | It could reach another instance |
| Anything in this guide's folder | **No** | Claude never reads this guide (rule 1) |
| "Allow this read outside the working directories?" It comes once | **Yes**: choose **Yes, and keep allowing any reads outside the working directories** | It's the one "keep allowing" choice that's safe: the lab's settings still keep Claude out of this guide, your notes and your keys |
| Anything else, or you're not sure | **No**, then ask Claude what it was for | A No costs a minute. You might not be able to undo a wrong Yes |

## Your folders, and logging your catches

After the pre-work, your `~/projects` folder holds:

```example
hr-case-router-lab-guide/   this guide: you read it, Claude never does
hr-case-router/             your workspace: Claude works here
  app/                      your app's repo, private on GitHub
  brief/                    your accepted PRD
  catches.md                one line per catch
hr-case-router-notes/       backups the final clean-up restores: Claude never reads it
prove-it-kit/               a copy of the kit
```

**You don't write your catches down yourself:** at the end of each module,
a **Log it** prompt has Claude draft one line for each of that module's
catches. Reply `keep` or say what to change:

```example
<module> | <what caught it> | <what it caught, and what was done>
```

For example: `1 | prd | An input asked for something the PRD left out; I listed it under Open decisions`.
