# Words

The words this guide explains, and what each one means in this lab. Each
word also says why the lab uses it. The guide explains many of them where
you first meet them. To see them all, open **Notes**, then **Show words**.

## Start here

- **Repo:** a folder with a saved history of its changes.

  Your app's repo is `~/projects/hr-case-router/app`.

  Why it's in this lab: everything you and Claude build lives in the repo, so
  every change can be seen, checked and undone.
- **Commit:** one saved snapshot in a repo's history.

  Why it's in this lab: small commits make it easy to see what changed and to
  go back. A guard checks each one before it's saved, which is the habit "a
  check that can fail".
- **Branch:** a separate line of commits in a repo.

  Work happens on a branch, so `main` changes only through pull requests.

  Why it's in this lab: Claude works on a branch, so unfinished work never
  mixes with work that has passed its checks.
- **Pull request:** a request that asks GitHub to merge a branch into
  `main`.

  It's reviewed before it merges.

  Why it's in this lab: it's where a change is tested and reviewed before it
  counts. You decide there, with the evidence in front of you.
- **Story:** one small piece of work, tracked as a GitHub issue.

  An issue is a to-do item on GitHub.

  Why it's in this lab: an AI builds small pieces well and large ones badly.
  One story at a time keeps each change small enough to test and review.
- **Gate:** a milestone that waits until its stories are finished.

  This lab has four gates: MERGE, INSTALL, DEMO and HANDOFF.

  Why it's in this lab: a gate is where you decide whether the work may go
  further. It's the habit "a person decides at each milestone".
- **Design term:** one numbered rule in your design record, such as `C3`.

  Every test names the design term it proves.

  Why it's in this lab: the terms are the design you agreed before any code. A
  numbered term can be pointed at, tested and checked off.
- **Catch:** a real problem the process found that was fixed, or that
  changed a decision.

  A planted problem isn't a catch just because the check finds it.

  Why it's in this lab: catches show the process works. You log each one, and
  the debrief counts them.
- **Product requirements document (PRD):** the document that says what the
  app must do.

  Why it's in this lab: Claude drafts it from the customer's inputs and you
  correct it. Everything built later is checked against it.
- **Low-level design (LLD):** the document that says how the app will do
  what the PRD requires.

  Why it's in this lab: it's written after the research, so the design rests
  on what your instance really does, not on a guess.
- **Checkpoint:** the finished work through a particular module.

  Your instructor can give you one, so you can start the next module from
  it.

  Why it's in this lab: the day has fixed times. If a module runs long, a
  checkpoint lets you carry on with the room.
- **Sub-agent:** a helper Claude starts to do part of the work.

  Why it's in this lab: in the batch, each story gets its own sub-agent. Each
  starts fresh, so one story's work doesn't leak into the next.
- **Command output:** what a command shows after it runs.

  For example, a test command shows its pass and fail counts.

  Why it's in this lab: a command's output is evidence, and Claude's summary
  of it isn't. It's the habit "evidence, not someone's word".
- **SDK:** the ServiceNow SDK, a toolkit for building ServiceNow apps on
  your own computer.

  Its command is `now-sdk`. Claude uses it to build your app, and you use it
  to install the app on your instance.

  Why it's in this lab: it lets the app be written as files in a repo. That's
  what makes the tests, the reviews and the pull requests possible.
- **Platform rule:** something your ServiceNow instance really does that
  your build must allow for.

  The lab numbers them P1 to P15. For example, P8 says the first runs after
  an install may fail once, so you run them again.

  Why it's in this lab: the platform has behaviour no document warns you
  about. The rules are written down, so nobody has to find them twice.

## Engineering practice

- **Test-driven development:** writing the test before the code it checks.

  The test fails first. Then the code is written to make it pass. In
  Module 6, Claude writes failing tests for each story before any code.

  Why it's in this lab: an AI can write code that looks right and isn't. A
  test that was seen to fail first is a check the AI can't talk its way past.
  It's the habit "a check that can fail".
- **Failing test:** a test that fails because the code it checks isn't
  written yet.

  In Module 6, you check that each new test fails, and Claude saves that
  run.

  Why it's in this lab: a test that has never failed proves nothing: it might
  pass whatever the code does. Seeing it fail first shows that it really
  checks something.
