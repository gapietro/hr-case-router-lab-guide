# Your own PRD track — build your own app with the same method

[Lab home](README.md) · [Getting it to production →](PROMOTE.md)

*⏱ A half-day kick-off, then 8–15 sessions of 1–2 hours over about two
weeks · the real owner joins four times*

You've done the workshop on the HR Case Router, so you know what each
module should feel like. This track runs the **same modules on your own
use case**. It ends with one **slice** of your app, the thinnest piece a
real user can use from start to finish. The slice works on your company's
development instance, and it's graded and handed over.

**Do the workshop first**,
[After the workshop](AFTER-THE-WORKSHOP.md) included. One full run with
known answers shows you what a good result looks like.

---

## 1. How it differs from the workshop

|  | Workshop (HR Case Router) | Your own PRD track |
|---|---|---|
| Inputs and PRD | Given to you | Yours |
| Who answers the PRD's open decisions | The customer's answers file | **The real owner** of the requirements |
| Who confirms the design | You, on the lab's settled decisions | **The real owner**, at the read-back |
| Instance | The lab instance your instructor gives you | **A development instance in your company's own instance family** |
| What gets built | The HR Case Router, with an AI agent that routes cases | **One slice you choose**, small enough to finish (section 5) |
| Generative AI in the app | One AI agent. Its one writing tool checks every move in plain code. It runs behind caps, limits on runs per hour and per day, and an on switch, a setting that installs off | The same, but **only once its four conditions are agreed** (section 2). Otherwise the first slice has none |

---

## 2. Before you start

### Is your use case ready?

Settle every row at the kick-off, with your instructor and your platform
team. Each row must be **true**, unless the slice you choose leaves that
part out.

| Must be true | Why |
|---|---|
| You have the inputs: a use case, notes from the people who asked, technical documents | Module 1 checks your PRD against these inputs. A one-line request isn't enough |
| A named **real owner** will answer the open decisions, accept the PRD and confirm the design | A design you confirm alone is a guess |
| **Claude Code is approved for your company's data** | You'll give it your PRD and technical documents |
| The repo can live in **your company's GitHub organisation**, with Issues on | The kit's plan and grade use GitHub Issues |
| A **development instance in your company's own instance family**: one that belongs to your company, beside its production instance. It has your scope prefix, the letters that start your company's app scopes, such as `x_acme`. You have agreement to install there | An app built on a lab instance can't move to production. Its scope prefix belongs to that instance |
| You know **how the SDK signs in** to it: a local admin account, or your platform team's way | Single sign-on, where you log in through your company's login page, may refuse the SDK's basic sign-in |
| Your development instance **holds no production records, or they're scrubbed**. Your platform team confirms it | Claude queries the instance while it researches and builds. Section 7 also limits every query to configuration |
| You have **admin on the development instance** for the two weeks. Or a named admin does the 🌐 **Admin** steps within an hour of each install | Only an admin can set up the test user, the on switch, role grants and approvals |
| If the first slice makes an AI call, its **four conditions are agreed in writing**: its cost, approval to send your data to the model, masking, and production limits. Masking hides personal data from the model. If they aren't agreed, the first slice has **no generative AI at runtime**, while the app runs | Only other people can agree those four, and that takes longer than a first slice. If they're agreed before the kick-off, build the AI the workshop's way: one agent, whose one writing tool checks every change in plain code, behind caps and an on switch. If not, defer it to a later slice (section 6) |
| Any **integration** in the slice, a connection to another system, has a test endpoint and credential for dev. The endpoint is the address it calls | See "Integrations" in section 4 |
| You have **8–15 sessions of 1–2 hours** over two weeks | Less time means a smaller slice |

### Book now

| What | Who | By |
|---|---|---|
| The kick-off: this section, row by row | You, your instructor, your platform team | Day 1 |
| The open decisions answered, and the PRD accepted | The real owner | Day 2 |
| The slice's deferred list, agreed in writing | The real owner | Day 3 |
| The design challenge and its read-back, about 2 hours | The real owner | Day 5 |
| The attack, and the failure planted for the drill | A colleague who didn't build it | Week 2 |
| DEMO: the slice working live | The real owner | Week 2 |
| How the app moves to production | Your platform team | Before [PROMOTE.md](PROMOTE.md) |

### Your app's placeholders

Settle these at the kick-off. The prompts and commands below use them.

| Placeholder | What it is | Example |
|---|---|---|
| `<app>` | Your app's short name, used for its folders and its repo | `access-review` |
| `<Feature>` | Your design's feature name, letters only | `AccessReview` |
| `<alias>` | The SDK's name for your development instance | `acme-dev` |
| `<SCOPE>` | Your app's scope, its name on the platform. It starts with your company's scope prefix | `x_acme_access` |
| `<org>` | Your company's GitHub organisation | `acme-it` |
| `<test user>` | Your ordinary user: a test user with only the roles your real users have | `access.tester` |
| `now-sdk init` template | The template your app starts from. Your platform team chooses it | `typescript.basic` |

