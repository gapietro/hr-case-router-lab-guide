# Module 0 — Pre-work: get your bench ready

*⏱ About 2 hours · at home, at least two days before the workshop*

Set up your instance, your tools and your app's private repo, then read the
customer's inputs, so the day starts with the build. **The idea:** a check
only counts if it could have failed. In Part 4 you try to beat your repo's
guard with a fake token.

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** the bench is set up before the build, so mistakes can't
  leak out: secrets, stray files, the wrong instance.
- **Why it matters:** your repo admits only files you name, and a guard checks
  each commit. Set up once, they protect every commit after.
- **Your mindset:** a safety check you've never seen fail is a hope, not a
  check. Test it before you rely on it.

</details>

## Part 1 — Your instance

### 1. Get your instance

Your instructor gives you your own instance, with HR Service Delivery, its
demo data and AI Agent Studio. Save its admin password in your password
manager, and note its address, such as `https://dev123456.service-now.com`.

Reading this guide as `LAB.html`? Put the instance's name, such as
`dev123456`, in **Your values** at the top: every terminal command then
shows it.

### 2. Check the demo data

🌐 **Browser:** log in to your instance as `admin`. Click **All** at the top
left, type `sn_hr_core_case.list` in the box under it, and press **Enter**.
Then do the same with `sn_hr_core_service.list`.

✅ Both lists have rows: demo HR cases and HR services.

<details><summary>🛟 It's asleep or gone, or has no HR cases</summary>

Tell your instructor. Waking an instance that's asleep (hibernating) takes a
few minutes.

</details>

### 3. Act as an ordinary HR fulfiller

`hr.demo` is an HR fulfiller with no admin rights. Make it if your instance
hasn't one. Stay logged in as admin, and impersonate it when a step says so.

<details><summary>ℹ️ Why an ordinary fulfiller?</summary>

- **In real work:** the people who click Reroute are HR agents, not admins.
- **Why it matters:** admin passes every access check, so a check as admin
  proves nothing. Only an ordinary fulfiller shows whether the app's role,
  the HR access rules and the agent work for the people who'll use them.
  Every live check in this lab is done as `hr.demo`.

</details>

🌐 **Browser**, as admin:

1. Open `sys_user_group.list`. In the **Name** column's search box, type
   `Lab` and press **Enter**. ✅ It lists `Lab HR Team` and `Lab Locked Out`.
2. Open `sys_user.list`. In the **User ID** column's search box, type
   `hr.router` and press **Enter**. ✅ It's listed: the agent runs as it, so
   never impersonate or change it. Do the same for `hr.demo`. Not listed?
   Click **New**, set **User ID** to `hr.demo`, **First name** to `HR` and
   **Last name** to `Demo`, and click **Submit**. Open `hr.demo`.
3. In its **Roles** tab: ✅ it lists `sn_hr_core.case_writer`. If not,
   click **Edit...**, move `sn_hr_core.case_writer` from the left list to
   the right, and click **Save**.
4. In its **Groups** tab: ✅ it lists `Lab HR Team`. If not, click
   **Edit...**, move `Lab HR Team` from the left list to the right, and
   click **Save**.
5. Impersonate `hr.demo`: click your avatar (top right), then
   **Impersonate user**. In the dialog, type `hr.demo`, pick **HR Demo**,
   and click **Impersonate user**. Close any welcome pop-up.
6. Open `sn_hr_core_case.list`. ✅ It lists HR cases.
7. End impersonation: click your avatar, then **End impersonation**. You're
   admin again.

<details><summary>🛟 hr.router or a group is missing, or hr.demo sees no cases</summary>

Tell your instructor: the instance hasn't been prepared for the lab. Never
make `hr.router` or a group yourself. Don't give `hr.demo` any other role,
and nothing admin: Module 6 gives it the app's own role.

</details>

## Part 2 — Your tools

### 4. Install the tools

