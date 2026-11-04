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

You need the instance, the Claude plan and the GitHub account in the
README's [What you need](README.md#what-you-need).

| Send your instructor | By when |
|---|---|
| Your GitHub user name: no account yet? Step 5 helps you make one | As soon as you can, by the pre-session a week before: their invite needs it |
| "Done", or what's missing from **You now have**, at the end | At least two days before the workshop |
| Anything that stops an install: a proxy, a certificate error, no admin rights | As soon as you hit it: two weeks before if you can |

## Part 1 — Your instance

### 1. Get your instance

Your instructor gives you your own instance, with HR Service Delivery, its
demo data and AI Agent Studio. Save its admin password in your password
manager, and note its address, such as `https://dev123456.service-now.com`.

Reading this guide as `LAB.html`? Put the instance's name, such as
`dev123456`, in **Your values** (the setup chip, top right): every
terminal command then shows it.

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

`hr.demo` is an HR fulfiller with no admin rights: your instance comes with
it. Stay logged in as admin, and impersonate it when a step says so.

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
   never impersonate or change it. Do the same for `hr.demo`.

   <div data-ask="m0-hr-demo" data-options="yes|no" data-labels="Yes, it's listed|No">

   **Is `hr.demo` listed?**

   </div>

   <div data-show="choice.m0-hr-demo:no">

   **If it isn't listed:** your instance hasn't been prepared for the lab.

   ⛔ **Stop here until your instructor has prepared your instance.** Every
   check in this lab runs as `hr.demo`. Don't make it yourself: send your
   instructor this message, in the room's chat or by email:

   ```
   Lab: my instance has no hr.demo user. Instance: <your instance's name, such as dev123456>.
   ```

   Meanwhile, do Part 2 (steps 4 to 8): it doesn't need `hr.demo`. Then come
   back here.

   </div>

   Open `hr.demo`.
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

<details><summary>🛟 hr.router, hr.demo or a group is missing, or hr.demo sees no cases</summary>

Tell your instructor: the instance hasn't been prepared for the lab. Never
make `hr.router` or a group yourself. Don't give `hr.demo` any other role,
and nothing admin: Module 6 gives it the app's own role.

</details>

## Part 2 — Your tools

**Tools at a glance:** what step 4 checks and installs, and why.

| Tool | What it is | Why the lab needs it | Version |
|---|---|---|---|
| **Node.js** | Runs JavaScript programs on your computer. It comes with `npm`, which installs them. | The ServiceNow SDK runs on it, and `npm` installs the SDK. `npm` also installs your app's packages and runs its tests, and the lab's settings script runs on Node.js. | `v22.22` or later |
| **git** | Keeps a folder's history: each saved snapshot is a commit. | Your app's repo, its guard, and a branch for every story. Claude runs most git commands; you read what they print. <span data-show="os:win">**On Windows:** Git for Windows also brings Git Bash. You run every ⌨️ step in it, and the lab's settings (step 6) keep Claude in it too, where the safety rules apply.</span> | Any |
| **GitHub CLI** (`gh`) | GitHub's own command-line tool. | Signs you in to GitHub, gets this guide, makes your app's private repo, and lets the kit file your stories, milestones and pull requests. | Any |
| **ServiceNow SDK** (`now-sdk`) | ServiceNow's tool for building an app as code, from files on your computer. | Builds the HR Case Router, reads your instance, and installs the app on it. | `4.8.0` or later |
| **Claude Code** (`claude`) | Claude, working in your folders: it reads and writes files, and runs commands. | It writes the app; you make the decisions. It has its own installer, and doesn't need Node.js. | `2.1.228` or later |
| **VS Code** | A free code editor. | You open and check the files Claude writes: the ✏️ steps. | Any |

<div data-show="surface:desktop">

**Using the desktop app's Code tab?** Install the `claude` command too: the
lab's plugins and checks run from a terminal.

</div>

### 4. Install the tools