### Your workspace, and the lab set up again

1. ⌨️ **Terminal:** make your own workspace, apart from the workshop's. A
   second brief, or the workshop's `CONSULT.md`, would confuse the kit.
   ```
   mkdir -p ~/projects/<app>/brief
   touch ~/projects/<app>/catches.md ~/projects/<app>/LOG.md
   ```

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `mkdir -p ~/projects/<app>/brief`: Makes your app's workspace, `<app>`
      inside `projects`, with a `brief` folder in it for your PRD. `-p` makes
      any missing folder on the way. It doesn't complain if a folder is
      already there.
   2. `touch ~/projects/<app>/catches.md …`: Makes two empty files in your
      workspace. Claude logs each catch in `catches.md`, and `LOG.md` holds
      your values. If a file is already there, `touch` leaves what's in it
      alone.

   </details>

   ✏️ **Editor:** write your values in `LOG.md`. The Log it prompts add
   your catches to `catches.md`.
2. Close Claude everywhere first.
   <span data-show="surface:terminal">**In the terminal:** type `/exit` in
   every Claude window.</span>
   <span data-show="surface:desktop">**In the Code tab:** close every
   session
   (<kbd data-mac="Cmd+W" data-win="Ctrl+W">Cmd+W (Mac) · Ctrl+W (Windows)</kbd>).</span>
   Then set up the lab's settings again, as in step 5 of the pre-work.
   ⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps:
   ```
   git -C ~/projects/hr-case-router-lab-guide pull
   node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
   ```

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `git -C ~/projects/hr-case-router-lab-guide pull`: Downloads the newest
      version of this guide from GitHub into its folder,
      `hr-case-router-lab-guide`. `-C` runs git as if you were in that
      folder. You don't have to go there first.
   2. `node …/merge-claude-settings.mjs`: Runs the lab's settings script. It
      adds the lab's settings to Claude Code's settings file and keeps your
      own. Run again, it never overwrites the backup of your settings it made
      the first time.

   </details>

   ✅ It prints `Lab settings in place.`
3. ⌨️ Did you do Module 8 step 8, which removes the plugins? Then install
   the kit and the SDK plugin again, as in Pre-work step 8:
   ```
   claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.4'
   claude plugin install prove-it@prove-it
   claude plugin install servicenow-sdk@claude-plugins-official
   ```

   <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

   1. `claude plugin marketplace add …`: Adds the kit's GitHub repo as a
      plugin marketplace, a list of plugins Claude Code can install. It adds
      version `v0.1.4`, the part after `#`.
   2. `claude plugin install prove-it@prove-it`: Installs the kit's plugin,
      `prove-it`, from the marketplace you just added. The name after `@` is
      the marketplace's, and it's `prove-it` too. Claude Code then has the
      plugin in every folder.
   3. `claude plugin install servicenow-sdk@claude-plugins-official`: Installs
      ServiceNow's SDK plugin from `claude-plugins-official`, Anthropic's own
      plugin marketplace. It teaches Claude to look things up in the SDK's
      docs and to read records on your instance. Those lookups never change
      anything.

   </details>

   ✅ None of the three prints an error. If you skipped Module 8 step 8,
   remove the workshop's login, so nothing reaches the lab instance by
   mistake: `now-sdk auth --delete lab-pdi`
4. ⌨️ Add the SDK login for your development instance, your platform
   team's way, as in Pre-work step 7. With basic sign-in, run this, with
   your instance's name for `<instance>`:
   ```
   now-sdk auth --add https://<instance>.service-now.com --type basic --alias <alias>
   now-sdk auth --list
   ```

   <details data-detail="extra" data-topic="servicenow"><summary>ℹ️ What each line does</summary>

   1. `now-sdk auth --add … --type basic --alias <alias>`: Saves a sign-in to
      your development instance on your computer, named `<alias>`. `basic`
      means a user name and password, which it asks you for. Every `now-sdk`
      command for your app names `<alias>`, so it always reaches this
      instance. You run it yourself, so your password never passes through
      Claude: the lab's settings never let Claude run `now-sdk auth`.
   2. `now-sdk auth --list`: Lists the sign-ins the SDK has saved. You can
      see `<alias>` is there, with your instance's address and the user name.

   </details>

   ✅ The list shows `[<alias>]`, and no `[lab-pdi]`.
5. ⌨️ Run `gh auth status`. ✅ The active account can create repos in
   `<org>`. If it can't, switch to one that can:
   `gh auth switch --user <that account>`.
6. In `LAB.html`, open **Setup**, the first button in the top bar, and
   open **Your values** in it. Click **Clear my values** under its boxes,
   and confirm. The steps you reuse then show placeholders, ready for
   section 7's swaps.
