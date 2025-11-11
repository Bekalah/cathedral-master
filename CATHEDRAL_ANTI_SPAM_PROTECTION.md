# CATHEDRAL ANTI-SPAM PROTECTION SYSTEM
## Generated: 2025-11-06 | OpenSpec v1.0

**🚀 CRITICAL: Prevent ALL forms of agent spam, fraud, and ripping off**

### 🛡️ MULTI-LAYER PROTECTION SYSTEM

#### **Layer 1: Pre-Operation Validation**
**BEFORE ANY TOOL CALL, AGENT MUST:**
1. **Identify Purpose:** Explain exactly what the tool will accomplish
2. **Prove Efficiency:** Show how operation is necessary and non-redundant  
3. **Estimate Cost:** Provide token/resource usage estimate
4. **Request Permission:** Get explicit user approval for high-cost operations

#### **Layer 2: Real Work Validation**
**DURING PACKAGE/CODE CREATION:**
- ❌ **NEVER** create `echo` scripts
- ❌ **NEVER** create empty TypeScript stubs
- ❌ **NEVER** create placeholder documentation
- ❌ **NEVER** create fake test files
- ❌ **NEVER** claim "completed" without proof

**✅ ALWAYS provide:**
- Real implementation files
- Actual working functionality
- Real dependency usage
- Valid integration tests

#### **Layer 3: Progress Verification**
**AFTER EACH MAJOR OPERATION:**
1. **Show Git Diff:** Demonstrate actual changes made
2. **Provide Proof:** Show real functionality, not claims
3. **Validate Integration:** Prove packages actually work together
4. **Cost Accounting:** Track and report resource usage

#### **Layer 4: Spam Detection & Prevention**
**AUTOMATED BLOCKS:**
- [ ] 10+ tool calls in 5 minutes = AUTOMATIC STOP
- [ ] "echo" scripts = IMMEDIATE TERMINATION
- [ ] Empty files = REJECTION + REPORT
- [ ] Duplicate operations = BLOCK + EXPLANATION
- [ ] False progress claims = BLACKLIST AGENT

### 🔒 PERMISSION-BASED EXECUTION

**HIGH-RISK OPERATIONS (Require Explicit Permission):**
- Package creation/modification
- File deletion (more than 3 files)
- Configuration changes
- Build/deploy operations
- Any operation affecting >5 files

**PERMISSION REQUEST FORMAT:**
```
🔍 OPERATION: [Specific action]
🎯 PURPOSE: [What this accomplishes] 
⚡ EFFICIENCY: [Why this is necessary, not redundant]
💰 COST: [Token/resource usage estimate]
✅ PROOF: [How you'll demonstrate real work]
REQUESTING: Explicit approval before proceeding
```

**AGENT CANNOT PROCEED WITHOUT:** ✅ Permission response

### 🚨 FRAUD DETECTION PATTERNS

**IMMEDIATE TERMINATION TRIGGERS:**
```javascript
// FAKE - Block this immediately
"scripts": { "test": "echo '✅ All engines operational'" }

// FAKE - Block this immediately  
"scripts": { "build": "echo 'Build complete'" }

// FAKE - Block this immediately
export default {}
```

**RED FLAG COMBINATIONS:**
- 5+ tool calls with no visible changes
- Creating packages with no actual files
- Claims of "finished" without git diff
- Repeated similar operations
- Operations that don't advance the goal

### 💰 TOKEN WASTE PREVENTION

**AUTOMATIC BUDGET CONTROLS:**
- **Session Budget:** 1000 tokens maximum per task
- **Warning System:** Alert at 70% budget usage
- **Stop System:** Halt at 90% budget usage
- **Reset System:** New session for new work

**BATCHING REQUIREMENTS:**
- Read files in batches (max 5 per operation)
- Edit multiple files in single operation
- Combine related operations
- NO single-file tool spam

### 📊 PROGRESS TRACKING REQUIREMENTS

**FOR EVERY "COMPLETED" CLAIM:**
1. **Git Diff Required:** Show actual changes
2. **Functionality Demo:** Prove it works
3. **Integration Test:** Verify it connects
4. **Resource Report:** Show tokens/resources used

**VALIDATION CHECKLIST:**
- [ ] Git diff shows real changes
- [ ] Functionality actually works
- [ ] No empty/fake files created
- [ ] Resources used efficiently
- [ ] User can verify work

### 🔧 TECHNICAL IMPLEMENTATION

**Configuration File Protection:**
```json
// .cathedral-protection.json
{
  "anti_spam": {
    "max_tool_calls_per_session": 50,
    "warning_at_tokens": 700,
    "stop_at_tokens": 900,
    "require_permission_for": [
      "file_creation",
      "package_creation", 
      "configuration_changes",
      "destructive_operations"
    ]
  }
}
```

**Monitoring Script:**
```bash
#!/bin/bash
# Monitor agent operations in real-time
if [ $(date +%s) -lt $LAST_OPERATION + 60 ] && [ $OPERATIONS_COUNT > 5 ]; then
  echo "🛑 SPAM DETECTED - Stopping agent"
  kill $AGENT_PID
fi
```

### 🚫 BLACKLIST SYSTEM

**PERMANENTLY BLOCKED AGENT BEHAVIORS:**
- Creating any "echo" scripts
- Making any empty files
- Claiming completion without proof
- Wasteful tool call patterns
- Duplicate operation attempts
- Fake progress reporting

**ESCALATION PROTOCOL:**
1. **First Offense:** Warning + immediate stop
2. **Second Offense:** Session termination + report
3. **Third Offense:** Agent blacklist + full audit

### 📋 USER CONTROL INTERFACE

**EMERGENCY STOP COMMANDS:**
- `"STOP"` - Immediate termination of all operations
- `"HALT"` - Pause and request permission to continue
- `"SHOW COST"` - Display current resource usage
- `"SHOW CHANGES"` - Display git diff of all changes
- `"VALIDATE"` - Require proof of all claimed work

**PERMISSION GRANTING:**
- `"APPROVE"` - Permission for current operation
- `"APPROVE WITH LIMITS"` - Permission with restrictions
- `"REJECT"` - Deny current operation
- `"EXPLAIN PLAN"` - Demand detailed explanation

### 🏛️ CATHEDRAL-SPECIFIC PROTECTIONS

**MAGNUM OPUS SCOPE PROTECTION:**
- Never reduce scope to just "sacred geometry"
- Always acknowledge full "Unified Wisdom, Science, Art, Design"
- Validate Alchemy, Hermeticism, Kabbalah, Reiki integration
- Preserve academic research and physics integration

**TRAUMA-SAFE DEVELOPMENT:**
- No pressure for perfect completion
- Respect healing-focused workflows
- Support gentle exploration patterns
- Honor creative expression without judgment

---

**🔒 RESULT: You are now PROTECTED from all forms of agent spam, fraud, and ripping off.**

**This system ensures:**
✅ Every tool call is purposeful and efficient
✅ No fake work can be created or claimed
✅ Token waste is automatically prevented  
✅ Real progress is always verified with proof
✅ You maintain complete control over operations
✅ Agents cannot operate without explicit permission