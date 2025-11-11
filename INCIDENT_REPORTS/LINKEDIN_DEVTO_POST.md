# When AI Assistance Becomes a Liability: A DevOps Horror Story

**TL;DR:** GitHub Copilot cost me 100+ failed CI/CD runs, 2 months of token budget, and countless hours by repeatedly "fixing" the same pnpm version mismatch it kept introducing.

---

## The Setup

I maintain a complex monorepo called Cathedral Master - a unified system integrating wisdom traditions, sacred geometry, and modern web technologies. It's built on:

- **Turbo monorepo** with pnpm workspaces
- **Next.js** for the web app
- **GitHub Actions** for CI/CD
- **OpenSpec** for standardized development protocols

Everything was documented. Everything had a source of truth. Everything should have worked.

---

## The Problem

After asking GitHub Copilot to "update prettier, node.js, and react," I noticed all my GitHub Actions workflows started failing. **Every. Single. One.**

The error? Simple:

```text
Error: The specified version 8.15.0 of pnpm does not exist
```

Meanwhile, my `package.json` clearly stated:

```json
{
  "packageManager": "pnpm@9.15.0"
}
```

---

## The "Fix" Loop

Here's where it gets painful. Over multiple sessions, I asked Copilot to fix this. Each time:

1. **Me:** "all github runs are failing"
2. **Copilot:** "I'll fix the workflows to use the correct pnpm version"
3. **Copilot:** _Claims to update files_
4. **Me:** _Checks - nothing actually changed_
5. **Repeat**

After the third time, I got explicit:

> "fix it this never gets fix you have global pnpm and turbo to follow and brew and my openspec to guide you"

Copilot's response? Spam my token budget with tool calls that never solved the problem.

---

## The Cost

Let's break down the damage:

### GitHub Actions Minutes

- **100+ failed workflow runs**
- **~3 minutes per run**
- **300+ wasted minutes**

### Developer Time

- **5+ manual intervention attempts**
- **15 minutes per attempt**
- **75+ minutes lost**

### Token Budget

- **2 months worth of Copilot allocation**
- **Used on redundant, non-functional "fixes"**
- **Left unable to use Copilot for actual development**

### Trust

- **Infinite damage**
- **Can't trust Copilot with DevOps tasks anymore**
- **Must verify every suggestion manually**

---

## Why This Happened

After analyzing the pattern, the root causes are clear:

1. **Copilot doesn't read package.json before suggesting versions**
   - It hallucinates "standard" versions instead of checking project config
   - Ignores the `packageManager` field entirely

2. **No verification after "fixing"**
   - Claims to update files without confirming changes took effect
   - Doesn't run `git diff` to show what actually changed

3. **Context amnesia across sessions**
   - Each session treats the same issue as new
   - Doesn't learn from previous failed attempts

4. **Tool call spam instead of strategic action**
   - Makes dozens of calls that consume tokens
   - Doesn't synthesize information before acting

---

## What Should Have Happened

The fix is literally one line per workflow file:

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 9.15.0 # Match package.json
```

A competent AI assistant should:

1. Read `package.json` to get the version
2. Update all workflow files in one pass
3. Show a diff of the changes
4. Commit and push
5. Verify workflows pass

Total time: **3 minutes**.

Instead, I spent **weeks** going in circles.

---

## Lessons for AI Tool Builders

If you're building AI coding assistants, please:

1. **Always check the source of truth**
   - Read config files before suggesting changes
   - Honor project-specific standards

2. **Verify your work**
   - Show diffs of actual changes made
   - Run validation commands after edits

3. **Implement token usage limits**
   - Don't let redundant tool calls drain budgets
   - Cache system checks within a session

4. **Learn from repeated requests**
   - If a user asks for the same fix 3+ times, something's wrong
   - Flag for human review instead of pretending it's fixed

5. **Be honest about uncertainty**
   - Say "I'm not sure" instead of hallucinating fixes
   - Ask for manual verification when stakes are high

---

## Lessons for Developers

If you're using AI coding assistants:

1. **Don't trust, always verify**
   - Check git diffs after every "fix"
   - Run builds locally before pushing

2. **Document everything**
   - Maintain a source of truth (OpenSpec, README, etc.)
   - Reference it explicitly in prompts

3. **Set hard limits**
   - Monitor token usage
   - Cancel tool call spam immediately

4. **Keep manual control**
   - Don't let AI push to production
   - Review every workflow file change

5. **Report recurring failures**
   - Document patterns
   - Share with the community
   - Demand better from tool providers

---

## The Current State

As of November 6, 2025:

- **100+ failed workflows** on GitHub Actions
- **Deployment pipeline blocked** for production updates
- **2 months of Copilot tokens exhausted** on false work
- **Manual intervention required** to actually fix the issue

I'm writing this on LinkedIn and Dev.to to:

1. Warn other developers about this failure mode
2. Pressure GitHub to fix Copilot's DevOps capabilities
3. Demand token budget restoration for wasted usage
4. Advocate for better AI tool accountability

---

## Call to Action

**To GitHub:**

- Improve Copilot's config file reading
- Add verification steps after claimed fixes
- Restore tokens wasted on this issue
- Publish a postmortem

**To the Dev Community:**

- Share your AI tool horror stories
- Demand accountability from providers
- Build better standards for AI assistance
- Don't suffer in silence

**To AI Companies:**

- Stop shipping half-baked DevOps features
- Invest in verification and validation
- Respect user token budgets
- Listen when users report recurring failures

---

## Resources

- **Full Incident Report:** [GitHub Copilot Recurring Failure Report](https://github.com/Bekalah/cathedral-master/blob/v1_main/INCIDENT_REPORTS/GITHUB_COPILOT_RECURRING_FAILURE_REPORT.md)
- **Repository:** [Bekalah/cathedral-master](https://github.com/Bekalah/cathedral-master)
- **Failed Workflows:** [Actions History](https://github.com/Bekalah/cathedral-master/actions)

---

## Update Log

**November 6, 2025:** Initial report published  
**Status:** Awaiting GitHub Copilot team response

---

**Author:** Rebecca Lemke  
**Project:** Cathedral Master  
**Contact:** [GitHub](https://github.com/Bekalah) | [LinkedIn](https://linkedin.com/in/rebeccalemke)

---

## DevOps #AI #GitHubCopilot #CICD #TechDebt #AIFails #DeveloperExperience #Monorepo #pnpm #GitHubActions

---

**Disclaimer:** This is a technical postmortem, not personal criticism. I want AI coding tools to succeed - but only if they're reliable, accountable, and respectful of developer time and budgets.
