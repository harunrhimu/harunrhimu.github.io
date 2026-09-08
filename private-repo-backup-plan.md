# Plan: Back up `H:\pibric` as a Private GitHub Repo

Goal: keep the **entire `H:\pibric` workspace** safe in a **private** GitHub repo
(source backup), completely separate from the **public** site
(`harunrhimu.github.io`). The public site keeps deploying as it does today.

---

## What's wrong right now (must fix)

1. **`H:\pibric`'s `origin` points to the PUBLIC repo**
   (`https://github.com/harunrhimu/harunrhimu.github.io.git`).
   ⚠️ A stray `git push` here could dump the whole workspace onto the public
   site. We will repoint this.
2. **`node_modules` is committed** — 3,735 of ~3,851 tracked files are
   node_modules. Must be untracked (bloat).
3. **`portfolio/dist` (build output)** and the nested **`Clone/`** deploy repo
   are tracked too — both should be excluded from a source backup.

Facts captured: branch = `migrate/nextjs`; no `.gitignore`; no submodules;
`Clone/harunrhimu.github.io` is a nested git repo; `gh` CLI is NOT installed.

---

## Step 1 — Create the empty private repo (do this in the browser)

- Go to **https://github.com/new**
- Name: e.g. `pibric` or `pibric-source`
- Visibility: **Private**
- Do **NOT** add a README / .gitignore / license (keep it empty)
- Create, then copy the URL, e.g. `https://github.com/harunrhimu/pibric.git`

(No `gh` CLI is installed locally, so the repo must be created via the website —
or install GitHub CLI first.)

## Step 2 — Clean up the local repo (safe; nothing deleted from disk)

1. Add `.gitignore` at `H:\pibric\.gitignore`:

   ```gitignore
   node_modules/
   portfolio/dist/
   Clone/
   *.log
   .env
   .DS_Store
   ```

2. Untrack the bloat (files stay on disk; `--cached` only updates Git's index):

   ```bash
   git rm -r --cached portfolio/node_modules portfolio/portfolio-next/node_modules portfolio/dist Clone
   ```

3. Repoint the remote so the private repo is the target, and the public link is
   moved out of the way:

   ```bash
   git remote rename origin pages-public
   git remote add origin <YOUR_PRIVATE_URL>
   ```

4. Commit:

   ```bash
   git add -A
   git commit -m "Private source backup of pibric workspace"
   ```

## Step 3 — Push (uses existing cached GitHub login)

```bash
git push -u origin migrate/nextjs
```

Currently on branch `migrate/nextjs`. Optional: rename to `main` first if you
want that as the default branch:

```bash
git branch -m migrate/nextjs main
git push -u origin main
```

---

## Result

- `H:\pibric` backed up privately on GitHub, **without** node_modules / dist /
  Clone bloat.
- **Public site untouched** — it still deploys from
  `Clone/harunrhimu.github.io` (that folder has its own separate git repo).
- The two repos stay independent.

## Open decisions for later

- [ ] Private repo name (`pibric` vs `pibric-source` vs other)
- [ ] Keep branch `migrate/nextjs` or rename to `main`
- [ ] Include the stray root files? (`Gemini_Generated_Image_*.png`,
      `haruns_task.md`) — they'd be included by `git add -A` unless ignored.

## Notes

- `git rm --cached` does NOT delete your local files — it only stops Git from
  tracking them.
- The Obsidian vault at `G:\...\vaults\pibric` is **outside** `H:\pibric`, so it
  is not part of this backup.
- After setup, day-to-day backup is just: `git add -A && git commit -m "..." &&
  git push`.
