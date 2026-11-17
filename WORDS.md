# Words

The words this guide explains, and what each one means in this lab. The
guide explains each word where you first meet it. To see them all, open
**Notes**, then **Show words**.

- **Repo:** a folder with a saved history of its changes.

  Your app's repo is `~/projects/hr-case-router/app`.
- **Commit:** one saved snapshot in a repo's history.
- **Branch:** a separate line of commits in a repo.

  Work happens on a branch, so `main` changes only through pull requests.
- **Pull request:** a request that asks GitHub to merge a branch into
  `main`.

  It's reviewed before it merges.
- **Story:** one small piece of work, tracked as a GitHub issue.

  An issue is a to-do item on GitHub.
- **Gate:** a milestone that waits until its stories are finished.

  This lab has four gates: MERGE, INSTALL, DEMO and HANDOFF.
- **Design term:** one numbered rule in your design record, such as `C3`.

  Every test names the design term it proves.
- **Catch:** a real problem the process found that was fixed, or that
  changed a decision.

  A planted problem isn't a catch just because the check finds it.
- **Product requirements document (PRD):** the document that says what the
  app must do.
- **Low-level design (LLD):** the document that says how the app will do
  what the PRD requires.
- **Checkpoint:** the finished work through a particular module.

  Your instructor can give you one, so you can start the next module from
  it.
- **Sub-agent:** a helper Claude starts to do part of the work.
- **Command output:** what a command shows after it runs.

  For example, a test command shows its pass and fail counts.
- **SDK:** the ServiceNow SDK, a toolkit for building ServiceNow apps on
  your own computer.

  Its command is `now-sdk`. Claude uses it to build your app, and you use it
  to install the app on your instance.
- **Platform rule:** something your ServiceNow instance really does that
  your build must allow for.

  The lab numbers them P1 to P15. For example, P8 says the first runs after
  an install may fail once, so you run them again.
