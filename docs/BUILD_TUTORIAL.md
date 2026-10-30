# BUILD TUTORIAL — From Zip File to Live Website

This guide assumes you have **never** used Git, GitHub, or deployed a website.
Follow it top to bottom. By the end you will have two live projects:

1. **static-spa** — your reusable website template (source files + guide)
2. **technical-cv** — your live dashboard at `https://<your-username>.github.io/technical-cv/#/`

Total time: about 30–45 minutes the first time. No coding required.

---

## Part 0 — What you're actually building (2 min read)

A **static website** is just files — HTML, CSS, JavaScript — that a browser
reads directly. There is no server program, no database, no monthly bill.

**GitHub** is a website that stores versions of your files ("repositories" or
"repos"). **GitHub Pages** is a free feature that takes a repo and serves it
as a live website. **Git** is the tool on your computer that sends files to
GitHub.

The pipeline you're building:

```
Files on your computer  --git push-->  GitHub repo  --GitHub Pages-->  Live website
```

That's the whole system. Every future update is: edit a file, push, done.

---

## Part 1 — One-time setup

### 1.1 Create a GitHub account (skip if you have one)

Go to https://github.com/signup and create the account. Your username becomes
part of your website address: `https://<username>.github.io/<project>/`.
This tutorial writes `your-username` where your GitHub username goes —
substitute your own everywhere you see it.

### 1.2 Install Git

- **Windows:** download from https://git-scm.com/download/win and run the
  installer. Accept every default. This also installs **Git Bash**, the
  terminal you'll type commands into.
- **Mac:** open the **Terminal** app and type `git --version`. If Git isn't
  installed, macOS will pop up an offer to install it — accept.
- **Linux:** `sudo apt install git` (Debian/Ubuntu) or your distro equivalent.

**Verify:** open a terminal (Git Bash on Windows) and type:

```bash
git --version
```

If you see a version number (e.g., `git version 2.43.0`), you're good.

### 1.3 Tell Git who you are (one time, ever)

Git stamps your name on every change. Type these two lines, with your info:

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

Use the same email as your GitHub account.

### 1.4 (Recommended) Install the GitHub CLI

The `gh` tool lets you create repos from the terminal instead of the website.
Download from https://cli.github.com and install with defaults. Then log in:

```bash
gh auth login
```

Choose: **GitHub.com** → **HTTPS** → **Login with a web browser**, and follow
the prompts. This is the easiest authentication path for a first-timer.

> **No `gh`? That's fine.** Every step below has a "Without gh" alternative
> using the GitHub website.

---

## Part 2 — Get the project files onto your computer

1. Download the two zip files: `static-spa-repo.zip` and
   `technical-cv-repo.zip`.
2. Unzip both into a folder you'll remember. Suggested location:

```
Documents/
└── github/
    ├── static-spa/
    │   ├── README.md
    │   ├── TEMPLATE_GUIDE.md
    │   ├── index.html
    │   ├── css/style.css
    │   └── js/  (app.js, custom.js, data.js)
    └── technical-cv/
        ├── README.md
        ├── index.html
        ├── css/style.css
        └── js/  (app.js, custom.js, data.js)
```

> **Note:** each folder contains a hidden `.git` folder. That's the version
> history — it's supposed to be there. Don't delete it. (On Windows, hidden
> files may not show; that's fine.)

3. Open your terminal **in the github folder**:
   - **Windows:** open File Explorer to `Documents\github`, right-click empty
     space → **"Open Git Bash here"**.
   - **Mac:** open Terminal and type `cd ~/Documents/github`.

**Sanity check** — type `ls` and press Enter. You should see:

```
static-spa  technical-cv
```

---

## Part 3 — Publish the template repo (static-spa)

### 3.1 With the GitHub CLI (easy path)

```bash
cd static-spa
gh repo create your-username/static-spa --public --source=. --push
```

What this does, in plain English:
- `cd static-spa` — move into the project folder
- `gh repo create` — makes a new **public** repo on GitHub named `static-spa`
- `--source=. --push` — connects this folder to it and uploads everything

If it prints a URL like `https://github.com/your-username/static-spa`, it
worked. Open that URL in a browser — you'll see your files.

### 3.2 Without the CLI (website path)

1. Go to https://github.com/new
2. **Repository name:** `static-spa` · **Public** · do **NOT** check "Add a
   README" (you already have one) → **Create repository**
3. GitHub shows setup commands. Ignore them and use these in your terminal:

```bash
cd static-spa
git remote add origin https://github.com/your-username/static-spa.git
git push -u origin main
```

Plain English: "connect this folder to that GitHub repo, then upload."
Git will ask you to sign in the first time — a browser window handles it.

### 3.3 Mark it as a template (optional, 30 seconds)

On the repo page: **Settings** → check **"Template repository"** (near the
top). Now every future project starts with a green **"Use this template"**
button — no copying zip files around.

---

## Part 4 — Publish the dashboard repo (technical-cv)

Same moves, second verse:

```bash
cd ../technical-cv
gh repo create your-username/technical-cv --public --source=. --push
```

(`cd ..` means "go back up one folder" — you were inside static-spa.)

Or without the CLI: create `technical-cv` at https://github.com/new (public,
no README), then:

```bash
cd ../technical-cv
git remote add origin https://github.com/your-username/technical-cv.git
git push -u origin main
```

---

## Part 5 — Turn the repo into a live website (GitHub Pages)

This is the payoff step.

1. Open https://github.com/your-username/technical-cv
2. Click **Settings** (right end of the tab row)
3. Left sidebar → **Pages**
4. Under **"Build and deployment"**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` — **Folder:** `/ (root)` → **Save**
5. Wait ~1 minute. Refresh the Pages settings page — a banner appears:
   *"Your site is live at https://your-username.github.io/technical-cv/"*

Open it. You should see the dark dashboard with green highlights, and the
**Repos** tab should list your repositories — including the two you just
created. (The page pulls that list live from GitHub every time it loads.
That's the "single source of truth" mechanism: publish a new repo and this
page updates itself.)

You can do the same for `static-spa` if you want its placeholder demo live
too, but it's optional — that repo's job is storing the template.

---

## Part 6 — Making changes (the loop you'll use forever)

All content lives in **one file per project: `js/data.js`**. To change a
link, card, or profile entry:

### Option A — edit directly on GitHub (easiest, works from your phone)

1. On the repo page, click into `js/data.js`
2. Click the **pencil icon** (top right of the file view)
3. Make your edit → **Commit changes** (green button)
4. The live site updates itself in about a minute. Done.

### Option B — edit on your computer

1. Open the file in any text editor (Notepad works; VS Code is better —
   free at https://code.visualstudio.com)
2. Save, then in your terminal, from the project folder:

```bash
git add -A
git commit -m "Update resource links"
git push
```

Plain English: "stage everything I changed, snapshot it with a note, upload."
Those three commands are 95% of Git usage. The site redeploys automatically
on every push.

**Your first three real edits should be** (all in `technical-cv/js/data.js`):
1. Paste your real LinkedIn URL (search the file for `EDIT`)
2. Paste your real Credly URL
3. Replace the "Add your next flagship" placeholder card

---

## Part 7 — Starting a brand-new project from the template

When you want the next site (a client reference page, a study tracker, etc.):

1. Go to https://github.com/your-username/static-spa → **Use this template** →
   **Create a new repository** → name it → Create
2. Clone it to your computer (copy the files down):

```bash
cd ~/Documents/github
git clone https://github.com/your-username/<new-project>.git
cd <new-project>
```

3. Edit `js/data.js` (content), the TOKENS block at the top of
   `css/style.css` (colors), and optionally `js/custom.js` (interactive
   pages). Full instructions: `TEMPLATE_GUIDE.md` in the static-spa repo.
4. Push (Part 6, Option B) and enable Pages (Part 5).

That's a new live site in ~30 minutes, most of it content writing.

---

## Part 8 — Troubleshooting

| Symptom | Cause → Fix |
|---|---|
| `git: command not found` | Git isn't installed or terminal opened before install → redo 1.2, reopen terminal |
| `Permission denied` / auth error on push | Not signed in → run `gh auth login`, or when Git prompts, use the browser sign-in |
| `error: remote origin already exists` | You ran `git remote add` twice → run `git remote set-url origin <url>` instead |
| Pushed but Pages shows 404 | Pages not enabled or still building → redo Part 5, wait 2 min, hard-refresh (Ctrl+Shift+R) |
| Site loads but looks unstyled | Opened `index.html` by double-clicking (file://) → styles work fine on the live URL; for local preview run `python3 -m http.server` in the folder and open `http://localhost:8000` |
| Repos tab says "Could not reach the GitHub API" | GitHub's public API limits ~60 requests/hour per IP → wait an hour; the page caches results and falls back automatically |
| Edited data.js and the site broke (blank page) | Almost always a missing comma/quote in your edit → on GitHub, open the file's **History**, click the previous version, restore it; then redo the edit carefully |
| Live site shows old content | Browser cache → hard-refresh (Ctrl+Shift+R / Cmd+Shift+R) |

---

## Part 9 — Mental model recap

- **Repo** = versioned folder on GitHub. **Push** = upload your changes.
- **Pages** = free switch that serves a repo as a website.
- **data.js** = the only file you routinely touch. **app.js** = engine, don't touch.
- **static-spa** = the mold. **technical-cv** = the first casting. Improve the
  mold and every future casting inherits it.
- Public repo means public files — review `data.js` before every push.
