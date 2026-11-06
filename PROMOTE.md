# Getting it to production

[Lab home](README.md) · [← Your own PRD track](OWN-PRD.md) ·
[Labels in Claude's output →](APPENDIX.md)

*⏱ Set by your company's change calendar · book your platform team now*

Everything in this lab runs on a **development instance**, on purpose.
Claude never touches test or production, and nothing in the kit does
either. A finished app reaches production through **your company's own
change process**, run by the people who own those instances.

**The workshop app is a teaching copy**, on a lab instance with the lab's
scope: it can't be promoted as built. To take the HR Case Router to
production, run it as [your own PRD](OWN-PRD.md) on your company's
development instance, with your company's routing rules, article and
restricted services, the agent's caps as the owner sets them, masking
confirmed with your platform team, and the override rule from [After the workshop](AFTER-THE-WORKSHOP.md).

How apps move between your instances is your platform team's decision:
this page is a **checklist**, not a script.

---

## 1. The bar before you ask

**None of these can be waived.**

- [ ] **The slice is done**, as [OWN-PRD.md](OWN-PRD.md) section 5 defines
  it.
- [ ] **`GRADE.md` holds a HANDOFF grade of 75 or more**, not a preview,
  and its **Caps applied** table is empty.
- [ ] **`HANDOFF.md` says READY.** NOT READY means someone else couldn't run
  the app from the runbook. That's not something to accept on paper.
- [ ] **The real owner has seen it work live** as an ordinary user. The DEMO
  stories are closed with that recorded.
- [ ] **The app has an on switch**: an admin-controlled setting, in the
  design as a term, with a test, that turns all the app's logic off. The
  runbook's **Recovery** section names it. Without it, the only way to
  stop the app is to back it all out.

**What can be accepted:** only a story for a criterion that doesn't cap the
grade, such as `code.lint` or `ready.config-documented`, and only if the
real owner accepts it in writing. Record it in `docs/PROMOTION.md`
(section 2), with who accepted it, when, and the date it will be closed.
These cap the grade, so they're never accepted: `code.build`,
`code.tests`, `code.secrets`, `design.signed`, `design.terms-tested`,
`design.gates-evidenced`, `code.oob`, `ready.ai-bounded` and
`ready.install`.

---

## 2. Agree how it moves

Meet your platform team **before** you raise anything. ✏️ **Editor:** write
their answers in `docs/PROMOTION.md`, in your app's repo (`docs/` is
already admitted).

1. **The delivery mechanism.** How a scoped app moves from development to
   test to production in your company. Ask them, don't assume.
2. **Who installs.** On test and production it's **their** team. Never
   Claude, and ideally not the builder either.
3. **Global and shared changes.** Anything the app changes outside its own
   scope: shared tables, global rules. These are in your LLD §2–§3, and
   usually need their own approval.
4. **Cross-scope access.** On dev the platform may record cross-scope
   access for you as the app runs; on test and production it may not, and
   logic that worked on dev fails. Make sure every cross-scope privilege the
   app needs is **declared in source** (your LLD §4 lists them), and
   confirm with your platform team.
5. **Demo data stays out of production.** Your seed records are part of the
   app's source, so they'd install everywhere. Agree how they're excluded
   from the production install, and confirm it works on test.

<details><summary>ℹ️ What §2–§3 and §4 mean</summary>