⌨️ **Terminal:** open Terminal (**Cmd+Space**, type `Terminal`, press
**Enter**) and check what you have:

```
node --version
git --version
gh --version
now-sdk --version
claude --version
```

✅ Node.js is `v22.22` or later, `now-sdk` is `4.8.0` or later, and
Claude Code is `2.1.228` or later. The others print any version. The guide
is written against Claude Code `2.1.312` and `now-sdk` `4.13.6`.

⌨️ **Missing one, or too old?** Install Node.js LTS from https://nodejs.org
and the GitHub CLI from https://cli.github.com. Then install the other two,
and run the checks again:

```
npm install -g @servicenow/sdk @anthropic-ai/claude-code
```

Install VS Code from https://code.visualstudio.com too: it's your editor.
**Never installed tools like these?** That's fine: ask Claude at
https://claude.ai, or any AI assistant, to walk you through it.

<details><summary>🛟 An install or a check doesn't work</summary>

- **"command not found" just after installing:** open a new Terminal window
  and check again.
- **EACCES or "permission denied":** run the same command with `sudo` in
  front, and type your Mac's password; nothing shows as you type. Then run
  `sudo chown -R $(id -u):$(id -g) ~/.npm`, so npm's cache stays yours.
- **A box offers "command line developer tools":** click **Install**.
- **"certificate", "fetch failed" or a timeout:** your company network.
  Tell your instructor before the day.

</details>

### 5. Sign in to GitHub and get this guide

Accept your instructor's invite to this guide's repo first: it's in your
GitHub email and at https://github.com/notifications.

⌨️ **Terminal:** the first two lines save how `gh` is signed in now, so
Module 9 can put it back:

```
mkdir -p ~/projects/hr-case-router-notes
[ -e ~/projects/hr-case-router-notes/gh-before-lab.txt ] || gh auth status > ~/projects/hr-case-router-notes/gh-before-lab.txt 2>&1
gh auth login --web --git-protocol https
gh auth setup-git
gh repo clone gapietro/hr-case-router-lab-guide ~/projects/hr-case-router-lab-guide
git -C ~/projects/hr-case-router-lab-guide remote get-url origin
```

`gh auth login` shows a one-time code. Press **Enter**, type the code into
the GitHub page that opens, and approve. Press **Enter** for any question.

✅ The last line prints
`https://github.com/gapietro/hr-case-router-lab-guide.git`.

<details><summary>🛟 It says "Could not resolve to a Repository"</summary>

The invite isn't accepted yet, or you signed in to another GitHub account:
`gh auth status` shows which. A company-managed account can't accept it:
sign in with a personal one, or tell your instructor.

</details>

<details><summary>🛟 It says the destination path already exists</summary>

The last line printed the address above? It's this guide: update it with
`git -C ~/projects/hr-case-router-lab-guide pull`. Anything else? Rename
it with `mv ~/projects/hr-case-router-lab-guide ~/projects/old-guide`,
then run the `gh repo clone` line again.

</details>

### 6. Add the lab's Claude Code settings

Close every other Claude Code window first, with `/exit`.

⌨️ **Terminal:**

```
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
```

✅ It prints `Lab settings in place.`

<details><summary>ℹ️ What this changes, if you already use Claude Code</summary>

It starts Claude in auto mode, turns off connectors, new memories and web
search, blocks `now-sdk auth`, has Claude ask you before any command that
writes to your instance, such as `now-sdk install`, and keeps Claude out
of your notes, this guide and your keys (`~/.ssh`, `~/.aws`, `gh`'s login,
`~/.npmrc`, `~/.netrc`). Your
own settings are backed up and kept (your own auto mode rules wait in the
backup), and Module 9 restores them. Cleanest of all: a separate user
account on your computer.

</details>

### 7. Sign in to Claude Code

On a Pro or Max plan? 🌐 **Browser:** first, in claude.ai, open
**Settings > Privacy** and turn off model training.

