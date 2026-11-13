# Getting it to production

[Lab home](README.md) · [← Your own PRD track](OWN-PRD.md) ·
[Labels in Claude's output →](APPENDIX.md)

*⏱ Set by your company's change calendar · book your platform team now*

Everything in this lab runs on a **development instance**, on purpose. A
development instance is for building apps, and nobody does real work on
it. Your company also has a test instance, where apps are tried before
they go live, and production, the instance real people use. Claude never
touches test or production. Nothing in the kit does either. A finished app
reaches production through **your company's own change process**. The
people who own those instances run it.

**The workshop app is a teaching copy.** It's built on a lab instance, in
the lab's scope, the app's own space on the platform. It can't be promoted
as built. To take the HR Case Router to production, run it as
[your own PRD](OWN-PRD.md) on your company's development instance. Build
it with:

- your company's routing rules, article and restricted services, the HR
  services whose cases never go to the AI;
- the agent's caps, its limits on runs per hour and per day, as the owner
  sets them;
- masking, which hides personal data from the AI, confirmed with your
  platform team, the people who run your company's instances;
- the override rule from [After the workshop](AFTER-THE-WORKSHOP.md). It
  records each time someone moves a case after the router has.

Your platform team decides how apps move between your instances. So this
page is a **checklist**, not a script.

---

## 1. The bar before you ask

**None of these can be waived.**

- [ ] **The slice is done.** A slice is the part of your app you build
  first. [OWN-PRD.md](OWN-PRD.md) section 5 says when it's done.
- [ ] **`GRADE.md` holds a HANDOFF grade of 75 or more.** A preview
  doesn't count. Its **Caps applied** table is empty, so no failed check
  limits the score.
- [ ] **`HANDOFF.md` says READY.** NOT READY means someone else couldn't run
  the app from the runbook, the steps for running and fixing it. Nobody can
  accept that on paper.
- [ ] **The real owner has seen it work live** as an ordinary user. The
  real owner is the person in your company who owns the requirements. The
  DEMO stories are closed, and they record that the owner saw it.
- [ ] **The app has an on switch.** It's a setting that an admin controls,
  and it turns all the app's logic off. It's a term in the design, with a
  test. The runbook's **Recovery** section names it. Without it, the only
  way to stop the app is to back it all out, removing the whole app.

**What can be accepted:** an open story, but only for a check that doesn't
cap the grade, such as `code.lint` or `ready.config-documented`. The real
owner must accept it in writing. Record it in `docs/PROMOTION.md`, the file
you start in section 2. Write who accepted it, when, and the date it will
be closed. These checks cap the grade, so they're never accepted:
`code.build`, `code.tests`, `code.secrets`, `design.signed`,
`design.terms-tested`, `design.gates-evidenced`, `code.oob`,
`ready.ai-bounded` and `ready.install`.

---

## 2. Agree how it moves

Meet your platform team **before** you raise anything. ✏️ **Editor:** write
their answers in `docs/PROMOTION.md`, in your app's repo. `docs/` is
already admitted: the project's `.gitignore` lets git track it.

1. **The delivery mechanism.** This is how a scoped app, one that keeps to
   its own scope, moves from development to test to production in your
   company. Ask them rather than assume.
2. **Who installs.** On test and production, **their** team installs. Claude
   never does, and ideally the builder doesn't either.
3. **Global and shared changes.** These are anything the app changes
   outside its own scope, such as shared tables or global rules. Your LLD,
   the low-level design, lists them in §2–§3. They usually need their own
   approval.
4. **Cross-scope access.** This is the app reading or changing records that
   belong to another scope. On dev, the platform may record cross-scope
   access for you as the app runs. On test and production it may not, and
   logic that worked on dev fails. Make sure every cross-scope privilege the
   app needs is **declared in source**, written into the app's code. Your
   LLD §4 lists them. Confirm them with your platform team. One isn't the
   app's to declare. The lab setup made HR's two security-policy tables
   readable from other app scopes, so the access check can read them. Your
   instances need the same setting, made by their admin.
5. **Demo data stays out of production.** Your seed records, the demo
   records the app installs, are part of the app's source. So they'd
   install everywhere. Agree how they're left out of the production
   install. Then confirm that works on test.

<details><summary>ℹ️ What §2–§3 and §4 mean</summary>

`§` means section. In your LLD, `§2` is its components, `§3` its logic and
`§4` its security, with the access the app needs.
[All the labels](APPENDIX.md#1-7-sections-of-a-document).

</details>
6. **Per-instance configuration.** Some things differ on each instance:
   role-to-group assignments, settings, the agent's run-as user, and any
   integration's endpoint and credential. The run-as user is the account
   the agent works as. An admin sets each of them by hand, from the
   runbook. List them.
7. **Back-out.** This is how to remove the app if switching it off isn't
   enough, and what that costs. Uninstalling a scoped app may delete its
   tables and the data in them, such as log or audit rows. Confirm with your
   platform team. Write the agreed back-out in `docs/PROMOTION.md`.
8. **The AI agent**, if your app has one. Confirm these with your platform
   team, and record who confirmed them and when:
   - Its workflow, agent, tools and jobs are active, and each job has its
     trigger.
   - Its run-as user has only its own roles, never admin. Nothing else runs
     as it.
   - Masking covers what the tools return to the AI. Until that's
     confirmed, it blocks going to production.
   - The caps are the owner's values.

Then commit and ship it. 🤖 **Claude**, in `~/projects/<app>/app`:
`Commit docs/PROMOTION.md on a new branch docs/promotion-agree.` Then paste
this, type `go` after it, and press **Enter**:

```
ship it. Review the diff without checking it out, and post the review's
findings on the pull request as a comment, even if there are none. Fix
real findings in the code once. Never edit docs/, GRADE.md, RUNBOOK.md,
HANDOFF.md or BACKLOG.md to answer a finding, and don't stop to ask me:
file it as a register issue instead. There's no CI: merge once now-sdk
build passes, and npm test too once there's a test script. Then switch to
main and pull, and give me the pull request link and one line per
finding: fixed, filed, or not a problem and why.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude pushes your branch and opens a pull request. It reviews its own
diff without checking it out, and posts the review on the pull request. It
fixes real findings once, files the rest, and merges when the build and
tests pass. You get the pull request link and one line per finding.

</details>

🌐 **Browser:** ✅ the pull request link shows **Merged**. If Claude asks you
something, or the pull request isn't merged, use the two 🛟 boxes under
Module 7, step 7.

**Then version, grade and tag it.** That way test and production get
exactly what was graded:

1. 🤖 **Claude:** paste this. Then ship it with the paste above:
   ```
   Run npm version 1.0.0 --no-git-tag-version, so package.json and
   package-lock.json say 1.0.0, never now.config.json. Commit both on a
   new branch chore/version-1.0.0.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude sets the app's version to 1.0.0 in package.json and
   package-lock.json. It leaves now.config.json alone, and commits both
   files on a new branch. Once that's shipped, the grade and the tag that
   follow are of version 1.0.0.

   </details>

2. Grade at HANDOFF again, on `main` as it is now. Follow After the
   workshop, Part 4, step 7, with these changes:
   - type `<alias>` for the alias;
   - type OWN-PRD section 7's register reply;
   - use the branch `chore/grade-v1.0.0` in place of
     `chore/grade-handoff`.

   ✅ It still meets section 1's bar.
3. ⌨️ **Terminal**, in `~/projects/<app>/app`: tag the commit that holds
   that `GRADE.md`. A tag is a fixed name for exactly that code. Then push
   the tag:
   ```
   git switch main && git pull && git status --short
   git tag -a v1.0.0 -m "Slice 1: <what a user can now do>"
   git push origin v1.0.0
   git diff --stat <the commit GRADE.md says it graded> v1.0.0
   ```

   <details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

   1. `git switch main && git pull && git status --short`: Switches to `main`,
      downloads what's been merged into it on GitHub, then lists every file
      that's changed but not committed. `&&` runs each command only if the one
      before it worked. Nothing listed means your folder holds exactly what's
      on `main`.
   2. `git tag -a v1.0.0 -m "Slice 1: <what a user can now do>"`: Tags the
      newest commit on `main`, the one that holds the grade, as version
      `v1.0.0`. `-a` stores your message with the tag. Replace
      `<what a user can now do>` with what this slice lets a user do.
   3. `git push origin v1.0.0`: Sends the tag to GitHub. Test and
      production can then install exactly the code that was graded.
   4. `git diff --stat <the commit GRADE.md says it graded> v1.0.0`: Lists the
      files that differ between the commit the grade looked at and the
      tagged one. Only the grade's own files should differ. That shows the
      tagged code is the code that was graded.

   </details>

   ✅ Status prints nothing, and the diff lists only `GRADE.md`,
   `.gitignore` and `BACKLOG.md`.

Never move a pushed tag. If anything changes after this, such as a runbook
fix found on test, give it the next version, `1.0.1`. Then do these three
steps again.

---

## 3. Test, with the runbook only

1. **Your platform team installs the tag on test.** They follow
   `RUNBOOK.md` and nothing else. Then they do the per-instance
   configuration from section 2, item 6. If they need to ask you anything,
   that's a gap in the runbook. Fix it through the build loop on
   development, as in Module 6. Then version, grade and tag it again, as at
   the end of section 2, and start this step again.
2. **First contact with real data.** Test usually holds copies of real
   records. Re-run your live check **as ordinary users**. Do the same with
   After the workshop Part 2's attacks on your central rule, the one rule
   that must never break. Check that the cross-scope access works here. If
   your app has an agent, run it on a copied real record. Then confirm with
   your platform team that what its tools returned was masked. Anything
   that fails goes back through the build loop on development. Never fix it
   on test.
3. **Rehearse Recovery on test.** Switch the app off with its on switch.
   Check that it really stops. Then switch it back on. If the platform team
   allows it, rehearse the agreed back-out too.
4. **Re-run the handoff drill on test**, if the platform team allows a
   planted failure there. A planted failure is a fault someone causes on
   purpose, for you to find from the runbook.

✅ **Check:** every result is in `docs/PROMOTION.md`, with dates and who ran
it. Nothing was fixed on test by hand. Commit and ship it as in section 2,
on a new branch `docs/promotion-test`.

---

## 4. The change request

A change request is your company's formal request to change production.
Raise it through your company's change process. Attach the evidence
itself, not a summary of it:

| Evidence | From |
|---|---|
| What changes, and what doesn't | The signed design record, and LLD §1 |
| How well it's built | `GRADE.md` in the tag, and the commit it graded |
| Whether someone else can run it | `HANDOFF.md` and `RUNBOOK.md` |
| What was tested on test, and by whom | `docs/PROMOTION.md` |
| How to switch it off, and how to back it out | The runbook's **Recovery** section, and the back-out in `docs/PROMOTION.md`, rehearsed on test |
| Anything accepted rather than fixed | `docs/PROMOTION.md`, with the owner's written acceptance |

**Say what isn't done.** In the change request itself, list the
capabilities that `SLICE.md` defers. Approvers should never discover a gap
after go-live.

---

## 5. Production

1. **Your platform team installs the same tag** from the runbook, without
   the demo data. Then they do the per-instance configuration, including
   the agent's production caps.
2. **The on switch starts off.** The app is installed, but its logic doesn't
   run yet. For the HR Case Router, the override rule ships and passes
   first.
3. **The owner switches it on**, at an agreed time, with you available.
4. **Watch the first day.** Use the checks the runbook gives an on-call
   person, the one who answers when something goes wrong. Those are the
   platform's own screens and the app's own lists and logs.
5. **If it misbehaves:** switch it off first. Then diagnose the problem from
   the runbook. Back out only if switching it off isn't enough, and only as
   agreed in `docs/PROMOTION.md`.

✅ **Check:** it's on in production. The first day's checks are clean and
written in `docs/PROMOTION.md`. The owner has signed off in the change
request. Commit and ship it as in section 2, on a new branch
`docs/promotion-live`.

---

## 6. After go-live

- **The next slice** extends the same design. [OWN-PRD.md](OWN-PRD.md)
  section 6 shows how. It goes through the design challenge again before
  any code is written.
- **Anything found in production** becomes a story on the board. It's built
  through the loop on development, then promoted with this page again.
  Never fix it by hand in production.
