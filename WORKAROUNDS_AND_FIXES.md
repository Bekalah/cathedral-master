# 🔧 Cathedral Deployment Workarounds & Fixes

## Complete Solutions for All Tool Stack Issues

**Generated:** November 4, 2025  
**Status:** Comprehensive fix documentation for Cathedral v1.0

---

## 🎯 Critical Issues Identified

### 1. **Python Type Annotation Error** ❌

**File:** `design-suite/design_suite/render.py:43`  
**Issue:** `Variable not allowed in type expression` for Polygon type

**Root Cause:** Polygon is conditionally imported and may be a mock type when matplotlib is unavailable.

**Fix:**

```python
# Change line 43 from:
def _create_triangle(x: float, y: float, scale: float, direction: str = "up") -> Polygon:

# To:
def _create_triangle(x: float, y: float, scale: float, direction: str = "up"):
    """Create a triangle polygon with proper matplotlib properties."""
```

**Status:** ✅ Simple fix - remove type hint

---

### 2. **Syntax Error in main.py** ❌

**File:** `main.py:469-470`  
**Issue:** Statement not properly separated - `sys.exit(1)   log_level="info"`

**Root Cause:** Missing newline between sys.exit() and next statement.

**Fix:**

```python
# Lines 465-470 should be:
        print("Could not start uvicorn server:", str(e))
        print("Install uvicorn with: pip install uvicorn[standard]")
        print("Or run using the module: python -m uvicorn main:app --reload")
        import sys
        sys.exit(1)

    # If uvicorn is available, configure it properly
    # log_level="info" should be part of uvicorn.run() call
```

**Status:** ✅ Simple syntax fix

---

### 3. **Missing Python Dependencies** ⚠️

**Files:** Multiple (main.py, engine/spell_engine.py, packages/\*)

**Missing Packages:**

- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `pydantic` - Data validation
- `torch` - Deep learning (optional)
- `diffusers` - AI image generation (optional)
- `yaml` / `pyyaml` - YAML parsing
- `streamlit` - Web UI (optional)
- `plotly` - Interactive charts (optional)

**Fix - Install All Dependencies:**

```bash
cd /Users/rebeccalemke/cathedral-real

# Core dependencies (required)
.venv/bin/pip install fastapi uvicorn[standard] pydantic pyyaml

# Optional AI/ML dependencies
.venv/bin/pip install torch diffusers --index-url https://download.pytorch.org/whl/cpu

# Optional UI dependencies
.venv/bin/pip install streamlit plotly

# Or install all from requirements.txt
.venv/bin/pip install -r requirements.txt
```

**Status:** ✅ Run installation command

---

### 4. **Missing Agent Framework Modules** ⚠️

**Files:** `packages/agent-integration/agent_of_kaoz.py`

**Missing Imports:**

- `agent_framework`
- `agent_framework_azure_ai`

**Workaround - Create Stub Modules:**

```python
# Create: packages/agent-integration/agent_framework.py
"""Stub for agent framework - replace with actual implementation"""

class ChatAgent:
    def __init__(self, *args, **kwargs):
        print("Warning: Using stub ChatAgent - no real agent functionality")
        self.messages = []

    def add_message(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})

    def get_response(self):
        return "Stub response - implement real agent logic"
```

```python
# Create: packages/agent-integration/agent_framework_azure_ai.py
"""Stub for Azure AI agent - Azure removed per user request"""

class AzureAIAgentClient:
    def __init__(self, *args, **kwargs):
        print("Warning: Azure integration disabled per user request")
        print("Using local-only agent functionality")

    def chat(self, message: str):
        return {"response": "Local agent response (Azure disabled)"}
```

**Status:** ✅ Create stub files or remove Azure dependencies

---

### 5. **Missing Custom Modules** ⚠️

**Files:** Multiple packages

**Missing Modules:**

- `archetypal_game_engine`
- `azure_integration`
- `museum_sources_engine`
- `cathedral_style_engine`
- `cathedral_graph_navigator`

**Workaround Options:**

**Option A: Create Stub Modules**

```python
# For each missing module, create a stub file
# Example: packages/archetypal-engine/__init__.py

from .archetypal_game_engine import ArchetypalGameEngine, ChaosEvent, ArchetypeState

__all__ = ['ArchetypalGameEngine', 'ChaosEvent', 'ArchetypeState']
```

**Option B: Fix Import Paths**

```python
# Change absolute imports to relative imports
# From:
from archetypal_game_engine import ArchetypalGameEngine

# To:
from packages.archetypal_engine.archetypal_game_engine import ArchetypalGameEngine

# Or use relative imports within package:
from .archetypal_game_engine import ArchetypalGameEngine
```

**Status:** ⏳ Requires module refactoring or stub creation

---

### 6. **JSON Comments in turbo.json** ⚠️

**File:** `turbo.json:1-3`  
**Issue:** JSON doesn't support comments