7. Run Pre-work step 10, from `~/projects/<app>`. Then run Pre-work steps
   12 to 18, with section 7's swaps. Skip step 11, because your scope is
   `<SCOPE>`. In step 17, if your instances use your company's own domain,
   add it: `echo '<domain>' >> .prove-it/patterns`
8. 🌐 **Browser**, as admin, on your development instance: create
   `<test user>` in `sys_user.list`. Give it your real users' roles.
   ✅ Its **Roles** tab lists only those, never `admin`. Wherever the lab
   says to impersonate `hr.demo`, impersonate `<test user>` instead.
   Module 6 step 9 adds your app's own role, after the first install.

### When Claude asks permission

The README's permission table still holds, with your names in it. Say
**Yes** to files in `~/projects/<app>` and `~/projects/<app>-prd-review`,
and to `now-sdk query --auth <alias>` on configuration tables. Say **No**
to a query of records about people, and to `now-sdk auth`. Say **No** to
`now-sdk install`, except the grade's install to `<alias>`. Say **No** to
any alias but yours, `lab-pdi` included.

---

## 3. Your PRD

### Size it

The consult reads the whole PRD. If your PRD has **more than about 12
capabilities**, put only **one release or epic** in `brief/`. An epic is
a group of related capabilities. List the rest under **Out of scope** as
"later releases".

### Format it

- Use **Markdown**, plain text with simple marks for headings and lists,
  in one file. Convert a Word or PDF document first.
- Use the layout of the workshop's `files/PRD-HRCaseRouter.md`:
  1. Problem, 2. Users, 3. Capabilities requested (numbered, each with
  "Accepted when"), 4. Non-functional requirements, 5. Out of scope,
  6. Success looks like, 7. Open decisions, 8. Acceptance.

### Review it: Module 1, on your inputs

Skip step 1. Do steps 2 to 4 with section 7's swaps. Copy your input
files and your PRD into `~/projects/<app>-prd-review` yourself.

### Get the owner's answers: Module 1, step 5, instead

Never answer a business question for the real owner. Never let Claude
choose an answer either.

1. Meet the real owner and go through your open decisions. ✏️ **Editor:**
   write their answers, in their own words, in
   `~/projects/<app>-prd-review/OWNER-ANSWERS.md`:
   ```
   # The owner's answers

   | You raised | The owner's answer |
   |---|---|
   | 1. <the open decision> | <their answer, in their words> |

   ## Acceptance

   | Name | Role | Date | Signature |
   |---|---|---|---|
   | <their name> | <their role> | <the date they confirmed> | <how, such as By email> |
   ```
2. Send the file to them. Fill in **Acceptance** only once they confirm it
   in writing. Keep their reply.
3. 🤖 **Claude**, in the review folder:
   ```
   Apply OWNER-ANSWERS.md to <your PRD file>: put each answer into every
   section it affects. If an open decision has no answer, stop and tell me
   which: never choose one. Set Open decisions to "None.", fill in
   Acceptance from OWNER-ANSWERS.md, and mark the PRD Accepted, with that
   date, under its title. Change nothing else. Then copy the PRD into
   ~/projects/<app>/brief/.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude puts each of the real owner's answers into every part of your PRD
   it affects. It fills in Acceptance, marks the PRD accepted, and copies it
   into your app's brief folder. If an open decision has no answer, it stops
   and names it instead of choosing one. Everything after this reads the
   accepted PRD, so every business decision in it is the owner's.

   </details>

4. ⌨️ **Terminal:** `ls ~/projects/<app>/brief`. ✅ It lists only your
   PRD. ✏️ **Editor:** open the PRD. ✅ Its Open decisions reads `None.`,
   and its Acceptance names the real owner.

---

## 4. Module by module

Run the modules on your app, in this order:

1. Section 3, then Module 2. Then "Choose one slice" and "Write your
   positions list", below.
2. Modules 3 to 6.
3. After the workshop, Part 1, until the gate count in section 5 prints 0
   for `merge`, `install` and `demo`.
4. After the workshop, Part 2, and Part 3 when a fix needs it.
5. After the workshop, Part 4. Skip Module 7, whose grade is only a
   preview.
6. Module 8, steps 1, 3 and 5. Steps 6 to 8 put your machine back, so do
   them only once you're done with this method.

**Before you paste a prompt or command**, paste it into a new VS Code tab
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
Make section 7's swaps with find and replace
(<kbd data-mac="Cmd+Option+F" data-win="Ctrl+H">Cmd+Option+F (Mac) · Ctrl+H (Windows)</kbd>),
and fill in each `<…>`. Then copy it out. The workshop's times, lunch and
the instructor's finished build don't apply. If your instance is asleep,
or not answering, ask your platform team.

### Module 2 — Consult

- Step 3: paste this instead:
  ```
  My answers: size is <your honest estimate, such as one release of 8
  capabilities>. Run no commands; mark anything unchecked VERIFY.
  Anything only the real owner can answer, record as an open decision;
  never guess. Yes, raise any other open decisions you find.
  ```

  <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

  These are your answers to the consult's opening questions: how big the
  work is, and how to handle what it can't check. Claude runs no commands,
  and marks anything it couldn't check VERIFY. It records what only the
  real owner can answer as an open decision, never a guess. It then
  restates the brief for you to check.

  </details>

- Step 4: its list also shows your `LOG.md`. Keep it.
- Step 5: read every AI row, the **Data and ownership** table, every
  **VERIFY** and every **Readiness** row that isn't ready.
- Step 6: use section 7's push-back, once for each AI row.

### After Module 2 — Choose one slice

A slice is the thinnest piece a real user can use from start to finish.
Everything else is deferred, not dropped.

1. <span data-show="surface:terminal">**In the terminal:** ⌨️
   `cd ~/projects/<app> && claude`.</span>
   <span data-show="surface:desktop">**In the Code tab:** start a new
   session (<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
   In the row under the prompt box, pick the top entry under **Local**.
   Click the folder control, choose **Open folder…** and pick
   `~/projects/<app>`. Then press **Ctrl+O** until the view is
   **Verbose**.</span> Then 🤖 **Claude:**
   ```
   Read brief/ and CONSULT.md. Propose two or three end-to-end slices. Each
   slice must: let a real user do one complete thing; be about 5 to 8
   stories; use no generative AI unless I say its cost, data approval,
   masking and limits are agreed, and then one AI agent whose one writing
   tool checks every change in plain code, behind caps and an on switch; avoid anything
   the consult marked not ready or conditional, or listed under Open
   decisions; and avoid integrations unless the slice can't work without
   one. For each, list the capabilities it covers, what it defers, and the
   riskiest assumption it tests. Don't write any file.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude reads your PRD and the consult, and proposes two or three slices.
   Each is a thin path a real user can follow from start to finish. For
   each, you get the capabilities it covers, what it defers, and the
   riskiest assumption it tests. It writes no file: you choose one, and
   write SLICE.md yourself.

   </details>

