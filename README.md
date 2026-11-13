# Agentic Build Lab

*How this lab works · 5 minutes to read*

In one day you'll build a ServiceNow app called the **HR Case Router**. It's
based on a real use case from your company.

When a new HR case comes in, an AI agent moves it to the assignment group or
HR service that should work it. It adds a work note that says why it chose
that one. If it can't route a case, or a safety check stops the move, the
case stays where it is. The work note says why. All of this happens on its
own, as soon as the case is created. If a fulfiller, someone who works HR
cases, thinks a case is in the wrong place, they can click **Reroute**. The
agent then routes it again, the same way.

You tell Claude Code how the app should work and which checks it must
pass. Claude Code writes the code.

**What you learn** is a way to build with AI that you can trust:

- Catch mistakes early, before any code exists.
- Agree on a design before anything is built.
- Let checks decide whether work moves on, not anyone's say-so.
- Trust evidence you can run again, such as a command's output, over
  Claude's summary of it.
- Write down decisions and progress, so someone else could pick up the
  work.

Each time the process stops a real mistake, that's a **catch**. You'll
count yours at the end of the day.

## The day

| When | Module | You leave with |
|---|---|---|
| Before the day, about 2 hours | [Pre-work](MODULE-0-prework.md) | Tools, your instance, your app's private repo, and the inputs read |
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
| 15:25 · 40 min | [7 · Grade](MODULE-7-grade-and-handoff.md) | `GRADE.md`, a preview |
| 16:05 · 15 min | [8 · Debrief](MODULE-8-debrief.md) | Your count of catches |
| Afterwards | [After the workshop](AFTER-THE-WORKSHOP.md) | A finished app, attacked and handed over |
| Then | [Your own PRD](OWN-PRD.md), [to production](PROMOTE.md) | The method on your own work |

A PRD is a product requirements document: what the app must do. An LLD is
a low-level design: how the app will do it.

From 16:20 to 17:00 there's time to catch up. If you fall behind, ask your
instructor for a checkpoint. A checkpoint is the work so far, ready made,
so you can start the next module from it.

You can read this guide as one page once you've done step 4 of the
pre-work. <span data-show="os:mac">**On Mac:** run this in a terminal:
`open ~/projects/hr-case-router-lab-guide/LAB.html`.</span>
<span data-show="os:win">**On Windows:** open File Explorer and click its
address bar. Type
`%USERPROFILE%\projects\hr-case-router-lab-guide\LAB.html` and press
**Enter**.</span> Then open **Setup**, the first button in the top bar, and
click **Copy my setup**. That brings your answers across.

You work alone on the day. Your partner joins you after the workshop. They
attack your app and test your runbook, the steps for running and fixing it.

## What you need

| You need | Details |
|---|---|
| **A ServiceNow instance** | An instance is your own ServiceNow site. Your instructor gives you one. It has HR Service Delivery, its demo data and AI Agent Studio, and you're an admin on it. Never use a production instance, the one real people use. |
| **A computer you can install software on** | <span data-show="os:mac">**On Mac:** macOS 13 or later.</span> <span data-show="os:win">**On Windows:** only by arrangement with your instructor, for now. You use WSL, which runs Linux inside Windows, or Git Bash, a Linux-style terminal. The pre-work's Windows steps are still being tested.</span> Linux works too. If your company laptop blocks installs, tell your instructor two weeks before. |
| **A Claude plan that includes Claude Code** | Max, Team, Enterprise and a Claude Console account all work. Pro works too, but it runs one sub-agent at a time. A sub-agent is a helper Claude starts for part of the work. Module 6 shows how to work with one. The free plan doesn't include Claude Code. On Pro or Max, first turn off model training in claude.ai **Settings > Privacy**. |
| **A GitHub account** | A personal account is simplest. A company account works only if it can create private repos. The lab needs GitHub. Your company's GitLab can't stand in for it. Send your instructor your user name by the pre-session, a week before. Then accept their invite to this guide. |
| **About 2 hours, at least two days before** | That's for [the pre-work](MODULE-0-prework.md). If you can, also come to the pre-session a week before. It takes an hour. |

<div data-show="surface:terminal">

**Claude Code, in the terminal.** This guide is written for Claude Code in
a terminal window.

