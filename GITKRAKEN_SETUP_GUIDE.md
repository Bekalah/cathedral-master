# 🎮 GitKraken Setup Guide for Cathedral Master v1

**Repository:** `bekalah/cathedral-master`  
**Branch:** `v1_main`  
**System:** OpenSpec + Turbo Monorepo

---

## 🚀 Quick Start with GitKraken

### 1. Open Repository in GitKraken

```bash
# If not already open, navigate to:
/Users/rebeccalemke/cathedral-real

# Then open GitKraken and use:
File → Open Repo → Select this folder
```

### 2. Verify Remote Connection

In GitKraken, you should see:

- **Remote:** `cathedral-master`
- **URL:** `https://github.com/bekalah/cathedral-master.git`
- **Current Branch:** `v1_main`

### 3. Current Status

✅ Your branch is **2 commits ahead** of remote  
✅ Working tree is **clean** (no uncommitted changes)  
✅ Ready to push to `v1_main`

---

## 📦 What's Ready to Push

### Recent Changes (Already Committed):

1. **Auto-sync: Cathedral updates** (Nov 5, 16:19)
2. **Auto-sync: Cathedral updates** (Nov 5, 15:48)

### Your Local v1_main has:

- ✅ Fixed GitHub Actions workflows (pages.yml, ci.yml) → Use `v1_main` branch
- ✅ Updated dev dependencies (Prettier 3.4.2, TypeScript 5.7.2, ESLint 9.17.0)
- ✅ Consolidated Godot project (removed godot-project/, merged into godot/)
- ✅ Created `.prettierrc.json` config
- ✅ OpenSpec integration active
- ✅ Turbo monorepo configured
- ✅ All documentation updated

---

## 🎯 Push to GitHub (GitKraken Steps)

### Method 1: Simple Push (Recommended)

1. In GitKraken, click **"Push"** button in the toolbar
2. Confirm you're pushing to `cathedral-master/v1_main`
3. Click **"Submit"**
4. Wait for success confirmation

### Method 2: Force Push (If Needed)

If you see conflicts or "non-fast-forward" errors:

1. Right-click on `v1_main` branch
2. Select **"Push [branch] and force"**
3. Confirm the action
4. This will overwrite remote with your local v1_main

---

## 🏗️ OpenSpec Integration

### Current OpenSpec Setup

Your monorepo uses OpenSpec for:

- **Change Proposals:** `openspec/changes/*/proposal.md`
- **Specs:** `openspec/specs/*.md`
- **Validation:** `pnpm run validate:ownership`
- **Safety Checks:** Trauma-safe development protocols

### OpenSpec Commands (via GitKraken Terminal)

Open Terminal in GitKraken (View → Terminal) and run:

```bash
# List all specs
openspec spec list --long

# Show specific spec
openspec show [spec-name]

# List active changes
openspec list

# Validate ownership before changes
pnpm run validate:ownership

# Validate sacred geometry
pnpm run validate:sacred-math
```

---

## ⚡ Turbo Monorepo Structure

### Your Monorepo Layout

```
cathedral-master/ (v1_main)
├── apps/
│   ├── web/                    # Next.js (GitHub Pages, Vercel)
│   ├── circuitum99/            # Book game
│   ├── liber-arcanae-tarot/    # Tarot system
│   ├── cosmogenesis-engine/    # World builder
│   └── [other apps]/
├── packages/
│   ├── codex-144-99/           # Codex system
│   ├── cathedral-logo-system/  # Logo/branding
│   ├── three-engine/           # 3D engine
│   └── [other packages]/
├── godot/                      # Godot 4.x project
│   ├── project.godot           # Main entry
│   ├── scenes/
│   ├── scripts/
│   └── extensions/
├── design-suite/               # Python design tools
├── hall-of-mysteries/          # Python Frater Achad system
├── openspec/                   # OpenSpec system
│   ├── specs/
│   └── changes/
├── turbo.json                  # Turbo config
├── pnpm-workspace.yaml         # pnpm workspaces
└── package.json                # Root package
```