- **Test:** code that checks other code, and says pass or fail.

  Your app's tests run on your computer with `npm test`. Each test's name
  starts with the design term it proves.

  Why it's in this lab: a test runs the same way every time, for anyone. It
  doesn't depend on Claude saying the work is done.
- **Lint:** a tool that checks how code is written, such as its style and
  common mistakes.

  Your app has no lint script, so the grade marks that row Unverified.

  Why it's in this lab: the grade looks for a lint script and finds none. So
  you see the grade mark a check as Unverified, rather than pass something
  that wasn't run.
- **CI:** continuous integration, a service that runs a repo's checks on
  every pull request.

  This lab has no CI. The build and the tests run on your computer.

  Why it's in this lab: Claude's instructions say there's no CI. So it doesn't
  wait for one, and it merges only once the build and the tests pass.
- **Review:** reading a change to find problems before it merges.

  In the lab, Claude reviews each pull request with `/code-review` and posts
  what it finds on the pull request.

  Why it's in this lab: the review is a second look by a reader that didn't
  write the code. Its findings are posted, so they're a written record and not
  someone's word.
- **Merge:** bringing a branch's commits into `main`.

  In the lab, a merge always goes through a pull request.

  Why it's in this lab: a merge is the moment work counts as done. Nothing
  merges while a test fails or a review is missing.
- **Main:** the branch that holds the finished, checked work. It's written
  `main`.

  Why it's in this lab: `main` is what gets installed on your instance.
  Because it changes only through pull requests, you always know what's in it.
- **Diff:** a line-by-line list of what a change adds and removes.

  Why it's in this lab: a review reads the pull request's diff. You can read
  it too, to see exactly what Claude changed.
- **Milestone:** on GitHub, a named group of issues that share a goal.

  Each of the lab's four gates is a milestone.

  Why it's in this lab: the next story is always the one closest to the next
  gate. A milestone's open stories show what's left before that gate.
- **Issue:** a to-do item on GitHub.

  Each story is an issue. So is anything found along the way that needs a
  decision.

  Why it's in this lab: the plan lives on GitHub, not in a chat that ends.
  It's the habit "a written record".
- **Release:** a set of changes that goes out together.

  On GitHub, a release is also a version of a tool that you can download.

  Why it's in this lab: the PRD and the consult ask what belongs in the first
  release. That decision keeps the day's build small.
- **Tag:** a name fixed to one commit, such as `v0.2.2`.

  Why it's in this lab: the lab's kit is used at one tag, so everyone in the
  room has exactly the same kit.
- **Version:** a number that names one state of a tool or an app.

  Why it's in this lab: the pre-work checks each tool's version, because a
  step that works on one version can fail on another.
- **Evidence:** something anyone can look at or run again.

  A command's output is evidence. Claude's summary of it is not.

  Why it's in this lab: an AI's answer is a draft until a check passes. Each
  gate asks for evidence, never for Claude's word.

## ServiceNow

- **Instance:** one copy of ServiceNow, at its own web address.

  Your instructor gives you an instance for the lab, and you're its admin.

  Why it's in this lab: the app is installed and tried on your instance.
  Research also reads it, so the design rests on what it really has.
- **PDI:** a personal developer instance: a free instance that ServiceNow
  gives a developer to try things on.

  The lab calls your instance `lab-pdi`, whatever kind of instance it is.

  Why it's in this lab: the name `lab-pdi` is in every SDK command. Claude may
  reach that one instance and no other.
- **Scope:** the short name that marks everything an app owns, such as its
  tables and its properties.

  An app with its own scope is called a scoped app. You look up your scope
  in the pre-work.

  Why it's in this lab: the scope keeps your app apart from everything else on
  the instance. Your app can be removed without touching anything else.
- **Table:** where ServiceNow keeps one kind of record, such as HR cases.

  Why it's in this lab: your app adds its own tables, for its routing rules
  and its run log. The design says who may write to each one.
- **Record:** one row in a table, such as one HR case.

  Why it's in this lab: the router changes real records. Every write it makes
  is named in the design and covered by a test.
- **Role:** a named set of rights that says what a user can see and do.

  Why it's in this lab: the agent runs as its own user, `hr.router`, with the
  roles an AI user needs. And without the right role, `hr.demo` can't use
  Reroute.
