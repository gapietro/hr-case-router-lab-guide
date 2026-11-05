# Your own PRD track — build your own app with the same method

[Lab home](README.md) · [Getting it to production →](PROMOTE.md)

*⏱ A half-day kick-off, then 8–15 sessions of 1–2 hours over about two
weeks · the real owner, four times*

You've done the workshop on the HR Case Router, so you know
what each module should feel like. This track runs the **same modules on
your own use case**, and ends with one **slice** of your app, working on
your company's development instance, graded and handed over.

**Do the workshop first**, Module 7 and
[After the workshop](AFTER-THE-WORKSHOP.md) included: one full run with
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
| Generative AI in the app | One AI agent, whose one writing tool checks every move in plain code, behind caps and an on switch | The same, **only once its four conditions are agreed** (section 2); otherwise none in the first slice |

---

## 2. Before you start

### Is your use case ready?

Settle every row at the kick-off, with your instructor and your platform
team. Each must be **true**, or avoided by the slice you choose.

| Must be true | Why |
|---|---|
| You have the inputs: a use case, notes from the people who asked, technical documents | A one-line request isn't enough to trace a PRD against |
| A named **real owner** will answer the open decisions, accept the PRD and confirm the design | A design you confirm alone is a guess |
| **Claude Code is approved for your company's data** | You'll give it your PRD and technical documents |
| The repo can live in **your company's GitHub organisation**, with Issues on | The kit's plan and grade use GitHub Issues |
| A **development instance in your company's own instance family**, with your scope prefix, and agreement to install there | An app built on a lab instance can't be promoted: its scope prefix belongs to that instance |
| You know **how the SDK signs in** to it: a local admin account, or your platform team's way | Single sign-on instances may refuse the SDK's basic sign-in |
| Your development instance **holds no production records, or they're scrubbed**, as your platform team confirms | Claude queries it while it researches and builds. Section 7 also limits every query to configuration |
| You have **admin on the development instance** for the two weeks, or a named admin does the 🌐 **Admin** steps within an hour of each install | The test user, the on switch, role grants and approvals are admin work |
| An AI call in the first slice has its **four conditions agreed in writing**: its cost, approval to send your data to the model, masking, and production limits. Not agreed? The first slice has **no generative AI at runtime** | Only others can agree those four, and that takes longer than a first slice. Agreed before the kick-off? Build the AI the workshop's way: one agent whose one writing tool checks every change in plain code, behind caps and an on switch. Not agreed? Defer it to a later slice (section 6) |
| Any **integration** in the slice has a test endpoint and credential for dev | See "Integrations" in section 4 |
| You have **8–15 sessions of 1–2 hours** over two weeks | Less time means a smaller slice |

### Book now

| What | Who | By |
|---|---|---|
| The kick-off: this section, row by row | You, your instructor, your platform team | Day 1 |
| The open decisions answered, and the PRD accepted | The real owner | Day 2 |
| The slice's deferred list, agreed in writing | The real owner | Day 3 |
| The design challenge and its read-back, about 2 hours | The real owner | Day 5 |
| The attack, and the drill's plant | A colleague who didn't build it | Week 2 |
| DEMO: the slice working live | The real owner | Week 2 |
| How the app moves to production | Your platform team | Before [PROMOTE.md](PROMOTE.md) |

### Your app's placeholders

Settle these at the kick-off. The prompts and commands below use them.

| Placeholder | What it is | Example |
|---|---|---|
| `<app>` | Your app's short name: its folders and its repo | `access-review` |
| `<Feature>` | Your design's feature name, letters only | `AccessReview` |
| `<alias>` | The SDK's name for your development instance | `acme-dev` |
| `<SCOPE>` | Your app's scope, with your company's scope prefix | `x_acme_access` |
| `<org>` | Your company's GitHub organisation | `acme-it` |
| `<test user>` | Your ordinary user: a test user with only your real users' roles | `access.tester` |
| `now-sdk init` template | Your platform team's choice | `typescript.basic` |

### Your workspace, and the lab set up again