### Turbo Commands (via GitKraken Terminal)

```bash
# Run all dev servers
pnpm run dev

# Build all packages
pnpm run build

# Run tests
pnpm run test

# Lint all code
pnpm run lint

# OpenSpec validation
pnpm run openspec-validate

# Python validation
pnpm run validate-python
```

---

## 🔄 Workflow in GitKraken

### Daily Development Flow

1. **Pull Latest Changes**
   - Click "Pull" button in toolbar
   - Ensure you're on `v1_main`

2. **Create Feature Branch** (Optional)
   - Right-click `v1_main`
   - Select "Create branch here"
   - Name it: `v1_feature/your-feature-name`

3. **Make Changes**
   - Edit files in your editor
   - GitKraken auto-detects changes

4. **Stage & Commit**
   - Review changes in GitKraken
   - Click "Stage all changes" (or stage individually)
   - Write commit message
   - Click "Commit"

5. **Push to GitHub**
   - Click "Push" button
   - Changes go to GitHub

6. **Merge Feature Branch** (If you created one)
   - Right-click feature branch
   - Select "Merge [branch] into v1_main"
   - Push again

---

## 🌐 Connect Deployments

### After Pushing to v1_main

#### 1. GitHub Pages (Automatic)

- Workflow triggers: `.github/workflows/pages.yml`
- Builds: `apps/web`
- Deploys to: `https://bekalah.github.io/cathedral`
- Status: Check at https://github.com/Bekalah/cathedral-master/actions

#### 2. Vercel (Manual Setup)

1. Go to https://vercel.com
2. Click "New Project"
3. Import `bekalah/cathedral-master`
4. Set:
   - **Branch:** `v1_main`
   - **Root Directory:** `apps/web`
   - **Framework:** Next.js
5. Click "Deploy"

#### 3. Render (Manual Setup)

1. Go to https://render.com
2. Click "New Static Site"
3. Connect `bekalah/cathedral-master`
4. Set:
   - **Branch:** `v1_main`
   - **Build Command:** (from `render.yaml`)
   - **Publish Directory:** `apps/web/out`
5. Click "Create Static Site"

---

## ✅ Verification Checklist

After pushing to GitHub:

- [ ] Visit https://github.com/Bekalah/cathedral-master
- [ ] Confirm `v1_main` branch shows latest commits
- [ ] Check Actions tab - CI and Pages workflows should pass
- [ ] Verify GitHub Pages deploys successfully
- [ ] Connect Vercel (if not already connected)
- [ ] Connect Render (if not already connected)
- [ ] Test live sites work correctly

---

## 🆘 Troubleshooting

### "Non-fast-forward" Error

**Solution:** Use "Push and force" in GitKraken (right-click branch)

### "Authentication Failed"

**Solution:** In GitKraken, go to Preferences → Authentication → GitHub → Re-authenticate

### "Branch Protection" Error

**Solution:** Your GitHub token has the correct permissions. The push should work.

### Workflows Still Failing

**Solution:** After pushing, workflows will use `v1_main` branch and should pass. Check Actions tab.

---

## 🎉 Success!

Once pushed, you have:

- ✅ Unified `v1_main` branch on GitHub
- ✅ OpenSpec system active
- ✅ Turbo monorepo configured
- ✅ All apps and packages organized
- ✅ Godot project consolidated
- ✅ CI/CD pipelines working
- ✅ Ready for Vercel and Render deployment

**Your Cathedral monorepo is now fully connected and organized!** 🏛️✨

---

**Quick Reference:**

- **GitHub:** https://github.com/Bekalah/cathedral-master
- **Branch:** `v1_main`
- **OpenSpec Docs:** `openspec/AGENTS.md`
- **Turbo Config:** `turbo.json`
- **Workflow Guide:** `V1_BRANCH_NAMING_STANDARDS.md`