- **Impersonate:** to act as another user on your instance, without their
  password.

  You stay signed in as admin, and impersonate `hr.demo` when a step says
  so.

  Why it's in this lab: an admin can do everything, so an admin's test proves
  little. You try the app as the person who will really use it.
- **Work note:** a note on a record that only the people working it can
  see.

  Why it's in this lab: the router always leaves a work note that says what it
  did and why. The note is how a person checks the AI's decision.
- **Assignment group:** the team a case is given to.

  For example, HR Tier 1.

  Why it's in this lab: setting the right assignment group is the router's
  main job.
- **HR service:** ServiceNow's name for the kind of request an HR case is
  about.

  Why it's in this lab: when a case was opened under the wrong HR service, the
  router can transfer it to the right one.
- **Scheduled job:** a script that an instance runs by itself, on a schedule.

  Why it's in this lab: your app's dispatcher is a scheduled job. It runs
  every minute.
- **System property:** one named setting kept on an instance.

  Why it's in this lab: the router's on switch is a system property. It
  installs switched off, so a person decides when the AI starts work.
- **Dispatcher:** your app's scheduled job, which starts a run for each new
  case.

  Why it's in this lab: it's how the agent is started in the background. If it
  stops, new cases sit unrouted with no message, so you check it after every
  install.
- **Trigger:** what starts a job or a workflow.

  A scheduled job's trigger is its schedule.

  Why it's in this lab: an install can leave the dispatcher without its
  trigger. Then no case is routed and nothing says why, so you check it after
  every install.
- **Install:** to copy your built app onto your instance.

  The command is `now-sdk install`. INSTALL is also the name of the lab's
  second gate.

  Why it's in this lab: an install changes your instance. That's why a person
  decides when it happens, and why Claude never runs it during the batch.
- **Fluent:** ServiceNow's language for writing an app as code.

  Your app's Fluent files are in `src/`.

  Why it's in this lab: because the app is code, Claude can write it, tests
  can check it, and a review can read it before anything reaches your
  instance.

## Agents at work

- **AI agent:** on ServiceNow, an AI that is given a task and chooses which
  tools to call to do it.

  The lab has two kinds of agent. Claude Code is the one that builds your
  app. The AI agent on your instance is part of what you build: it routes
  the HR cases.

  Why it's in this lab: the AI agent is the point of the app. On the day it
  routes a real case on your instance, and its work note says why.
- **Agentic workflow:** in AI Agent Studio, the record that names a task and
  the AI agents that do it.

  Your app has one, "HR case router", with one AI agent.

  Why it's in this lab: it's what a run starts. Your app's dispatcher starts
  it once for each new case.
- **Tool:** a script that an AI agent calls to read or change something.

  Your agent has three: `read_case`, `apply_route` and `leave_note`.

  Why it's in this lab: the agent decides, and plain code does the work. Each
  tool checks what it's asked to do, so the AI can't change anything the
  design doesn't allow.
- **Build loop:** the same steps for every story: tests that fail, code that
  makes them pass, a review, then a merge through a pull request.

  You take the first story through it by hand in Module 6. Claude then
  runs it for the others.

  Why it's in this lab: the loop is the six habits in the order they're used.
  Because every story takes the same steps, Claude can repeat them without
  you.
- **Loop engineering:** writing the rules an AI agent works by when nobody
  is watching: its goal, when it stops, what it must never do, and what it
  reports.

  In Module 6, one prompt runs the build loop over every open story while
  you're at lunch.

  Why it's in this lab: an agent left alone does exactly what its loop allows.
  The care you put into the loop's rules is what makes it safe to walk away.
- **Stop condition:** the part of a prompt that says when an agent's work is
  finished.

  The batch stops when a new case's whole path is merged, or when no story
  is left that Claude can build. Three failures on one step stop that
  story.

  Why it's in this lab: without a stop condition, an agent keeps going or
  stops too soon. A clear one lets you check the result against what you asked
  for.
- **Batch:** the stories Claude builds by itself, one after another, while
  you're at lunch.

  Why it's in this lab: it shows what the method is for. The rules you
  followed by hand on the first story are the ones Claude follows alone.
- **Git worktree:** a separate working copy of your repo, in its own folder.

  Why it's in this lab: in the batch, each sub-agent works in its own
  worktree, so two stories never change the same files at once.