2. Choose the one that **tests your riskiest assumption first**, not the
   easiest one. Keep it small. Cutting it later is costly (section 5).
3. ✏️ **Editor:** write `~/projects/<app>/SLICE.md` by hand. List the
   capabilities in the slice, and the ones deferred. Say the one thing a
   real user will be able to do. Then write your **live check**, the steps
   `<test user>` follows to see it work.
4. Get the real owner's OK on what's deferred, in writing.

### Before Module 3 — Write your positions list

Your positions list is `docs/DECISIONS.md`, the decisions already
settled for your app. Modules 3 to 5 read it. Never copy the workshop's.

1. ⌨️ **Terminal:** `mkdir -p ~/projects/<app>/docs`. Then ✏️ **Editor:**
   create `~/projects/<app>/docs/DECISIONS.md` with the text below. Keep
   the headings. Keep the names too: Module 6 step 9 uses them.
   ```
   # Design decisions, already made

   ## Names

   | Thing | Name |
   |---|---|
   | The on switch | System property `<SCOPE>.enabled`. It installs `false`. |
   | The role | `<SCOPE>.user`, for <who uses the app> |

   ## What's built

   | Question | Decision |
   |---|---|
   | The central rule | <the one rule that, if broken, puts a wrong value on a real record or skips a control, as short sentences> |
   | The on switch | `<SCOPE>.enabled` switches all the app's logic on. It installs `false`. |
   | Seed data, as code in `src/` | <the demo records that show the slice working>. No role grants. |
   | Configuration documented | `README.md` lists each property and role the app declares, with its purpose. |

   ## Roles and access

   | Question | Decision |
   |---|---|

   ## Failures

   | Question | Decision |
   |---|---|

   ## Limits and retention

   | Question | Decision |
   |---|---|

   ## Tests and gates

   | Question | Decision |
   |---|---|
   | Where tests run | Locally in Vitest, through `npm test`, never ATF, next to the code under `src/` as `*.test.ts`. Checks only the platform can prove: by hand, as <test user>. |
   | MERGE | Every change reviewed, with the review's findings posted on its pull request, even if there are none. The repo's setup commits, made before it has any pull request, are its base, not changes. `now-sdk build` and `npm test` exit 0; lint isn't a criterion. Every design term, boundary terms included, is named in a test file: a unit test, a named live check under INSTALL, or an `it.todo` naming the term and why it needs no code. Each term by its own number: "C30 to C38" names only C30 and C38. |
   | INSTALL | Installs cleanly on the development instance, and the live checks for what this slice builds pass, as <test user>, not an admin. |
   | DEMO | The real owner sees the slice work live, as <test user>. |
   | HANDOFF | Someone else diagnoses a failure from the runbook alone. |
   ```