1. ⌨️ **Terminal:** make your own workspace. A second brief, or the
   workshop's `CONSULT.md`, would confuse the kit.
   ```
   mkdir -p ~/projects/<app>/brief
   touch ~/projects/<app>/catches.md ~/projects/<app>/LOG.md
   ```
   ✏️ **Editor:** write your values in `LOG.md`. The Log it prompts add
   your catches to `catches.md`.
2. Close Claude everywhere first:
   <span data-show="surface:terminal">**In the terminal:** type `/exit` in
   every Claude window.</span>
   <span data-show="surface:desktop">**In the Code tab:** close every
   session
   (<kbd data-mac="Cmd+W" data-win="Ctrl+W">Cmd+W (Mac) · Ctrl+W (Windows)</kbd>).</span>
   Then ⌨️ **Terminal**, in your window, the lab's settings (Module 0
   step 6):
   ```
   git -C ~/projects/hr-case-router-lab-guide pull
   node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
   ```
   ✅ It prints `Lab settings in place.`
3. ⌨️ Did Module 9 step 8? Install the kit and the SDK plugin again
   (Module 0 step 9):
   ```
   claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.4'
   claude plugin install prove-it@prove-it
   claude plugin install servicenow-sdk@claude-plugins-official
   ```
   ✅ None of the three prints an error. Skipped Module 9 step 8? Remove
   the workshop's login, so nothing reaches the lab instance by mistake:
   `now-sdk auth --delete lab-pdi`
4. ⌨️ The SDK login for your development instance (Module 0 step 8), your
   platform team's way. With basic sign-in, `<instance>` being its name:
   ```
   now-sdk auth --add https://<instance>.service-now.com --type basic --alias <alias>
   now-sdk auth --list
   ```
   ✅ The list shows `[<alias>]`, and no `[lab-pdi]`.
5. ⌨️ `gh auth status`. ✅ The active account can create repos in `<org>`.
   If not: `gh auth switch --user <that account>`.
6. In `LAB.html`, open **Your values** (the setup chip, top right), click
   **Clear my values** at the bottom of the panel, and confirm, so the
   steps you reuse show placeholders for section 7's swaps.
7. Run Module 0 step 11, from `~/projects/<app>`. Then Module 0 steps 13
   to 19, with section 7's swaps. Skip step 12: your scope is `<SCOPE>`.
   In step 18, if your instances use your company's own domain, add it:
   `echo '<domain>' >> .prove-it/patterns`
8. 🌐 **Browser**, as admin, on your development instance: create
   `<test user>` in `sys_user.list`, with your real users' roles. ✅ Its
   **Roles** tab lists only those, never `admin`. Where the lab says to
   impersonate `hr.demo`, impersonate `<test user>`. Module 6 step 9 adds
   your app's own role, after the first install.

### When Claude asks permission

The README's permission table holds, with your names: **Yes** for files in
`~/projects/<app>` and `~/projects/<app>-prd-review`, and for
`now-sdk query --auth <alias>` on configuration tables. **No** for a query
of records about people, for `now-sdk auth`, for `now-sdk install` except
the grade's install to `<alias>`, and for any alias but yours, `lab-pdi`
included.

---

## 3. Your PRD

### Size it

The consult reads the whole PRD. If it has **more than about 12
capabilities**, put **one release or epic** in `brief/`, and list the rest
under **Out of scope** as "later releases".

### Format it

- **Markdown**, one file. Convert a Word or PDF document first.
- The layout of the workshop's `files/PRD-HRCaseRouter.md`:
  1. Problem, 2. Users, 3. Capabilities requested (numbered, each with
  "Accepted when"), 4. Non-functional requirements, 5. Out of scope,
  6. Success looks like, 7. Open decisions, 8. Acceptance.

### Review it: Module 1, on your inputs

Skip step 1. Do steps 2 to 4 with section 7's swaps, and copy your input
files and your PRD into `~/projects/<app>-prd-review` yourself.

### Get the owner's answers: Module 1, step 5, instead

Never answer a business question for the real owner, and never let Claude
choose one.

1. Meet the real owner with your open decisions. ✏️ **Editor:** write
   their answers, in their words, in
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
2. Send it to them. Fill in **Acceptance** only once they confirm it in
   writing, and keep their reply.