- **Context:** what Claude has in front of it in a session: the conversation
  so far and the files it has read.

  `/clear` empties it.

  Why it's in this lab: a long session fills up with old detail, and Claude's
  answers get worse. So you type `/clear` before a new piece of work, and what
  matters is kept in files.
- **Auto mode:** a way of running Claude Code in which a safety check
  decides whether each command may run.

  It blocks a risky command and shows `Denied by auto mode classifier`.

  Why it's in this lab: the batch runs while you're away, so Claude can't stop
  to ask about every command. Auto mode lets it work, inside limits.
- **Permission:** your yes or no when Claude asks to run a command.

  The README has a table of what to answer.

  Why it's in this lab: you read the command before you answer. It's the habit
  "a person decides", at its smallest.
- **Prompt:** the text you give Claude.

  In this guide, a prompt is the text in a 🤖 box.

  Why it's in this lab: the lab's prompts are tested, and the steps after each
  one expect its result. So you paste them as they are.
- **Session:** one conversation with Claude Code, from when it starts until
  you close or clear it.

  Why it's in this lab: the lab starts a new session often, so nothing is left
  over from earlier chats. What must last goes into files, which is the habit
  "a written record".

## How we work

- **New session:** starting Claude Code again with an empty conversation.

  Each module starts in a new session. You close the last one with `/exit`,
  or empty it with `/clear`.

  Why it's in this lab: this is how the lab manages Claude's context. A
  session that carries a whole module's detail gives worse answers in the next
  one. Starting clean, with what matters kept in files, gets better results.
- **Memory in files:** keeping what Claude must know from one session to the
  next in files, because Claude itself remembers nothing between sessions.

  `CLAUDE.md` holds the rules. The design record holds the decisions.
  `BACKLOG.md` holds the plan, and `SESSION-NOTE.md` says where you stopped.

  Why it's in this lab: it's what makes a new session safe: you can clear the
  conversation and lose nothing. And you can read and correct a file, which
  you can't do with what an AI happens to remember. The lab's settings turn
  off Claude's own memories for that reason.
- **CLAUDE.md:** the instruction file in your app's repo. Claude reads it at
  the start of every session.

  It holds your project's facts, such as your scope and `lab-pdi`, and the
  rules Claude works by.

  Why it's in this lab: a rule you give Claude in a conversation is gone after
  the next `/clear`. A rule in `CLAUDE.md` holds in every session.
- **Design record:** the file that holds your agreed design terms. It's the
  contract the build is checked against.

  It's `docs/DESIGN-HRCaseRouter.md` in your app's repo.

  Why it's in this lab: it's the habit "a design agreed first", as a file.
  Every new session builds from the same decisions, and none is argued again
  by accident.
- **Backlog:** `BACKLOG.md`, a snapshot of your stories.

  Its first lines count the stories that still hold up the next gate.

  Why it's in this lab: a new session reads it with the session note, and
  knows what's left without being told.
- **Session note:** a short file, `SESSION-NOTE.md`, that says where the work
  stands.

  It lists what's proven, what's open, the exact next step and the top
  three next items.

  Why it's in this lab: it's what lets you start a new session without losing
  anything. The next session, or the next person, reads the note and doesn't
  have to guess.
- **Restatement:** Claude saying a task back in its own words, in five bullets
  or fewer, before it starts.

  Why it's in this lab: a misunderstanding costs a minute to fix in five
  bullets, and an hour once it's code. You read the bullets against your
  design.
- **Read-back:** the list Claude shows you of what it's about to write, before
  it writes anything.

  You answer `Confirmed.`, or you say what's wrong.

  Why it's in this lab: nothing goes into the design record until a person has
  read it and agreed. It's the habit "a design agreed first".
- **Guess first:** writing down what you expect before you ask Claude.

  Steps marked 🔮 ask for a guess.

  Why it's in this lab: a guess gives you something to measure Claude's answer
  against. Without one, any answer looks reasonable.
- **Dry run:** running a command so that it shows what it would do, and does
  nothing.

  Why it's in this lab: before Claude files stories on GitHub, a dry run shows
  how many it would write. You approve the real run knowing what it does.
- **Thin path:** the app's whole path from start to end, built with as little
  as possible at each step.

  It's the first story. A new case goes through a whole run, and the agent
  only leaves a note.

  Why it's in this lab: once the whole path works, each later story improves
  something that already runs. Problems between the pieces show up on the
  first story, not the last.