`§` means section. In your LLD, `§2` is its components, `§3` its logic and
`§4` its security, with the access the app needs.
[All the labels](APPENDIX.md#1-7-sections-of-a-document).

</details>
6. **Per-instance configuration.** Role-to-group assignments, settings,
   the agent's run-as user and any integration's endpoint and credential
   differ per instance, set by an admin, by hand, from the runbook. List them.
7. **Back-out.** How to remove the app if switching it off isn't enough, and
   what that costs. Uninstalling a scoped app may delete its tables and the
   data in them, such as log or audit rows. Confirm with your platform team.
   Write the agreed back-out in `docs/PROMOTION.md`.
8. **The AI agent**, if your app has one. Confirm with your platform team,
   and record who and when: its workflow, agent, tools and jobs are active,
   each job with its trigger; its run-as user has only its roles, never
   admin, and nothing else runs as it; masking covers what the tools return
   to the AI, a blocker until confirmed; the caps are the owner's values.

Then commit and ship it. 🤖 **Claude**, in `~/projects/<app>/app`:
`Commit docs/PROMOTION.md on a new branch docs/promotion-agree.` Then paste
this, type `go` after it, and press **Enter**:

```
ship it. Review the diff without checking it out. Fix real findings in
the code once. Never edit docs/, GRADE.md, RUNBOOK.md, HANDOFF.md or
BACKLOG.md to answer a finding, and don't stop to ask me: file it as a
register issue instead. There's no CI: merge once now-sdk build passes,
and npm test too once there's a test script. Then switch to main and
pull, and give me the pull request link and one line per finding: fixed,
filed, or not a problem and why.
```

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude pushes your branch, opens a pull request, reviews its own
diff without checking it out, fixes real findings once and files the rest,
then merges when the build and tests pass. You get the pull request link and
one line per finding.

</details>

🌐 **Browser:** ✅ the pull request link shows **Merged**. It asks you
something, or isn't merged? Use the two 🛟 boxes under Module 8, step 7.

**Then version, grade and tag it**, so test and production get exactly
what was graded:

1. 🤖 **Claude:** paste this, then ship it with the paste above:
   ```
   Run npm version 1.0.0 --no-git-tag-version, so package.json and
   package-lock.json say 1.0.0, never now.config.json. Commit both on a
   new branch chore/version-1.0.0.
   ```

   <details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

   Claude sets the app's version to 1.0.0 in package.json and
   package-lock.json, leaves now.config.json alone, and commits both files on
   a new branch. Once that's shipped, the grade and the tag that follow are of
   version 1.0.0.

   </details>

2. Grade at HANDOFF again, on `main` as it is now: After the workshop,
   Part 4, step 7, typing `<alias>` for the alias and OWN-PRD section 7's
   register reply, with the branch `chore/grade-v1.0.0` in place of
   `chore/grade-handoff`. ✅ It still meets section 1's bar.
3. ⌨️ **Terminal**, in `~/projects/<app>/app`: tag the commit that holds
   that `GRADE.md`, and push the tag:
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
      `v1.0.0`: a fixed name for exactly this code. `-a` stores your message
      with the tag: replace `<what a user can now do>` with what this slice
      lets a user do.
   3. `git push origin v1.0.0`: Sends the tag to GitHub, so test and
      production can install exactly the code that was graded.
   4. `git diff --stat <the commit GRADE.md says it graded> v1.0.0`: Lists the
      files that differ between the commit the grade looked at and the tagged
      one. Only the grade's own files should differ, so the tagged code is the
      code that was graded.

   </details>

   ✅ Status prints nothing, and the diff lists only `GRADE.md`,
   `.gitignore` and `BACKLOG.md`.

Never move a pushed tag. Anything that changes after this, such as a
runbook fix found on test, gets the next version, `1.0.1`, and these three
steps again.

---

## 3. Test, with the runbook only

1. **Your platform team installs the tag on test**, following `RUNBOOK.md`
   and nothing else, then does the per-instance configuration (section 2,
   item 6). If they need to ask you anything, that's a gap in the runbook:
   fix it through the build loop on development, then version, grade and
   tag it again (end of section 2), and start this step again.
2. **First contact with real data.** Test usually holds copies of real
   records. Re-run your live check, and Module 7's attacks on your central
   rule, **as ordinary users**. Check the cross-scope access works here.
   An agent? Run it on a copied real record, and confirm with your platform
   team that what its tools returned was masked. Anything that fails goes
   back through the build loop on development. Never a fix on test.
3. **Rehearse Recovery on test.** Switch the app off with its on switch, and
   check it really stops. Then switch it back on. If the platform team
   allows it, rehearse the agreed back-out too.
4. **Re-run the handoff drill on test**, if the platform team allows a
   planted failure there.

✅ **Check:** every result is in `docs/PROMOTION.md`, with dates and who ran
it. Nothing was fixed on test by hand. Commit and ship it as in section 2,
on a new branch `docs/promotion-test`.

---

## 4. The change request

Raise it through your company's change process. Attach the evidence. Don't
summarise it:

| Evidence | From |
|---|---|
| What changes, and what doesn't | The signed design record, and LLD §1 |
| How well it's built | `GRADE.md` in the tag, and the commit it graded |
| Whether someone else can run it | `HANDOFF.md` and `RUNBOOK.md` |
| What was tested on test, and by whom | `docs/PROMOTION.md` |
| How to switch it off, and how to back it out | The runbook's **Recovery** section, and the back-out in `docs/PROMOTION.md`, rehearsed on test |
| Anything accepted rather than fixed | `docs/PROMOTION.md`, with the owner's written acceptance |

**Say what isn't done.** List the deferred capabilities from `SLICE.md` in
the change request itself. Approvers should never discover a gap after
go-live.

---

## 5. Production

1. **Your platform team installs the same tag** from the runbook, without
   the demo data, then does the per-instance configuration, the agent's
   production caps included.
2. **The on switch starts off.** The app is installed, but its logic doesn't
   run yet. For the HR Case Router, its override rule ships and passes first.
3. **The owner switches it on**, at an agreed time, with you available.
4. **Watch the first day.** Use the checks the runbook gives an on-call
   person: the platform's own screens, and the app's own lists and logs.
5. **If it misbehaves:** switch it off first, then diagnose, from the
   runbook. Back out only if switching it off isn't enough, and only as
   agreed in `docs/PROMOTION.md`.

✅ **Check:** it's on in production, the first day's checks are clean and
written in `docs/PROMOTION.md`, and the owner has signed off in the change
request. Commit and ship it as in section 2, on a new branch
`docs/promotion-live`.

---

## 6. After go-live

- **The next slice** extends the same design: see [OWN-PRD.md](OWN-PRD.md)
  section 6. It goes back through the design challenge before any code.
- **Anything found in production** becomes a story on the board, built
  through the loop on development, then promoted with this page again.
  Never a hand fix in production.
