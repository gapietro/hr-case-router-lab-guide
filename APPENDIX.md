# Appendix — Labels in Claude's output

[Lab home](README.md) · [← Getting it to production](PROMOTE.md)

Claude, the kit and the lab's files name things with short labels: a
letter and a number, such as `C3`, `P8` or `§7`. This page says what each
one means and where to look it up. Each step whose output uses one has an
ℹ️ box that explains it in place.

**`C3` isn't capability 3.** The PRD's capabilities have no letter: they're
written out, "capability 3". `C3` is rule 3 of your design record. If Claude
calls a capability `C3` in the consult or the LLD, that's its own shorthand:
read it as capability 3 there. From Module 4 on, a `C` number is only ever a
design term, and Module 5 checks your LLD uses none.

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

The nine things the PRD asks the app to do, listed in its section 3,
"Capabilities requested". Claude writes them out, "capability 3", or as a
bare number: in a table's **#** column, as in `CONSULT.md`, or in brackets,
such as "the weekly numbers (9)". Capabilities 3 and 5 use AI: routing a new
case, and routing it again when a fulfiller clicks **Reroute**. Capability 4
is the checks on every move the agent wants to make.

## R2, R8…: the customer's requirements

The customer's own numbers for their requirements, in their use case,
`inputs/USE-CASE.md`. Each says how much it matters: **Must** is a
must-have, **Should** is wanted but not essential. The numbers are the
customer's, so some are missing. You meet them in Module 1, when Claude
traces each line of the PRD back to the inputs and quotes them.

## P1 to P15: platform rules

Things your ServiceNow instance really does that the build must allow for,
in the "Platform rules" table of `docs/DECISIONS.md`, each with its reason.
Each comes from a real failure, or from a new risk agents bring. Two
you'll meet often:

- **P7:** every install turns the router's on switch off, so you set it
  back to `true` after each one.
- **P8:** the first runs after an install may each fail once per HR table.
  Run again.

The lab's test file, `src/platform-rules.test.ts`, checks P1 to P5, P12 and
P13 each time `npm test` runs. The live checks prove the rest. Upper-case
`P` is a platform rule; lower-case `p0` to `p2` is a priority, below.

## D1, D2…: open decisions in your LLD

The questions your LLD (the low-level design: how each part of the app will
be built) can't settle yet, listed in its section 8. Claude never guesses
one: each waits for the customer, or for Module 4's design challenge, which
either decides it or leaves it out of this release. `D` numbers belong to the
LLD only, so they never clash with the design record's `C` numbers.

## C1, C2…: design terms

The numbered rules of your design record, `docs/DESIGN-HRCaseRouter.md`, in
its section 3. Think of `C` as *contract*: once you confirm the record in
Module 4, it's the contract the build follows, and each term is one rule in
it that a test or a person can check, such as "only `apply_route` changes a
case".

- A term keeps its number for good. A term changed later keeps its number,
  and the change goes in the record's drift log, section 10.
- Each test's name starts with the number of the term it proves, such as
  `C12: a run's target is its log row, never the case`. A prompt writes this
  as `C<n>`: Claude puts the real number in its place.
- The grade counts a term as tested only when a test's name or file names
  its number.

## §1, §7…: sections of a document

`§` means *section*. `§7` is section 7 of the document the sentence is
about: usually the design record, sometimes your LLD.

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

The build plan files one GitHub milestone per gate, numbered in the order
you reach them, such as `M1 · merge` and `M2 · install`. A milestone holds the
stories its gate needs: a gate passes only when its stories are done. The
grade marks one milestone at a time: Module 7 grades the merge gate.

## p0, p1, p2: priority labels

A story's priority on GitHub, set only by how soon its gate comes:

- **p0:** it holds up the next gate. Do these first.
- **p1:** it holds up the gate after that.
- **p2:** further out.

The plan adds other labels too: `gate:merge` and the like (the story's
gate), `size:s`, `size:m` or `size:l` (how big it is), `epic` (a group of
stories), and `register` (something to rule on or keep for later, with no
gate).

## design.terms-tested…: the grade's checks

Each row of `GRADE.md` is one check: the area it looks at, a dot, then what
it checks. `design.terms-tested` checks that a test names every design term.
`ready.gate-clear` checks that the gate's stories are all closed.
`code.lint` looks for a lint script, which this lab doesn't use. A **cap**
limits the whole score when one serious check fails.