- **Register issue:** an issue that records something to watch or decide, and
  holds up no gate.

  Why it's in this lab: a finding that isn't written down gets forgotten, and
  one that stops the work costs the day. A register issue keeps it without
  stopping anything.
- **Ship it:** the reply that tells Claude to finish a change: review it, post
  the findings, merge it and return to `main`.

  Why it's in this lab: every change ends the same way, so no step is skipped
  when you're in a hurry. The review is always posted, so it's a written
  record.
- **Your window:** the terminal window you keep for yourself, beside Claude's.

  You run ⌨️ steps there.

  Why it's in this lab: anything typed in Claude's window goes to Claude. Your
  window keeps your passwords, and the checks you run yourself, apart from it.
- **Verbose view:** the view in Claude Code that shows each command's full
  output.

  Why it's in this lab: you read what a command printed, not Claude's summary
  of it. It's the habit "evidence, not someone's word".
- **VERIFY:** the mark Claude puts on anything it hasn't checked.

  Why it's in this lab: it stops a guess from passing as a fact. Research then
  checks each VERIFY on your instance, and the design record may hold none.

## Principles

- **Deterministic:** doing the same thing every time, for the same input.

  Plain code is deterministic. An AI isn't: it gives a likely answer, and
  may give a different one next time.

  Why it's in this lab: the design's main rule comes from it. The AI proposes
  a route, and plain code decides whether the case moves. Anything that writes
  is a deterministic tool, never the agent.
- **Fail safe:** built so that when something goes wrong, the result is the
  harmless one.

  When the router can't route a case, or a check stops the move, the case
  stays where it is, with a work note that says why.

  Why it's in this lab: an AI will sometimes be wrong or unsure. A case left
  where it was costs a person a minute. A case sent to the wrong team can be
  lost.
- **Confidence threshold:** how sure the agent must be before its route is
  applied.

  The lab's is 0.7. Below it, the case stays where it is with a note.

  Why it's in this lab: it's a number a person sets, in a system property, and
  it's plain code that checks it. Raising it trades fewer wrong routes for
  more cases left for people.
- **Least privilege:** giving a user, or an AI, only the rights its job needs.

  The agent runs as `hr.router`, with the roles an AI user needs and no
  more. Claude may reach one instance, through one alias.

  Why it's in this lab: a mistake can only do as much harm as its rights
  allow. That holds for the agent on your instance and for Claude on your
  computer.
- **Prompt injection:** text inside the data an AI reads that the AI takes as
  an instruction.

  An HR case is text that anyone can write.

  Why it's in this lab: the design allows for it. The case is kept out of the
  prompt that starts a run. And the agent can't change a case by itself: only
  `apply_route` can, after its checks.
- **Separation of duties:** making sure the one who checks a piece of work
  isn't the one who did it.

  After the workshop, a fresh session reviews the app, and whoever plants a
  problem doesn't diagnose it.

  Why it's in this lab: an author sees what they meant to write. That's true
  of people, and of an AI session that has just written the code.
- **Hallucination:** an AI stating something false as if it were a fact.

  Why it's in this lab: Claude's facts about the platform are confident
  guesses. Module 3 checks each one on your instance before the design uses
  it. It's the habit "an AI's answer, treated as a draft".
- **Evaluation:** running an AI on a set of cases whose right answers you
  know, to measure how often it's right.

  The cases you run live, in Module 6 and after the workshop, are a small
  one.

  Why it's in this lab: tests prove the code, and they can't prove the AI's
  judgement. After the workshop, a fixed set of cases that you run after every
  change is the next thing a team builds.
- **Acceptance criteria:** the checks that say a piece of work is finished.

  In the lab, every story has a "done when".

  Why it's in this lab: Claude will say a story is done. A "done when" that
  can be checked means you don't have to take its word.
- **Regression:** something that worked before and is broken by a later
  change.

  Why it's in this lab: every story must pass the whole test suite, not only
  its own tests. Before a merge, the tests run again on top of the latest
  `main`.
- **Feature flag:** a setting that switches a feature on or off without
  changing the code.

  The router's on switch is one. It installs switched off.

  Why it's in this lab: installing the app and starting the AI are two
  separate decisions. A person makes each one.
