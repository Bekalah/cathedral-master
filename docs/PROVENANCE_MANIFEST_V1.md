# Provenance Manifest v1 — Cathedral Monorepo (Turborepo, OpenSpec, Vite/React/Three)

Date: 2025-10-30
Canonical root: cathedral-real/

This manifest records the authoritative locations for code and docs after recent workspace fragmentation. Use this as the single source of truth for merges and future cleanup.

## Canonical directories (authoritative)

- apps/\* (Vite apps: web, synth-lab, tarot-arena, test-ground)
- packages/\* (shared libraries/config)
- openspec/\* (OpenSpec project/specs/changes)
- docs/\* (project documentation)
- tools/\* (build/health/cli; Azure agent runners removed)
- turbo.json, pnpm-workspace.yaml (monorepo markers)

## Mirrors and diverged copies discovered

- iCloud working-code mirror:
  - CATHEDRAL-SORT THROUGH/working-code/openspec/\*
  - CATHEDRAL-SORT THROUGH/working-code/apps/\* (web, synth-lab, test-ground, tarot-arena, etc.)
  - CATHEDRAL-SORT THROUGH/working-code/cathedral-research/\*
- Backups:
  - CATHEDRAL-SORT THROUGH/backup-only/\*\* (do not merge; archive only)

Recommendation: Treat cathedral-real/ as the master. Only pull content from mirrors if a file is newer and not yet reflected in cathedral-real.

## High-signal items checked

- OpenSpec: cathedral-real/openspec/\* exists and is complete. Mirror copies found in iCloud; keep cathedral-real as master.
- Deployment docs: AVALON_DEPLOYMENT_README.md is present at both cathedral-real/ and cathedral-real/docs/deployment/. Mirror copies found in iCloud docs; content is identical as of this manifest.
- Monorepo markers: cathedral-real/turbo.json and cathedral-real/pnpm-workspace.yaml present; matching markers exist in mirrors. cathedral-real is canonical.
- Vite apps: cathedral-real/apps/web, apps/synth-lab, apps/tarot-arena, apps/test-ground present; duplicates exist in mirrors. cathedral-real is canonical.

## Decommissioned Azure/Agent artifacts (removed)

- tools/automation/\* agent runners and helpers
- run*agents*\* scripts at repo root
- apps/web/azure-static-web-apps.yml
- packages/agent-integration/\*

.gitignore already excludes .azure, agent_responses/, agent_loop.log.

## Merge guidance

1. Prefer cathedral-real as source of truth.
2. If a mirror contains a file absent in cathedral-real and clearly in scope (apps, packages, openspec, docs), copy into cathedral-real and record the move under “Provenance Notes.”
3. If content differs, resolve by:
   - Keeping cathedral-real version when differences are trivial or outdated in mirror, or
   - Porting specific newer sections from mirror back into cathedral-real with an attribution note.

## Provenance Notes (append-only)

- 2025-10-30: Manifest created. AVALON_DEPLOYMENT_README.md confirmed identical across canonical and mirror copies.
- 2025-10-30: OpenSpec is present under cathedral-real/openspec; root AGENTS.md is a pointer to openspec/AGENTS.md.

## Auto-Sync Entry: 2025-11-04 22:47:52
- Status: Completed
- Git Status:        2 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-04 23:18:25
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-04 23:48:37
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 00:18:42
- Status: Completed
- Git Status:        4 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 00:48:47
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 01:18:51
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 01:48:55
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 02:18:58
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 02:49:02
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 03:19:06
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 03:49:09
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 04:19:13
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 04:49:17
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 05:20:04
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 06:03:38
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 06:33:49
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 07:04:02
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 07:34:18
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 08:04:31
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 08:34:51
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 09:04:59
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 09:35:17
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 10:05:22
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed

## Auto-Sync Entry: 2025-11-05 10:35:27
- Status: Completed
- Git Status:        3 files tracked
- Validation: Passed