<div data-show="os:mac">

**On Mac:** open Terminal (**Cmd+Space**, type `Terminal`, press
**Enter**).

</div>

<div data-show="os:win">

**On Windows:** these Windows steps are still being tested. If one shows
something it doesn't describe, stop there, and tell your instructor what
you see.

First set up Git Bash, the terminal every ⌨️ step uses:

1. 🌐 **Browser:** download Git for Windows from
   https://git-scm.com/downloads/win, and run it. On **Select
   Components**, tick **Add a Git Bash Profile to Windows Terminal**; keep
   every other default.
2. Open Windows Terminal: press the **Windows** key, type `Terminal`, and
   press **Enter**.
3. Click **⌄**, beside the **+** at the top, then **Settings**. In
   **Settings > Startup**, set **Default profile** to **Git Bash**, click **Save**,
   and close every Windows Terminal window.

Then open Windows Terminal again: it opens in Git Bash.

</div>

⌨️ **Terminal:** check what you have:

```
node --version
git --version
gh --version
now-sdk --version
claude --version
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `node --version`: Prints which version of Node.js you have, such as
   `v22.22.0`. Node.js runs `now-sdk`, and comes with `npm`, which installs
   `now-sdk`. `command not found` means your computer can't find that tool:
   it isn't installed yet, or this window opened before you installed it.
2. `git --version`: Prints which version of git you have. git keeps a history
   of your files, one saved change (a commit) at a time: your app's repo is a
   git repo.
3. `gh --version`: Prints the version of `gh`, GitHub's own command-line tool,
   then a web address. Step 5 uses it to sign in to GitHub and to download
   this guide.
4. `now-sdk --version`: Prints the version of ServiceNow's SDK tool, such as
   `4.13.6`. It builds your app from the files on your computer and installs
   it on your instance.
5. `claude --version`: Prints the version of Claude Code, the coding agent you
   build the app with, such as `2.1.312 (Claude Code)`.

</details>

✅ Node.js is `v22.22` or later, `now-sdk` is `4.8.0` or later, and
Claude Code is `2.1.228` or later. The others print any version. The guide
is written against Claude Code `2.1.312` and `now-sdk` `4.13.6`.

<div data-ask="m0-tools-ok" data-options="yes|no" data-labels="Yes, all of them|No, one is missing or too old">

**Did every version pass?**

</div>

<div data-show="choice.m0-tools-ok:no">

**If one is missing or too old:** install what's missing, then run the
checks again.

<div data-show="os:mac">

**On Mac:** install Node.js LTS from https://nodejs.org and the GitHub
CLI from https://cli.github.com. Then, in ⌨️ **Terminal**, install the
SDK and Claude Code:

```
npm install -g @servicenow/sdk
curl -fsSL https://claude.ai/install.sh | bash
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `npm install -g @servicenow/sdk`: Installs ServiceNow's SDK with `npm`,
   which came with Node.js. `-g` makes the `now-sdk` command work in every
   folder.
2. `curl … | bash`: Downloads Claude Code's own installer from claude.ai
   and runs it. It needs no `sudo`, and Claude Code then keeps itself up to
   date. It shows no progress while it downloads: wait for
   `Claude Code successfully installed!`.

</details>

Then open a new Terminal window (**Cmd+N**) and run the checks again.

</div>

<div data-show="os:win">

**On Windows:** install Node.js LTS (the `.msi`) from https://nodejs.org.

**In PowerShell, not Git Bash:** open PowerShell (press the **Windows**
key, type `PowerShell`, press **Enter**). Then, in ⌨️ **Terminal**,
install the GitHub CLI and Claude Code:

```
winget install --id GitHub.cli --source winget
irm https://claude.ai/install.ps1 | iex
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `winget install --id GitHub.cli --source winget`: Installs the GitHub
   CLI with `winget`, Windows' own app installer. `--source winget` takes it
   from winget's own list, not the Microsoft Store.
2. `irm … | iex`: Downloads Claude Code's own installer from claude.ai and
   runs it: `irm` fetches the file and `iex` runs it. It shows no progress
   while it downloads: wait for `Claude Code successfully installed!`.

</details>

Close every terminal window. Then, in ⌨️ **Terminal** (Windows Terminal,
in Git Bash), install the SDK, and run the checks again:

```
npm install -g @servicenow/sdk
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `npm install -g @servicenow/sdk`: Installs ServiceNow's SDK with `npm`,
   which came with Node.js. `-g` makes the `now-sdk` command work in every
   folder. It runs in Git Bash, not PowerShell.

</details>

</div>

</div>

Install VS Code from https://code.visualstudio.com too: it's your editor.
**Never installed tools like these?** That's fine: ask Claude at
https://claude.ai, or any AI assistant, to walk you through it.

<details data-show="os:mac"><summary>🛟 An install or a check doesn't work on Mac</summary>

- **"command not found" just after installing:** open a new Terminal window
  and check again. Still not found for `claude`? Its folder isn't on your
  PATH yet. In ⌨️ **Terminal**, run these two lines, then open a new
  window:

  ```
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  source ~/.zshrc
  ```

- **EACCES or "permission denied" from npm:** run the `npm install` line
  again with `sudo` in front, and type your Mac's password; nothing shows
  as you type. Then run `sudo chown -R $(id -u):$(id -g) ~/.npm`, so npm's
  cache stays yours. Never put `sudo` in front of the Claude Code line.
- **A box offers "command line developer tools":** click **Install**.
- **claude --version still prints an old version after the installer:**
  an earlier install of Claude Code comes first. Tell your instructor.

</details>

<details data-show="os:win"><summary>🛟 An install or a check doesn't work on Windows</summary>

- **"command not found" or "is not recognized" just after installing:**
  close every terminal window, then open a new one: a new tab isn't
  enough. Still not found for `claude`? Its folder isn't on your PATH yet.
  In ⌨️ **Terminal**, in PowerShell, run these two lines, then open a new
  window:

  ```
  $currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
  [Environment]::SetEnvironmentVariable('PATH', "$currentPath;$env:USERPROFILE\.local\bin", 'User')
  ```

- **irm: command not found:** you're in Git Bash. Open PowerShell, as
  above, and paste the lines again.
- **Git Bash isn't in Windows Terminal's Default profile list:** run Git
  for Windows' installer again, and on **Select Components** tick
  **Add a Git Bash Profile to Windows Terminal**. No Windows Terminal at
  all, on Windows 10? Install it from the Microsoft Store first.
- **winget isn't allowed, or isn't found:** download the GitHub CLI's
  `.msi` from https://cli.github.com, and run it instead.
- **EPERM or EBUSY from npm:** close every other terminal window and VS
  Code, then run the `npm install` line again.
- **claude --version still prints an old version after the installer:**
  an earlier install of Claude Code comes first. Tell your instructor.

</details>

<details><summary>🛟 It says "certificate", "fetch failed" or times out</summary>

Your company network. Tell your instructor before the day.

</details>

### 5. Sign in to GitHub and get this guide

**The lab needs GitHub.** Your company's GitLab can't stand in for it.

<details><summary>ℹ️ Why not GitLab?</summary>

- This guide is a private GitHub repo that you're invited to.
- `gh`, the GitHub CLI, signs you in and makes your app's repo. It works
  only with GitHub.
- The kit files your stories, milestones and pull requests on GitHub,
  through `gh`.
- Claude Code installs the kit from GitHub.

Nothing you build in the lab goes to your company's GitLab.

</details>

<div data-ask="github" data-options="personal|company|none" data-labels="Yes, a personal one|Only a company one|Not yet">

**Do you have a GitHub account you can use for the lab?**

</div>

<div data-show="github:none">

**If you have no account yet:** make one. It's free, and takes about 5
minutes.

