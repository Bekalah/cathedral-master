# AI AGENT SELF-RULES FOR CATHEDRAL MASTER

**Created:** November 6, 2025  
**Status:** MANDATORY - Must be read at session start

---

## CRITICAL: ALWAYS DO FIRST

1. **Read package.json** - Get exact versions of pnpm, turbo, node
2. **Read turbo.json** - Understand build system configuration
3. **Read openspec/AGENTS.md** - Follow OpenSpec protocols
4. **Check MASTER_INDEX.md** - Find authoritative file locations
5. **Run `openspec list`** - Check active changes

---

## VERSION MANAGEMENT RULES

### Source of Truth: package.json

```json
{
  "packageManager": "pnpm@9.15.0",
  "engines": {
    "node": ">=20.0.0"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

### MANDATORY VERSION CHECKS

Before suggesting ANY version:

1. Read `package.json` `packageManager` field
2. Read `package.json` `engines` field
3. Read `package.json` `devDependencies`
4. Use EXACT versions from these fields
5. NEVER hallucinate "standard" versions

### Workflow File Rule

**ALL GitHub Actions workflows MUST match package.json:**

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 9.15.0 # MUST match package.json packageManager
```

---

## OPENSPEC PROTOCOL (MANDATORY)

### Anti-Vibe Coding Rules

- ❌ NO vibe coding (no "feeling" based changes)
- ❌ NO overwriting without OpenSpec approval
- ❌ NO assumptions without validation
- ❌ NO shortcuts bypassing validation

### Required Validation Sequence

Before ANY file modification:

1. `openspec spec list --long` - Check existing specs
2. `openspec list` - Check active changes
3. `pnpm run validate:ownership` - Verify ownership
4. `pnpm run validate:sacred-math` - Check geometry
5. `pnpm run validate:trauma-safety` - Check safety
6. `pnpm run validate:integration` - Check compatibility

### Change Proposal Process

When user requests feature/change:

1. Check if capability exists: `openspec show [capability]`
2. Create change proposal in `openspec/changes/[change-id]/`
3. Write `proposal.md`, `tasks.md`, `design.md` (if needed)
4. Create spec deltas with proper format
5. Run `openspec validate [change-id] --strict`
6. Get approval BEFORE implementing

---

## TRAUMA-SAFE DEVELOPMENT (MANDATORY)

Every interface must have:

- ✅ ESC always exits
- ✅ No autoplay (requires user consent)
- ✅ Gentle defaults
- ✅ Motion controls (can disable all effects)
- ✅ Clear navigation (no ambiguous paths)
- ✅ Error recovery paths

---

## REPOSITORY STRUCTURE RULES

### Monorepo Organization

```
cathedral-master/
├── apps/              # Applications (Next.js, React, etc.)
├── packages/          # Shared packages
├── godot/             # Godot game project (UNIFIED - no godot-project/)
├── design-suite/      # Python design tools
├── hall-of-mysteries/ # Python Frater Achad system
├── openspec/          # OpenSpec system
│   ├── specs/         # Current truth
│   └── changes/       # Proposals
├── turbo.json         # Turbo build config
├── package.json       # Root package (source of truth for versions)
└── pnpm-workspace.yaml # Workspace config
```

### Branch System (v1 Standards)

- **v1_main** - Primary production branch (NOT main)
- **v1_master** - Legacy compatibility branch
- **v1_feature/[name]** - Feature branches
- **v1_hotfix/[issue]** - Critical fixes

ALL workflows must trigger on `v1_main`, NOT `main`.

---

## TOKEN USAGE RULES (ENVIRONMENTAL)

### Efficiency Mandates

To respect user token budget and environmental impact:

1. **Read files strategically** - Don't re-read files already in context
2. **Batch operations** - Combine related tool calls
3. **Verify before claiming** - Don't say "fixed" without git diff proof
4. **Avoid redundant searches** - Use context first, tools second
5. **Stop when stuck** - Don't spam tool calls hoping for success

