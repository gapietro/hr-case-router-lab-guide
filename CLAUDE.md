# hr-case-router-lab-guide — the participant guide

The guide for the **Agentic Build Lab**: a one-day ServiceNow workshop where
you build the **HR Case Router** with Claude Code. The router is an AI agentic
workflow that routes each new HR case itself. It sets the group, or
transfers the case to another HR service, and leaves a work note. When it
can't route, the case stays where it is, with a note.

## How to use it

- **Start at `README.md`**, then follow Module 0 to Module 8 in order.
  `LAB.html` is the same guide as one page, to open in a browser.
- `files/` holds the inputs the modules copy into your app's repo: the PRD,
  `DECISIONS.md`, the customer's answers, `inputs/`, the platform-rules test
  and the lab's Claude Code settings. The modules tell you when to copy each.
- `PRESESSION.html` is the pre-session's deck, from a week before the day.
  Open it in a browser: the arrow keys move, and **N** shows the notes.
- `AFTER-THE-WORKSHOP.md` finishes the app after the day. `OWN-PRD.md` and
  `PROMOTE.md` are optional tracks. `APPENDIX.md` says what the labels in
  Claude's output mean, such as `C3` or `P8`.

## Rules

- **Don't edit this repo, and don't build in it.** You build your app in its
  own repo, `~/projects/hr-case-router/app`, which Module 0 makes. Run Claude
  Code there, not here.
- This guide is generated from its source and replaced on every update, so
  local changes are lost. To get the latest, run `git pull` here.
- Found a mistake in the guide? Tell your instructor, with the module and
  step number, and what you saw.