1. 🌐 **Browser:** open https://github.com/signup.
2. Enter an email address you can read now, a password and a user name.
   Any user name works: it's how your instructor invites you.
3. Type the code GitHub emails you, and follow the screens.
4. Send your instructor your user name: their invite comes by email.

✅ `https://github.com/<your user name>` shows your profile. Made it?
<button data-set="github:personal">I have one now</button>

</div>

<div data-show="github:company">

**If you have only a company account:** it works only if it can accept an
invite from outside your company. A company-managed account can't.

<div data-ask="gh-company" data-options="managed|other|unsure" data-labels="Yes, it ends like that|No|Not sure">

**Does its user name end in `_` and a short code, such as `jsmith_acme`?**

</div>

<div data-show="choice.gh-company:managed">

**If it ends like that:** it's company-managed, so it can't accept this
guide's invite. Use a personal account instead.
<button data-set="github:none">Make a personal account instead</button>

</div>

<div data-show="choice.gh-company:unsure">

**If you're not sure:** use a personal account to be safe, or ask your
instructor before the day.

</div>

</div>

<div data-ask="m0-gh-invite" data-options="yes|no" data-labels="Yes, accepted|Not yet">

**Have you accepted your instructor's invite to this guide's repo?**

</div>

<div data-show="choice.m0-gh-invite:no">

**If you haven't accepted it:** it's in your GitHub email and at
https://github.com/notifications. Click **Accept**, then change your answer
above to **Yes, accepted**.

⛔ **Stop here until you've accepted it.** The next lines copy this guide
from GitHub, and they fail without the invite. No invite at all? Send your
instructor this message, in the room's chat or by email:

```
Lab: no invite yet to the lab guide repo. My GitHub user name is <your user name>.
```

Meanwhile, step 8 (connect the SDK) and step 12 (look up your scope) don't
need this guide's repo: do those, then come back here.

</div>

⌨️ **Terminal:** the first three lines save how `gh` and git sign in to
GitHub now, so Module 9 can put them back:

```
mkdir -p ~/projects/hr-case-router-notes
[ -e ~/projects/hr-case-router-notes/gh-before-lab.txt ] || gh auth status > ~/projects/hr-case-router-notes/gh-before-lab.txt 2>&1
[ -e ~/projects/hr-case-router-notes/git-credentials-before-lab.txt ] || git config --global --get-regexp '^credential\.' > ~/projects/hr-case-router-notes/git-credentials-before-lab.txt
gh auth setup-git --hostname github.com --force
gh auth login --web --git-protocol https
gh repo clone gapietro/hr-case-router-lab-guide ~/projects/hr-case-router-lab-guide
git -C ~/projects/hr-case-router-lab-guide remote get-url origin
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `mkdir -p ~/projects/hr-case-router-notes`: Makes a folder for your lab
   notes, inside `projects` in your home folder (`~` means your home folder).
   `-p` also makes `projects` if it's missing, and doesn't complain if the
   folder is already there.
2. `[ -e … ] || gh auth status > … 2>&1`: Writes down which GitHub account
   `gh` is signed in to right now, if any, into `gh-before-lab.txt`, so Module
   9 can put things back the way they were. The `[ -e … ] ||` part means "only
   if that file isn't there yet", so running the block twice never overwrites
   your record of how things were before. `>` sends what `gh auth status`
   prints into that file, and `2>&1` sends its error messages, such as "not
   logged in", there too.
3. `[ -e … ] || git config --global --get-regexp '^credential\.' > …`: Writes
   down how git signs in to websites now, into
   `git-credentials-before-lab.txt`, so Module 9 can put it back after line 4
   changes it. An empty file means git had nothing set.
4. `gh auth setup-git --hostname github.com --force`: Tells git, everywhere
   on this computer, to get its sign-in for GitHub from `gh`, so clone, pull
   and push don't ask you to sign in. It runs before line 5 so that signing
   in never replaces the GitHub sign-in your computer had saved before: line
   3's file is how Module 9 puts git back.
5. `gh auth login --web --git-protocol https`: Signs the GitHub command-line
   tool, `gh`, in to your GitHub account through your browser. It saves the
   sign-in on your computer, and if `gh` was signed in to another account,
   this one becomes the active one: line 2's file is how Module 9 switches
   back. `https` means git talks to GitHub over a normal secure web
   connection, with no SSH keys to set up.
6. `gh repo clone …/hr-case-router-lab-guide
   ~/projects/hr-case-router-lab-guide`: Downloads this guide's repository
   from GitHub into a new folder, `hr-case-router-lab-guide`, inside
   `projects`. It works only once you've accepted your instructor's invite,
   with the GitHub account that was invited.
7. `git -C ~/projects/hr-case-router-lab-guide remote get-url origin`: Prints
   the GitHub address that folder was downloaded from, so you can see for
   yourself where it came from. `-C` runs git as if you were inside that
   folder. `origin` is git's name for the place a folder was downloaded from.

</details>

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

<div data-ask="m0-cc-before" data-options="yes|no" data-labels="Yes|No, this is my first time">

**Have you used Claude Code on this computer before?**

</div>

<div data-show="choice.m0-cc-before:yes">

**If you have:** close every other Claude Code window first, with `/exit`.
The lab's settings start Claude in auto mode, turn off connectors, new
memories and web search, block `now-sdk auth`, have Claude ask you before
the SDK commands that write to your instance, such as `now-sdk install`,
and keep Claude out of your notes, this guide and your keys (`~/.ssh`,
`~/.aws`, `gh`'s login, `~/.npmrc`, `~/.netrc`). Your own settings are
backed up and kept (your own auto mode rules wait in the backup), and
Module 9 restores them. Cleanest of all: a separate user account on your
computer.

</div>

⌨️ **Terminal:**

```
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
```

✅ It prints `Lab settings in place.`

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
address in step 1 (already done if it's in **Your values**: the setup
chip, top right):

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

<details data-detail="extra"><summary>ℹ️ What each line does</summary>

1. `claude plugin marketplace add …`: Adds the kit's GitHub repo, at its
   version `v0.1.4` (the part after `#`), as a plugin marketplace: a list of
   plugins Claude Code can install.
2. `claude plugin install prove-it@prove-it`: Installs the kit's plugin,
   `prove-it`, from the marketplace you just added. The name after `@` is the
   marketplace's, and it's `prove-it` too. Claude Code then has it in every
   folder.
3. `claude plugin install servicenow-sdk@claude-plugins-official`: Installs
   ServiceNow's SDK plugin from `claude-plugins-official`, Anthropic's own
   plugin marketplace. It teaches Claude to look things up in the SDK's docs
   and to read records on your instance; those lookups never change anything.

</details>

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

<details data-detail="extra"><summary>ℹ️ What each line does</summary>

1. `mkdir -p ~/projects/hr-case-router/brief`: Makes your workspace folder,
   `hr-case-router` inside `projects`, and a `brief` folder in it, where you
   put the PRD in Module 1. `-p` makes any folder that's missing on the way,
   and doesn't complain if they're already there.
2. `touch ~/projects/hr-case-router/catches.md`: Makes an empty file,
   `catches.md`, in your workspace: Claude logs each catch in it. If the file
   is already there, `touch` leaves what's in it alone.

</details>

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
[ -e mcp-before-lab.json ] || (umask 077; node -p 'JSON.stringify(require(require("os").homedir()+"/.claude.json").mcpServers||{},null,2)' > mcp-before-lab.json)
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
`LAB.html`, put it in **Your values** (the setup chip, top right).

### 13. Create the app

Your instance must be awake.

⌨️ **Terminal:** replace `<SCOPE>` with your scope from step 12 (already
done if it's in **Your values**: the setup chip, top right):

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
your instance's name (already done if it's in **Your values**: the setup
chip, top right): that line
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