2. Add a row, under its heading, for each decision that the PRD,
   `OWNER-ANSWERS.md` or `SLICE.md` already settles. Give each deferred
   capability a row under What's built: `Out of scope for this record:
   deferred in SLICE.md`. If your slice has an AI call, add the workshop's
   AI rows too. Shape them like the lab's `files/DECISIONS.md`, and fill
   them from your written agreement: the agent and its tools, the one tool
   that writes and its checks, how a run starts, the threshold, the caps by
   property name, the run-as user, never admin, and masking as agreed
   (checked live). Also add the lab's Platform rules section, as it is.
   Those rules are facts about the platform, not the workshop. Module 5
   brings in the test that checks them. Nothing else goes in. An open
   question goes to the real owner, never into this file.
3. After Module 3, and before Module 4, take each item in your LLD's
   section 8, its open decisions, to the real owner. Add their answer as a
   row.

### Module 3 — Research and LLD

- Step 1: ⌨️ **Terminal** first:
  ```
  cd ~/projects/<app> && mkdir -p inputs
  cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/
  ```

  <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

  1. `cd ~/projects/<app> && mkdir -p inputs`: Goes into your workspace and
     makes an `inputs` folder there, for your technical documents. `-p`
     doesn't complain if it's already there.
  2. `cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/`: Copies the
     lab's LLD template into your workspace's `docs` folder. Claude drafts
     your LLD from it. `..` is the folder above your workspace, `projects`,
     where your copy of this guide is.

  </details>

  ✏️ Copy your technical documents into `~/projects/<app>/inputs/`, as
  Markdown. Then <span data-show="surface:terminal">**In the terminal:** ⌨️
  `claude`.</span> <span data-show="surface:desktop">**In the Code tab:**
  start a new session
  (<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
  In the row under the prompt box, pick the top entry under **Local**.
  Click the folder control, choose **Open folder…** and pick
  `~/projects/<app>`. Then press **Ctrl+O** until the view is
  **Verbose**.</span> 🤖 Paste this instead of the module's prompt:
  ```
  Read brief/, CONSULT.md, SLICE.md, inputs/ and
  docs/DECISIONS.md. List every platform fact the design relies on,
  for the capabilities in SLICE.md only, including what a scoped app needs
  to read and write the tables they use, and anything else that runs when
  those records change. Mark the five the design depends on most. For each
  fact, say how sure you are and how to check it by reading records only.
  Design nothing, run nothing, write no file.
  ```

  <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

  Claude lists the platform facts your slice's design relies on, and marks
  the five it depends on most. For each, it says how sure it is and how to
  check it by reading records. It designs nothing, runs nothing and writes
  no file. The module then has Claude check those facts on your instance,
  so the design rests on rows, not guesses.

  </details>

- Step 2: its fallback script runs only with your platform team's OK.
- Step 4: ✅ the summary covers every capability in `SLICE.md`, and lists
  each deferred one as not built.

**Integrations.** Credentials go only into a **connection and credential**
record. An admin sets one up by hand on each instance. Never put a
credential into `src/`, into Claude or on a drill card. Keep the outbound
call, the request to the other system, out of your plain-code logic. That
logic can then still be tested without the instance. Note each instance's
endpoint and credential for [PROMOTE.md](PROMOTE.md).

### Module 4 — Challenge and confirm, with the real owner

The real owner sits with you for all of it, about two hours. They can be
beside you, or on a call with your screen shared. They answer, and you
type their words.

- Step 1: when it asks you to confirm the feature name, 🤖 **Claude:**
  paste this instead:
  ```
  <Feature>. My design is the PRD in brief/, SLICE.md,
  docs/LLD-<Feature>.md and docs/DECISIONS.md. For every question,
  give me 3 or 4 numbered answers drawn from them and CONSULT.md, the one
  they give first. If none of them answers it, say so first, then put your
  recommended answer first. After my design, challenge failure, security,
  cost and boundaries in full, one question at a time, until each answer
  is concrete, even where a file already answers it. Then gates. The
  capabilities SLICE.md defers are out of scope for this record.
  ```

  <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

  This answers the design challenge's first question with your feature
  name, and tells it which files are your design. For each question, Claude
  offers three or four numbered answers drawn from those files, with the
  files' own answer first, and says so when none answers it. Then it
  challenges failure, security, cost and boundaries in full, one question
  at a time, then the gates, leaving what SLICE.md defers out of scope.

  </details>

- Steps 2 and 3: if the owner can't answer a question today, stop. Carry
  on when they can. Never answer for them. Check step 3's read-back
  against the rows of your own `docs/DECISIONS.md`.
- Step 4: the owner reads the whole read-back. When they agree, type
  `Confirmed.` on its own. When it asks for the name and role, type
  theirs, such as `Sam Lee, product owner`. ✅ §9 names the owner.

<details><summary>ℹ️ What §9 and C1… mean</summary>

`§` means section. `§9` is section 9 of the design record, its approval:
who confirmed it, and when. The record's rules are numbered `C1`, `C2` and
so on. Your LLD's sections run from `§1`, its scope, to `§8`, its open
decisions. [All the labels](APPENDIX.md#1-7-sections-of-a-document).

</details>

Every later amend, a change to the design record, works the same way, with
the owner there. That covers Module 5's boxes, Module 6 step 2's ruling
box, After the workshop, Part 3, and section 6. No owner, no amend.

### Module 5 — Check and plan

Run it as written, with section 7's swaps: your names, and `<alias>` for
`lab-pdi`. Your positions list is the third file that step 1 brings in.

### Module 6 — The build loop

- Step 6: use the prompt from After the workshop, Part 1, step 3, instead.
  It builds every story that code alone can build.
- Step 7: open your key story's pull request. ✅ Its bullets say when your
  logic runs, what it writes, and that nothing in it breaks your central
  rule. The table shows every story your live check needs as merged.
- Step 9: do sub-steps 1 and 2, for `<test user>`. If your slice has no
  scheduled job, skip sub-step 3, the dispatcher's trigger.
- Steps 10 and 11: run your live check from `SLICE.md`. Impersonate
  `<test user>`, and use demo records you seeded, never a real one.
  Step 11's defect box works as written.

### After the workshop, Part 2 — Break it

- Step 1: guess three ways to break your central rule.
- Step 4: fix **every** attempt that got through. Then run step 2 again
  with a new reviewer. Repeat until a round finds nothing.
- Step 5: a colleague who didn't build it attacks your app, as
  `<test user>`.

### After the workshop, on your app

- Part 1, step 1: check your LLD for these instead. §1 has each slice
  capability, and marks each deferred one. §3 says where your logic runs
  and **when**. §4 covers who can do what, and access across scopes. §5
  has a failure mode per component. §6 tests your central rule off the
  instance, and your live check on it. §7 matches your research.
- Part 1, step 4: always run check 1. Run check 2 only if you have a
  scheduled job, and check 3 only if you seed an article. For checks 4 and
  5, use a test user with your app's admin role instead of `owner.demo`.
  Run checks 6 and 7 only if you have an AI call.
- Part 1, step 5: instead of its checks, run your live check, and one
  check for each term only the platform can prove. Run them as
  `<test user>`. The real owner watches your live check. That's the DEMO.
- Part 4, step 3: the colleague plants a failure that's realistic for
  your app. Its symptom names your own records. Step 5's live check is
  yours too.

### Module 8 — What the process caught

Step 3's "not built" list is your `SLICE.md` deferred list, plus anything
the grade or the verdict left open. Add one line that says what you'll
build next.

---

## 5. Finishing the slice

### The gates, in order

The plan files one milestone per gate, in this order: **MERGE → INSTALL →
DEMO → HANDOFF**. To see where you are, count each gate's open issues.
⌨️ **Terminal**, in `~/projects/<app>/app`:

```
for g in merge install demo handoff; do
  echo "$g: $(gh issue list --state open --label "gate:$g" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length')"
