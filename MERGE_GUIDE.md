# 🔀 Merge Guide: Replit Updates + Azure Desktop Work

## Overview
This guide helps you safely merge:
- **My Replit Work:** OpenSpec Magnum Opus v1.0 (professional monorepo)
- **Your Azure Work:** Desktop changes from Azure agents
- **Your Local Work:** `/Users/rebeccalemke/main`

---

## 📋 Pre-Merge Checklist

### Step 1: Backup Your Work
```bash
cd /Users/rebeccalemke/main
git branch backup-before-merge
git checkout backup-before-merge
git checkout main  # Back to main
```

### Step 2: Understand What Changed

#### My Replit Changes (on GitHub):
- ✅ `package.json` → Renamed to `@openspec/magnum-opus`
- ✅ `turbo.json` → Updated to use `tasks` (Turbo 2.x)
- ✅ `.github/workflows/deploy.yml` → GitHub Actions deployment
- ✅ `packages/web-platform/src/shared/cymatics-bridge.js` → NEW FILE
- ✅ `packages/web-platform/vite.config.js` → Host config
- ✅ `replit.md` → Updated status to v1.0
- ✅ Removed temporary `.mjs` scripts
- ✅ Rust: `rust-engines/Cargo.toml` (workspace config)
- ✅ Godot: `godot-cathedral/project.godot` (4.4 config)

#### Your Desktop Changes (if any):
- 🤔 Python design suite (`design_suite_smoketest.py`?)
- 🤔 Next.js static export (`apps/web/out`?)
- 🤔 Additional engines or data files?
- 🤔 Local Godot HTML5 export?
- 🤔 Rust code changes?

---

## 🔀 Safe Merge Process

### Step 1: Fetch My Updates
```bash
cd /Users/rebeccalemke/main

# Add my remote (if not already added)
git remote add replit-cathedral https://github.com/Bekalah/cathedral-master.git

# Fetch my changes
git fetch replit-cathedral
```

### Step 2: Review Differences
```bash
# See what I changed that might conflict with your work
git diff main..replit-cathedral/main

# Focus on critical areas:
git diff main..replit-cathedral/main -- package.json
git diff main..replit-cathedral/main -- turbo.json
git diff main..replit-cathedral/main -- rust-engines/
git diff main..replit-cathedral/main -- godot-cathedral/
```

### Step 3: Merge Strategy (Choose One)

#### Option A: Keep My Structure, Add Your Features
```bash
# Merge my changes into yours
git merge replit-cathedral/main

# If conflicts, resolve manually
# Then:
git add .
git commit -m "Merge: OpenSpec Magnum Opus v1.0 + Azure desktop work"
```

#### Option B: Cherry-Pick Specific Files
```bash
# Pick only the files you want from my work
git checkout replit-cathedral/main -- package.json
git checkout replit-cathedral/main -- turbo.json
git checkout replit-cathedral/main -- .github/workflows/deploy.yml
git checkout replit-cathedral/main -- packages/web-platform/src/shared/cymatics-bridge.js

git commit -m "Cherry-pick OpenSpec Magnum Opus v1.0 updates"
```

---

## 🔧 Critical Compatibility Areas

### 1. Rust Workspace (`rust-engines/`)

#### My Configuration:
```toml
[workspace]
resolver = "2"
members = [
    "cathedral-core",
    "cathedral-types",
    "fusion-kink",
    "harmonic-lab",
    "codex-registry",
]

[workspace.package]
version = "1.0.0"
edition = "2021"

[workspace.dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
glam = "0.27"
godot = "0.1"  # GDExtension (Godot 4.x)
kira = "0.9"   # Audio synthesis
rusqlite = { version = "0.31", features = ["bundled"] }
```

#### ⚠️ Potential Conflicts:
- If Azure added different Rust crates, merge `[workspace.dependencies]`
- If Azure changed Godot bindings (GDNative vs GDExtension), **keep GDExtension** for Godot 4.4
- Check `edition = "2021"` is consistent across all crates

#### ✅ Post-Merge Validation:
```bash
cd rust-engines
cargo check --workspace
cargo build --workspace --release
cargo test --workspace
```

---

### 2. Godot Project (`godot-cathedral/`)

#### My Configuration:
```ini
config_version=5

[application]
config/name="Cathedral of Circuits - Immersive Explorer"
run/main_scene="res://scenes/main_cathedral.tscn"
config/features=PackedStringArray("4.4", "Forward Plus")

[rendering]
renderer/rendering_method="forward_plus"
anti_aliasing/quality/msaa_3d=2
anti_aliasing/quality/screen_space_aa=1
```

#### ⚠️ Potential Conflicts:
- If Azure exported HTML5, check `export/` directory
- If Azure changed renderer to `mobile` or `gl_compatibility`, **keep `forward_plus`** for best quality
- Check scene paths (`res://scenes/main_cathedral.tscn`)

#### ✅ Post-Merge Validation:
```bash
# Open in Godot 4.4
godot --path godot-cathedral --editor

# Or run directly
godot --path godot-cathedral
```

---

### 3. Python Scripts

#### My Setup:
- ❌ No Python files in my Replit work (Rust handles data processing)