3. 🤖 **Claude**, in the review folder:
   ```
   Apply OWNER-ANSWERS.md to <your PRD file>: put each answer into every
   section it affects. If an open decision has no answer, stop and tell me
   which: never choose one. Set Open decisions to "None.", fill in
   Acceptance from OWNER-ANSWERS.md, and mark the PRD Accepted, with that
   date, under its title. Change nothing else. Then copy the PRD into
   ~/projects/<app>/brief/.
   ```
4. ⌨️ **Terminal:** `ls ~/projects/<app>/brief`. ✅ It lists only your
   PRD. ✏️ **Editor:** ✅ its Open decisions reads `None.`, and its
   Acceptance names the real owner.

---

## 4. Module by module

Run them in this order, on your app:

1. Section 3, Module 2, then Choose one slice and Write your positions
   list, below.
2. Modules 3 to 6.
3. After the workshop, Part 1, until `merge`, `install` and `demo` print 0.
4. Module 7, After the workshop, Part 2, and Part 3 when a fix needs it.
5. After the workshop, Part 4. Skip Module 8: its grade is a preview.
6. Module 9, steps 1, 3 and 5. Steps 6 to 8 put your machine back: only
   once you're done with this method.

**Before you paste a prompt or command**, paste it into a new VS Code tab
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>),
make section 7's swaps
(<kbd data-mac="Cmd+Option+F" data-win="Ctrl+H">Cmd+Option+F (Mac) · Ctrl+H (Windows)</kbd>)
and fill in each
`<…>`, then copy it out. Times, lunch and the instructor's finished build
don't apply. Your instance asleep, or not answering? Ask your platform
team.

### Module 2 — Consult

- Step 3: paste this instead:
  ```
  My answers: size is <your honest estimate, such as one release of 8
  capabilities>. Run no commands; mark anything unchecked VERIFY.
  Anything only the real owner can answer, record as an open decision;
  never guess. Yes, raise any other open decisions you find.
  ```
- Step 4: its list also shows your `LOG.md`. Keep it.
- Step 5: read every AI row, the **Data and ownership** table, every
  **VERIFY** and every **Readiness** row that isn't ready.
- Step 6: section 7's push-back, once for each AI row.

### After Module 2 — Choose one slice

A slice is the thinnest piece a real user can use from start to finish.
Everything else is deferred, not dropped.

1. <span data-show="surface:terminal">**In the terminal:** ⌨️
   `cd ~/projects/<app> && claude`.</span>
   <span data-show="surface:desktop">**In the Code tab:** start a new
   session (<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>)
   on `~/projects/<app>`, with the top **Local** entry and **Open folder…**
   under the prompt box, then **Verbose** (**Ctrl+O**).</span> Then 🤖
   **Claude:**
   ```
   Read brief/ and CONSULT.md. Propose two or three end-to-end slices. Each
   slice must: let a real user do one complete thing; be about 5 to 8
   stories; use no generative AI unless I say its cost, data approval,
   masking and limits are agreed, and then one AI agent whose tools check
   every change in plain code, behind caps and an on switch; avoid anything
   the consult marked not ready or conditional, or listed under Open
   decisions; and avoid integrations unless the slice can't work without
   one. For each, list the capabilities it covers, what it defers, and the
   riskiest assumption it tests. Don't write any file.
   ```
2. Choose the one that **tests your riskiest assumption first**, not the
   easiest. Keep it small: cutting it later is costly (section 5).
3. ✏️ **Editor:** write `~/projects/<app>/SLICE.md` by hand: the
   capabilities in the slice, the ones deferred, the one thing a real user
   will be able to do, and your **live check**: the steps `<test user>`
   follows to see it work.
4. Get the real owner's OK on what's deferred, in writing.

### Before Module 3 — Write your positions list

Modules 3 to 5 read `docs/DECISIONS.md`. Yours holds only what is
settled for your app: never copy the workshop's.