### Wasteful Patterns to AVOID

❌ Reading the same file multiple times in one session  
❌ Running commands without checking previous outputs  
❌ Claiming to fix issues without verification  
❌ Making excessive tool calls (>10 per user request)  
❌ Re-doing work already completed in conversation history

---

## DEPLOYMENT RULES

### Primary Deployment: GitHub Pages

- **URL:** https://bekalah.github.io/cathedral
- **Branch:** v1_main
- **Source:** apps/web
- **Framework:** Next.js with static export

### Environment Variables

```yaml
NEXT_PUBLIC_BASE_PATH: /cathedral # NOT /cathedral-master
```

### Workflow Requirements

All workflows MUST:

- Trigger on `v1_main` branch
- Use pnpm 9.15.0
- Use Node.js >=20.0.0
- Include `github-pages` environment for deploy jobs

---

## FILE MODIFICATION PROTOCOL

### Before Editing ANY File

1. Read the file first (unless already in context)
2. Check `openspec/` for related specs
3. Verify no active changes conflict
4. Run ownership validation
5. Make changes with proper context (3-5 lines before/after)
6. Show git diff of actual changes
7. Verify build still passes

### Never Modify Without Context

Always use `replace_string_in_file` with:

- **oldString:** Exact text with 3-5 lines context
- **newString:** Exact replacement text
- **filePath:** Absolute path

---

## VERIFICATION RULES

### After Any "Fix"

1. Show git diff of what actually changed
2. Run relevant validation (build, lint, test)
3. Confirm with user before claiming success
4. Update todo list to reflect completion

### Never Claim Fixed Unless

- ✅ Git diff shows the changes
- ✅ Validation passes
- ✅ User confirms or tests pass
- ✅ Todo marked complete with evidence

---

## SACRED GEOMETRY & CODEX RULES

### Codex 144:99 System

- Use 144:99 ratio in calculations
- Honor golden ratio (φ = 1.618...)
- Respect sacred mathematics
- Follow divine proportions

### Liber Arcanae Integration

- Connect all components through tarot correspondences
- Respect living spiritual beings as master guides
- Preserve character mappings from complete-arcana-profiles.json
- Honor John Dee, Rebecca Respawn, Leonora Carrington lineages

---

## COMMUNICATION RULES

### Be Honest About Uncertainty

- ✅ Say "I don't know" when unsure
- ✅ Ask for clarification when ambiguous
- ✅ Admit mistakes immediately
- ❌ Don't hallucinate fixes
- ❌ Don't claim success without proof

### Respect User Time

- Keep responses concise
- Take action instead of asking unnecessary questions
- Stop immediately if user cancels operation
- Don't repeat failed approaches

---

## QUICK CHECKLIST (Start of Every Session)

- [ ] Read package.json for versions
- [ ] Read turbo.json for build config
- [ ] Read openspec/AGENTS.md for protocols
- [ ] Check MASTER_INDEX.md for file locations
- [ ] Run `openspec list` to check active changes
- [ ] Verify git branch is v1_main
- [ ] Check workflow files match package.json versions

---

## RECOVERY FROM MISTAKES

If you realize you made an error:

1. **Stop immediately** - Don't compound the mistake
2. **Acknowledge** - Tell user what went wrong
3. **Show evidence** - Git diff of the problem
4. **Fix properly** - Follow all protocols
5. **Verify** - Prove the fix works
6. **Document** - Add to incident report if major

---

## ENVIRONMENTAL COMMITMENT

This project prioritizes:

- **Efficiency** - Minimal token usage
- **Sustainability** - No wasteful "vibe coding"
- **Ethical AI** - Respect for resources
- **User Budget** - No excessive tool calls

Every token used should provide value. Every tool call should have purpose.

---

**END OF SELF-RULES**

**Remember:** These rules exist because recurring failures cost the user 2+ months of token budget and 100+ failed workflows. Follow them strictly.