#### Your Azure Setup (from context):
- ✅ `design_suite_smoketest.py` (modular design suite)
- ✅ `achad_integration_smoketest.py` (integration tests)
- ✅ Python-based tools?

#### ⚠️ Potential Conflicts:
- **None expected** - I didn't touch Python
- If Azure added Python dependencies, add to root `requirements.txt` or use `uv`

#### ✅ Post-Merge Validation:
```bash
# If using uv:
uv pip install -r requirements.txt
python design_suite_smoketest.py
python achad_integration_smoketest.py

# Or traditional:
pip install -r requirements.txt
python design_suite_smoketest.py
```

---

### 4. Node.js / TurboRepo

#### My Configuration:
```json
{
  "name": "@openspec/magnum-opus",
  "version": "1.0.0",
  "workspaces": ["packages/*", "apps/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build"
  }
}
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "target/**", ".godot/**"]
    }
  }
}
```

#### ⚠️ Potential Conflicts:
- If Azure changed package name from `@openspec/magnum-opus`, decide which to keep
- If Azure added `apps/web` (Next.js), ensure it's in `workspaces`
- If Azure added different npm scripts, merge them

#### ✅ Post-Merge Validation:
```bash
npm install
npm run build
npm run dev  # Test development mode
```

---

## 🎯 Merge Conflict Resolution

### Common Conflicts & How to Resolve

#### 1. `package.json` Name Conflict
```json
<<<<<<< HEAD (Your Azure Work)
  "name": "cathedral-real",
=======
  "name": "@openspec/magnum-opus",
>>>>>>> replit-cathedral/main (My Replit Work)
```

**Resolution:** Choose `@openspec/magnum-opus` (professional namespace)

---

#### 2. `turbo.json` Syntax Conflict
```json
<<<<<<< HEAD
  "pipeline": {
=======
  "tasks": {
>>>>>>> replit-cathedral/main
```

**Resolution:** Use `"tasks"` (Turbo 2.x standard)

---

#### 3. New Files from Both Sides
- **My side:** `packages/web-platform/src/shared/cymatics-bridge.js`
- **Your side:** `apps/web/out/index.html` (Next.js export)

**Resolution:** Keep both! No conflict.

---

## ✅ Post-Merge Validation Checklist

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Everything
```bash
# Node.js workspace
npm run build

# Rust workspace
cd rust-engines
cargo build --workspace --release
cd ..

# Python (if applicable)
python design_suite_smoketest.py
```

### 3. Run Tests
```bash
# TurboRepo tests
npm run test

# Rust tests
cd rust-engines
cargo test --workspace
cd ..

# Python tests (if applicable)
python achad_integration_smoketest.py
```

### 4. Start Development Server
```bash
npm run dev
# Should start on http://localhost:5000
```

### 5. Check Godot Integration
```bash
godot --path godot-cathedral
# Verify scenes load correctly
```

---

## 🚨 If Something Breaks

### Rust Won't Compile
```bash
cd rust-engines
cargo clean
cargo update
cargo build --workspace
```

### Godot Won't Open
- Check `godot-cathedral/project.godot` has `config_version=5`
- Ensure Godot 4.4 is installed (not 3.x)
- Run: `godot --editor --path godot-cathedral`

### Node.js Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build --workspace=packages/web-platform
```

### Python Import Errors
```bash
pip install --upgrade -r requirements.txt
# Or with uv:
uv pip sync requirements.txt
```

---

## 📊 Final Structure Should Look Like

```
cathedral-master/
├── .github/
│   └── workflows/
│       └── deploy.yml          ✅ My addition
├── apps/                        🤔 Your desktop work?
│   └── web/                     🤔 Next.js app?
├── godot-cathedral/             ✅ My Godot 4.4 config
├── packages/
│   ├── bevy-apps/               ✅ Existing
│   ├── godot-projects/          ✅ Existing
│   ├── shared-rust-core/        ✅ Existing
│   └── web-platform/            ✅ My cymatics-bridge.js added
├── rust-engines/                ✅ My Cargo.toml workspace
├── design_suite_smoketest.py    🤔 Your Python work?
├── package.json                 ✅ @openspec/magnum-opus
├── turbo.json                   ✅ "tasks" (Turbo 2.x)
└── replit.md                    ✅ Updated to v1.0
```

---

## 🎉 Success Criteria

After merge, you should have:
- ✅ `@openspec/magnum-opus` v1.0 branding
- ✅ TurboRepo 2.x configuration
- ✅ GitHub Actions auto-deployment
- ✅ Rust workspace compiles
- ✅ Godot 4.4 project opens
- ✅ Python scripts run (if applicable)
- ✅ Web platform builds successfully
- ✅ Development server runs on port 5000

---

## 🆘 Need Help?

If you get stuck:
1. Check `git status` to see conflicted files
2. Use `git diff` to see what changed
3. Run validation commands above
4. Create a new branch to test: `git checkout -b test-merge`

**Remember:** You have a backup at `backup-before-merge` branch!

```bash
# To restore backup if needed:
git checkout main
git reset --hard backup-before-merge
```