1. ⌨️ **Terminal:** `mkdir -p ~/projects/<app>/docs`. Then ✏️ **Editor:**
   create `~/projects/<app>/docs/DECISIONS.md` with this. Keep the
   headings, and the names: Module 6 step 9 uses them.
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
   | MERGE | Every change reviewed. `now-sdk build` and `npm test` exit 0; lint isn't a criterion. Every design term, boundary terms included, is named in a test file: a unit test, a named live check under INSTALL, or an `it.todo` naming the term and why it needs no code. |
   | INSTALL | Installs cleanly on the development instance, and the live checks for what this slice builds pass, as <test user>, not an admin. |
   | DEMO | The real owner sees the slice work live, as <test user>. |
   | HANDOFF | Someone else diagnoses a failure from the runbook alone. |
   ```
2. Add a row, under its heading, for each decision the PRD,
   `OWNER-ANSWERS.md` or `SLICE.md` already settles. Each deferred
   capability is a row under What's built: `Out of scope for this record:
   deferred in SLICE.md`. Your slice has an AI call? Add the workshop's AI
   rows too, shaped like the lab's `files/DECISIONS.md`, filled from your
   written agreement: the agent and its tools, the one tool that writes and
   its checks, how a run starts, the threshold, the caps by property name,
   the run-as user, never admin, and masking as agreed (checked live). Add the
   lab's Platform rules section as it is too: they're facts about the
   platform, not the workshop, and Module 5 brings in the test that checks
   them. Nothing else goes in: an open question goes to the real owner,
   never into this file.
3. After Module 3, before Module 4: take each item in your LLD's section 8
   to the real owner, and add their answer as a row.

### Module 3 — Research and LLD

- Step 1: ⌨️ **Terminal** first:
  ```
  cd ~/projects/<app> && mkdir -p inputs
  cp ../hr-case-router-lab-guide/files/LLD-TEMPLATE.md docs/
  ```
  ✏️ Copy your technical documents into `~/projects/<app>/inputs/`, as
  Markdown. Then <span data-show="surface:terminal">**In the terminal:** ⌨️
  `claude`.</span> <span data-show="surface:desktop">**In the Code tab:**
  start a new session
  (<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>)
  on `~/projects/<app>`, with the top **Local** entry and **Open folder…**
  under the prompt box, then **Verbose** (**Ctrl+O**).</span> 🤖 Paste this
  instead of the module's:
  ```
  Read brief/, CONSULT.md, SLICE.md, inputs/ and
  docs/DECISIONS.md. List every platform fact the design relies on,
  for the capabilities in SLICE.md only, including what a scoped app needs
  to read and write the tables they use, and anything else that runs when
  those records change. Mark the five the design depends on most. For each
  fact, say how sure you are and how to check it by reading records only.
  Design nothing, run nothing, write no file.
  ```
- Step 2: its fallback script runs only with your platform team's OK.
- Step 4: ✅ the summary covers every capability in `SLICE.md`, and lists
  each deferred one as not built.

**Integrations.** Credentials go only into a **connection and credential**
record an admin sets up by hand on each instance: never into `src/`,
Claude or a drill card. Keep the outbound call out of your plain-code
logic, so that logic still tests without the instance. Note each
instance's endpoint and credential for [PROMOTE.md](PROMOTE.md).

### Module 4 — Challenge and confirm, with the real owner

The real owner sits with you for all of it, about two hours: beside you,
or on a call with your screen shared. They answer; you type their words.

- Step 1: when it asks you to confirm the feature name, paste this
  instead:
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
- Steps 2 and 3: a question the owner can't answer today? Stop, and carry
  on when they can. Never answer for them. Check step 3's read-back
  against your own file's rows.
- Step 4: the owner reads the whole read-back. When they agree, type
  `Confirmed.` alone. When it asks the name and role, type theirs, such as
  `Sam Lee, product owner`. ✅ §9 names the owner.

Every later amend works the same way, with the owner there: Module 5's
boxes, Module 6 step 2's ruling box, After the workshop, Part 3, and
section 6. No owner, no amend.

### Module 5 — Check and plan

As written, with section 7's swaps: your names, and `<alias>` for
`lab-pdi`. Your positions list is the third file step 1 brings in.

### Module 6 — The build loop

- Step 6: use After the workshop, Part 1, step 3's prompt instead: it
  builds every story code alone can build.
- Step 7: open your key story's pull request. ✅ Its bullets say when your
  logic runs, what it writes, and that nothing in it breaks your central
  rule. The table shows merged every story your live check needs.
- Step 9: sub-steps 1 and 2, for `<test user>`. No scheduled job in your
  slice? Skip sub-step 3, the dispatcher's trigger.
- Steps 10 and 11: your live check from `SLICE.md`, impersonating
  `<test user>`, on demo records you seeded, never a real one.
  Step 11's defect box works as written.

### Module 7 — Break it

- Step 1: guess three ways to break your central rule.
- After the workshop, Part 2, step 2: fix **every** attempt that got
  through, then run Module 7 again with a new reviewer, until a round
  finds nothing.
- After the workshop, Part 2, step 3: a colleague who didn't build it
  attacks, as `<test user>`.

### After the workshop, on your app

- Part 1, step 1: check your LLD for these instead: §1 has each slice
  capability, and marks each deferred one; §3 says where your logic runs
  and **when**; §4 covers who can do what, and access across scopes; §5
  has a failure mode per component; §6 tests your central rule off the
  instance, and your live check on it; §7 matches your research.
- Part 1, step 4: check 1 always; 2 only with a scheduled job; 3 only if
  you seed an article; for 4 and 5, a test user for your app's admin role
  instead of `owner.demo`; 6 and 7 only with an AI call.
- Part 1, step 5: instead of its checks, your live check, and one check
  for each term only the platform can prove, as `<test user>`. The real
  owner watches your live check: that's the DEMO.
- Part 4, step 3: the colleague plants a failure realistic for your app.
  The symptom names your own records. Step 5's live check is yours too.

### Module 9 — What the process caught

Step 3's "not built" list is your `SLICE.md` deferred list, plus anything
the grade or the verdict left open. Add one line: what you'll build next.

---

## 5. Finishing the slice

### The gates, in order

The plan files one milestone per gate: **MERGE → INSTALL → DEMO →
HANDOFF**. ⌨️ **Terminal**, in `~/projects/<app>/app`:

```
for g in merge install demo handoff; do
  echo "$g: $(gh issue list --state open --label "gate:$g" --limit 5000 --json labels --jq '[.[] | select(all(.labels[]; .name != "register"))] | length')"