</div>

<div data-show="surface:desktop">

**Claude Code, in the Code tab.** Where the desktop app works differently,
the guide shows its way. You still need a terminal app and the `claude`
command for the ⌨️ steps. Those are installing the kit, the checks, and
every password.

</div>

The pre-work installs everything else. That includes the prove-it kit, the
Claude Code plugin the lab runs on. A plugin is an add-on for Claude Code.

## What you should be able to do

Before the day, you should be able to:

1. Log in to a ServiceNow instance as an admin. Open a list, such as the HR
   cases. Impersonate a user, which means acting as them, when you're
   given the menu path.
2. Open a terminal. Paste a command into it, run it, and read what it
   prints.
3. Start Claude Code and send it a message. Answer it when it asks
   permission to run a command.
4. Say in one sentence each what a repo, a commit and a pull request are.
5. Install software on your computer, or get it installed in time.

You don't need to write code or know git's commands. Git is the tool that
keeps a project's history. You don't need to have used the ServiceNow SDK
either. The SDK is the toolkit for building ServiceNow apps on your own
computer. Claude writes the code and runs git. You read and decide.

**New to any of these?** That's normal. Most people are new to at least
one. Two things help:

- Come to the pre-session a week before. It shows items 2 and 3 live and
  answers your questions.
- Set **Detail level** to **Explain more**, in the top bar. Help boxes
  open, and the guide explains its words where you first meet them. You can
  change it at any time.

## Where you act

Every action starts with one of these labels.

| Label | What you do |
|---|---|
| 🤖 **Claude** | Type it into Claude Code |
| ⌨️ **Terminal** | Type it into a normal terminal, never into Claude |
| ✏️ **Editor** | Open or change the file yourself, in VS Code |
| 🌐 **Browser** | Use GitHub, or your instance as admin unless a step says to impersonate `hr.demo` |
| ✅ **Check** | What you should see |

Some checks have a closed 🛟 box under them. Open it only if you see
something different. ℹ️ boxes explain why, if you want to know. **Detail
level**, in the top bar, shows more help or less, at any time.

<div data-show="os:mac surface:terminal">

**On Mac, in the terminal:** While Claude runs in a Terminal window, that
window is Claude's. Do ⌨️ **Terminal** steps in a second window, **your
window**. To open it, press **Cmd+N**.

</div>

<div data-show="os:win surface:terminal">

**On Windows, in the terminal:** While Claude runs in a Git Bash tab, that
tab is Claude's. Do ⌨️ **Terminal** steps in a second Git Bash tab, **your
window**. To open it, press **Ctrl+Shift+T** in Windows Terminal.

</div>

<div data-show="os:mac surface:desktop">

**On Mac, in the Code tab:** Claude runs in the desktop app. For ⌨️
**Terminal** steps, **your window** is a window of the Terminal app. Don't
use the Code tab's own terminal pane. Nobody has checked yet whether Claude
can read what you type there, and passwords must stay out of Claude.

</div>

<div data-show="os:win surface:desktop">

**On Windows, in the Code tab:** Claude runs in the desktop app. For ⌨️
**Terminal** steps, **your window** is a Git Bash tab in Windows Terminal.
Don't use the Code tab's own terminal pane. Nobody has checked yet whether
Claude can read what you type there, and passwords must stay out of
Claude.

</div>

