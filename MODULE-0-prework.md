# Pre-work: get your bench ready

*⏱ About 2 hours · at home, at least two days before the workshop*

Your bench is everything you build with: your instance, your tools, Claude
Code and a private repo for your app. Get it ready before the workshop. Then
read the customer's inputs, the files where the customer says what they
need. On the day, you start building straight away. There's nothing left to
install.

<details><summary>ℹ️ Why are we doing this?</summary>

- **In real work:** people set up the bench before they build. That stops
  mistakes from leaking out, such as secrets, stray files or the wrong
  instance. Secrets are passwords, keys and tokens.
- **Why it matters:** your repo takes in only the files you name. A guard,
  a script that runs before each commit, checks it for secrets. You set
  them up once, and they protect every commit after that.
- **Your mindset:** a safety check you've never seen fail is a hope, not a
  check. Test it before you rely on it.

</details>

You need the instance, the Claude plan and the GitHub account listed in the
README, under [What you need](README.md#what-you-need).

| Send your instructor | By when |
|---|---|
| Your GitHub user name. If you have no account yet, step 4 helps you make one | As soon as you can, and by the pre-session, the one-hour online session a week before. Your instructor needs it to invite you |
| "Done", or what's still missing from **You now have**, the list at the end of this page | At least two days before the workshop |
| Anything that stops an install, such as a proxy, a certificate error or no admin rights | As soon as you hit it. If you can, two weeks before the workshop |

## Part 1 — Your instance

### 1. Get your instance

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

You build the app on your own instance, and install it there. You'll need
the instance's name twice. It goes into the sign-in for the SDK,
ServiceNow's toolkit for building apps on your computer. It also goes into
the guard that keeps the name out of your commits. So note it now.

</details>

Your instructor gives you your own instance, your own ServiceNow site. It
comes with HR Service Delivery, ServiceNow's HR app, and its demo data. It
also has AI Agent Studio, where AI agents are built. Save the instance's
admin password in your password manager. Note its address, such as
`https://dev123456.service-now.com`.

Note the instance's name too. It's the first part of the address, such as
`dev123456`.

<div data-value="instance"></div>

### 2. Check your instance

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

If a user, group or role is missing, checking now finds it while there's
still time to fix it. That's better than finding it on the morning of the
workshop.

</details>

Check that your instance has what the lab needs. That's the demo data, the
lab's groups and users, and an ordinary HR fulfiller who can see HR cases.
A fulfiller is someone who works HR cases.

Your instance comes with `hr.demo`, an HR fulfiller with no admin rights.
Stay logged in as admin. When a step says so, impersonate `hr.demo`, which
means you act as that user.

<details><summary>ℹ️ Why an ordinary fulfiller?</summary>

- **In real work:** the people who click Reroute, to have a case routed
  again, are HR agents. They aren't admins.
- **Why it matters:** admin passes every access check. So a check done as
  admin proves nothing. Only an ordinary fulfiller shows whether the app's
  role, the HR access rules and the agent work for the people who'll use
  them. Every live check in this lab is done as `hr.demo`.

</details>

🌐 **Browser:** log in to your instance as `admin`.

1. Click **All** at the top left. Type `sn_hr_core_case.list` in the
   box under it, and press **Enter**. Then do the same with
   `sn_hr_core_service.list`. ✅ Both lists have rows: demo HR cases and HR
   services.
2. Open `sys_user_group.list` the same way. In the **Name** column's search
   box, type `Lab` and press **Enter**. ✅ It lists `Lab HR Team` and
   `Lab Locked Out`.
3. Open `sys_user.list`. In the **User ID** column's search box, type
   `hr.router` and press **Enter**. ✅ It's listed. The agent runs as this
   user, so never impersonate it or change it. Do the same for
   `hr.demo`.

   <div data-ask="m0-hr-demo" data-options="yes|no" data-labels="Yes, it's listed|No">

   **Is `hr.demo` listed?**

   </div>

   <div data-show="choice.m0-hr-demo:no">

   **If it isn't listed:** your instance hasn't been prepared for the lab.

   ⛔ **Stop here until your instructor has prepared your instance.** Every
   check in this lab runs as `hr.demo`. Don't make the user yourself. Send
   your instructor this message, in the room's chat or by email:

   ```
   Lab: my instance has no hr.demo user. Instance: <your instance's name, such as dev123456>.
   ```

   Meanwhile, do Part 2, steps 3 to 7. It doesn't need `hr.demo`. Then come
   back here.

   </div>

   Open `hr.demo`.
4. In its **Roles** tab: ✅ it lists `sn_hr_core.case_writer` and
   `sn_hr_le.case_writer`. If one is missing, click **Edit...**. Move it
   from the left list to the right, and click **Save**.
5. In its **Groups** tab: ✅ it lists `Lab HR Team`. If it doesn't, click
   **Edit...**. Move `Lab HR Team` from the left list to the right, and
   click **Save**.
6. Impersonate `hr.demo`. Click your avatar at the top right of the
   instance, then **Impersonate user**. In the dialog, type `hr.demo`, pick
   **HR Demo**, and click **Impersonate user**. Close any welcome pop-up.
7. Open `sn_hr_core_case.list`. ✅ It lists HR cases.
8. End impersonation. Click your avatar, then **End impersonation**. You're
   admin again.

<details><summary>🛟 It's asleep or gone, or has no HR cases</summary>

- **Asleep:** Your instance is asleep. Open it in your browser. If its page
  offers a wake-up link, click it and wait. Waking can take up to 20
  minutes. If there's no link, or it's still asleep, ask your instructor.
- **Gone, or no HR cases:** tell your instructor.

</details>

<details><summary>🛟 hr.router, hr.demo or a group is missing, or hr.demo sees no cases</summary>

Tell your instructor. The instance hasn't been prepared for the lab. Never
make `hr.router` or a group yourself. Don't give `hr.demo` any other role,
and nothing admin. Later, in Module 6, it gets the app's own role.

</details>

## Part 2 — Your tools

**Tools at a glance:** what step 3 checks and installs, and why the lab
needs each one.

| Tool | What it is | Why the lab needs it | Version |
|---|---|---|---|
| **Node.js** | Runs JavaScript programs on your computer. It comes with `npm`, which installs them. | The ServiceNow SDK runs on it, and `npm` installs the SDK. `npm` also installs your app's packages, the code your app builds on, and runs its tests. The lab's settings script runs on Node.js too. | `v22.22` or later |
| **git** | Keeps a folder's history. Each saved snapshot is a commit. | Your app's repo, its guard, and a branch for every story all use git. Claude runs most git commands. You read what they print. <span data-show="os:win">**On Windows:** Git for Windows also brings Git Bash, a Linux-style terminal. You run every ⌨️ step in it. The lab's settings, in step 5, keep Claude in it too, where the safety rules apply.</span> | Any |
| **GitHub CLI** (`gh`) | GitHub's own command-line tool. You type its commands in a terminal. | It signs you in to GitHub, gets this guide and makes your app's private repo. It also lets the kit, the lab's Claude Code plugin, file your stories, milestones and pull requests. | Any |
| **ServiceNow SDK** (`now-sdk`) | ServiceNow's tool for building an app as code, from files on your computer. | It builds the HR Case Router, reads your instance and installs the app on it. | `4.8.0` or later |
| **Claude Code** (`claude`) | Claude, working in your folders. It reads and writes files, and runs commands. | It writes the app. You make the decisions. It has its own installer and doesn't need Node.js. | `2.1.228` or later |
| **VS Code** | A free code editor. | You open and check the files Claude writes in it. Those are the ✏️ steps. | Any |

<div data-show="surface:desktop">

**Using the desktop app's Code tab?** Install the `claude` command too. The
lab's plugins and checks run from a terminal.

</div>

### 3. Install the tools

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Every later step runs one of these tools. If one is missing or too old, it
fails in ways that are hard to read. The check comes first, so you install
only what's missing.

</details>

<div data-show="os:mac">

**On Mac:** open Terminal. Press **Cmd+Space**, type `Terminal` and press
**Enter**.

</div>

<div data-show="os:win">

**On Windows:** these Windows steps are still being tested. If a step shows
something it doesn't describe, stop there. Tell your instructor what you
see.

First, set up Git Bash, the terminal every ⌨️ step uses:

1. 🌐 **Browser:** open https://git-scm.com/downloads/win. Click
   **Git for Windows/x64 Setup**. On an ARM computer, click
   **Git for Windows/ARM64 Setup** instead.
2. Open the file from your Downloads folder.
3. Click **Yes** when Windows asks to allow changes.
4. Click **Next** on each screen until **Select Components**.
5. Tick **Add a Git Bash Profile to Windows Terminal**. Keep every other
   default.
6. Click **Next** on each screen that's left, then **Install**, then
   **Finish**.
7. Open Windows Terminal. Press the **Windows** key, type `Terminal` and
   press **Enter**.
8. Click **⌄**, beside the **+** at the top. Then click **Settings**.
9. In **Settings > Startup**, set **Default profile** to **Git Bash**.
   Click **Save**.
10. Close every Windows Terminal window.

Then open Windows Terminal again. It opens in Git Bash.

</div>

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Never installed tools like these? How this step goes</summary>

1. Run the check below, even on a new computer. `command not found` means
   that tool isn't installed yet. That's expected.
2. Answer **No, one is missing or too old**. Each tool's install then shows
   under the question, step by step. They're in the order to do them.
3. Install only the tools that failed, top to bottom.
4. An installer may ask for your computer's password, or for permission to
   make changes. That's expected. If you can't give it because your company
   manages the computer, tell your instructor before the day.
5. When you've installed them, close every terminal window. Then open a new
   one, and run the check again. A window that was open before an install
   can't see the new tool.

</details>

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
   `v22.22.0`. Node.js runs `now-sdk`, and its `npm` installs `now-sdk`.
   `command not found` means it isn't installed yet, or this window opened
   before you installed it.
2. `git --version`: Prints which version of git you have. git keeps a
   history of your files, one commit at a time. Your app's repo is a git
   repo.
3. `gh --version`: Prints the version of `gh`, GitHub's own command-line
   tool, then a web address. Step 4 uses it to sign in to GitHub and to
   download this guide.
4. `now-sdk --version`: Prints the version of ServiceNow's SDK tool, such as
   `4.13.6`. It builds your app from the files on your computer and installs
   it on your instance.
5. `claude --version`: Prints the version of Claude Code, such as
   `2.1.312 (Claude Code)`. Claude Code is the coding agent you build the
   app with.

</details>

✅ Node.js is `v22.22` or later, `now-sdk` is `4.8.0` or later, and
Claude Code is `2.1.228` or later. The others can print any version. This
guide was written with Claude Code `2.1.312` and `now-sdk` `4.13.6`.
`command not found` counts as missing.

<div data-ask="m0-tools-ok" data-options="yes|no" data-labels="Yes, all of them|No, one is missing or too old">

**Did every version pass?**

</div>

<div data-show="choice.m0-tools-ok:no">

**If one is missing or too old:** install each tool that failed, in the
order below. Skip the ones that passed. Then run the checks again.

<div data-show="os:mac">

**On Mac:**

**Node.js:** download the macOS installer, the `.pkg` file, from
https://nodejs.org/en/download. Then run it.

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: Node.js on Mac</summary>

1. 🌐 **Browser:** open https://nodejs.org/en/download.
2. Skip the commands at the top of the page.
3. Under **Or get a prebuilt Node.js® for macOS**, click
   **macOS Installer (.pkg)**. The same file works on every Mac, Apple
   silicon or Intel.
4. Open the file from your Downloads folder.
5. Click **Continue** on each screen. Click **Agree** to accept the
   licence.
6. Click **Install**, then type your Mac's password.
7. Click **Close** when it says the installation was successful.
8. In a new Terminal window (**Cmd+N**), run `node --version`. It prints a
   version, such as `v26.13.0`.

</details>

**git:** it comes with Apple's command line developer tools. The check may
have opened a box offering to install them. If it did, click **Install**
there.

If no box opened, install them in ⌨️ **Terminal**:

```
xcode-select --install
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `xcode-select --install`: Asks macOS to install Apple's command line
   developer tools, which include git. A box opens to do it.

</details>

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: git on Mac</summary>

1. Click **Install** in the box that offers the command line developer
   tools. It's the box the check opened, or the one the line opened.
2. Click **Agree** to the licence.
3. Wait for the download to finish. It can take 10 minutes or more.
4. Click **Done**.
5. In a new Terminal window (**Cmd+N**), run `git --version`. It prints a
   version.

</details>

**GitHub CLI:** download the file ending in `_macOS_universal.pkg` from
https://github.com/cli/cli/releases/latest. Then run it. macOS blocks it the
first time. To allow it, click **Open Anyway** in
**System Settings > Privacy & Security**.

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: the GitHub CLI on Mac</summary>

1. 🌐 **Browser:** open https://github.com/cli/cli/releases/latest.
2. Under **Assets**, click the file whose name ends in
   `_macOS_universal.pkg`, such as `gh_2.103.3_macOS_universal.pkg`. If
   it isn't listed, first click the link that shows all the assets.
3. Open the file from your Downloads folder. macOS says it can't check the
   file, because GitHub doesn't sign it.
4. Click **Done** (**OK** on older macOS). Don't delete the file.
5. Open **System Settings** from the Apple menu, then **Privacy &
   Security**.
6. Scroll down to **Security**. Click **Open Anyway** beside the
   installer's name. The button stays for about an hour after you first
   open the file.
7. On macOS 15 and later, a box asks again. Click **Open Anyway** in it.
8. Type your Mac's password.
9. Click **Continue** on each screen of the installer, then **Install**.
10. Type your Mac's password, then click **Close**.
11. In a new Terminal window (**Cmd+N**), run `gh --version`. It prints a
    version.

</details>

**ServiceNow SDK:** it needs Node.js first. Open a new Terminal window
(**Cmd+N**). Then, in ⌨️ **Terminal**:

```
npm install -g @servicenow/sdk
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `npm install -g @servicenow/sdk`: Installs ServiceNow's SDK with `npm`,
   which came with Node.js. `-g` makes the `now-sdk` command work in every
   folder.

</details>

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: the ServiceNow SDK on Mac</summary>

1. Open a new Terminal window with **Cmd+N**, so it can find the Node.js
   you just installed.
2. Paste the line and press **Enter**.
3. Wait for a line that starts `added`. It takes a minute or two. Lines
   that start `npm warn` are normal.
4. Run `now-sdk --version`. It prints a version, such as `4.13.6`.

</details>

**Claude Code:** in ⌨️ **Terminal**, run its own installer:

```
curl -fsSL https://claude.ai/install.sh | bash
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `curl … | bash`: Downloads Claude Code's own installer from claude.ai
   and runs it. It needs no `sudo`, the command that runs something as an
   administrator. Afterwards, Claude Code keeps itself up to date.

</details>

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: Claude Code on Mac</summary>

1. Paste the line and press **Enter**. Never type `sudo` in front of it.
2. Wait for `Claude Code successfully installed!`. While it downloads, it
   shows nothing for up to a few minutes.
3. In a new Terminal window (**Cmd+N**), run `claude --version`. It prints
   a version, such as `2.1.312 (Claude Code)`.

</details>

**Then:** open a new Terminal window (**Cmd+N**) and run the checks again.

</div>

<div data-show="os:win">

**On Windows:** run each installer from your Downloads folder. Click
**Yes** when Windows asks to allow changes.

**Node.js:** download the Windows installer, the `.msi` file, from
https://nodejs.org/en/download. Then run it.

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: Node.js on Windows</summary>

1. 🌐 **Browser:** open https://nodejs.org/en/download.
2. Skip the commands at the top of the page.
3. Under **Or get a prebuilt Node.js® for Windows**, click
   **Windows Installer (.msi)**.
4. Open the file from your Downloads folder.
5. Click **Next** on each screen. Tick the box that accepts the licence.
   Keep every default. Leave any box that offers to install extra tools
   unticked.
6. Click **Install**, then **Yes** when Windows asks to allow changes.
7. Click **Finish**.
8. Close every terminal window. Open Windows Terminal again and run
   `node --version`. It prints a version, such as `v26.13.0`.

</details>

**git:** it comes with Git for Windows, which you installed at the start of
this step. If `git --version` failed, close every terminal window and open
Windows Terminal again. If it still fails, install Git for Windows as at
the start of this step.

**GitHub CLI:** download the file ending in `_windows_amd64.msi` from
https://github.com/cli/cli/releases/latest. Then run it.

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: the GitHub CLI on Windows</summary>

1. 🌐 **Browser:** open https://github.com/cli/cli/releases/latest.
2. Under **Assets**, click the file whose name ends in
   `_windows_amd64.msi`, such as `gh_2.103.3_windows_amd64.msi`. On an ARM
   computer, pick the one ending in `_windows_arm64.msi`. If it isn't
   listed, first click the link that shows all the assets.
3. Open the file from your Downloads folder.
4. Click **Next** on each screen, keeping every default. Then click
   **Install**.
5. Click **Yes** when Windows asks to allow changes.
6. Click **Finish**.
7. Close every terminal window. Open Windows Terminal again and run
   `gh --version`. It prints a version.

</details>

**ServiceNow SDK:** it needs Node.js first. Close every terminal window.
Open Windows Terminal again, in Git Bash. Then, in ⌨️ **Terminal**:

```
npm install -g @servicenow/sdk
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `npm install -g @servicenow/sdk`: Installs ServiceNow's SDK with `npm`,
   which came with Node.js. `-g` makes the `now-sdk` command work in every
   folder. It runs in Git Bash, not PowerShell.

</details>

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: the ServiceNow SDK on Windows</summary>

1. Close every terminal window, so the next one can find the Node.js you
   just installed. A new tab isn't enough.
2. Open Windows Terminal. Press the **Windows** key, type `Terminal` and
   press **Enter**. Its prompt, the text before where you type, ends in
   `$`. That means it's Git Bash.
3. Paste the line with **Ctrl+V** or a right-click. Then press **Enter**.
4. Wait for a line that starts `added`. It takes a minute or two. Lines
   that start `npm warn` are normal.
5. Run `now-sdk --version`. It prints a version, such as `4.13.6`.

</details>

**Claude Code:** install it in PowerShell, Windows' own terminal, not in Git
Bash. To open PowerShell, press the **Windows** key, type `PowerShell` and
press **Enter**. Then, in ⌨️ **Terminal**:

```
irm https://claude.ai/install.ps1 | iex
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `irm … | iex`: Downloads Claude Code's own installer from claude.ai and
   runs it. `irm` fetches the file, and `iex` runs it.

</details>

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: Claude Code on Windows</summary>

1. Open PowerShell, as above. Its prompt starts with `PS`. It needs no
   administrator rights.
2. Paste the line with **Ctrl+V** or a right-click. Then press **Enter**.
3. Wait for `Claude Code successfully installed!`. While it downloads, it
   shows nothing for up to a few minutes.
4. Close PowerShell.
5. Close every terminal window. Open Windows Terminal again and run
   `claude --version`. It prints a version, such as
   `2.1.312 (Claude Code)`.

</details>

**Then:** close every terminal window. Open Windows Terminal again, in Git
Bash, and run the checks again.

</div>

</div>

**VS Code:** install it too, if you haven't yet. It's your editor, and the
check doesn't cover it.

<div data-show="os:mac">

**On Mac:** download it from https://code.visualstudio.com/download. Then
drag **Visual Studio Code** into your **Applications** folder.

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: VS Code on Mac</summary>

1. 🌐 **Browser:** open https://code.visualstudio.com/download.
2. Click **Download for Mac**.
3. Open the file from your Downloads folder.
4. Drag **Visual Studio Code** into your **Applications** folder.
5. Open VS Code from **Applications**.
6. Click **Open** when macOS asks whether to open an app from the
   internet. VS Code's window opens.

</details>

</div>

<div data-show="os:win">

**On Windows:** download the User Installer from
https://code.visualstudio.com/download. Then run it. It needs no
administrator rights.

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ Step by step: VS Code on Windows</summary>

1. 🌐 **Browser:** open https://code.visualstudio.com/download.
2. Click **Download for Windows**. Its file name starts with
   `VSCodeUserSetup`.
3. Open the file from your Downloads folder.
4. Accept the agreement. Click **Next** on each screen, keeping every
   default.
5. Click **Install**, then **Finish**. VS Code's window opens.

</details>

</div>

<details data-show="os:mac"><summary>🛟 An install or a check doesn't work on Mac</summary>

- **"command not found" just after installing:** open a new Terminal window
  and check again. If `claude` is still not found, its folder isn't on your
  PATH yet. Your PATH is the list of folders your computer looks in for
  tools. In ⌨️ **Terminal**, run these two lines, then open a new window:

  ```
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  source ~/.zshrc
  ```

  <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

  1. `echo 'export PATH=… >> ~/.zshrc`: Adds one line to the end of
     `.zshrc`, the settings file Terminal reads each time a window opens.
     That line tells Terminal to look for tools in `.local/bin` in your home
     folder too. Claude Code's installer puts `claude` there.
  2. `source ~/.zshrc`: Reads that settings file again in this window, so it
     picks up the new line now. Every new window reads it by itself.

  </details>

- **EACCES or "permission denied" from npm:** run the `npm install` line
  again with `sudo` in front. `sudo` runs a command as an administrator.
  Type your Mac's password. Nothing shows as you type. Then run
  `sudo chown -R $(id -u):$(id -g) ~/.npm`, so npm's cache stays yours.
  Never put `sudo` in front of the Claude Code line.
- **No Open Anyway button for the GitHub CLI:** your company manages your
  Mac. Tell your instructor before the day.
- **An installer asks for an administrator's name and password:** your
  company manages your Mac, so you can't install on it yourself. Tell your
  instructor before the day.
- **claude --version still prints an old version after the installer:**
  an earlier install of Claude Code is found first. Tell your instructor.

</details>

<details data-show="os:win"><summary>🛟 An install or a check doesn't work on Windows</summary>

- **"command not found" or "is not recognized" just after installing:**
  close every terminal window, then open a new one. A new tab isn't enough.
  If `claude` is still not found, its folder isn't on your PATH yet. Your
  PATH is the list of folders Windows searches for tools. In ⌨️
  **Terminal**, in PowerShell, run these two lines, then open a new window:

  ```
  $currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
  [Environment]::SetEnvironmentVariable('PATH', "$currentPath;$env:USERPROFILE\.local\bin", 'User')
  ```

  <details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

  1. `$currentPath = [Environment]::GetEnvironmentVariable(…)`: Reads your
     PATH, the list of folders Windows searches for tools. It keeps a copy
     as `$currentPath` for the next line. `'User'` means your own list, not
     the one for every account on the computer.
  2. `[Environment]::SetEnvironmentVariable('PATH', …, 'User')`: Saves your
     PATH again, with one folder added at the end. That's `.local\bin` in
     your user folder, where Claude Code's installer puts `claude`. Only
     windows you open after this see the change, so you open a new one.

  </details>

- **irm: command not found:** you're in Git Bash. Open PowerShell, as
  above, and paste the line again.
- **Git Bash isn't in Windows Terminal's Default profile list:** run Git
  for Windows' installer again. On **Select Components**, tick
  **Add a Git Bash Profile to Windows Terminal**. If you have no Windows
  Terminal at all, on Windows 10, install it from the Microsoft Store
  first.
- **Windows asks for an administrator's password, or won't install:**
  your company manages your computer, so you can't install on it yourself.
  Tell your instructor before the day.
- **EPERM or EBUSY from npm:** close every other terminal window and VS
  Code. Then run the `npm install` line again.
- **claude --version still prints an old version after the installer:**
  an earlier install of Claude Code is found first. Tell your instructor.

</details>

<details><summary>🛟 It says "certificate", "fetch failed" or times out</summary>

It's your company's network. Tell your instructor before the day.

</details>

### 4. Sign in to GitHub and get this guide

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

You sign in once with `gh`. After that, git uses the same sign-in each time
it clones or pushes. Cloning copies a repo from GitHub to your computer,
and pushing sends your commits back. The guide you download holds files you
run or read later. These are the lab's settings script and the customer's
inputs.

</details>

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

**If you have no account yet:** make one. It's free and takes about 5
minutes.

1. 🌐 **Browser:** open https://github.com/signup.
2. Enter an email address you can read now, a password and a user name.
   Any user name works. Your instructor uses it to invite you.
3. Type the code GitHub emails you, and follow the screens.
4. Send your instructor your user name. Their invite comes by email.

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

**If you haven't accepted it:** find the invite in your GitHub email, or at
https://github.com/notifications. Click **Accept**. Then change your answer
above to **Yes, accepted**.

⛔ **Stop here until you've accepted it.** The next lines copy this guide
from GitHub. They fail without the invite. If you have no invite at all,
send your instructor this message, in the room's chat or by email:

```
Lab: no invite yet to the lab guide repo. My GitHub user name is <your user name>.
```

Meanwhile, do step 7, which connects the SDK, and step 11, which looks up
your scope. They don't need this guide's repo. Then come back here.

</div>

⌨️ **Terminal:** the first three lines save how `gh` and git sign in to
GitHub now. That way, Module 8 can put them back at the end of the day:

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
   notes, inside `projects` in your home folder. `~` means your home
   folder. `-p` also makes `projects` if it's missing, and doesn't complain
   if the folder is already there.
2. `[ -e … ] || gh auth status > … 2>&1`: Saves which GitHub account `gh`
   is signed in to now, if any, in `gh-before-lab.txt`, for Module 8.
   `[ -e … ] ||` means "only if that file isn't there yet", so a second run
   never overwrites your record. `>` sends what `gh auth status` prints into
   the file, and `2>&1` sends its errors there too, such as "not logged in".
3. `[ -e … ] || git config --global --get-regexp '^credential\.' > …`: Saves
   how git signs in to websites now, in `git-credentials-before-lab.txt`.
   Line 4 changes it, and Module 8 uses this file to put it back. An empty
   file means git had nothing set.
4. `gh auth setup-git --hostname github.com --force`: Tells git, for every
   repo on this computer, to get its GitHub sign-in from `gh`. Then clone,
   pull and push don't ask you to sign in. It runs before line 5, so
   signing in never replaces the GitHub sign-in your computer saved before.
5. `gh auth login --web --git-protocol https`: Signs `gh` in to your GitHub
   account through your browser, and saves the sign-in on your computer. If
   `gh` was signed in to another account, this one becomes the active one,
   and Module 8 switches back with line 2's file. `https` means git talks to
   GitHub over a normal secure web connection, with no SSH keys to set up.
6. `gh repo clone …/hr-case-router-lab-guide
   ~/projects/hr-case-router-lab-guide`: Downloads this guide's repo from
   GitHub into a new folder, `hr-case-router-lab-guide`, inside `projects`.
   It works only once you've accepted your instructor's invite. You must be
   signed in with the GitHub account that was invited.
7. `git -C ~/projects/hr-case-router-lab-guide remote get-url origin`: Prints
   the GitHub address that folder was downloaded from, so you can see where
   it came from. `-C` runs git as if you were inside that folder. `origin`
   is git's name for the place a folder was downloaded from.

</details>

`gh auth login` shows a one-time code. Press **Enter**, and a GitHub page
opens. Type the code there, and approve. Press **Enter** to answer any
other question it asks.

✅ The last line prints
`https://github.com/gapietro/hr-case-router-lab-guide.git`.

<details><summary>🛟 It says "Could not resolve to a Repository"</summary>

The invite isn't accepted yet, or you signed in to another GitHub account.
`gh auth status` shows which account. A company-managed account can't
accept the invite. Sign in with a personal one, or tell your instructor.

</details>

<details><summary>🛟 It says the destination path already exists</summary>

Did the last line print the address above? Then the folder is this guide.
Update it with `git -C ~/projects/hr-case-router-lab-guide pull`. If it
printed anything else, rename the folder with
`mv ~/projects/hr-case-router-lab-guide ~/projects/old-guide`. Then run the
`gh repo clone` line again.

</details>

### 5. Add the lab's Claude Code settings

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

These settings fence Claude in for the lab. Claude starts in auto mode. In
auto mode, it asks you less and blocks risky commands by itself. It still
asks before any SDK command that writes to your instance. The settings
block `now-sdk auth`. They turn off connectors, which link Claude to other
apps, new memories and web search. They also keep Claude out of your notes,
this guide and your keys, the files that hold your passwords and tokens.
Any settings you had are backed up first, and Module 8 puts them back.

</details>

<div data-ask="m0-cc-before" data-options="yes|no" data-labels="Yes|No, this is my first time">

**Have you used Claude Code on this computer before?**

</div>

<div data-show="choice.m0-cc-before:yes">

**If you have:** close every other Claude Code window first. Type `/exit`
in each terminal, and close each session in the desktop app.

The lab's settings change how Claude works:

- Claude starts in auto mode.
- Connectors, new memories and web search are off.
- `now-sdk auth` is blocked.
- Claude asks you before the SDK commands that write to your instance,
  such as `now-sdk install`.
- Claude stays out of your notes, this guide and your keys: `~/.ssh`,
  `~/.aws`, `gh`'s login, `~/.npmrc` and `~/.netrc`.

Your own settings are backed up and kept. Your own auto mode rules wait in
the backup. Module 8 restores them. Cleanest of all is a separate user
account on your computer.

</div>

⌨️ **Terminal:**

```
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
```

✅ It prints `Lab settings in place.`

### 6. Sign in to Claude Code

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

You sign in once, and Claude can work in every session after that. A
session is one conversation with Claude. This first start also proves the
lab's settings reached Claude. Auto mode is on, and its limits hold. If a
setting didn't apply, Claude would be freer than the lab expects, and
nothing else would tell you.

</details>

On a Pro or Max plan? 🌐 **Browser:** first, open **Settings > Privacy** in
claude.ai. Turn off model training, which lets Anthropic train its models
on your chats.

Claude Code in the browser runs in the cloud, not on your computer. So this
lab uses the terminal or the desktop app instead.

<div data-show="surface:terminal">

**In the terminal:** ⌨️ start Claude in your home folder:

```
cd ~
claude
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `cd ~`: Goes into your home folder. Claude Code works in the folder you
   start it in. This first start only signs you in and checks the lab's
   settings, so your home folder will do.
2. `claude`: Starts Claude Code in this window. The first time, it walks you
   through signing in to your Claude account in the browser.

</details>

Follow the screens. Choose **Claude account with subscription**. If you pay
per use, choose **Anthropic Console account** instead. Then sign in in the
browser. When it asks if you trust this folder, pick **Yes** with the arrow
keys. If a screen asks you to approve your organisation's settings, approve
them and tell your instructor.

✅ Under the input box it says `⏵⏵ auto mode on`.

🤖 **Claude:** type `/permissions`, then press **→** until its **Deny** tab
shows.

✅ It lists `Read(~/projects/hr-case-router-lab-guide/**)`. Press **Esc**,
then type `/exit`.

</div>

<div data-show="surface:desktop">

**In the Code tab:** the Code-tab steps in this guide follow Anthropic's
docs for the desktop app. They haven't been tried in this lab yet. If one
doesn't match what you see, tell your instructor what you see.

1. Open the Claude desktop app, sign in, and click **Code** at the top of
   the sidebar.
2. Start a new session (<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
   In the row under the prompt box, pick the top entry under **Local**.
   Click the folder control, choose **Open folder…** and pick your home
   folder. Send nothing yet.

✅ The mode selector, in the row under the prompt box, shows **Auto**.

🤖 **Claude:** type `/status` alone.

✅ Its **Claude Code** row shows `2.1.228` or later. The Code tab has its
own copy of Claude Code, so this can differ from `claude --version`.

⌨️ **Terminal**, in your window, the terminal you keep for ⌨️ steps:
`/permissions` doesn't work in the Code tab. So check the lab's settings
file here instead:

```
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs --check
```

✅ It prints `Lab settings in place.`

🤖 **Claude:** now check that Claude really follows them. Paste this and
press **Enter**:

```
Run now-sdk auth --list.
```

✅ Claude says the command was denied, and shows no list.

</div>

<div data-show="os:win surface:desktop">

**On Windows, in the Code tab:** the lab's rules are `Bash(…)` rules. With
Git for Windows installed, Claude Code in a terminal runs commands in Git
Bash. Those rules also turn its PowerShell tool off. Anthropic's docs don't
say yet whether the Code tab's own copy does the same. The
`now-sdk auth --list` check above tests it. In step 13, each command Claude
runs must also be marked Bash. If either check fails, stop, and use Claude
Code in Git Bash instead.
<button data-set="surface:terminal">Use the terminal steps</button>

</div>

<details data-show="surface:terminal"><summary>🛟 It says ⏸ manual mode on</summary>

Type `/exit`, then put the settings back and start again:

```
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
claude
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `node …/merge-claude-settings.mjs`: Runs the lab's settings script. It
   adds the lab's settings to Claude Code's settings file and keeps your
   own. Run again, it never overwrites the backup of your settings it made
   the first time.
2. `claude`: Starts Claude Code again, so it reads the settings file afresh.

</details>

Still in manual mode? Then your organisation turned auto mode off. Claude
will just ask more often. Tell your instructor.

</details>

<details data-show="surface:desktop"><summary>🛟 The mode selector shows Manual</summary>

⌨️ In your window, put the settings back:

```
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
```

Then start a new session on your home folder again. If it still shows
**Manual**, pick **Auto** in the mode selector. If there's no **Auto** in
it, pick another model in the model picker, toward the right of that row.
Auto mode needs a recent model. If there's still no **Auto**, your
organisation turned auto mode off. Claude will just ask more often. Tell
your instructor.

</details>

<details data-show="surface:terminal"><summary>🛟 The Deny tab doesn't list it</summary>

Your organisation's policy overrides the lab's settings. Type `/exit` and
tell your instructor.

</details>

<details data-show="surface:desktop"><summary>🛟 It prints Lab settings NOT in place</summary>

⌨️ In your window, run the settings script again, without `--check`:

```
node ~/projects/hr-case-router-lab-guide/files/merge-claude-settings.mjs
```

✅ It prints `Lab settings in place.` If it still doesn't, tell your
instructor.

</details>

<details data-show="surface:desktop"><summary>🛟 Claude ran now-sdk auth --list</summary>

The lab's rules didn't stop it. Stop here. Don't use the Code tab for the
lab until your instructor has looked into it. Tell them what Claude showed,
and whether you're on Mac or Windows. Meanwhile, use Claude Code in a
terminal. <button data-set="surface:terminal">Use the terminal steps</button>

</details>

<details data-show="surface:desktop"><summary>🛟 The Claude Code row shows an older version</summary>

<div data-show="os:mac">

**On Mac:** click **Claude** in the menu bar, then **Check for Updates…**.

</div>

<div data-show="os:win">

**On Windows:** click **Help**, then **Check for Updates…**.

</div>

Then start a new session and type `/status` again.

</details>

### 7. Connect the SDK to your instance

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The SDK needs a saved sign-in to read your instance and install your app on
it. Every SDK command in the lab uses that sign-in by its name, `lab-pdi`.
You type the password yourself. Claude is never allowed to run
`now-sdk auth`, so it never sees your password.

</details>

Your instance must be awake. Type the password only here, never in Claude.

⌨️ **Terminal:** replace `dev123456` with your instance's name, from its
address in step 1. It's already done if the name is in **Your values**,
under **Setup**, the first button in the top bar:

```
now-sdk auth --add https://dev123456.service-now.com --type basic --alias lab-pdi
now-sdk auth --list
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `now-sdk auth --add … --type basic --alias lab-pdi`: Saves a sign-in to
   your instance on your computer, under the name `lab-pdi`. Every
   `now-sdk` command in the lab uses that name. `basic` means it signs in
   with a user name and password, which it asks you for.
2. `now-sdk auth --list`: Lists the sign-ins the SDK has saved. You can see
   `lab-pdi` is there, with your instance's address and the user name.

</details>

When asked, type the user name `admin`, then your admin password. Nothing
shows while you type it.

✅ The list shows `[lab-pdi]`, then `host =` with your instance's address,
and `username = admin`.

<details><summary>🛟 It prints a line starting [now-sdk] ERROR:</summary>

The sign-in failed. Check that the instance is awake and the password is
right. Then run the first line again. If it says "certificate" or "fetch
failed", or times out, that's your company's network. Tell your instructor.

</details>

## Part 3 — The kit and a clean bench

### 8. Install the kit and the SDK plugin

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

The kit, `prove-it`, gives Claude the lab's stages: consult, design
challenge, build plan, grade and handoff. Each stage proves itself before
the next one starts. The kit's version is pinned, so it matches what this
guide shows. The SDK plugin lets Claude look up facts instead of guessing
them.

</details>

You install two plugins, add-ons for Claude Code. The kit runs the lab's
rituals, the set routines it follows, such as shipping a pull request.
ServiceNow's SDK plugin teaches Claude the SDK from its docs, with
`now-sdk explain`. It also reads records on your instance, with
`now-sdk query`. It can't write to the instance.

⌨️ **Terminal:**

```
claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.4'
claude plugin install prove-it@prove-it
claude plugin install servicenow-sdk@claude-plugins-official
```

<details data-detail="extra"><summary>ℹ️ What each line does</summary>

1. `claude plugin marketplace add …`: Adds the kit's GitHub repo as a
   plugin marketplace, a list of plugins Claude Code can install. It adds
   version `v0.1.4`, the part after `#`.
2. `claude plugin install prove-it@prove-it`: Installs the kit's plugin,
   `prove-it`, from the marketplace you just added. The name after `@` is
   the marketplace's, and it's `prove-it` too. Claude Code then has the
   plugin in every folder.
3. `claude plugin install servicenow-sdk@claude-plugins-official`: Installs
   ServiceNow's SDK plugin from `claude-plugins-official`, Anthropic's own
   plugin marketplace. It teaches Claude to look things up in the SDK's docs
   and to read records on your instance. Those lookups never change
   anything.

</details>

✅ None of the three prints an error.

<details><summary>🛟 It says the marketplace claude-plugins-official isn't known</summary>

Add it, then run the last line again:

```
claude plugin marketplace add anthropics/claude-plugins-official
claude plugin install servicenow-sdk@claude-plugins-official
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `claude plugin marketplace add anthropics/claude-plugins-official`: Adds
   Anthropic's own plugin marketplace to Claude Code, from its GitHub repo.
   Most installs already have it. Yours didn't, so the SDK plugin's install
   couldn't find it.
2. `claude plugin install servicenow-sdk@claude-plugins-official`: Installs
   ServiceNow's SDK plugin from `claude-plugins-official`, Anthropic's own
   plugin marketplace. It teaches Claude to look things up in the SDK's docs
   and to read records on your instance. Those lookups never change
   anything.

</details>

</details>

<details><summary>🛟 It says "blocked by enterprise policy"</summary>

Your organisation limits plugins. Stop here, and tell your instructor what
it says.

</details>

### 9. Make your folders

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your workspace keeps everything for your app in one place. The app's repo
goes in it. In Module 1, the PRD goes in `brief`. The PRD is the product
requirements document, which says what the app must do. Claude logs each
catch in `catches.md`. With `projects` open in VS Code, you can read every
file Claude writes.

</details>

⌨️ **Terminal:**

```
mkdir -p ~/projects/hr-case-router/brief
touch ~/projects/hr-case-router/catches.md
```

<details data-detail="extra"><summary>ℹ️ What each line does</summary>

1. `mkdir -p ~/projects/hr-case-router/brief`: Makes your workspace folder,
   `hr-case-router` inside `projects`, with a `brief` folder in it. You put
   the PRD in `brief` in Module 1. `-p` makes any folder that's missing on
   the way, and doesn't complain if they're already there.
2. `touch ~/projects/hr-case-router/catches.md`: Makes an empty file,
   `catches.md`, in your workspace. Claude logs each catch in it. If the
   file is already there, `touch` leaves what's in it alone.

</details>

`hr-case-router` is your workspace, the folder for everything about your
app. Claude logs catches in `catches.md`.

✏️ **Editor:** in VS Code, choose **File > Open Folder…** and open the
`projects` folder in your home folder. Keep it open.

### 10. Check nothing else is loaded

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Anything else Claude loads changes how it behaves and what it can do. That
includes another plugin, an MCP server, a hook or your own instruction
file. The lab's steps and checks expect only the kit and the SDK plugin.
So anything extra goes off for now, and Module 8 brings it back.

</details>

Claude loads every plugin, MCP server, hook and instruction file you have.
An MCP server connects Claude to another app or service. A hook is a
command that runs by itself at set moments. For the lab, Claude should load
only the kit and the SDK plugin.

⌨️ **Terminal:**

```
cd ~/projects/hr-case-router
claude plugin list
claude mcp list
ls -d ~/CLAUDE.md ~/projects/CLAUDE.md ~/.claude/CLAUDE.md ~/.claude/skills ~/.claude/agents ~/.claude/commands
grep -c '"hooks"' ~/.claude/settings.json
git config --get core.hooksPath
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router`: Goes into your workspace, so the checks
   see what Claude sees when it starts there.
2. `claude plugin list`: Lists the plugins Claude Code has installed, and
   whether each is enabled. A plugin adds skills, commands or hooks to every
   session. So an extra one changes how Claude behaves in the lab.
3. `claude mcp list`: Lists the MCP servers Claude can use. These are tools
   outside Claude Code, such as a connection to another app or service.
4. `ls -d …`: Looks for your own instruction files and folders. These are a
   `CLAUDE.md` in your home folder, in `projects` or in `~/.claude`, and
   your own skills, agents and commands. Claude reads them in every session.
   `-d` lists each one by name, not what's inside it, and
   `No such file or directory` means it isn't there, which is what you want.
5. `grep -c '"hooks"' …`: Counts how often `"hooks"` appears in Claude
   Code's settings file. Hooks are commands Claude runs by itself at set
   moments. `0` means you have none.
6. `git config --get core.hooksPath`: Prints the folder git takes its commit
   hooks from, if one is set for every repo on your computer. Nothing
   printed means each repo uses its own hooks. Then your repo's guard, which
   you set up in steps 13 and 14, will run.

</details>

✅ The only enabled plugins are `prove-it@prove-it`, with `Version: 0.1.4`,
and `servicenow-sdk@claude-plugins-official`, at any version.
`claude mcp list` says `No MCP servers configured`. `ls` prints only
`No such file or directory` lines. `grep` prints `0`, and `git config`
prints nothing.

<details><summary>🛟 Other plugins or MCP servers are listed</summary>

⌨️ First, save what you have, once. Module 8 uses it to switch them back
on:

```
cd ~/projects/hr-case-router-notes
[ -e plugins-before-lab.txt ] || claude plugin list > plugins-before-lab.txt
[ -e mcp-before-lab.json ] || (umask 077; node -p 'JSON.stringify(require(require("os").homedir()+"/.claude.json").mcpServers||{},null,2)' > mcp-before-lab.json)
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router-notes`: Goes into your lab notes folder.
   The next two lines write their files there, where Module 8 looks for
   them.
2. `[ -e plugins-before-lab.txt ] || claude plugin list > …`: Saves the
   list of your plugins, and which are enabled, in `plugins-before-lab.txt`.
   Module 8 uses it to know which to switch back on. `[ -e … ] ||` means
   "only if that file isn't there yet", so a second run never overwrites
   your record.
3. `[ -e mcp-before-lab.json ] || (umask 077; node -p … > …)`: Copies your
   MCP servers' settings out of `~/.claude.json`, Claude Code's own file,
   into `mcp-before-lab.json`. Module 8 uses it to add them back after you
   remove them. `umask 077` makes the new file readable only by you,
   because a server's settings can hold a key.

</details>

Then switch each one off by the name listed. For a plugin, run
`claude plugin disable <name>`. For a server, run
`claude mcp remove <name>`. A server whose name starts `plugin:` goes when
you switch off its plugin. If one won't go, or you never added it, it's
your organisation's. Leave it, and tell your instructor.

</details>

<details><summary>🛟 prove-it shows another version</summary>

```
claude plugin marketplace remove prove-it
claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.4'
claude plugin install prove-it@prove-it
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `claude plugin marketplace remove prove-it`: Removes the kit's
   marketplace, which points at another version of the kit. The next line
   can then add the right one.
2. `claude plugin marketplace add 'gapietro/prove-it-kit#v0.1.4'`: Adds the
   kit's GitHub repo as a plugin marketplace, a list of plugins Claude Code
   can install. It adds version `v0.1.4`, the part after `#`.
3. `claude plugin install prove-it@prove-it`: Installs the kit's plugin,
   `prove-it`, from the marketplace you just added. The name after `@` is
   the marketplace's, and it's `prove-it` too. Claude Code then has the
   plugin in every folder.

</details>

</details>

<details><summary>🛟 ls, grep or git config shows something</summary>

Your own setup would steer the lab. Add `.off` to the end of each name `ls`
lists, such as `mv ~/CLAUDE.md ~/CLAUDE.md.off`. Module 8 moves them back.
If `grep` or `git config` shows hooks, tell your instructor. A separate
user account on your computer is cleanest.

</details>

## Part 4 — Your app's repo

Your app's code gets its own repo, fenced in two ways. It ignores every
file you haven't named. A guard checks each commit for secrets, such as
passwords and tokens.

### 11. Look up your scope

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your scope is your app's own name space on the instance. Every table,
property and role the app makes starts with it. The SDK needs it to create
the app. The vendor prefix in it is the one your instance gives its own
apps.

</details>

🌐 **Browser:**

1. As admin, type `sys_properties.list` in the filter navigator, the box
   under **All**, and press **Enter**. In the **Name** column's search box,
   type `glide.appcreator.company.code` and press **Enter**. Its **Value**
   is your vendor prefix, such as `123456`.
2. Your scope is `x_<prefix>_hcr_<your initials, lower case>`, such as
   `x_123456_hcr_ga`.

✅ Your scope is all lower case, with 18 characters or fewer.

Note your scope.

<div data-value="scope"></div>

### 12. Create the app

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

`now-sdk init` makes your app's starting files: its project settings, its
build setup and a `src` folder for the code. Everything Claude builds later
goes on top of them. While it works, it reaches your instance through
`lab-pdi`. That's why the instance must be awake.

</details>

Your instance must be awake.

⌨️ **Terminal:** replace `<SCOPE>` with your scope from step 11. It's
already done if you typed your scope in step 11:

```
mkdir -p ~/projects/hr-case-router/app
cd ~/projects/hr-case-router/app
now-sdk init --appName "HR Case Router" --packageName hr-case-router --scopeName <SCOPE> --template typescript.basic --auth lab-pdi
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `mkdir -p ~/projects/hr-case-router/app`: Makes the `app` folder inside
   your workspace. Your app's code lives there, and later its repo. `-p`
   doesn't complain if it's already there.
2. `cd ~/projects/hr-case-router/app`: Goes into that folder, because
   `now-sdk init` makes the app in the folder you're in.
3. `now-sdk init --appName "HR Case Router" … --auth lab-pdi`: Makes the
   starting files of a new ServiceNow app in this folder, from the SDK's
   basic TypeScript template. TypeScript is the language the app's code is
   written in. It names the app `HR Case Router`, gives it your scope, and
   reaches your instance through the `lab-pdi` sign-in.

</details>

✅ It ends with `Application created successfully.`

<details><summary>🛟 It fails, or you're not sure it worked</summary>

⌨️ Run `ls ~/projects/hr-case-router/app/now.config.json`. If it's listed,
the app exists, so go on. If it isn't, check your scope. It must be lower
case, with 18 characters at most, and no `<` or `>`. Then run
`cd ~/projects/hr-case-router && rm -rf app`, and the three lines above. If
it still fails, tell your instructor.

</details>

### 13. Let Claude set up the repo

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your app's folder becomes a repo, with its safety in place before anything
is committed. The allow list, `.gitignore`, means git tracks only the files
it names. The guard is a script git runs before each commit. It refuses a
file the list doesn't name, or a line shaped like a secret. Your commits
carry your GitHub noreply address, an address GitHub gives you so your own
email stays private.

</details>

<div data-show="surface:terminal">

**In the terminal:** ⌨️ start Claude in the app folder. Pick **Yes** when
it asks if you trust the folder:

```
cd ~/projects/hr-case-router/app && claude
```

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**. Click
the folder control, choose **Open folder…** and pick
`~/projects/hr-case-router/app`. Then press **Ctrl+O** until the view is
**Verbose**.

</div>

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

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude gets the kit at version `v0.1.4` and starts the repo on `main`, with
this repo's commit email and the kit's allow list and guard. It deletes the
template's two example files, then installs the packages and builds the
app, to prove the starting point works before anything is committed. Its
last two commands print your commit email and the kit's version, so you can
check both yourself. One prompt does it all, so every participant's repo
starts the same way.

</details>

Claude may read the SDK's docs for a few minutes first. If it asks "Allow
this read outside the working directories?", choose **Yes, and keep
allowing any reads outside the working directories**.

✅ The `now-sdk build` output ends with `Build completed successfully`. The
email ends in `@users.noreply.github.com`, and `describe` prints `v0.1.4`.
<span data-show="surface:terminal">**In the terminal:** then type `/exit`.</span>

<div data-show="os:win surface:desktop">

**On Windows, in the Code tab:** ✅ in the **Verbose** view, each command
Claude ran is marked Bash, not PowerShell. If one says PowerShell, stop
here. The lab's safety rules don't cover it. Tell your instructor, and use
Claude Code in Git Bash from here on.
<button data-set="surface:terminal">Use the terminal steps</button>

</div>

<details><summary>🛟 npm install or the build failed</summary>

<div data-show="os:mac">

**On Mac:** if npm says its cache is broken, or owned by root, open a
second Terminal window (**Cmd+N**). ⌨️ In it, run
`sudo chown -R $(id -u):$(id -g) ~/.npm` and type your Mac's password.
Then paste the prompt again.

</div>

<div data-show="os:win">

**On Windows:** if npm says EPERM or EBUSY, close VS Code and every
terminal window except Claude's. Then paste the prompt again.

</div>

For anything else, tell your instructor the first error line. Don't let
Claude change files to make it pass.

</details>

### 14. 🔮 Try to beat the guard

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Every commit in the lab relies on the guard. So you test it once here,
with a fake token, while nothing real is at stake.

</details>

**The idea:** a check only counts if it could have failed. Here you try to
commit a fake token, a made-up secret key. You see the guard stop it before
you rely on it.

Guess first: will the guard stop a commit with a token in it?

<details><summary>🔮 The answer, once you've guessed</summary>

Yes. Before git makes the commit, the guard reads every line being added.
It spots a line shaped like a token, and refuses with `BLOCKED:`.

It does that only if it runs. git runs it only when it's in `.git/hooks`
and marked as a program. A guard that never runs lets everything through
without a word. So you watch it refuse a fake token now, while a miss
costs nothing. Later in the day, your app is graded. The grade scans the
repo's history for secrets. If one got in, the grade can't go above 49 out
of 100.

</details>

⌨️ **Terminal**, still in `~/projects/hr-case-router/app`:

```
head -1 .gitignore
echo 'FAKE_TOKEN=do-not-use-0000' >> README.md
git add .gitignore README.md
git commit -m "chore: initial scaffold"
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `head -1 .gitignore`: Prints the first line of `.gitignore`, so you can
   see it's the kit's allow list. git ignores every file the list doesn't
   name.
2. `echo 'FAKE_TOKEN=do-not-use-0000' >> README.md`: Adds a fake secret to
   the end of `README.md`. It's a line shaped like a token, to tempt the
   guard. `>>` adds to the file and doesn't replace what's there.
3. `git add .gitignore README.md`: Stages the two files, which marks them to
   go into the next commit.
4. `git commit -m "chore: initial scaffold"`: Tries to save the staged files
   as your repo's first commit. Before git makes it, the guard, git's
   pre-commit hook, reads every line being added. It should refuse the
   commit because of the token.

</details>

✅ The first line printed is `# Allowlist .gitignore (prove-it). Nothing is tracked unless admitted below.` The commit is **blocked**, with a line
starting `BLOCKED: README.md has`. The REVOKE lines under it are expected,
because the token is fake.

That's the guard working, not a catch.

<details><summary>🛟 The commit went through</summary>

The guard didn't run. ⌨️ Undo the commit, which keeps its files, and
install the guard:

```
git update-ref -d HEAD
cp ~/projects/prove-it-kit/hooks/pre-commit-guard.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `git update-ref -d HEAD`: Undoes the commit that went through. It's the
   repo's only commit, so the repo goes back to having none. Your files, and
   what's staged, stay as they are.
2. `cp …/pre-commit-guard.sh .git/hooks/pre-commit`: Copies the kit's guard
   to where git looks for a pre-commit hook. That's a script git runs before
   every commit in this repo, which can refuse the commit.
3. `chmod +x .git/hooks/pre-commit`: Marks the guard as a program you can
   run. git skips a hook that isn't marked that way, so the guard would
   never run.

</details>

Run the four lines above again. If it's blocked now, that's a real catch.
Log it with the line below. If it still isn't blocked, push nothing, and
tell your instructor.

```
echo '0 | guard | the guard was not installed; once installed, it blocked the token' >> ~/projects/hr-case-router/catches.md
```

</details>

### 15. Commit for real

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

With the fake token gone, this is your repo's real first commit. It holds
the allow list and a one-line README, checked by the guard. It's one of
only two commits made straight to `main`. Later changes reach `main`
through pull requests.

</details>

⌨️ **Terminal:**

```
echo "# HR Case Router" > README.md
git add README.md
git commit -m "chore: initial scaffold"
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `echo "# HR Case Router" > README.md`: Writes `README.md` again as the
   single line `# HR Case Router`, which takes the fake token out. `>`
   replaces everything that was in the file.
2. `git add README.md`: Stages the clean `README.md` again, so the commit
   takes this version, not the one with the token. `.gitignore` is still
   staged from the try that was blocked.
3. `git commit -m "chore: initial scaffold"`: Saves the two files as your
   repo's first commit, on `main`. The guard checks it again, and this time
   finds nothing to stop.

</details>

✅ Git prints `[main (root-commit) …] chore: initial scaffold`. If you've
done this step before, `git log --oneline` shows that one commit instead.
Go on.

## Part 5 — Your repo's rules, and GitHub

### 16. Give the repo its rules

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

`CLAUDE.md` is the file Claude reads at the start of every session in this
folder. It holds the rules for how you and Claude work together. The kit's
copy sets how a session opens and closes, and how a pull request is
shipped. It sets how the backlog, the list of work still to do, is ranked.
It says nothing is built without a signed design record, the design you
agree on before building. It also says every test names the design term it
proves. You add your app's facts and the lab's own rules. Then every
session follows them, and you don't have to repeat them.

</details>

<div data-show="surface:terminal">

**In the terminal:** ⌨️ this window becomes the Claude window:

```
cd ~/projects/hr-case-router/app && claude
```

</div>

<div data-show="surface:desktop">

**In the Code tab:** 🤖 start a new session
(<kbd data-mac="Cmd+N" data-win="Ctrl+N">Cmd+N (Mac) · Ctrl+N (Windows)</kbd>).
In the row under the prompt box, pick the top entry under **Local**. Click
the folder control, choose **Open folder…** and pick
`~/projects/hr-case-router/app`. Then press **Ctrl+O** until the view is
**Verbose**.

</div>

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

```
Copy ~/projects/prove-it-kit/templates/CLAUDE.md to CLAUDE.md and fill in
its Project facts, with the scope from now.config.json; keep the rules.
Instance alias lab-pdi, already set up: drop the template's now-sdk auth
hint. The Build line names now-sdk build and says install runs only as
Platform facts allows. The design record will be
docs/DESIGN-HRCaseRouter.md: the contract. docs/LLD-HRCaseRouter.md is
written in the workspace first and copied here with the design record; it is
background, frozen once written, and docs/DECISIONS.md holds the
lab's settled decisions: if they disagree, the design record wins. The
workspace is one folder up. No hostnames, no credentials. Then make these
changes, and only these:
- After Project facts, add a "## Platform facts" section with one rule: for
  any Fluent API question, run now-sdk explain before guessing; for any
  fact about the instance, run now-sdk query --auth lab-pdi, read-only, and
  quote the rows; never run now-sdk auth; never run now-sdk install, except
  the grade's install to lab-pdi after I name the alias.
- Keep the Learning checkpoints heading and replace its text with one
  line: at a decision that shapes the design, give your recommendation and
  its trade-off, and take it when I reply yes; never ask me to answer first.
- Under Brakes, replace the Pre-build restatement rule with: before
  building a story, restate it in five bullets or fewer, then build it;
  don't wait for my confirmation.
- Under Ship ritual, add: review the pull request's diff without checking
  it out; post the review's findings on the pull request as a comment,
  even if there are none; never edit docs/, GRADE.md, RUNBOOK.md, HANDOFF.md or BACKLOG.md
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

<details data-detail="extra"><summary>ℹ️ What this prompt does</summary>

Claude copies the kit's `CLAUDE.md` into your repo and fills in its Project
facts: your scope, `lab-pdi`, and where the design record and the lab's
decisions live. It makes the seven changes the prompt lists and keeps the
kit's other rules as they are. One change matters later: Claude restates
each story before building it but doesn't wait for you, so "never ask me a
design question" holds. It adds three allow lines to `.gitignore`, for
`CLAUDE.md`, `docs/` and `SESSION-NOTE.md`, and commits nothing, so you can
check the file first.

</details>

✅ ✏️ **Editor**, `hr-case-router/app/CLAUDE.md`: Project facts show your
scope and `lab-pdi`. There's a Platform facts section. Learning checkpoints
has one line under its heading. Brakes' restatement rule doesn't wait for
you. The end of `hr-case-router/app/.gitignore` has the three allow lines.

### 17. Read every name

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

You check with your own eyes which files git would commit. You also check
that `CLAUDE.md` names no instance. You do both before the next commit
makes them part of the repo's history. Then you give the guard your
instance's name, so it blocks any later commit that names it.

</details>

<div data-show="os:mac surface:terminal">

**On Mac, in the terminal:** Claude has this window. Open a second one with
**Cmd+N**. That's your window, the terminal you keep for ⌨️ steps.

</div>

<div data-show="os:win surface:terminal">

**On Windows, in the terminal:** Claude has this tab. Open a second Git Bash
tab with **Ctrl+Shift+T**. That's your window, the terminal you keep for ⌨️
steps.

</div>

<div data-show="surface:desktop">

**In the Code tab:** your window is the terminal app you've used so far,
not the Code tab.

</div>

⌨️ **Terminal**, in your window. Replace `dev123456` with your instance's
name. It's already done if the name is in **Your values**, under **Setup**,
the first button in the top bar. The line with your instance's name teaches
the guard to block any commit that names your instance. `-n` makes
`git add` a dry run, which shows what it would do and does nothing:

```
cd ~/projects/hr-case-router/app
mkdir -p .prove-it && echo 'dev123456' > .prove-it/patterns
git add -n .
grep -n -i 'service-now' CLAUDE.md
```

<details data-detail="extra" data-topic="terminal"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router/app`: Goes into your app's folder, so the
   lines below work on your app's repo.
2. `mkdir -p .prove-it && echo … > .prove-it/patterns`: Makes a `.prove-it`
   folder and writes your instance's name into its `patterns` file. The
   guard then blocks any commit that adds a line naming your instance. The
   allow list doesn't name `.prove-it`, so that file itself is never
   committed.
3. `git add -n .`: Lists every file git would stage from this folder,
   without staging any. It shows exactly which files the allow list lets
   in.
4. `grep -n -i 'service-now' CLAUDE.md`: Looks for `service-now` in
   `CLAUDE.md`, in upper or lower case. It prints each line that has it,
   with its line number. Nothing printed means `CLAUDE.md` holds no instance
   address.

</details>

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

### 18. Commit, and go private on GitHub

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Your repo goes on GitHub as a private repo. Only you and the people you
invite can see it. The kit files your stories, milestones and pull requests
there. From now on, every change reaches `main` through a pull request.

</details>

🤖 **Claude:** paste this, type `go` after it, and press **Enter**:

```
Run git add . and commit on main as "chore: SDK project and CLAUDE.md".
```

✅ Git prints `[main …] chore: SDK project and CLAUDE.md`.
<span data-show="surface:terminal">**In the terminal:** type `/exit`.</span>

⌨️ **Terminal**, in the same window:

```
cd ~/projects/hr-case-router/app
gh repo create hr-case-router --private --source . --remote=origin --push
```

<details data-detail="extra" data-topic="git"><summary>ℹ️ What each line does</summary>

1. `cd ~/projects/hr-case-router/app`: Goes into your app's folder, the repo
   you're about to put on GitHub.
2. `gh repo create hr-case-router --private … --push`: Makes a new private
   repo, `hr-case-router`, on your GitHub account, from the folder you're
   in (`.`). It saves the repo's address in your local repo as `origin`,
   git's name for the place you push to. Then it pushes your two commits
   there.

</details>

✅ 🌐 The address `gh` prints opens your repo, marked **Private**. That was
the last commit straight to `main`.

<details><summary>🛟 It says the name already exists</summary>

⌨️ Run `git remote get-url origin`. If it prints your `hr-case-router`
repo's address, an earlier try made the repo. Run
`git push -u origin main`. If it prints an error, use another name:

```
gh repo create hr-case-router-2 --private --source . --remote=origin --push
```

Note the new name.

<div data-value="repo"></div>

</details>

## Part 6 — Before the day

### 19. Read the inputs, and 🔮 guess

<details data-detail="extra"><summary>ℹ️ Why this step</summary>

Everything the app does traces back to what the customer asked for in these
files. Guessing before you see the real PRD makes you read them as a
builder would. Afterwards, it shows you what you'd have missed.

</details>

✏️ **Editor:** read these three files in
`hr-case-router-lab-guide/files/inputs/`:

- `USE-CASE.md` and `WORKSHOP-NOTES.md`, the customer's own words.
- `CHANGE-REQUEST.md`, a draft of the customer's latest request. It's still
  to be confirmed.

Then guess what a PRD built from them needs. In Module 1, you compare your
guess with the real PRD.

<details><summary>🔮 The answer, once you've guessed</summary>

It needs every request in the inputs, each traced to the sentence it comes
from:

- An agent that routes each case itself, by what the case says. It changes
  the case's group, or transfers the case to another HR service.
- No case sent to a group that can't open it.
- No sensitive HR service sent to AI.
- A confidence threshold: how sure the agent must be before it routes.
  Below it, the case stays where it is, with a note. There's no triage
  queue, where people would sort cases by hand.
- Reroute, so fulfillers can have a case routed again.
- A record of why each case went where it did.
- The reporting.

It also keeps the workshop's two warnings. An agent makes many AI calls: at
least 25, where a skill, a single AI task, makes one. An agent with poor
information guesses. Anything only the customer can decide is an open
decision, never a guess.

</details>

## You now have

- An instance set up for the lab, and `hr.demo` to impersonate.
- Your tools, signed in. Claude Code has the lab's settings, the kit
  `v0.1.4` and the SDK plugin.
- `~/projects/hr-case-router`, holding only `app/`, an empty `brief/` and an
  empty `catches.md`.
- In `app/`: the allow list, the guard, an SDK project that builds, and its
  `CLAUDE.md`. The allow list is the hidden file `.gitignore`: `ls -a` shows
  it. Your two commits are pushed to your private `hr-case-router` repo on
  GitHub.
- The customer's inputs, read, and your guess at what the PRD needs.

⌨️ **Terminal:** check it all at once:

```
bash ~/projects/hr-case-router-lab-guide/files/check-progress.sh 1
```

✅ The last line is `Ready for Module 1.` A ❌ names the step to do again.

If anything is missing, tell your instructor at least two days before the
workshop.
