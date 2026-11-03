# Module 1 — From inputs to a PRD

*⏱ 40 min · 09:00*

You review a PRD drafted from three inputs, and the customer accepts it.
**The catch:** an agent run makes many AI calls, and an agent with poor
information guesses. Does the accepted PRD keep both?

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** a PRD turns what the customer said into what gets built.
  Someone checks it says what they asked for: no more, no less.
- **Why it matters:** everything later is built from it. A line nobody asked
  for gets built anyway; a request it lost never does.
- **Your mindset:** trace it, don't trust it. Every line needs an input behind
  it, however sensible it sounds.

</details>

### 1. Get today's guide

⌨️ **Terminal:**

```
git -C ~/projects/hr-case-router-lab-guide pull
git -C ~/projects/hr-case-router-lab-guide log -1 --format='%cd %s' --date=short
```

✅ The last line, a date and a subject, matches what your instructor shows
on the screen. If `LAB.html` is open, reload it.

<details><summary>🛟 It prints an error, or another date or subject</summary>

Tell your instructor before you go on.

</details>

### 2. Have Claude trace the PRD

⌨️ **Terminal:** start Claude in a review folder. Pick **Yes** to trust it.

```
mkdir -p ~/projects/hr-case-router-prd-review
cd ~/projects/hr-case-router-lab-guide/files
cp -n inputs/USE-CASE.md inputs/WORKSHOP-NOTES.md inputs/CHANGE-REQUEST.md PRD-HRCaseRouter.md ~/projects/hr-case-router-prd-review/
cd ~/projects/hr-case-router-prd-review && claude
```

🤖 **Claude:**

```
Trace PRD-HRCaseRouter.md against the three input files here.
For every capability and requirement in the PRD, quote the input sentence
that supports it, or say "no source". Then list every input statement that
changes what gets built but isn't in the PRD. Quote, don't paraphrase.
Don't edit any file.
```

Compare its list with your pre-work guess.

### 3. Decide the gaps, in one table

🤖 **Claude:**

```
Put every "no source" and every statement left out in one numbered
table, with gaps about the same thing in one row: the PRD line, the
closest input sentence, the gap in plain words, and your
recommendation. Recommend Leave when the line carries out an input, or
limits who can do, see or change something. Recommend Open decision
only when the line sets scope, a release, an owner or a retention
period that no input gives, or picks a side where the inputs disagree,
and 7. Open decisions doesn't ask it already. An open decision adds one
line under 7. Open decisions and changes no other line. Never add a
capability. Then wait, and edit PRD-HRCaseRouter.md only
when I reply "Make the changes."
```

✅ One numbered table, usually 10 to 20 rows, most of them Leave.

Read each row's two quotes: does the input really say that? To change
rows, reply once with their numbers and what to do instead, such as
`4: Leave. 9: Open decision.` Then type `Make the changes.` alone.

✅ Claude reports the lines it added under 7. Open decisions, after its
nine, and no other change.

<details><summary>🛟 It asks about the rows one at a time anyway</summary>

🤖 **Claude:**

```
Stop asking one at a time. Show me the rest as one numbered table, with
the same rule for your recommendations, then wait.
```

</details>

<details><summary>🛟 Claude closed, or the window crashed</summary>

⌨️ **Terminal:**
`cd ~/projects/hr-case-router-prd-review && claude --continue`. It reopens
the conversation where it stopped.

</details>

### 4. Log it

🤖 **Claude:**

```
Log this module's catches: real problems the process found, in this
session or this module's pull requests, that got fixed or changed a
decision. Read ~/projects/hr-case-router/catches.md first and skip any
line already there. One line each, as "1 | <what caught it> | <what, and
what was done>", where what caught it is one of prd, consult, research,
design, guard, test, review, partner, grade, drill. Show me the lines,
and when I reply keep, append them to
~/projects/hr-case-router/catches.md.
```

Keep a line for each gap that changed the PRD in step 3. Then reply
`keep`.

✅ ⌨️ In a second window (**Cmd+N**),
`tail -n 5 ~/projects/hr-case-router/catches.md` shows the lines you kept.

### 5. Get the customer's acceptance

⌨️ **Terminal**, in that window, get the customer's answers:

```
cp ~/projects/hr-case-router-lab-guide/files/CUSTOMER-ANSWERS.md ~/projects/hr-case-router-prd-review/
```

🤖 **Claude:**

```
Apply CUSTOMER-ANSWERS.md to PRD-HRCaseRouter.md: put each
answer into every section it affects, 4 and 6 too, replacing each "is an
open decision". Where it gives no answer, follow its Anything else row
and tell me what you chose. Set 7. Open decisions to "None.", fill in 8.
Acceptance from it with today's date, and replace "Draft 2" with
"Accepted" and today's date. Change nothing else.
Then copy the PRD into ~/projects/hr-case-router/brief/.
```

When it's done, type `/exit` alone. Then ⌨️ **Terminal:**

```
ls ~/projects/hr-case-router/brief
grep -c -e 'is an open decision' -e 'Draft 2' ~/projects/hr-case-router/brief/PRD-HRCaseRouter.md
```

✅ It prints `PRD-HRCaseRouter.md`, then `0`.

✏️ **Editor:** open `hr-case-router/brief/PRD-HRCaseRouter.md`.
✅ The line that said Draft 2 says Accepted; 4. still warns of a run's many
AI calls and of an agent's guesses; 7. reads `None.`; 8. names the product
manager, with today's date.

<details><summary>🛟 Claude asks you a business question</summary>

🤖 **Claude:** type
`Follow the Anything else row, take your recommendation, and carry on.`

</details>

<details><summary>🛟 It prints a number above 0, or a check fails</summary>

⌨️ **Terminal:**
`cd ~/projects/hr-case-router-prd-review && claude --continue`. Then
🤖 **Claude:** type `Recheck sections 4, 6, 7 and 8 and the Draft 2 line
against my request, fix them, then copy the PRD again.`

</details>

## You now have

- `~/projects/hr-case-router/brief/PRD-HRCaseRouter.md`,
  accepted, and this module's catches in `catches.md`.
