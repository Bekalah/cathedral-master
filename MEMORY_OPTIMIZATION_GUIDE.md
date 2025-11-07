# 🧹 Memory Optimization Guide for Cathedral Development

## 🚨 IMMEDIATE MEMORY RELIEF (IDLE/LOW-INTENSITY)

### VS Code Memory Management
1. **Close Unused Tabs**
   - Right-click tab → "Close Others"  
   - Use `Cmd+Shift+W` (Mac) / `Ctrl+Shift+W` (Windows/Linux)
   - Close all `.ts` files except active working files

2. **Disable Extensions Temporarily**
   - `Cmd+Shift+P` → "Extensions: Show Disabled Extensions"
   - Re-enable: ESLint, Prettier only
   - Disable: GitLens, Power Mode, large file watchers

3. **Reduce Editor History**
   - `Cmd+Shift+P` → "Preferences: Open Settings (JSON)"
   - Add:
   ```json
   {
     "files.history.limit": 10,
     "search.historyLimit": 10,
     "timeline.pageSize": 20
   }
   ```

4. **Clear Unused Workspaces**
   - `Cmd+Shift+P` → "File: Close Folder"
   - Close any old cathedral branches

## 🏗️ SYSTEM-LEVEL CLEANUP

### macOS Memory Management
```bash
# Clear DNS cache
sudo dscacheutil -flushcache

# Clear font cache
sudo atsutil databases -remove

# Clear system caches
rm -rf ~/Library/Caches/*
rm -rf ~/Library/Application\ Support/Code/Cache/*

# Clear log files
rm -rf ~/Library/Logs/*
```

### Node.js Memory Optimization
```bash
# Clear npm cache
npm cache clean --force

# Clear pnpm cache  
pnpm store prune

# Clear build caches
rm -rf node_modules/.cache
rm -rf **/node_modules/.vite
rm -rf **/dist
rm -rf **/.next
```

## 🎯 CATHEDRAL-SPECIFIC OPTIMIZATION

### Temporary File Cleanup
```bash
# Remove Rust build artifacts (large memory users)
rm -rf rust-engines/target/debug/build/*
rm -rf rust-engines/target/debug/deps/*

# Clear Go build cache
rm -rf godot/project.godot-cpp.cache

# Remove temporary backups
rm -rf .backups/
rm -rf *~.backup
```

### Git Repository Optimization
```bash
# Compact repository (saves memory)
git gc --aggressive --prune=now

# Remove unreachable objects
git reflog expire --expire=now --all

# Clear submodule caches
git submodule foreach --recursive 'git clean -fdx'
```

## 🔧 VS CODE SETTINGS FOR LOW MEMORY

### Essential Settings Only
```json
{
  // Disable heavy features
  "editor.formatOnSave": false,
  "editor.suggest.showWords": false,
  "editor.minimap.enabled": false,
  
  // Reduce file watching
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/node_modules/**": true,
    "**/rust-engines/target/**": true
  },
  
  // Limit concurrent operations
  "search.maxResults": 50,
  "extensions.limit": 10,
  
  // Reduce memory usage
  "telemetry.telemetryLevel": "off",
  "update.showReleaseNotes": false,
  "workbench.editorAssociations": {},
  
  // Disable background tasks
  "typescript.preferences.includePackageJsonAutoImports": "off",
  "typescript.suggest.autoImports": false
}
```

## 📁 CATHEDRAL REPOSITORY CLEANUP

### High-Memory File Categories to Close
1. **Multiple React Apps** (open only 1 at a time)
   - Close: `apps/tarot-arena/`, `apps/synth-lab/`, `apps/test-ground/`
   - Keep Open: `apps/circuitum99/` (current focus)

2. **Rust Build Artifacts** (largest memory users)
   - Close: `rust-engines/target/` entirely
   - Use: `rust-engines/` for source only

3. **Documentation Trees** (index large datasets)
   - Close: `docs/archive/`, `docs/specs/`
   - Keep: `AGENTS.md`, `openspec/AGENTS.md`

4. **Data Directories** (massive JSON files)
   - Close: `data/fusion-kink-generated.json` (8,604 lines)
   - Keep: `data/mcp-permanent-dataset.json` (needed)

## ⚡ LOW-MEMORY WORKFLOW

### Development Sequence
1. **Start with 1 app**: `apps/circuitum99/`
2. **One package at a time**: `packages/unified-codex-extractor/`
3. **Close others**: Files not in current focus
4. **Use terminal focus**: Run commands, not full IDE features

### File Opening Strategy
```
Priority 1 (ALWAYS OPEN):
- External repositories extraction (current task)
- Active working file

Priority 2 (OPEN AS NEEDED):
- Your new AGENT_MEMORY_PERMANENT_RECORD.md
- Current package.json
- Current data file

Priority 3 (CLOSE):
- All other documentation
- Archive files
- Multiple app views
```

## 🎯 CATHEDRAL CONSOLIDATION PLAN

### Current Task: Extract & Consolidate
- [ ] `external/codex-144-99/` → Extract to `data/`
- [ ] `external/liber-arcanae/` → Merge with existing
- [ ] `external/imports/CathedralMonorepo-20251101/` → Archive
- [ ] Fix GitHub workflows (Node.js 20 standard)
- [ ] TypeScript errors in `living-canon-engine`

### Memory-Efficient Approach
1. **Work in terminal** for file operations
2. **Use `read_file`** tool instead of opening in VS Code
3. **Edit with `apply_diff`** without full file loading
4. **Batch operations** to minimize file opens

## 📊 MONITORING & PREVENTION

### Check Memory Usage
```bash
# Monitor VS Code memory
top -pid $(pgrep -f "Visual Studio Code")

# Check specific Cathedral memory
ps aux | grep -E "(code|node|pnpm)" | head -10

# Monitor disk usage
du -sh external/ docs/archive/ data/ | sort -hr
```

### Set Memory Limits
- **IDE Memory**: Keep under 4GB
- **Git Status**: Check with `git status --porcelain | wc -l`
- **Open Files**: Max 20 tabs in VS Code
- **Background Tasks**: Disable all except current build

## 🚀 QUICK RESTART PROTOCOL

### When Memory Hits 90%+
1. **Save all work** (Ctrl+S everywhere)
2. **Close VS Code completely**
3. **Run cleanup commands**:
   ```bash
   rm -rf node_modules/.vite
   rm -rf node_modules/.cache
   pnpm store prune
   ```
4. **Restart VS Code**
5. **Open only essential files**

### Emergency Memory Recovery
- **Terminal only**: Work in command line
- **Single file mode**: Edit one file at a time
- **Force garbage collection**: `node --expose-gc script.js`

## 🎯 BOTTOM LINE

**Your Cathedral** is massive and beautiful - but it needs memory management:

1. **Close everything except current task**
2. **Use terminal for file operations**  
3. **Work in batches** to minimize file opens
4. **Keep AGENT_MEMORY_PERMANENT_RECORD.md** - this prevents future memory waste on explanations
5. **Extract external repos systematically** while managing memory

**Memory Target**: Keep IDE under 3GB, Terminal over 1GB free