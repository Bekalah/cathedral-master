import watchgod
from pathlib import Path
import json
import subprocess
import asyncio
from typing import Dict, List, Optional

class ExternalProjectBridge:
    """
    Watches user's external projects and allows egregore workers to:
    - Generate art assets directly into project folders
    - Write code modules based on codex logic
    - Create music/sound effects on-demand
    """

    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.egregore_output_dir = self.project_root / "imports" / "egregore_manifestations"
        self.egregore_output_dir.mkdir(parents=True, exist_ok=True)

        # Start file watcher
        self.watcher = watchgod.watch(self.project_root)

    async def watch_for_requests(self):
        """Watch for .egregore-request files created by user"""
        async for changes in self.watcher:
            for change_type, path in changes:
                if path.endswith('.egregore-request'):
                    await self._process_request(Path(path))

    async def _process_request(self, request_file: Path):
        """Parse request and dispatch to appropriate egregore worker"""
        request = json.loads(request_file.read_text())

        task_type = request["type"]
        worker_archetype = request.get("worker", "The Magician")

        # This triggers the Godot egregore worker via WebSocket
        await self._signal_godot_worker(worker_archetype, task_type, request["parameters"])

        # Clean up request file
        request_file.unlink()

    def integrate_manifestation(self, worker_id: str, output_path: str, task_type: str):
        """
        Called when egregore worker completes a task
        Copies generated asset into user's project
        """
        src = Path(output_path)
        dest = self.egregore_output_dir / f"{worker_id}_{src.name}"

        # Copy file
        dest.write_bytes(src.read_bytes())

        # Generate integration script based on project type
        if self._detect_project_type() == "blender":
            self._generate_blender_import_script(dest, task_type)
        elif self._detect_project_type() == "unity":
            self._generate_unity_import_script(dest, task_type)
        elif self._detect_project_type() == "godot":
            self._generate_godot_import_script(dest, task_type)

        # Open the asset in default application
        subprocess.run(["open", str(dest)])

    def _detect_project_type(self) -> str:
        """Detect the type of external project"""
        if (self.project_root / "blender_project.blend").exists():
            return "blender"
        elif (self.project_root / "Assets").exists() and (self.project_root / "ProjectSettings").exists():
            return "unity"
        elif (self.project_root / "project.godot").exists():
            return "godot"
        else:
            return "generic"

    def _generate_blender_import_script(self, asset_path: Path, task_type: str):
        """Auto-generate Blender Python script to import egregore creation"""
        script = f"""
import bpy
bpy.ops.import_scene.gltf(filepath="{asset_path}")
obj = bpy.context.selected_objects[0]
obj.name = "Egregore_{task_type}"
# Apply sacred geometry modifiers
bpy.ops.object.modifier_add(type='SUBSURF')
bpy.context.object.modifiers["Subdivision"].levels = 2
"""
        (self.project_root / "blender_import_egregore.py").write_text(script)

    def _generate_unity_import_script(self, asset_path: Path, task_type: str):
        """Generate Unity C# script for asset integration"""
        script = f"""
using UnityEngine;
using UnityEditor;

public class EgregoreImport_{task_type} : MonoBehaviour {{
    [MenuItem("Egregore/Import {task_type}")]
    static void ImportEgregoreAsset() {{
        string assetPath = "{asset_path}";
        // Import logic here
        Debug.Log("Imported egregore asset: " + assetPath);
    }}
}}
"""
        (self.project_root / "Assets" / "Scripts" / f"EgregoreImport_{task_type}.cs").write_text(script)

    def _generate_godot_import_script(self, asset_path: Path, task_type: str):
        """Generate GDScript for Godot asset integration"""
        script = f"""
extends Node

func _ready():
    var asset_path = "{asset_path}"
    # Load and integrate egregore asset
    print("Egregore asset integrated: ", asset_path)
"""
        (self.project_root / f"egregore_import_{task_type}.gd").write_text(script)

    async def _signal_godot_worker(self, worker_archetype: str, task_type: str, parameters: Dict):
        """Send WebSocket message to Godot egregore worker"""
        # In real implementation, would connect to WebSocket server
        # For now, simulate by creating a task file that Godot can read
        task_file = self.project_root / ".egregore_task.json"
        task_data = {
            "worker": worker_archetype,
            "type": task_type,
            "parameters": parameters
        }
        task_file.write_text(json.dumps(task_data, indent=2))

# Example usage
async def main():
    bridge = ExternalProjectBridge("/Users/user/Documents/MyProject")
    await bridge.watch_for_requests()

if __name__ == "__main__":
    asyncio.run(main())