done
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `for g in merge install demo handoff; do`: Repeats the next line once for
   each gate, in order. `$g` stands for the gate's name.
2. `echo "$g: …`: Counts the open issues labelled for that gate, such as
   `gate:merge`, leaving out any also labelled `register`. It prints the
   gate's name and the count, such as `merge: 3`. `--limit 5000` counts them
   all, not only the first 30.
3. `done`: Ends the part that repeats.

</details>

✅ The next gate is the first count that isn't 0, whatever `BACKLOG.md`
says. Nothing closes milestones for you. **The count is the truth.**

### Done means

- [ ] `GRADE.md` holds a HANDOFF grade, from After the workshop, Part 4,
  step 7. It isn't headed `Preview`. Its final score is **75 or more**,
  and its **Caps applied** table is empty.
- [ ] Each story that grade filed is closed, or filed as register with a
  reason the real owner agreed. To file one as register, use section 7's
  register reply when the grade shows its findings. A later grade then
  keeps it there. Then record the reason on each:
  ```
  gh issue comment <n> --body "Register: <why>. Agreed by <the real owner>, <date>."
  ```
- [ ] `HANDOFF.md` says READY.
- [ ] Your live check passes on your development instance, as
  `<test user>`.
- [ ] The DEMO stories are closed, each naming the real owner as the one
  who watched.

### Check-ins with your instructor

| When | Bring | The question |
|---|---|---|
| End of week 1 | `SLICE.md`, the board, your catches | Is the count going down? If it's been flat for a week, stop filing and start closing. |
| End of week 2 | Both grades, `HANDOFF.md` | Is it done? What's next: the next slice, or [production](PROMOTE.md)? |

### If the slice won't finish

