# Portfolio Development Workflow Guide

A complete beginner-friendly guide to work with your portfolio project.

---

## 📁 Folder Structure - What Each Folder Does

```
portfolio/
├── src/                          ← EDIT HERE! Your actual source code
│   ├── components/               ← React components (Contact.jsx, Navbar.jsx, etc.)
│   ├── pages/                    ← Page components (HomePage.jsx, BlogPage.jsx, etc.)
│   ├── data/                     ← Your data files (services.js, skills.js, etc.)
│   ├── App.jsx                   ← Main app file
│   └── index.css                 ← Global styles
│
├── dist/                         ← AUTO-GENERATED! Ready for GitHub
│   ├── index.html                ← Built website
│   ├── assets/                   ← Bundled CSS & JS
│   └── images/                   ← Your images
│
├── package.json                  ← Project configuration
├── vite.config.js                ← Build settings
└── WORKFLOW_GUIDE.md             ← This file!
```

---

## 🔄 Three Main Commands - What to Do When

### 1️⃣ **DEVELOPMENT MODE** - Edit & See Changes Live
```bash
npm run dev
```

**When to use:** When editing your code and want to see changes instantly

**What happens:**
- Starts a local server at `http://localhost:3000/`
- Page refreshes automatically when you save files
- Perfect for testing and development

**How to use:**
1. Open PowerShell in your portfolio folder
2. Run: `npm run dev`
3. Open browser at `http://localhost:3000/`
4. Edit files in `src/` folder, changes appear instantly
5. Press `Ctrl + C` to stop

---

### 2️⃣ **BUILD** - Prepare Files for GitHub
```bash
npm run build
```

**When to use:** After you finished editing and ready to upload to GitHub

**What happens:**
- Converts your code into optimized files
- Creates the `dist/` folder with everything ready
- Minifies code for faster loading

**How to use:**
1. Open PowerShell in your portfolio folder
2. Run: `npm run build`
3. Wait for completion (takes a few seconds)
4. Your `dist/` folder is now ready for GitHub!

---

### 3️⃣ **PREVIEW** - Test Your Build Before Uploading
```bash
npm run preview
```

**When to use:** After building, to test if everything works like on GitHub

**What happens:**
- Serves your built `dist/` folder locally
- Shows you exactly how it will look on GitHub
- Helps catch errors before uploading

**How to use:**
1. Open PowerShell in your portfolio folder
2. Run: `npm run build` first
3. Then run: `npm run preview`
4. Open the URL shown (usually `http://localhost:4173/`)
5. Test all pages and links
6. Press `Ctrl + C` to stop

---

## ✏️ Complete Editing Workflow

### Step 1: Edit Your Code
```
Edit files in: src/components/, src/pages/, src/data/
Example: Edit Contact.jsx → save file
```

### Step 2: See Changes Live
```bash
npm run dev
```
- Open `http://localhost:3000/`
- See changes instantly in browser

### Step 3: Test Everything Works
```bash
npm run build
npm run preview
```
- Verify at `http://localhost:4173/`
- Test all navigation and features

### Step 4: Upload to GitHub
1. Go to `https://github.com/harunrhimu/harunrhimu.github.io`
2. Click **"Add file"** → **"Upload files"**
3. Select ALL files from your **`dist/`** folder
4. Upload and commit
5. Wait 2-3 minutes
6. Visit `https://harunrhimu.github.io/` to see your live website!

---

## 🚀 Quick Reference

| Task | Command | What to Edit |
|------|---------|--------------|
| See changes live | `npm run dev` | `src/` folder |
| Make site ready | `npm run build` | Nothing - auto-generated |
| Test before upload | `npm run preview` | Nothing - just view |
| Upload to GitHub | Manual upload | Files from `dist/` folder |

---

## 📝 Common Tasks

### I want to change my hero section
```
Edit: src/components/Hero.jsx
Test: npm run dev
Deploy: npm run build → upload dist/ folder
```

### I want to add a new skill
```
Edit: src/data/skills.js
Test: npm run dev
Deploy: npm run build → upload dist/ folder
```

### I want to update my about text
```
Edit: src/components/About.jsx
Test: npm run dev
Deploy: npm run build → upload dist/ folder
```

---

## ⚠️ Important Rules

❌ **DON'T edit files in `dist/` folder** - They get deleted when you rebuild

✅ **DO edit files in `src/` folder** - This is your actual code

❌ **DON'T forget to run `npm run build`** - Before uploading to GitHub

✅ **DO use `npm run preview`** - To test before uploading

---

## 🆘 If Something Breaks

1. Stop the server (Ctrl + C)
2. Run: `npm run dev` again
3. Check for error messages in terminal
4. Check your edited files for typos

Or ask for help! 💪

---

**You're all set! Start with `npm run dev` and happy coding!** 🎉