- **Seed data:** the records an app needs from its first day, shipped with the
  app.

  Yours include the routing rules and the knowledge article the agent
  reads.

  Why it's in this lab: the seed data is in the repo as code, so it's reviewed
  and installed like everything else. Nobody types it into the instance by
  hand.
- **Runbook:** your written steps for running the app, and for fixing it when
  it breaks.

  It's `RUNBOOK.md`.

  Why it's in this lab: the hand-over is tested, not assumed. After the
  workshop, a partner breaks your app, and it's diagnosed from the runbook
  alone.
- **Source of truth:** the one place that's right when two places disagree.

  `docs/DECISIONS.md` overrides the SDK plugin's guide, and the design
  record is the contract for the build.

  Why it's in this lab: Claude reads many files, and they won't always agree.
  Saying which one wins stops it from choosing for itself.
- **Drift:** the gap that opens between what was designed and what was built.

  Your design record has a drift log, in section 10.

  Why it's in this lab: a design that's changed without a record stops being
  the contract. A change goes in the drift log, and the as-built page lists
  every place where your app differs from your design record.
- **Observability:** being able to see, from outside, what a system did and
  why.

  Your app writes one row to its run log for every run.

  Why it's in this lab: a run is checked from its log row, its work notes and
  its execution plan, never from what the agent said it did.
- **Small batches:** doing work in pieces small enough to check one at a time.

  Why it's in this lab: one story is one pull request. A small change is quick
  to test and review, and when it's wrong, there's little to undo.
- **Reversibility:** how easily a step can be undone.

  Why it's in this lab: it decides how careful to be. A No to Claude costs a
  minute, and you might not be able to undo a wrong Yes. So an install, which
  changes your instance, is always a person's decision.

## Tools

- **Terminal:** a window where you type commands.

  In this guide, ⌨️ marks a command for the terminal.

  Why it's in this lab: Claude Code and the SDK both run there. You also use
  it to run a check yourself, rather than trust a summary.
- **Claude Code:** Anthropic's AI coding tool. It reads your files, runs
  commands and writes code.

  Why it's in this lab: it's the AI that builds your app. The whole method is
  about getting work you can trust out of it.
- **Plugin:** an add-on that gives Claude Code extra commands and skills.

  The lab uses two: the kit, and ServiceNow's SDK plugin.

  Why it's in this lab: the kit holds the method's steps, so everyone in the
  room runs the same ones.
- **MCP:** Model Context Protocol, a standard way to connect Claude to other
  tools and services.

  An MCP server is one such connection.

  Why it's in this lab: anything extra that Claude loads can change what it
  does. The pre-work sets your MCP servers aside, and Module 8 puts them back.
- **Skill:** a set of instructions that Claude follows for one kind of task.

  The consult is one of the kit's skills.

  Why it's in this lab: a skill asks the same questions in the same order
  every time, so the result doesn't depend on how you worded the request.
- **Hook:** a script that runs by itself at a set moment, such as just before
  each commit.

  The lab's guard is a hook.

  Why it's in this lab: a hook is a check nobody has to remember to run. It's
  the habit "a check that can fail".
- **GitHub CLI:** GitHub's own command-line tool. Its command is `gh`.

  Why it's in this lab: it signs you in to GitHub, and it's how Claude files
  stories and opens pull requests.
- **Node.js:** a program that runs JavaScript on your computer.

  Why it's in this lab: the ServiceNow SDK and your app's tests run on it.
- **npm:** the tool that comes with Node.js and installs JavaScript
  programs.

  `npm test` runs your app's tests.

  Why it's in this lab: it installs the SDK, and `npm test` is the one command
  that says whether a story's tests pass.
- **JSON:** a plain-text way to write data, as names and their values.

  Why it's in this lab: Claude Code's settings are kept in JSON files. The
  lab's settings file is what fences Claude in.
- **Credential:** what proves who you are to a service, such as a user name
  and password, or a token.

  Why it's in this lab: the lab keeps credentials out of the repo and out of
  Claude's reach. A guard checks every commit for them.
- **Token:** a long secret string that a tool uses in place of your password.

  Why it's in this lab: a token in a commit is a leak. The guard stops the
  commit before the token can leave your computer.
- **Alias:** a short name for a saved sign-in to an instance.

  The lab's alias is `lab-pdi`.

  Why it's in this lab: Claude uses the alias, so it never sees your password.
  And it may use that one alias only, so it can't reach another instance.
