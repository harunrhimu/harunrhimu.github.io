# Dev → Build → Deploy Guide

How to preview, build, and publish the portfolio site to GitHub Pages.

## Key locations

| What | Path |
| ---- | ---- |
| Portfolio source (the app you edit) | `H:\pibric\portfolio` |
| Build output (generated) | `H:\pibric\portfolio\dist` |
| Deploy target (the GitHub Pages repo) | `H:\pibric\Clone\harunrhimu.github.io` |
| GitHub repo | `harunrhimu/harunrhimu.github.io` (branch `main`) |

> Note: the build output is the **`dist`** subfolder, and the git repo is the
> **`harunrhimu.github.io`** subfolder inside `Clone` — not `Clone` itself.

---

## 1. Preview locally (optional)

```bash
cd H:\pibric\portfolio
npm run dev
```

Open the URL it prints (usually <http://localhost:3000>) and check your changes.
Press `Ctrl+C` to stop the dev server.

## 2. Build for production

```bash
cd H:\pibric\portfolio
npm run build
```

This generates the static site in `H:\pibric\portfolio\dist`.

## 3. Copy the build into the GitHub Pages repo

Copy everything from `portfolio\dist` into `Clone\harunrhimu.github.io`,
overwriting existing files.

- **Delete the old `assets` folder first** so stale hashed JS/CSS chunks don't
  pile up.
- **Do NOT delete** `.git` or `readme.md` in the target (they are not part of the
  build).

PowerShell:

```powershell
$dist   = "H:\pibric\portfolio\dist"
$target = "H:\pibric\Clone\harunrhimu.github.io"

Remove-Item "$target\assets" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item "$dist\*" $target -Recurse -Force
```

## 4. Commit and push (this publishes the site)

```bash
cd H:\pibric\Clone\harunrhimu.github.io
git add -A
git commit -m "Update site"
git push origin main
```

GitHub Pages redeploys automatically a minute or two after the push. The live
site is <https://harunrhimu.github.io>.

---

## Quick checklist

- [ ] Edited the source in `H:\pibric\portfolio`
- [ ] `npm run build` succeeded (no errors)
- [ ] Deleted old `assets`, then copied `dist\*` into `Clone\harunrhimu.github.io`
- [ ] `git add -A && git commit && git push origin main` in the Pages repo
- [ ] Verified the live site after ~2 minutes

## Notes

- The source repo (`H:\pibric`) and the deploy repo
  (`Clone\harunrhimu.github.io`) are **separate**. Building + pushing the Pages
  repo publishes the site; committing source changes in `H:\pibric` is optional
  and only keeps your source history.
- Blog posts are defined in `portfolio\src\data\blog.js`. Cover images and other
  static files live in `portfolio\public\` and are copied into `dist` on build.