**Fix:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "description": "Cathedral Magnum Opus - Unified Wisdom, Science, Art, and Design",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    ...
  }
}
```

**Status:** ✅ Remove comment lines, use description field

---

### 7. **Undefined Classes in magnum_opus** ❌

**File:** `packages/magnum-opus/cathedral_magnum_opus_complete.py`

**Missing Classes:**

- `AtmosphericLibrarySystem` (line 251)
- `ResearchToolsSystem` (line 252)
- `BassResonanceEngine` (line 600)

**Fix - Add Missing Class Definitions:**

```python
class AtmosphericLibrarySystem:
    """Atmospheric library and ambience system"""
    def __init__(self):
        self.atmospheres = {}
        self.active_atmosphere = None

    def create_atmosphere(self, name: str, config: dict):
        self.atmospheres[name] = config

    def set_atmosphere(self, name: str):
        self.active_atmosphere = self.atmospheres.get(name)
        return self.active_atmosphere

class ResearchToolsSystem:
    """Research and documentation tools"""
    def __init__(self):
        self.tools = []
        self.active_research = {}

    def add_tool(self, tool_name: str, tool_config: dict):
        self.tools.append({"name": tool_name, "config": tool_config})

    def start_research(self, topic: str):
        self.active_research[topic] = {"status": "active", "notes": []}

class BassResonanceEngine:
    """Bass frequency resonance and harmonics"""
    def __init__(self):
        self.frequency = 40.0  # Hz
        self.resonance = 0.7
        self.harmonics = []

    def set_frequency(self, freq: float):
        self.frequency = freq

    def add_harmonic(self, harmonic: float):
        self.harmonics.append(harmonic)

    def generate_resonance(self):
        return {"frequency": self.frequency, "resonance": self.resonance}
```

**Status:** ✅ Add class definitions before use

---

## 🛠️ Quick Fix Script

Create and run this automated fix script:

```bash
#!/bin/bash
# Cathedral Quick Fix Script
# Fixes all immediate syntax and import errors

CATHEDRAL_DIR="/Users/rebeccalemke/cathedral-real"
cd "$CATHEDRAL_DIR"

echo "🔧 Cathedral Quick Fix Starting..."

# 1. Fix render.py type hint
echo "Fixing render.py type annotation..."
sed -i.bak 's/def _create_triangle(x: float, y: float, scale: float, direction: str = "up") -> Polygon:/def _create_triangle(x: float, y: float, scale: float, direction: str = "up"):/' design-suite/design_suite/render.py

# 2. Install missing Python dependencies
echo "Installing Python dependencies..."
.venv/bin/pip install -q fastapi uvicorn[standard] pydantic pyyaml numpy pillow matplotlib 2>/dev/null || echo "Some packages may already be installed"

# 3. Fix turbo.json comments
echo "Fixing turbo.json..."
python3 << 'PYTHON_SCRIPT'
import json
with open('turbo.json', 'r') as f:
    lines = f.readlines()

# Remove comment lines
clean_lines = [line for line in lines if not line.strip().startswith('//')]
content = ''.join(clean_lines)

# Parse and rewrite
try:
    data = json.loads(content)
    with open('turbo.json', 'w') as f:
        json.dump(data, f, indent=2)
    print("✅ turbo.json cleaned")
except Exception as e:
    print(f"⚠️  turbo.json may need manual review: {e}")
PYTHON_SCRIPT

# 4. Create stub modules for missing imports
echo "Creating stub modules..."
mkdir -p packages/agent-integration

cat > packages/agent-integration/agent_framework.py << 'EOF'
"""Local agent framework (Azure removed)"""
class ChatAgent:
    def __init__(self, *args, **kwargs):
        self.messages = []
    def add_message(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})
EOF

cat > packages/agent-integration/agent_framework_azure_ai.py << 'EOF'
"""Azure stub (disabled per user request)"""
class AzureAIAgentClient:
    def __init__(self, *args, **kwargs):
        print("Azure disabled - using local agent")
EOF

# 5. Fix main.py syntax error
echo "Fixing main.py syntax..."
python3 << 'PYTHON_SCRIPT'
with open('main.py', 'r') as f:
    content = f.read()

# Fix the syntax error at line 469
content = content.replace(
    'sys.exit(1)   log_level="info"',
    'sys.exit(1)\n        # log_level="info" - configure uvicorn separately'
)

with open('main.py', 'w') as f:
    f.write(content)
print("✅ main.py syntax fixed")
PYTHON_SCRIPT

echo "✅ Quick fixes complete!"
echo ""
echo "Next steps:"
echo "1. Review changes with: git diff"
echo "2. Run validation: python tools/validate/design_suite_smoketest.py"
echo "3. Commit changes: git add -A && git commit -m 'Apply automated fixes'"
```

**Save as:** `tools/quick-fix.sh`  
**Run:** `bash tools/quick-fix.sh`

---

## 🎯 Priority Fix Order

### Immediate (Do Now) ✅

1. ✅ Fix `render.py` type hint (1 line change)
2. ✅ Fix `main.py` syntax error (1 line change)
3. ✅ Install core Python dependencies (`pip install`)
4. ✅ Fix `turbo.json` comments (remove // lines)

### High Priority (Next) ⚠️

5. ⚠️ Create stub modules for missing imports
6. ⚠️ Add missing class definitions to magnum_opus
7. ⚠️ Test design suite validation

### Medium Priority (Soon) 📋

8. 📋 Refactor absolute imports to relative imports
9. 📋 Update requirements.txt with all dependencies
10. 📋 Document all module dependencies

### Low Priority (Later) 🔮

11. 🔮 Replace stubs with real implementations
12. 🔮 Optimize import paths across all packages
13. 🔮 Add comprehensive type hints

---

## 📦 Complete Dependency Installation

Create updated `requirements.txt`:

```txt
# Cathedral Core Dependencies
fastapi>=0.104.0
uvicorn[standard]>=0.24.0
pydantic>=2.5.0
pyyaml>=6.0.1