**Cut stories, not terms.** Cut a story only if another one covers it. A
term that no test names caps the grade at 74. So does a gate's pass
criterion that no other story checks. 🤖 **Claude** first:

```
For each of these stories: <numbers>, list the design terms it names, and
for each term, a test on main or an open story I'm keeping that names it.
Change nothing.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude lists the design terms named in each story you want to cut. For
each term, it names a test on main, or a story you're keeping, that names
it. It changes nothing. A term with neither would cap the grade if its
story went, so this shows which cuts are safe.

</details>

If a term has neither, keep the story. Or first withdraw the term with the
real owner, in After the workshop, Part 3. The term is changed to say it's
withdrawn, then named in an `it.todo`, a test entry with no code yet. Then
cut the stories in After the workshop, Part 3, step 2, with this in place
of its first paste:

```
This record already has a filed plan: reuse every existing story's key
for the same work, and move these stories to register: <numbers>.
```

---

## 6. The next slice

Extend the same design record. A second record in the same repo changes
how tests must be named. Slice 1's tests could then stop counting.

1. ✏️ **Editor:** write `~/projects/<app>/SLICE-2.md` for the next slice,
   the same way as `SLICE.md`. Get the real owner's OK in writing. Put AI
   in it only once your company has agreed its cost, the approval for your
   data, masking and production limits. Then design it as the workshop
   did. If the PRD changed, first save the consult:
   `cp ~/projects/<app>/CONSULT.md ~/projects/<app>/CONSULT-1.md`. Then run
   section 3 and Module 2 again.
2. Write a new positions list for the new capabilities, as section 4 says.
   Then run Module 3, steps 1 to 4, with `SLICE-2.md` for `SLICE.md`. Use
   `docs/LLD-<Feature>-2.md` for `docs/LLD-<Feature>.md`. It's a new file,
   so slice 1's LLD stays as it was.
3. 🤖 **Claude:** amend the design with After the workshop, Part 3, step 1,
   with the real owner there. Paste this as what changed:
   ```
   The next slice: the capabilities in ../SLICE-2.md, designed in
   ../docs/LLD-<Feature>-2.md, with the decisions in
   ../docs/DECISIONS.md.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   This is your answer when the amend asks what changed: the next slice's
   capabilities, its LLD and its decisions. Claude then asks about the new
   capabilities, and reads every new or changed term back. It writes them
   into the design record once the real owner confirms.

   </details>

