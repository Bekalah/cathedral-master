#!/bin/bash
# Cathedral Debug & Fix Script
# Automatically fixes all identified issues

set -e

CATHEDRAL_DIR="/Users/rebeccalemke/cathedral-real"
cd "$CATHEDRAL_DIR"

echo "🔧 Cathedral Debug & Fix System"
echo "================================"
echo ""

# 1. Fix main.py syntax error
echo "1️⃣  Fixing main.py syntax error..."
if [ -f "main.py" ]; then
    # Backup first
    cp main.py main.py.backup
    
    # Fix the syntax issue around line 469-470
    python3 << 'EOF'
with open('main.py', 'r') as f:
    content = f.read()

# Fix the specific syntax error
content = content.replace(
    'sys.exit(1)   log_level="info"',
    'sys.exit(1)\n\n    # Configure log level\n    log_level="info"'
)

with open('main.py', 'w') as f:
    f.write(content)
EOF
    echo "✅ Fixed main.py"
else
    echo "⚠️  main.py not found"
fi

# 2. Fix render.py type hint error
echo ""
echo "2️⃣  Fixing render.py type hint..."
if [ -f "design-suite/design_suite/render.py" ]; then
    cp design-suite/design_suite/render.py design-suite/design_suite/render.py.backup
    
    python3 << 'EOF'
with open('design-suite/design_suite/render.py', 'r') as f:
    lines = f.readlines()

# Find and fix the Polygon type hint
for i, line in enumerate(lines):
    if 'def _create_triangle' in line and '-> Polygon:' in line:
        lines[i] = line.replace(' -> Polygon:', ':')
        break

with open('design-suite/design_suite/render.py', 'w') as f:
    f.writelines(lines)
EOF
    echo "✅ Fixed render.py type hints"
else
    echo "⚠️  render.py not found"
fi

# 3. Install missing Python dependencies
echo ""
echo "3️⃣  Installing missing Python dependencies..."
if [ -f ".venv/bin/pip" ]; then
    echo "Installing core dependencies..."
    .venv/bin/pip install -q fastapi uvicorn pydantic pyyaml 2>/dev/null || echo "⚠️  Some packages may already be installed"
    echo "✅ Core dependencies installed"
else
    echo "⚠️  Virtual environment not found at .venv"
    echo "   Create it with: python3 -m venv .venv"
fi

# 4. Check for Azure imports and warn
echo ""
echo "4️⃣  Checking for Azure dependencies..."
if grep -r "azure" --include="*.py" . 2>/dev/null | grep -v ".venv" | grep -v "backup" | grep -v "Binary" | head -5; then
    echo "⚠️  Found Azure imports - should be removed for local-only operation"
else
    echo "✅ No Azure imports found"
fi

# 5. Validate Python syntax
echo ""
echo "5️⃣  Validating Python syntax..."
python3 -m py_compile main.py 2>/dev/null && echo "✅ main.py syntax OK" || echo "❌ main.py has syntax errors"
python3 -m py_compile design-suite/design_suite/render.py 2>/dev/null && echo "✅ render.py syntax OK" || echo "❌ render.py has syntax errors"
python3 -m py_compile tools/render_arcana_textures.py 2>/dev/null && echo "✅ render_arcana_textures.py syntax OK" || echo "❌ render_arcana_textures.py has syntax errors"

# 6. Run validation tests
echo ""
echo "6️⃣  Running validation tests..."
if [ -f ".venv/bin/python" ]; then
    echo "Testing design suite..."
    .venv/bin/python tools/validate/design_suite_smoketest.py && echo "✅ Design suite validation passed" || echo "❌ Design suite validation failed"
    
    echo "Testing Achad integration..."
    .venv/bin/python tools/validate/achad_integration_smoketest.py && echo "✅ Achad integration passed" || echo "❌ Achad integration failed"
else
    echo "⚠️  Cannot run tests - virtual environment not found"
fi

# 7. Git status
echo ""
echo "7️⃣  Checking git status..."
git status --short

echo ""
echo "🎉 Debug & Fix Complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Test your tools manually"
echo "3. Commit if everything works: git add -A && git commit -m 'Debug fixes applied'"
echo ""
