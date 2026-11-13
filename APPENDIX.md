# Appendix — Labels in Claude's output

[Lab home](README.md) · [← Getting it to production](PROMOTE.md)

Claude, the kit and the lab's files name things with short labels. The kit
is prove-it, the Claude Code plugin the lab runs on. Most labels are a
letter and a number, such as `C3`, `P8` or `§7`. This page says what each
label means and where to look it up. Any step whose output uses a label
also has an ℹ️ box that explains it right there.

**`C3` isn't capability 3.** The PRD's capabilities have no letter. They're
written out, as "capability 3". `C3` is rule 3 of your design record, the
design you confirm in Module 4. Claude may still call a capability `C3` in
the consult or the LLD. That's its own shorthand, so read it as capability
3 there. From Module 4 on, a `C` number is only ever a design term. Module
5 checks that your LLD uses none.

| Label | In plain words | Where it's written | You first meet it |
|---|---|---|---|
| capability 1 to 9 | One of the nine things the PRD asks the app to do | The PRD, section 3 | Module 1 |
| `R2`, `R8`… | One of the customer's requirements | `inputs/USE-CASE.md` | Module 1, step 2 |
| `P1` to `P15` | A platform rule: something your instance really does that the build must allow for | `docs/DECISIONS.md`, "Platform rules" | Module 3, step 1 |
| `D1`, `D2`… | A question your LLD can't settle yet | Your LLD, section 8 | Module 3, step 4 |
| `C1`, `C2`… | A design term: one rule of your design record that a test or a person can check | Your design record, section 3 | Module 4, step 3 |
| `§1`, `§7`… | Section 1, section 7 of a document | The design record or your LLD | Module 3, step 4 |
| `M1 · merge`… | A milestone: the stories one gate needs | GitHub, **Milestones** | Module 5, step 2 |
| `p0`, `p1`, `p2` | A story's priority: how soon its gate comes | GitHub, **Labels** | Module 5, step 2 |
| `design.terms-tested`… | One of the grade's checks | `GRADE.md` | Module 7, step 5 |

## Capabilities 1 to 9, no letter

These are the nine things the PRD asks the app to do. They're listed in its
section 3, "Capabilities requested". Claude writes them out, as "capability
3". Or it uses a bare number: in a table's **#** column, as in
`CONSULT.md`, or in brackets, such as "the weekly numbers (9)".
Capabilities 3 and 5 use AI. Capability 3 routes a new case. Capability 5
routes it again when a fulfiller, someone who works HR cases, clicks
**Reroute**. Capability 4 is the checks on every move the agent wants to
make.

## R2, R8…: the customer's requirements

These are the customer's own numbers for their requirements. They're in the
customer's use case, `inputs/USE-CASE.md`. Each requirement says how much
it matters. **Must** is a must-have. **Should** is wanted but not
essential. The numbers are the customer's, so some are missing. You meet
them in Module 1. There Claude traces each line of the PRD back to the
inputs, and quotes them.

## P1 to P15: platform rules

These are things your ServiceNow instance really does that the build must
allow for. They're in the "Platform rules" table of `docs/DECISIONS.md`,
each with its reason. Each comes from a real failure, or from a new risk
that AI agents bring. You'll meet two of them often:

- **P7:** every install turns off the router's on switch, the setting that
  lets its logic run. So you set it back to `true` after each install.
- **P8:** the first runs after an install may each fail once per HR table.
  Run again.

The lab's test file, `src/platform-rules.test.ts`, checks P1 to P5, P12 and
P13 each time `npm test` runs. The live checks, run on your instance, prove
the rest. An upper-case `P` is a platform rule. A lower-case `p0` to `p2`
is a priority, explained below.

## D1, D2…: open decisions in your LLD

These are the questions your LLD can't settle yet. The LLD is the low-level
design: how each part of the app will be built. Its section 8 lists them.
Claude never guesses an answer. Each one waits for the customer, or for
Module 4's design challenge. The challenge either decides it or leaves it
out of this release. `D` numbers belong to the LLD only. So they never
clash with the design record's `C` numbers.

## C1, C2…: design terms

These are the numbered rules of your design record,
`docs/DESIGN-HRCaseRouter.md`, in its section 3. Think of `C` as
*contract*. Once you confirm the record in Module 4, it's the contract the
build follows. Each term is one rule in it that a test or a person can
check, such as "only `apply_route` changes a case".

- A term keeps its number for good, even if it changes later. The change
  goes in the record's drift log, section 10.
- Each test's name starts with the number of the term it proves, such as
  `C12: a run's target is its log row, never the case`. A prompt writes this
  as `C<n>`. Claude puts the real number in its place.
- The grade counts a term as tested only when a test's name or file names
  its number.

## §1, §7…: sections of a document

`§` means *section*. `§7` is section 7 of the document the sentence is
about. That's usually the design record, and sometimes your LLD.

| § | The design record | Your LLD |
|---|---|---|
| §1 | Summary: what's built, and why | Scope: each capability, built or deferred |
| §2 | Context: the documents it relies on | Components: the parts of the app |
| §3 | Terms: the numbered rules, `C1`, `C2`… | Logic: what runs, and when |
| §4 | Data: each table, and who may change it | Security: roles and access |
| §5 | Failures, and how each is handled | Failures, one per component |
| §6 | Security and access | Test plan |
| §7 | Gates: what each must pass | Research log: the facts you checked |
| §8 | The options turned down, and why | Open decisions: `D1`, `D2`… |
| §9 | Approval: who confirmed it, and when | |
| §10 | Drift log: every change after approval | |

## M1 · merge…: milestones

The build plan files one GitHub milestone for each gate. They're numbered
in the order you reach them, such as `M1 · merge` and `M2 · install`. A
milestone holds the stories its gate needs. A gate passes only when its
stories are done. The grade marks one milestone at a time. Module 7 grades
the merge gate.

## p0, p1, p2: priority labels

This is a story's priority on GitHub. It depends only on how soon the
story's gate comes:

- **p0:** it holds up the next gate. Do these first.
- **p1:** it holds up the gate after that.
- **p2:** further out.

The plan adds other labels too:

- `gate:merge` and the like: the story's gate.
- `size:s`, `size:m` or `size:l`: how big the story is.
- `epic`: a group of stories.
- `register`: something to rule on or keep for later, with no gate.

## design.terms-tested…: the grade's checks

Each row of `GRADE.md` is one check. Its name is the area it looks at, a
dot, then what it checks. `design.terms-tested` checks that a test names
every design term. `ready.gate-clear` checks that the gate's stories are
all closed. `code.lint` looks for a lint script, which checks the code's
style. This lab doesn't use one. A **cap** limits the whole score when one
serious check fails.