**Typing to Claude.** Claude Code has one box at the bottom, where you
type. **Enter** sends what's in it. To start a new line without sending,
type `\` and then press **Enter**. Three kinds of thing go in that box:

- **A 🤖 box from this guide.** **Sending:** paste a 🤖 box, type `go` after
  it, press **Enter**.
- **A line starting with `/`.** It isn't a question for Claude. It starts
  something ready-made. Some are Claude Code's own commands. For example,
  `/status` shows which version you have. Others start a **skill**:
  instructions written in advance, which Claude follows step by step.
  Skills come with a plugin. The kit's skills all start with `/prove-it:`,
  such as `/prove-it:consult` in Module 2. Type `/` and a list appears.
  Keep typing to narrow it, then press **Enter**.
- **A short reply.** When Claude asks you something, answer in a word or
  two. For example, it may ask whether to keep a line.

Type these on their own, with no `go`: a line starting with `/`, and short
replies such as `yes`, `keep`, `approve`, `apply` and `ship it`. Some
replies must be exact, such as `Confirmed.`. Each step gives you the words.
Copy them as shown, full stop included.

<div data-show="surface:terminal">

**In the terminal:** When Claude runs a command, Claude Code shows it on a
line starting with ⏺. The command's output is under it, on lines starting
with ⎿. Read that output, not Claude's summary. If it says `… +N lines`,
press **Ctrl+O** to see it all.

</div>

<div data-show="surface:desktop">

**In the Code tab:** Set the view to **Verbose** in each new session. Open
the session menu, the caret beside the session title. Choose **Transcript
view**, then **Verbose**. Or press **Ctrl+O** until it shows. The normal
view folds each command into a summary. **Verbose** shows every tool call,
which means each thing Claude runs. Read what each command printed, not
Claude's summary.

</div>

<details data-help="general"><summary>🛟 Claude closed, or the window crashed, mid-step?</summary>

<div data-show="surface:terminal">

**In the terminal:** Go to the same folder and run `claude --continue`. It
reopens the conversation where it stopped.

</div>

<div data-show="surface:desktop">

**In the Code tab:** Open the desktop app again and click the session in
the sidebar. The session still holds the conversation.

</div>

</details>

## Rules for the whole lab

1. **Never paste this guide into Claude.** Only the text in 🤖 boxes goes
   in. *Why:* if Claude sees the checks, it can write work that just passes
   them. Then they stop being checks.
2. **Passwords stay out of Claude.** Type them only into your own terminal
   or your browser. Claude never runs `now-sdk auth`, the command that asks
   for your instance's password. *Why:* everything you type into Claude is
   sent to the AI model. It also stays in the conversation's history.
3. **You decide when your instance changes.** You install the app
   yourself. Claude runs only one install: the grade's, in Module 7, to
   `lab-pdi`, your instance's short name. It asks you first. *Why:* an
   install changes a live system. As in real work, a person decides when.
4. **Never use a production instance.** *Why:* the agent you build moves
   HR cases and writes notes on them. On production, those are real
   people's cases.
5. **Trust what a command prints**, not what Claude says about it. *Why:*
   Claude's summary is its best guess, and it can be wrong. The output is
   evidence. You can check it, or run the command again.
6. **Follow what really happens.** Don't re-run a prompt to get a nicer
   answer. Write down what happened, and carry on. *Why:* Claude can
   answer differently each time. Re-running until it looks right hides the
   mistakes the lab is built to catch.

<details data-detail="extra"><summary>ℹ️ Where a password does go</summary>

Your instance's password goes in two places. One is its login page, in the
browser. The other is `now-sdk auth`, which you run in your own terminal
window. You first do that in pre-work step 7. <span data-show="os:mac">**On
Mac:** `sudo` asks for admin rights. If it asks for your Mac's password,
type it in your own terminal window too.</span> The lab's settings block
`now-sdk auth` for Claude, so Claude can't run it by mistake.

</details>

<details data-detail="extra"><summary>ℹ️ Two installs, two ways</summary>

In Module 6 you run `now-sdk install --auth lab-pdi` yourself, in your own
terminal window. The grade runs in Module 7, and again after the workshop.
It runs the install after asking you. That's the one install Claude runs.
The lab's settings make Claude ask before any SDK command that writes to
your instance, such as `now-sdk install`.

</details>

<details><summary>ℹ️ Behind? Don't re-run: ask</summary>

If a step really went wrong, or you're behind, ask your instructor for a
checkpoint. You start the next module from it. That keeps a true record of
what happened, and keeps you moving.

</details>

## When Claude asks permission

**In auto mode**, the lab's default, a safety check decides for Claude.
Claude rarely asks you. It blocks risky commands instead, and shows
`Denied by auto mode classifier`. Did it block the step's own action? Reply
`yes,` and the action, such as `yes, push the branch`. If not, reply
`no, stop`.

**When it does ask**, read the command. Then find it in the table below.
If two rows match, **No** wins. The one exception is the grade's own
install to `lab-pdi`, which has its own row.

| The command | Answer | Why |
|---|---|---|
| `git …` or `gh …` | **Yes** | Your repo and your GitHub: commits, branches, issues and pull requests |
| `npm …` or `node …`, except `npm run deploy` | **Yes** | Installs, builds and tests on your computer |
| `now-sdk build`, `now-sdk explain` or `now-sdk query --auth lab-pdi`, or their `npx @servicenow/sdk …` forms | **Yes** | `build` runs on your computer. `explain` reads the SDK's docs. `query` reads your instance and changes nothing |
| Reading or changing files in `~/projects/hr-case-router`, Module 1's `~/projects/hr-case-router-prd-review` or the kit's copy, `~/projects/prove-it-kit` | **Yes** | Claude's workspace |
| `now-sdk auth` | **No** | It takes your password (rule 2) |
| `now-sdk install`, `deploy`, `exec`, `execute`, `run`, `move` or `cicd`, in any form, or `npm run deploy` | **No** | They change your instance, and you decide when (rule 3) |
| The grade asks to run `now-sdk install --auth lab-pdi` (Module 7, and the grades after the workshop) | **Yes**, for that command only | The one install Claude runs, after asking |
| Any alias but `lab-pdi`, or anything that names your instance | **No** | It could reach another instance |
| Anything in this guide's folder | **No** | Claude never reads this guide (rule 1) |
| Anything else, or you're not sure | **No**, then ask Claude what it was for | A No costs a minute. A wrong Yes may not be undone |

- **Never choose "Yes, and don't ask again".** The asking is the check.
- **Asked "Allow this read outside the working directories?"** This comes
  once. Choose **Yes, and keep allowing any reads outside the working
  directories**. It's safe: the lab's settings still keep Claude out of
  this guide, your notes and your keys.

## Words you'll meet

- **Repo:** a folder whose history git keeps. Your app's repo is
  `~/projects/hr-case-router/app`.
- **Commit:** one saved snapshot in a repo's history.
- **Branch:** a separate line of commits. Work happens on a branch, so
  `main`, the repo's main line, changes only through pull requests.
- **Pull request:** a request on GitHub to merge a branch into `main`. It's
  reviewed before it merges.
- **Story:** one small piece of work, filed as a GitHub issue. An issue is
  a to-do item on GitHub.
- **Gate:** a milestone that waits for its stories to finish. There are
  four: MERGE, INSTALL, DEMO and HANDOFF.
- **Design term:** one numbered rule in your design record, such as `C3`.
  Every test names the term it proves.
- **Catch:** a real problem the process found **and that got fixed**, or
  that changed a decision. If you plant a problem to test a check, the
  check firing on it isn't a catch.

Claude also writes short labels, such as `C3`, `P8` or `§7`. The
[appendix](APPENDIX.md) says what each one means. Each step that uses one
also has an ℹ️ box.

## Your folders and your catches

After the pre-work, your `~/projects` folder holds:

```example
hr-case-router-lab-guide/   this guide: you read it, Claude never does
hr-case-router/             your workspace: Claude works here
  app/                      your app's repo, private on GitHub
  brief/                    the PRD, from Module 1
  catches.md                one line per catch
hr-case-router-notes/       what Module 8 restores: Claude never reads it
prove-it-kit/               a copy of the kit
```

You don't write notes yourself. At the end of each module, a **Log it**
prompt has Claude draft that module's catches, one line each. Reply `keep`,
or say what to change:

```example
<module> | <what caught it> | <what it caught, and what was done>
```

For example: `1 | prd | An input asked for something the PRD left out; I listed it under Open decisions`. Module 8 counts them.

<details data-detail="extra" data-topic="servicenow"><summary>ℹ️ New to ServiceNow? Four moves cover every step</summary>

- **The filter navigator** is the search box at the top left. Click **All**
  to see it. Type a table name and `.list`, such as `sn_hr_core_case.list`.
  Press **Enter** to open that table as a list.
- **To filter a list**, type in the search box at the top of a column.
  Then press **Enter**.
- **To make a record**, click **New** on a list. Fill in the form, then
  click **Submit**.
- **A reference field** has a 🔍 beside it. It points to another record.
  Click the 🔍 and pick one.

</details>