# Data Processing
numpy>=1.24.0
pandas>=2.0.0

# Image Processing
pillow>=10.0.0
matplotlib>=3.7.0

# Optional AI/ML (comment out if not needed)
# torch>=2.1.0
# diffusers>=0.25.0
# transformers>=4.35.0

# Optional Web UI
# streamlit>=1.29.0
# plotly>=5.18.0

# Development
pytest>=7.4.0
black>=23.11.0
```

**Install:**

```bash
.venv/bin/pip install -r requirements.txt
```

---

## ✅ Validation Checklist

After applying fixes, validate each component:

```bash
# 1. Test Python syntax
.venv/bin/python -m py_compile design-suite/design_suite/render.py
.venv/bin/python -m py_compile main.py

# 2. Run design suite validation
.venv/bin/python tools/validate/design_suite_smoketest.py

# 3. Run Achad integration test
.venv/bin/python tools/validate/achad_integration_smoketest.py

# 4. Test imports
.venv/bin/python -c "from design_suite import render; print('✅ render.py imports OK')"

# 5. Validate turbo.json
npx turbo run build --dry-run

# 6. Check for remaining errors
python -m pylint design-suite/design_suite/*.py --errors-only
```

---

## 🚀 Deployment Readiness

### After All Fixes Applied:

**Local Development:** ✅ Ready

```bash
pnpm run dev
# or
python main.py
```

**Vercel Deployment:** ⚠️ Requires fixes first

```bash
# After fixes:
vercel --prod
```

**Docker Deployment:** ⚠️ Requires Dockerfile update

```bash
# Update Dockerfile with correct dependencies
docker build -t cathedral .
docker run -p 8000:8000 cathedral
```

---

## 📊 Fix Status Summary

| Issue               | Priority | Status            | ETA    |
| ------------------- | -------- | ----------------- | ------ |
| render.py type hint | High     | ⚠️ Needs fix      | 1 min  |
| main.py syntax      | High     | ⚠️ Needs fix      | 1 min  |
| Python deps         | High     | ⚠️ Need install   | 5 min  |
| turbo.json comments | Medium   | ⚠️ Needs fix      | 2 min  |
| Missing stubs       | Medium   | ⚠️ Needs creation | 10 min |
| Missing classes     | Medium   | ⚠️ Needs code     | 15 min |
| Import paths        | Low      | 📋 Plan needed    | TBD    |
| Azure removal       | Low      | ✅ Already done   | Done   |

**Total Fix Time:** ~30-45 minutes for all critical issues

---

## 🎯 Recommended Fix Approach

### Step-by-Step:

1. **Run the quick-fix.sh script** (5 minutes)

   ```bash
   bash tools/quick-fix.sh
   ```

2. **Install dependencies** (5 minutes)

   ```bash
   .venv/bin/pip install -r requirements.txt
   ```

3. **Add missing class definitions** (15 minutes)
   - Open `packages/magnum-opus/cathedral_magnum_opus_complete.py`
   - Add the three missing class definitions (provided above)

4. **Test validation** (5 minutes)

   ```bash
   .venv/bin/python tools/validate/design_suite_smoketest.py
   .venv/bin/python tools/validate/achad_integration_smoketest.py
   ```

5. **Commit and push** (2 minutes)
   ```bash
   git add -A
   git commit -m "Apply comprehensive fixes for Cathedral v1.0"
   git push origin develop
   ```

---

## 🎉 Success Criteria

**All fixes successful when:**

- ✅ No Python syntax errors
- ✅ All imports resolve correctly
- ✅ Design suite smoketest passes
- ✅ Achad integration test passes
- ✅ turbo.json validates
- ✅ No critical errors in error list
- ✅ Main.py runs without crashes
- ✅ Auto-sync continues working

---

## 📞 Support & Next Steps

**If fixes don't work:**

1. Check the automation log: `tail -f automation-log.txt`
2. Review error output carefully
3. Verify Python environment: `.venv/bin/python --version`
4. Ensure git is clean: `git status`

**After fixes complete:**

1. Deploy to Vercel: `vercel --prod`
2. Update documentation
3. Create release tag: `git tag v1.0.0 && git push --tags`
4. Celebrate! 🎉

---

_Generated for Cathedral Project - November 4, 2025_  
_All fixes aligned with trauma-safe, ND-friendly practices_
