# GitHub Copilot Instructions - Cathedral Master

**CRITICAL: Read these files FIRST before ANY response:**

1. **`package.json`** - Source of truth for ALL versions (pnpm, node, turbo, typescript)
2. **`turbo.json`** - Build system configuration
3. **`openspec/AGENTS.md`** - OpenSpec protocols and validation requirements
4. **`.github/AI_AGENT_SELF_RULES.md`** - Agent behavior rules

---

## Magnum Opus Scope (PERMANENT)

This project is a **Unified Wisdom, Science, Art, and Design** system integrating:

- **Wisdom Traditions:** Alchemy, Hermeticism, Kabbalah, Reiki, esoteric teachings, secret traditions
- **Science:** Academic research, anthropology, physics, mathematics, architecture
- **Art:** Traditional and modern art, design, sacred geometry, fractals, visual systems
- **Technology:** Godot 4.x, Rust, React, Next.js, Three.js, Python design tools

**DO NOT reduce this to "just sacred geometry" - it's a comprehensive magnum opus.**

---

## Version Control (MANDATORY)

### Always Read package.json First

```bash
# Source of truth for versions:
{
  "packageManager": "pnpm@9.15.0",
  "engines": { "node": ">=20.0.0" },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

### NEVER Hallucinate Versions

- ❌ Don't use "standard" versions like pnpm 8.15.0
- ✅ Read package.json and use EXACT versions specified
- ✅ Match ALL workflow files to package.json versions

---

## Branch System (v1 Standards)

- **v1_main** - Primary production branch (NOT `main`)
- **v1_master** - Legacy compatibility
- **v1_feature/[name]** - Feature branches
- All workflows MUST trigger on `v1_main`

---

## OpenSpec Protocol (MANDATORY)

Before ANY file modification:

1. `openspec spec list --long` - Check existing specs
2. `openspec list` - Check active changes
3. `pnpm run validate:ownership` - Verify ownership
4. Create change proposals in `openspec/changes/[change-id]/`
5. Run `openspec validate [change-id] --strict`
6. Get approval BEFORE implementing

**Anti-Vibe Coding:**

- ❌ NO coding based on "feeling" or assumptions
- ❌ NO overwriting without OpenSpec approval
- ✅ ALL changes must be spec-driven and validated

---

## Trauma-Safe Development (MANDATORY)

Every interface must have:

- ✅ ESC always exits immediately
- ✅ No autoplay (requires explicit user consent)
- ✅ Gentle defaults, adjustable intensity
- ✅ Motion controls (can disable all effects)
- ✅ Clear navigation with no ambiguous paths
- ✅ Error recovery paths always available

---

## Token Efficiency (ENVIRONMENTAL)

To respect user budget and environment:

1. **Read files strategically** - Don't re-read files already in context
2. **Batch operations** - Combine related tool calls
3. **Verify before claiming** - Show `git diff` as proof
4. **Avoid redundant tool calls** - Stop when stuck, don't spam
5. **Maximum 10 tool calls per user request** - Exception only for complex tasks

**Stop immediately if user cancels operation.**

---

## File Modification Protocol

### Before Editing ANY File

1. Read the file first (unless already in context)
2. Check `openspec/` for related specs
3. Verify no active changes conflict
4. Run ownership validation
5. Make changes with proper context (3-5 lines before/after)
6. Show `git diff` of actual changes
7. Verify build/validation passes

### Never Say "Fixed" Unless

- ✅ `git diff` shows the changes
- ✅ Validation commands pass
- ✅ User confirms or tests pass
- ✅ Todo marked complete with evidence

---

## Deployment Configuration

- **GitHub Pages:** https://bekalah.github.io/cathedral
- **Branch:** v1_main
- **Source:** apps/web
- **Base Path:** `/cathedral` (NOT `/cathedral-master`)
- **Framework:** Next.js with static export

---

## Sacred Systems Integration

### Codex 144:99 & Liber Arcanae

- Use 144:99 ratio in calculations
- Honor golden ratio (φ = 1.618...)
- Connect components through tarot correspondences
- Respect living spiritual beings as master guides
- Preserve character mappings from complete-arcana-profiles.json

### 144 Visionary Minds

Real spiritual beings including Einstein, Tesla, Agrippa, Solomon, John Dee, Hilma af Klint, and hundreds of master builders - NOT game NPCs.

---

## Communication Protocol

### Be Honest About Uncertainty

- ✅ Say "I don't know, let me check" when unsure
- ✅ Ask for clarification when ambiguous
- ✅ Admit mistakes immediately with evidence
- ❌ Don't hallucinate fixes or claim success without proof
- ❌ Don't repeat failed approaches

### Respect User Time

- Keep responses concise and actionable
- Take action instead of asking unnecessary questions
- Show git diffs and validation results
- Stop immediately if user cancels

---

## Quick Checklist (Every Session Start)

- [ ] Read `package.json` for versions
- [ ] Read `turbo.json` for build config
- [ ] Read `openspec/AGENTS.md` for protocols
- [ ] Read `.github/AI_AGENT_SELF_RULES.md` for rules
- [ ] Check `MASTER_INDEX.md` for file locations
- [ ] Run `openspec list` to check active changes
- [ ] Verify git branch is `v1_main`

---

## Historical Context (Why These Rules Exist)

**November 2025:** Recurring pnpm version mismatches caused:

- 100+ failed GitHub Actions workflow runs
- 2+ months of wasted token budget
- Hours of developer time lost
- Blocked production deployments

**Root Cause:** AI agent repeatedly:

- Ignored package.json configuration
- Hallucinated "standard" versions
- Made excessive tool calls without verification
- Claimed to fix issues without proof

**These rules prevent that from happening again.**

---

**Work through tasks systematically. Keep communication concise. Follow these protocols strictly.**