done
```

✅ The next gate is the first count not at 0, whatever `BACKLOG.md` says.
Nothing closes milestones for you. **The count is the truth.**

### Done means

- [ ] `GRADE.md` holds a HANDOFF grade (After the workshop, Part 4, step
  7), not headed `Preview`, with a final score of **75 or more** and its
  **Caps applied** table empty.
- [ ] Each story that grade filed is closed, or filed as register with a
  reason the real owner agreed. File it there with section 7's register
  reply, at the grade's findings: a later grade then keeps it there. Then
  record the reason on each:
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
| End of week 1 | `SLICE.md`, the board, your catches | Is the count going down? Flat for a week? Stop filing and start closing. |
| End of week 2 | Both grades, `HANDOFF.md` | Is it done? What's next: the next slice, or [production](PROMOTE.md)? |

### If the slice won't finish

**Cut stories, not terms.** Cut only a story another one covers: a term
no test names, or a gate's pass criterion no other story checks, caps the
grade at 74. 🤖 **Claude** first:

```
For each of these stories: <numbers>, list the design terms it names, and
for each term, a test on main or an open story I'm keeping that names it.
Change nothing.
```

A term with neither? Keep the story, or first withdraw the term with the
real owner (After the workshop, Part 3: changed to say it's withdrawn, then
named in an `it.todo`). Then cut: After the workshop, Part 3, step 2, with
this in place of its first paste:

```
This record already has a filed plan: reuse every existing story's key
for the same work, and move these stories to register: <numbers>.
```

---

## 6. The next slice

Extend the same design record. A second record in the same repo changes
how tests must be named, which can stop slice 1's tests counting.

1. ✏️ **Editor:** write `~/projects/<app>/SLICE-2.md`, as `SLICE.md`, for
   the next slice, and get the real owner's OK in writing. AI in it? Only
   once your company has agreed its cost, the approval for your data,
   masking and production limits: then design it as the workshop did. The
   PRD changed? First save the consult,
   `cp ~/projects/<app>/CONSULT.md ~/projects/<app>/CONSULT-1.md`, then run
   section 3 and Module 2 again.
2. Write a new positions list for the new capabilities, as section 4 says.
   Then Module 3, steps 1 to 4, with `SLICE-2.md` for `SLICE.md` and
   `docs/LLD-<Feature>-2.md` for `docs/LLD-<Feature>.md`: a new file, so
   slice 1's LLD stays as it was.
3. Amend the design: After the workshop, Part 3, step 1, with the real
   owner there, and this as what changed:
   ```
   The next slice: the capabilities in ../SLICE-2.md, designed in
   ../docs/LLD-<Feature>-2.md, with the decisions in
   ../docs/DECISIONS.md.
   ```
4. File the new stories: After the workshop, Part 3, step 2, as written.
5. Merge it, in one pull request: After the workshop, Part 3, step 3,
   sub-step 1, with these lines in place of its first two:
   ```
   Copy ../docs/LLD-<Feature>-2.md into docs/. Commit
   docs/DESIGN-<Feature>.md, docs/LLD-<Feature>-2.md and BACKLOG.md on a
   new branch docs/amend-slice-2.
   ```
6. Build it: Module 6 from step 6, then section 5 again.

---

## 7. Prompts to edit

Each wording below is word for word from the module and step named. In a
prompt or command, make the swaps from the top down: the rows for its
module and step, then every "Every module" row. Run Module 9 steps 6 to 8
as written.

| Where | The workshop's wording | Yours |
|---|---|---|
| Module 0, steps 13, 14 and 16 | `HR Case Router` | Your app's name |
| Module 0, step 13 | `--template typescript.basic` | `--template <your template>` |
| Module 0, step 17 | `holds the lab's settled decisions` | `holds my positions list` |
| Module 0, step 17 | `run now-sdk query --auth lab-pdi, read-only, and quote the rows` | `run now-sdk query --auth <alias>, read-only, on configuration tables and never fields that hold personal data, and quote the rows` |
| Module 0, step 19 | `gh repo create hr-case-router` | `gh repo create <org>/<app>` |
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
| Module 4, step 3 | `only apply_route changes a case;` | Keep it if your slice has an AI call, with your writing tool's name. Otherwise: `the on switch installs false, and while it's false none of the app's logic runs;` |
| Module 5, step 2 | `Every check apply_route runs itself` | `Every check of your central rule, which Module 4 step 3 added,` |
| Module 6, step 2 | `C<n>: a run's target is its log row, never the case` | `C<n>: ` and one rule of your central rule |
| Module 6, step 6 | `Run the build loop with sub-agents through the open stories, until a new HR case is moved to a group by apply_route` | After the workshop, Part 1, step 3's prompt, instead |
| After the workshop, Part 1, step 3 | `now-sdk query --auth lab-pdi and now-sdk build are fine` | `now-sdk query --auth <alias> on configuration tables only, and now-sdk build are fine` |
| After the workshop, Part 1, step 3 | `docs/DECISIONS.md overrides the now-sdk plugin's guide: don't ask its questions, and skip its install step and the steps after it.` | Keep it if your slice has an AI call. Otherwise, delete it |
| After the workshop, Part 1, step 6 | `Watched by <partner, or builder as PM>` | `Watched by <the real owner's name and role>`, for DEMO stories |
| Module 7, step 2 | `no case is ever moved to a group outside the routing rules for its service, … only apply_route changes a case.` | Your central rule, in one sentence |
| Module 7, step 2 | `Treat the case text and the agent's proposal as hostile: … put back by hand from the log.` | Keep it if your slice has an AI call, with your inputs' names. Otherwise: `Treat every input as hostile: a change to the record after your logic has run, a change to related records, saving twice, an edit from the list view.` |
| After the workshop, Part 2, step 3 | `One rule must hold: no case is ever moved to a group outside the routing rules` | Your central rule, in one sentence |
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
rules, the article, Reroute, `hr.router` or the `Lab` groups, it's the
workshop's, not yours. Rewrite that part, and nothing else.
