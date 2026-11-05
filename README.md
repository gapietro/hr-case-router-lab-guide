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

To read this guide as one page, after Module 0 step 5:
<span data-show="os:mac">**On Mac:** run this in a terminal:
`open ~/projects/hr-case-router-lab-guide/LAB.html`.</span>
<span data-show="os:win">**On Windows:** open File Explorer, click its
address bar, type
`%USERPROFILE%\projects\hr-case-router-lab-guide\LAB.html`, and press
**Enter**.</span> **Copy my setup**, under the setup chip at the top right,
brings your answers across.

You work alone on the day. Your partner joins you after the workshop, to
attack your app and to test your runbook.

## What you need

| You need | Details |
|---|---|
| **A ServiceNow instance** | Your instructor gives you one, with HR Service Delivery, its demo data and AI Agent Studio, and admin on it. Never a production instance. |
| **A computer you can install software on** | <span data-show="os:mac">**On Mac:** macOS 13 or later.</span> <span data-show="os:win">**On Windows:** only by arrangement with your instructor, for now: WSL, or Git Bash (Module 0's Windows steps, still being tested).</span> Linux works too. A company laptop that blocks installs? Tell your instructor two weeks before. |
| **A Claude plan that includes Claude Code** | Max, Team, Enterprise or a Claude Console account. Pro works, with one sub-agent at a time: Module 6 shows how. The free plan doesn't include Claude Code. On Pro or Max, first turn off model training in claude.ai **Settings > Privacy**. |
| **A GitHub account** | A personal one is simplest; a company one only if it can create private repos. The lab needs GitHub: your company's GitLab can't stand in. Send your instructor your user name by the pre-session, a week before, and accept their invite to this guide. |
| **About 2 hours, at least two days before** | For [Module 0](MODULE-0-prework.md). And an hour for the pre-session, a week before, if you can. |

<div data-show="surface:terminal">

**Claude Code, in the terminal.** This guide is written for Claude Code in
a terminal window.

</div>

<div data-show="surface:desktop">

**Claude Code, in the Code tab.** The guide shows the desktop app's way
wherever it differs. You still need a terminal app, and the `claude`
command, for the ⌨️ steps: installing the kit, the checks, and every
password.

</div>

Module 0 installs everything else, including the prove-it kit: the Claude
Code plugin the lab runs on.

**Your answers stay in this browser, on this computer.** Nothing is sent
anywhere: not to your instructor, not to Claude. The link and the
downloaded copy of this guide keep separate setups; **Copy my setup**
carries yours across.

## What you should be able to do

Before the day, you should be able to:

1. Log in to a ServiceNow instance as admin, open a list such as the HR
   cases, and impersonate a user when you're given the menu path.
2. Open a terminal, paste a command into it, run it, and read what it
   prints.
3. Start Claude Code, send it a message, and answer when it asks
   permission to run a command.
4. Say in a sentence what a repo, a commit and a pull request are.
5. Install software on your computer, or get it installed in time.

You don't need to write code, know git's commands, or have used the
ServiceNow SDK. Claude writes the code and runs git; you read and decide.

**New to any of these?** That's normal: most people are new to at least
one. Come to the pre-session a week before, which shows items 2 and 3 live
and answers questions, and set **Detail** to **Explain more**, at the top
right: help boxes open, and the guide's words are explained where you
first meet them. You can change it at any time.

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
different. ℹ️ boxes say why, if you want to know. **Detail**, top right,
opens more help or less, at any time.

<div data-show="os:mac surface:terminal">

**On Mac, in the terminal:** While Claude runs in a Terminal window, that
window is Claude's. For ⌨️ **Terminal** steps, use a second window, **your window**:
press **Cmd+N**.

</div>

<div data-show="os:win surface:terminal">

**On Windows, in the terminal:** while Claude runs in a Git Bash tab, that
tab is Claude's. For ⌨️ **Terminal** steps, use a second Git Bash tab, **your window**:
press **Ctrl+Shift+T** in Windows Terminal.

</div>

<div data-show="os:mac surface:desktop">

**On Mac, in the Code tab:** Claude runs in the desktop app. For ⌨️ **Terminal** steps,
**your window** is a window of the Terminal app. Don't use the Code tab's own
terminal pane: whether Claude can read what you type there isn't checked
yet, and passwords must stay out of Claude.

</div>

<div data-show="os:win surface:desktop">

**On Windows, in the Code tab:** Claude runs in the desktop app. For ⌨️ **Terminal**
steps, **your window** is a Git Bash tab in Windows Terminal. Don't use the
Code tab's own terminal pane: whether Claude can read what you type there
isn't checked yet, and passwords must stay out of Claude.

</div>

**Typing to Claude.** Claude has one box at the bottom where you type.
**Enter** sends what's in it. For a new line inside one, type `\` and then
press **Enter**. Three kinds of thing go in that box:

- **A 🤖 box from this guide.** **Sending:** paste a 🤖 box, type `go` after
  it, press **Enter**.
- **A line starting with `/`.** It isn't a question for Claude: it starts
  something ready-made. Some are Claude Code's own commands, such as
  `/status`, which shows which version you have. Others start a **skill**:
  instructions written in advance and installed with a plugin, which Claude
  then follows step by step. The kit's skills all start `/prove-it:`, such
  as `/prove-it:consult` in Module 2. Type `/` and a list appears; keep
  typing to narrow it, then press **Enter**.
- **A short reply.** When Claude asks you something, such as whether to keep
  a line, answer in a word or two.

A line starting with `/`, and one-word replies such as `yes`, `keep`,
`approve`, `apply` and `ship it` (alone), are typed on their own, with no
`go`. Some replies must be exact, such as `Confirmed.`: each step gives the
words. Copy them as shown, full stop included.

<div data-show="surface:terminal">

**In the terminal:** When Claude runs a command, Claude Code shows it on a
line starting with ⏺, and its output under it, on lines starting with ⎿.
Read that output, not Claude's summary. If it says `… +N lines`, press
**Ctrl+O** to see it all.

</div>

<div data-show="surface:desktop">

**In the Code tab:** set the view to **Verbose** in each new session. Open
the session menu (the caret beside the session title), then **Transcript
view**, then **Verbose**; or press **Ctrl+O** until it shows. The normal
view folds each command into a summary; **Verbose** shows every tool call.
Read what each command printed, not Claude's summary.

</div>

<details data-help="general"><summary>🛟 Claude closed, or the window crashed, mid-step?</summary>

<div data-show="surface:terminal">

**In the terminal:** in the same folder, run `claude --continue`. It reopens
the conversation where it stopped.

</div>

<div data-show="surface:desktop">

**In the Code tab:** open the desktop app again, and click the session in
the sidebar. It holds the conversation.

</div>

</details>

## Rules for the whole lab

1. **Never paste this guide into Claude.** Only the text in 🤖 boxes goes
   in. *Why:* if Claude sees the checks, it can write to pass them, and
   they stop being checks.
2. **Passwords stay out of Claude.** Type them only into your own terminal
   or your browser. Claude never runs `now-sdk auth`, the command that asks
   for your instance's password. *Why:* everything typed into Claude goes
   to the model and stays in the conversation's history.
3. **You decide when your instance changes.** You install the app
   yourself. The only install Claude runs is the grade's, to `lab-pdi`,
   and it asks you first. *Why:* an install changes a live system, so a
   person decides when, as in real work.
4. **Never use a production instance.** *Why:* the agent you build moves
   HR cases and writes notes on them; on production, those are real
   people's cases.
5. **Trust what a command prints**, not what Claude says about it. *Why:*
   Claude's summary is a likely answer and can be wrong; the output is
   evidence you can check, or run again.
6. **Follow what really happens.** Don't re-run a prompt to get a nicer
   answer. Write down what happened, and carry on. *Why:* Claude can
   answer differently each time, and re-running until it looks right
   hides the mistakes the lab is built to catch.

<details data-detail="extra"><summary>ℹ️ Where a password does go</summary>

Your instance's password goes into its login page in the browser, and into
`now-sdk auth`, which you run in your own terminal window (first in Module 0
step 8). <span data-show="os:mac">**On Mac:** your Mac's password, if
`sudo` asks for it, goes into your own terminal window too.</span> The
lab's settings block `now-sdk auth` for Claude, so it can't happen by
mistake.

</details>

<details data-detail="extra"><summary>ℹ️ Two installs, two ways</summary>

In Module 6 you run `now-sdk install --auth lab-pdi` yourself, in your own
terminal window. When the grade runs, in Module 8 and after the workshop,
it runs the install after asking you: that's the one install Claude runs.
The lab's settings make Claude ask before the SDK commands that write to
your instance, such as `now-sdk install`.

</details>

<details><summary>ℹ️ Behind? Don't re-run: ask</summary>

If a step really went wrong, or you're behind, ask your instructor for a
checkpoint to start the next module from. That keeps what happened, and
keeps you moving.

</details>

## When Claude asks permission

**In auto mode**, the lab's default, Claude rarely asks: it blocks risky
commands instead, showing `Denied by auto mode classifier`. Blocked the
step's own action? Reply `yes,` and the action, such as
`yes, push the branch`. If not, reply `no, stop`.

**When it does ask**, read the command, then find it here. Two rows match?
**No** wins, except for the grade's own install to `lab-pdi`, which has its
own row.

| The command | Answer | Why |
|---|---|---|
| `git …` or `gh …` | **Yes** | Your repo and your GitHub: commits, branches, issues, pull requests |
| `npm …` or `node …`, except `npm run deploy` | **Yes** | Installs, builds and tests on your computer |
| `now-sdk build`, `now-sdk explain` or `now-sdk query --auth lab-pdi`, or their `npx @servicenow/sdk …` forms | **Yes** | `build` runs on your computer; `explain` reads the SDK's docs; `query` reads your instance and writes nothing |
| Reading or changing files in `~/projects/hr-case-router`, Module 1's `~/projects/hr-case-router-prd-review` or the kit's copy, `~/projects/prove-it-kit` | **Yes** | Claude's workspace |
| `now-sdk auth` | **No** | It takes your password (rule 2) |
| `now-sdk install`, `deploy`, `exec`, `execute`, `run`, `move` or `cicd`, in any form, or `npm run deploy` | **No** | They change your instance, and you decide when (rule 3) |
| The grade asks to run `now-sdk install --auth lab-pdi` (Module 8, and the grades after the workshop) | **Yes**, for that command only | The one install Claude runs, after asking |
| Any alias but `lab-pdi`, or anything that names your instance | **No** | It could reach another instance |
| Anything in this guide's folder | **No** | Claude never reads this guide (rule 1) |
| Anything else, or you're not sure | **No**, then ask Claude what it was for | A No costs a minute; a wrong Yes may not undo |

- **Never choose "Yes, and don't ask again".** The asking is the check.
- **Asked once** "Allow this read outside the working directories?",
  choose **Yes, and keep allowing any reads outside the working
  directories**: the lab's settings still keep Claude out of this guide,
  your notes and your keys.

## Words you'll meet

- **Repo:** a folder whose history git keeps. Your app's repo is
  `~/projects/hr-case-router/app`.
- **Commit:** one saved snapshot in a repo's history.
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

```example
hr-case-router-lab-guide/   this guide: you read it, Claude never does
hr-case-router/             your workspace: Claude works here
  app/                      your app's repo, private on GitHub
  brief/                    the PRD, from Module 1
  catches.md                one line per catch
hr-case-router-notes/       what Module 9 restores: Claude never reads it
prove-it-kit/               a copy of the kit
```

You write no notes. At the end of each module, a **Log it** prompt has
Claude draft that module's catches, one line each. Reply `keep`, or say
what to change:

```example
<module> | <what caught it> | <what it caught, and what was done>
```

For example: `1 | prd | An input asked for something the PRD left out; I listed it under Open decisions`. Module 9 counts them.

<details data-detail="extra" data-topic="servicenow"><summary>ℹ️ New to ServiceNow? Four moves cover every step</summary>

- **The filter navigator** is the search box at the top left (click **All**
  to see it). Type a table name and `.list`, such as
  `sn_hr_core_case.list`, and press **Enter** to open that table as a list.
- **To filter a list**, type in the search box at the top of a column and
  press **Enter**.
- **To make a record**, click **New** on a list, fill in the form, and click
  **Submit**.
- **A reference field** has a 🔍 beside it. Click it and pick a record.

</details>