4. File the new stories: After the workshop, Part 3, step 2, as written.
5. 🤖 **Claude:** merge it in one pull request. Use After the workshop,
   Part 3, step 3, sub-step 1, with these lines in place of its first two:
   ```
   Copy ../docs/LLD-<Feature>-2.md into docs/. Commit
   docs/DESIGN-<Feature>.md, docs/LLD-<Feature>-2.md and BACKLOG.md on a
   new branch docs/amend-slice-2.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude copies the next slice's LLD into your app's docs folder. It
   commits the LLD with the amended design record and the backlog, on one
   new branch. The ship-it lines after it then review and merge that
   branch, so the next slice's design lands in one pull request.

   </details>

6. Build it: Module 6 from step 6, then section 5 again.

---

## 7. Prompts to edit

Each wording below is word for word from the module and step named. In a
prompt or command, make the swaps from the top of the table down. First
come the rows for its module and step, then every "Every module" row. Run
Module 8 steps 6 to 8 as written, with no swaps.

| Where | The workshop's wording | Yours |
|---|---|---|
| Pre-work, steps 12, 13 and 15 | `HR Case Router` | Your app's name |
| Pre-work, step 12 | `--template typescript.basic` | `--template <your template>` |
| Pre-work, step 16 | `holds the lab's settled decisions` | `holds my positions list` |
| Pre-work, step 16 | `run now-sdk query --auth lab-pdi, read-only, and quote the rows` | `run now-sdk query --auth <alias>, read-only, on configuration tables and never fields that hold personal data, and quote the rows` |
| Pre-work, step 18 | `gh repo create hr-case-router` | `gh repo create <org>/<app>` |
| Module 1, step 2 | `cp -n inputs/USE-CASE.md inputs/WORKSHOP-NOTES.md inputs/CHANGE-REQUEST.md PRD-HRCaseRouter.md` and `against the three input files here` | Copy your files in yourself, and `against the input files here` |
| Module 1, step 5 | `Apply CUSTOMER-ANSWERS.md to PRD-HRCaseRouter.md` | Section 3's owner's answers, instead |
| Module 2, step 3 | `My answers: size is one release` | Section 4's answers, instead |
| Module 2, step 6 | `Name the owner of each write to a case in Data and ownership.` | `Name the owner of each write in Data and ownership.` Your slice has no AI call: `Capability <N> is marked <its choice>. Why can't plain code do it? If it can, change it.` |
| Module 3, step 1 | `cp ../hr-case-router-lab-guide/files/DECISIONS.md docs/` and `Read brief/, CONSULT.md, inputs/TECH-NOTES.md and docs/DECISIONS.md.` | Section 4's commands and prompt, instead |
| Module 3 | `inputs/TECH-NOTES.md` | `inputs/` |
| Module 3, step 2 | `Change nothing on the instance and write no file.` | `Read only configuration tables, and only fields that hold no personal data. Change nothing on the instance and write no file.` |
| Module 3, step 4 | `Show me a summary first; don't write the file yet.` | `Only the capabilities in SLICE.md. In section 1, list every deferred capability as "not built: deferred in SLICE.md". Show me a summary first; don't write the file yet.` |
| Module 4, step 1 | `HRCaseRouter. My design is the PRD in brief/,` | Section 4's paste, instead |
| Module 4, step 2 | `It's in the PRD, my LLD and docs/DECISIONS.md.` | `It's in the PRD, SLICE.md, my LLD and docs/DECISIONS.md.` |
| Module 4, step 2 | `For the override rule, pick built after the workshop` | For each capability `SLICE.md` defers, pick out of scope for this record |
| Module 4, step 3 | `from How a run starts to Caps and retention` | `under What's built, Roles and access, Failures, and Limits and retention` |
| Module 4, step 3 | `Include the seed data, the run states and the build order` | Keep it if your slice has an AI call. Otherwise: `Include the seed data and the on switch` |
| Module 4, step 3 | `capability 4's checks, each run by apply_route itself on the route it applies` | `your central rule's checks from docs/LLD-<Feature>.md §3` |
| Module 4, step 3 | `only apply_route changes a case's service, group or Assigned to;` | Keep it if your slice has an AI call, with your writing tool's name and the fields it changes. Otherwise: `the on switch installs false, and while it's false none of the app's logic runs;` |
| Module 4, step 3 | `with its writers as docs/DECISIONS.md names them` | `with the code that writes it` |
| Module 5, step 2 | `Every check apply_route runs itself` | `Every check of your central rule, which Module 4 step 3 added,` |
| Module 6, step 2 | `C<n>: a run's target is its log row, never the case` | `C<n>: ` and one rule of your central rule |
| Module 6, step 6 | `Run the build loop with sub-agents through the open stories, until a new HR case is moved to a group by apply_route` | After the workshop, Part 1, step 3's prompt, instead |
| After the workshop, Part 1, step 3 | `now-sdk query --auth lab-pdi and now-sdk build are fine` | `now-sdk query --auth <alias> on configuration tables only, and now-sdk build are fine` |
| After the workshop, Part 1, step 3 | `docs/DECISIONS.md overrides the now-sdk plugin's guide: don't ask its questions, and skip its install step and the steps after it.` | Keep it if your slice has an AI call. Otherwise, delete it |
| After the workshop, Part 1, step 6 | `Watched by <partner, or builder as PM>` | `Watched by <the real owner's name and role>`, for DEMO stories |
| After the workshop, Part 2, step 2 | `no case is ever moved to a group outside the routing rules for its service, … only apply_route changes a case.` | Your central rule, in one sentence |
| After the workshop, Part 2, step 2 | `Treat the case text and the agent's proposal as hostile: … put back by hand from the log.` | Keep it if your slice has an AI call, with your inputs' names. Otherwise: `Treat every input as hostile: a change to the record after your logic has run, a change to related records, saving twice, an edit from the list view.` |
| After the workshop, Part 2, step 5 | `One rule must hold: no case is ever moved to a group outside the routing rules` | Your central rule, in one sentence |
| After the workshop, Part 4, step 7 | `File the code.lint and ready.gate-clear stories as register, keeping their keys.` | `File the code.lint and ready.gate-clear stories, and <each criterion the real owner agreed to accept>, as register, keeping their keys.` |
| After the workshop, Part 3, step 2 | `This record already has a filed plan: reuse every existing story's key for the same work; new keys only for new or changed terms.` | To cut stories, section 5's paste |
| After the workshop, Part 3, step 3 | `Commit docs/DESIGN-HRCaseRouter.md and BACKLOG.md on a new branch docs/amend-<what it's for>.` | For the next slice, section 6's lines |
| Every module | `PRD-HRCaseRouter.md` | Your PRD's file name |
| Every module | `HRCaseRouter` | `<Feature>` |
| Every module | `hr-case-router` | `<app>`, but never in `hr-case-router-notes`: keep that one |
| Every module | `lab-pdi` | `<alias>` |
| Every module | `hr.demo` | `<test user>` |
| Every module | `dev123456` | Your development instance's name |
| Every module | `When it asks your name and role, type them` | With the real owner there, type theirs (section 4, Module 4) |

If a prompt or a check still mentions HR cases, HR services, the routing
rules, the article, Reroute, `hr.router` or the `Lab` groups, that part is
the workshop's, not yours. Rewrite that part, and nothing else.