⌨️ **Terminal:**

```
cd ~
claude
```

Follow the screens. Choose your **Claude account with subscription** (or
**Anthropic Console account** if you pay per use) and sign in in the browser.
When it asks if you trust this folder, pick **Yes** with the arrow keys. A
screen asks you to approve your organisation's settings? Approve them, and
tell your instructor.

✅ Under the input box it says `⏵⏵ auto mode on`.

🤖 **Claude:** type `/permissions`, then press **→** until its **Deny** tab
shows.

✅ It lists `Read(~/projects/hr-case-router-lab-guide/**)`. Press **Esc**,
then type `/exit`.

<details><summary>🛟 It says ⏸ manual mode on</summary>

Type `/exit`, then put the settings back and start again:

```
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
claude
```

Still manual? Your organisation turned auto mode off. Claude will just ask
more often. Tell your instructor.

</details>

<details><summary>🛟 The Deny tab doesn't list it</summary>

Your organisation's policy overrides the lab's settings. Type `/exit`, and
tell your instructor.

</details>

### 8. Connect the SDK to your instance

Your instance must be awake. Type the password only here, never in Claude.

⌨️ **Terminal:** replace `dev123456` with your instance's name, from its
address in step 1 (already done if it's in **Your values**):

```
now-sdk auth --add https://dev123456.service-now.com --type basic --alias lab-pdi
now-sdk auth --list
```

When asked, type the user name `admin`, then your admin password. Nothing
shows while you type it.

✅ The list shows `[lab-pdi]`, then `host =` with your instance's address,
and `username = admin`.

<details><summary>🛟 It prints a line starting [now-sdk] ERROR:</summary>

The sign-in failed. Check the instance is awake and the password is right,
then run the first line again. It says "certificate", "fetch failed" or
times out? That's your company network: tell your instructor.

</details>

## Part 3 — The kit and a clean bench

### 9. Install the kit and the SDK plugin

Two plugins. The kit runs the lab's rituals. ServiceNow's SDK plugin teaches
Claude the SDK from its docs (`now-sdk explain`) and reads records on your
instance (`now-sdk query`). It can't write to the instance.

⌨️ **Terminal:**

```
claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.4'
claude plugin install prove-it@prove-it
claude plugin install servicenow-sdk@claude-plugins-official
```

✅ None of the three prints an error.

<details><summary>🛟 It says the marketplace claude-plugins-official isn't known</summary>

Add it, then run the last line again:

```
claude plugin marketplace add anthropics/claude-plugins-official
claude plugin install servicenow-sdk@claude-plugins-official
```

</details>

<details><summary>🛟 It says "blocked by enterprise policy"</summary>

Your organisation limits plugins. Stop here, and send the message to your
instructor.

</details>

### 10. Make your folders

⌨️ **Terminal:**

```
mkdir -p ~/projects/hr-case-router/brief
touch ~/projects/hr-case-router/catches.md
```

`hr-case-router` is your workspace; Claude logs catches in `catches.md`.

✏️ **Editor:** in VS Code, choose **File > Open Folder…** and open the
`projects` folder in your home folder. Keep it open.

### 11. Check nothing else is loaded

Claude loads every plugin, server, hook and instruction file you have. For
the lab, it should load only the kit and the SDK plugin.

⌨️ **Terminal:**

```
cd ~/projects/hr-case-router
claude plugin list
claude mcp list
ls -d ~/CLAUDE.md ~/projects/CLAUDE.md ~/.claude/CLAUDE.md ~/.claude/skills ~/.claude/agents ~/.claude/commands
grep -c '"hooks"' ~/.claude/settings.json
git config --get core.hooksPath
```

✅ The only enabled plugins are `prove-it@prove-it`, with `Version: 0.1.4`,
and `servicenow-sdk@claude-plugins-official`, at any version.
`claude mcp list` says `No MCP servers configured`. `ls` prints only
`No such file or directory` lines, `grep` prints `0`, and `git config`
prints nothing.

<details><summary>🛟 Other plugins or MCP servers are listed</summary>

⌨️ First save what you have, once, so Module 9 can switch it back on:

```
cd ~/projects/hr-case-router-notes
[ -e plugins-before-lab.txt ] || claude plugin list > plugins-before-lab.txt
[ -e mcp-before-lab.json ] || (umask 077; node -p 'JSON.stringify(require(process.env.HOME+"/.claude.json").mcpServers||{},null,2)' > mcp-before-lab.json)
```

Then switch each off, by the name listed: `claude plugin disable <name>`,
or `claude mcp remove <name>` for a server (a `plugin:…` one goes with its
plugin). Won't go, or you never added it? It's your organisation's: leave
it, and tell your instructor.

</details>

<details><summary>🛟 prove-it shows another version</summary>

```
claude plugin marketplace remove prove-it
claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.4'
claude plugin install prove-it@prove-it
```

</details>

<details><summary>🛟 ls, grep or git config shows something</summary>

Your own setup would steer the lab. Add `.off` to each name `ls` lists,
such as `mv ~/CLAUDE.md ~/CLAUDE.md.off`; Module 9 moves them back. Hooks
(`grep` or `git config`)? Tell your instructor: a separate user account on
your Mac is cleanest.

</details>

## Part 4 — Your app's repo

Your app's code gets its own repo, fenced in two ways: it ignores every
file you haven't named, and a guard checks each commit for secrets.

### 12. Look up your scope

🌐 **Browser:**

1. As admin, type `sys_properties.list` in the filter navigator and press
   **Enter**. In the **Name** column's search box, type
   `glide.appcreator.company.code` and press **Enter**. Its **Value** is
   your vendor prefix, such as `123456`.
2. Your scope is `x_<prefix>_hcr_<your initials, lower case>`, such as
   `x_123456_hcr_ga`.

✅ Your scope is all lower case, with 18 characters or fewer. In
`LAB.html`, put it in **Your values** at the top.

### 13. Create the app

Your instance must be awake.

⌨️ **Terminal:** replace `<SCOPE>` with your scope from step 12 (already
done if it's in **Your values**):

```
mkdir -p ~/projects/hr-case-router/app
cd ~/projects/hr-case-router/app
now-sdk init --appName "HR Case Router" --packageName hr-case-router --scopeName <SCOPE> --template typescript.basic --auth lab-pdi
```

✅ It ends with `Application created successfully.`

<details><summary>🛟 It fails, or you're not sure it worked</summary>

⌨️ `ls ~/projects/hr-case-router/app/now.config.json`. Listed? The app
exists: go on. Not listed? Check your scope (lower case, 18 characters at
most, no `<` or `>`), run `cd ~/projects/hr-case-router && rm -rf app`,
then the three lines above. Still failing? Tell your instructor.

</details>

### 14. Let Claude set up the repo

⌨️ **Terminal:** start Claude in the app folder, and pick **Yes** when it
asks if you trust it:

```
cd ~/projects/hr-case-router/app && claude
```

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

```
Set up this folder as my app's repo. Make sure ~/projects/prove-it-kit is
gapietro/prove-it-kit at tag v0.1.4: clone it if it's missing, otherwise
fetch tags and switch to the tag. Run git init -b main. For this repo only,
set user.email to my GitHub noreply address, id+login@users.noreply.github.com,
with my id and login from gh api user. Replace .gitignore with the kit's
templates/gitignore.allowlist. Copy the kit's hooks/pre-commit-guard.sh to
.git/hooks/pre-commit and make it executable. Delete src/fluent/example.now.ts
and src/server/script.ts and any import of them: they're the template's
examples, never installed, so don't ask. Make README.md the single line
"# HR Case Router". Then run npm install and now-sdk build,
and stop if the build fails. Commit nothing. Last, run git config
user.email and git -C ~/projects/prove-it-kit describe --tags.
```

Claude may read the SDK's docs for a few minutes first. Asked "Allow this
read outside the working directories?"? Choose **Yes, and keep allowing any
reads outside the working directories**.

✅ The `now-sdk build` output ends with `Build completed successfully`, the
email ends in `@users.noreply.github.com`, and `describe` prints `v0.1.4`.
Then type `/exit`.

<details><summary>🛟 npm install or the build failed</summary>

npm says its cache is broken, or owned by root? ⌨️ In a second window
(**Cmd+N**), run `sudo chown -R $(id -u):$(id -g) ~/.npm`, type your Mac's
password, then paste the prompt again. Anything else: tell your instructor
the first error line, and don't let Claude change files to make it pass.

</details>

### 15. 🔮 Try to beat the guard

Guess first: will the guard stop a commit with a token in it?

⌨️ **Terminal**, still in `~/projects/hr-case-router/app`:

```
head -1 .gitignore
echo 'FAKE_TOKEN=do-not-use-0000' >> README.md
git add .gitignore README.md
git commit -m "chore: initial scaffold"
```

✅ The first line printed is `# Allowlist .gitignore (prove-it). Nothing is tracked unless admitted below.` The commit is **blocked**, with a line
starting `BLOCKED: README.md has`. The REVOKE lines under it are expected:
the token is fake.

That's the guard working, not a catch.

<details><summary>🛟 The commit went through</summary>

The guard didn't run. ⌨️ Undo the commit (its files stay) and install it:

```
git update-ref -d HEAD
cp ~/projects/prove-it-kit/hooks/pre-commit-guard.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Run the four lines above again. Blocked now? That's a real catch: log it
with the line below. Still not? Push nothing, and tell your instructor.

```
echo '0 | guard | the guard was not installed; once installed, it blocked the token' >> ~/projects/hr-case-router/catches.md
```

</details>

### 16. Commit for real

⌨️ **Terminal:**

```
echo "# HR Case Router" > README.md
git add README.md
git commit -m "chore: initial scaffold"
```

✅ Git prints `[main (root-commit) …] chore: initial scaffold`. Done this
before? Then `git log --oneline` shows that one commit: go on.

## Part 5 — Your repo's rules, and GitHub

### 17. Give the repo its rules

⌨️ **Terminal:** this window becomes the Claude window:

```
cd ~/projects/hr-case-router/app && claude
```

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

```
Copy ~/projects/prove-it-kit/templates/CLAUDE.md to CLAUDE.md and fill in
its Project facts, with the scope from now.config.json; keep the rules.
Instance alias lab-pdi. The design record will be
docs/DESIGN-HRCaseRouter.md: the contract. docs/LLD-HRCaseRouter.md is
background, frozen once written, and docs/DECISIONS.md holds the
lab's settled decisions: if they disagree, the design record wins. The
workspace is one folder up. No hostnames, no credentials. Then make these
changes, and only these:
- After Project facts, add a "## Platform facts" section with one rule: for
  any Fluent API question, run now-sdk explain before guessing; for any
  fact about the instance, run now-sdk query --auth lab-pdi, read-only, and
  quote the rows; never run now-sdk auth; never run now-sdk install, except
  the grade's install to lab-pdi after I name the alias.
- Replace the Learning checkpoints section with one line: at a decision
  that shapes the design, give your recommendation and its trade-off, and
  take it when I reply yes; never ask me to answer first.
- Under Ship ritual, add: review the pull request's diff without checking
  it out; never edit docs/, GRADE.md, RUNBOOK.md, HANDOFF.md or BACKLOG.md
  to answer a review finding, file it as a register issue instead; there's
  no CI, so merge once now-sdk build passes, and npm test too once there's
  a test script; when the pull request builds a story, put "Closes
  #<that story>" in its body, and other pull requests close nothing; after
  merging, switch to main and pull.
- Under Session close, add: a pull request holding only SESSION-NOTE.md,
  on the branch docs/session-note, is allowed.
- Under Tests, add: tests run locally in Vitest through npm test, never
  ATF; tests sit next to the code under src/, as *.test.ts; Vitest
  excludes .claude/**; a new top-level config file gets its allow line at
  the end of .gitignore.
- Under Contract, add: while building, never ask me a design question; if
  the signed record doesn't cover something, build what's closest to it,
  say what you picked, and file it as a register issue.
At the end of .gitignore, add only these allow lines, one per line:
!/CLAUDE.md, !/docs/, !/SESSION-NOTE.md. Commit nothing.
```

✅ ✏️ **Editor**, `hr-case-router/app/CLAUDE.md`: Project facts show your
scope and `lab-pdi`; there's a Platform facts section; Learning checkpoints
is one line; and the end of `hr-case-router/app/.gitignore` has the three
allow lines.

### 18. Read every name

⌨️ **Terminal**, in a second window (**Cmd+N**). Replace `dev123456` with
your instance's name (already done if it's in **Your values**): that line
teaches the guard to block any commit that names your instance. `-n` makes `git add` a dry run:

```
cd ~/projects/hr-case-router/app
mkdir -p .prove-it && echo 'dev123456' > .prove-it/patterns
git add -n .
grep -n -i 'service-now' CLAUDE.md
```

✅ `git add` lists nothing but `.gitignore`, `CLAUDE.md`, `now.config.json`,
`package.json`, `package-lock.json`, `tsconfig.json`, `now.dev.mjs`,
`now.prebuild.mjs`, `.eslintrc` and files under `src/`. `grep` prints
nothing.

<details><summary>🛟 Any other name is listed</summary>

🤖 **Claude**, with the name listed in place of `<the name listed>`:

```
Remove the .gitignore line that admits <the name listed>.
```

Then run `git add -n .` again.

</details>

<details><summary>🛟 grep prints a line</summary>

🤖 **Claude:**

```
In CLAUDE.md, replace my instance's host name, such as
dev123456.service-now.com, with the text INSTANCE_HOST.
```

Then run the `grep` again.

</details>

### 19. Commit, and go private on GitHub

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

```
Run git add . and commit on main as "chore: SDK project and CLAUDE.md".
```

✅ Git prints `[main …] chore: SDK project and CLAUDE.md`. Type `/exit`.

⌨️ **Terminal**, in the same window:

```
cd ~/projects/hr-case-router/app
gh repo create hr-case-router --private --source . --remote=origin --push
```

✅ 🌐 The address `gh` prints opens your repo, marked **Private**. That was
the last commit straight to `main`.

<details><summary>🛟 It says the name already exists</summary>

⌨️ Run `git remote get-url origin`. It prints your `hr-case-router` repo's
address? An earlier try made it: run `git push -u origin main`. It prints an
error? Use another name:

```
gh repo create hr-case-router-2 --private --source . --remote=origin --push
```

</details>

## Part 6 — Before the day

### 20. Read the inputs, and 🔮 guess

✏️ **Editor:** read `hr-case-router-lab-guide/files/inputs/USE-CASE.md`
and `WORKSHOP-NOTES.md`, the customer's own words. Then guess what a PRD
built from them needs. Module 1 compares your guess with the real PRD.

## You now have

- An instance set up for the lab, and `hr.demo` to impersonate.
- The tools, signed in, with the lab settings, the kit `v0.1.4` and the
  SDK plugin.
- `~/projects/hr-case-router`, holding only `app/`, an empty `brief/` and an
  empty `catches.md`.
- In `app/`: the allow list (`.gitignore`: `ls -a` shows it), the guard, an
  SDK project that builds and its `CLAUDE.md`, in two commits, pushed to
  your private `hr-case-router` repo on GitHub.
- The inputs, read, and your guess at what the PRD needs.

Anything missing? Tell your instructor at least two days before the day.
