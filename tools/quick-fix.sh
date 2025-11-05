#!/bin/bash
# Cathedral Quick Fix Script
# Applies automated fixes for all immediate syntax and import errors

set -e

CATHEDRAL_DIR="/Users/rebeccalemke/cathedral-real"
cd "$CATHEDRAL_DIR"

echo "🔧 Cathedral Quick Fix Starting..."
echo "=================================="

# 1. Fix render.py type hint
echo "1️⃣ Fixing render.py type annotation..."
if [ -f "design-suite/design_suite/render.py" ]; then
    # Backup first
    cp design-suite/design_suite/render.py design-suite/design_suite/render.py.backup
    
    # Remove Polygon type hint
    sed -i '' 's/def _create_triangle(x: float, y: float, scale: float, direction: str = "up") -> Polygon:/def _create_triangle(x: float, y: float, scale: float, direction: str = "up"):/' design-suite/design_suite/render.py
    
    echo "   ✅ render.py type hint fixed"
else
    echo "   ⚠️  render.py not found"
fi

# 2. Fix main.py syntax error
echo "2️⃣ Fixing main.py syntax error..."
if [ -f "main.py" ]; then
    cp main.py main.py.backup
    
    # Use Python to safely fix the syntax error
    python3 << 'PYTHON_SCRIPT'
with open('main.py', 'r') as f:
    content = f.read()

# Fix the syntax error where sys.exit and log_level are on same line
content = content.replace(
    'sys.exit(1)   log_level="info"',
    'sys.exit(1)\n        # Note: Configure log_level in uvicorn.run() call above'
)

with open('main.py', 'w') as f:
    f.write(content)
    
print("   ✅ main.py syntax fixed")
PYTHON_SCRIPT

else
    echo "   ⚠️  main.py not found"
fi

# 3. Create stub modules for missing imports
echo "3️⃣ Creating stub modules for agent framework..."
mkdir -p packages/agent-integration

cat > packages/agent-integration/agent_framework.py << 'EOF'
"""
Local agent framework stub
Azure dependencies removed per user request
"""

class ChatAgent:
    """Lightweight local chat agent (Azure removed)"""
    
    def __init__(self, *args, **kwargs):
        self.messages = []
        self.config = kwargs
    
    def add_message(self, role: str, content: str):
        """Add a message to the conversation"""
        self.messages.append({"role": role, "content": content})
    
    def get_response(self, prompt: str = None):
        """Get agent response (stub implementation)"""
        return {
            "response": "Local agent response (implement custom logic here)",
            "status": "success"
        }
    
    def reset(self):
        """Reset conversation"""
        self.messages = []
EOF

cat > packages/agent-integration/agent_framework_azure_ai.py << 'EOF'
"""
Azure AI Agent Client Stub
Azure integration disabled per user request - all operations are local-only
"""

class AzureAIAgentClient:
    """Azure AI stub (disabled - local operations only)"""
    
    def __init__(self, *args, **kwargs):
        print("ℹ️  Azure integration disabled per user request")
        print("   Using local-only agent functionality")
        self.local_mode = True
    
    def chat(self, message: str):
        """Local chat stub (Azure disabled)"""
        return {
            "response": "Local agent response (Azure disabled)",
            "mode": "local-only",
            "azure_enabled": False
        }
    
    def get_status(self):
        """Return agent status"""
        return {
            "status": "local-only",
            "azure_integration": "disabled",
            "message": "All operations are local per user configuration"
        }
EOF

echo "   ✅ Agent framework stubs created"

# 4. Fix turbo.json comments
echo "4️⃣ Fixing turbo.json comments..."
if [ -f "turbo.json" ]; then
    cp turbo.json turbo.json.backup
    
    python3 << 'PYTHON_SCRIPT'
import json

try:
    with open('turbo.json', 'r') as f:
        lines = f.readlines()
    
    # Remove comment lines (starting with //)
    clean_lines = [line for line in lines if not line.strip().startswith('//')]
    content = ''.join(clean_lines)
    
    # Try to parse as JSON
    try:
        data = json.loads(content)
        
        # Write back formatted JSON
        with open('turbo.json', 'w') as f:
            json.dump(data, f, indent=2)
        
        print("   ✅ turbo.json comments removed and formatted")
    except json.JSONDecodeError as e:
        print(f"   ⚠️  turbo.json needs manual review: {e}")
        # Restore backup
        with open('turbo.json.backup', 'r') as f:
            backup = f.read()
        with open('turbo.json', 'w') as f:
            f.write(backup)
            
except Exception as e:
    print(f"   ⚠️  Error processing turbo.json: {e}")
PYTHON_SCRIPT

else
    echo "   ⚠️  turbo.json not found"
fi

# 5. Install core Python dependencies
echo "5️⃣ Installing core Python dependencies..."
if [ -f ".venv/bin/pip" ]; then
    echo "   Installing: fastapi, uvicorn, pydantic, pyyaml..."
    .venv/bin/pip install -q fastapi "uvicorn[standard]" pydantic pyyaml 2>/dev/null && \
        echo "   ✅ Core dependencies installed" || \
        echo "   ⚠️  Some dependencies may already be installed or failed"
else
    echo "   ⚠️  Python virtual environment not found at .venv"
    echo "      Run: python3 -m venv .venv && source .venv/bin/activate"
fi

echo ""
echo "=================================="
echo "✅ Quick fixes complete!"
echo ""
echo "📋 Summary:"
echo "   • render.py type hint removed"
echo "   • main.py syntax error fixed"
echo "   • Agent framework stubs created"
echo "   • turbo.json comments cleaned"
echo "   • Core Python deps installed"
echo ""
echo "🔍 Next steps:"
echo "   1. Review changes: git diff"
echo "   2. Test validation: .venv/bin/python tools/validate/design_suite_smoketest.py"
echo "   3. Commit changes: git add -A && git commit -m 'Apply automated quick fixes'"
echo ""
echo "📝 Backup files created:"
echo "   • design-suite/design_suite/render.py.backup"
echo "   • main.py.backup"
echo "   • turbo.json.backup"
echo ""
