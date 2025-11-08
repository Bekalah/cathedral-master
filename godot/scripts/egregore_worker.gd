extends Node3D

enum WorkerMode {
    GAME_MODE,      # RPG character: quests, combat, cathedral exploration
    TOOL_MODE       # External project assistant: builds art, generates code, processes files
}

@export var mode: WorkerMode = WorkerMode.GAME_MODE
@export var assigned_archetype: Dictionary  # From Tarot master dataset
@export var codex_binding: NodePath         # Link to Codex14499 system

var is_manifesting: bool = false
var current_task: Dictionary = {}
var manifestation_progress: float = 0.0
var codex_system: Node

func _ready():
    # Initialize codex binding
    if not codex_binding.is_empty():
        codex_system = get_node(codex_binding)

    # Load archetype data from JSON
    _load_archetype_data()

    # Connect to WebSocket for external communication
    _setup_websocket_bridge()

func _process(delta: float) -> void:
    match mode:
        WorkerMode.GAME_MODE:
            _execute_game_logic(delta)
        WorkerMode.TOOL_MODE:
            _execute_tool_logic(delta)

func _execute_game_logic(delta: float) -> void:
    # Standard RPG behavior: pathfinding, dialogue, quest progression
    var target = get_tree().get_first_node_in_group("player")
    if target:
        look_at(target.global_transform.origin)
        # ... combat, magic, etc.

func _execute_tool_logic(delta: float) -> void:
    # Autonomous design/build behavior
    if not is_manifesting and current_task.is_empty():
        _fetch_external_task()
    elif is_manifesting:
        _advance_manifestation(delta)

func _fetch_external_task() -> void:
    # Poll external project API or file system
    var task_queue = _query_project_directory()
    if not task_queue.is_empty():
        current_task = task_queue.pop_front()
        is_manifesting = true
        _begin_codex_manifestation()

func _begin_codex_manifestation() -> void:
    # Map task to Codex 144:99 node
    var node_id = _calculate_manifestation_node(current_task)
    var gate_id = node_id % 99  # Mirror to Liber Arcanum gates

    # Visual feedback: character begins glowing, geometric patterns form
    $Visuals/Merkaba.rotation.y += 0.05
    $Audio/FrequencyOscillator.frequency = assigned_archetype.frequency_hz

    # Spawn sacred geometry scaffolding
    var scaffolding = preload("res://scenes/manifestation_scaffold.tscn").instantiate()
    scaffolding.init(node_id, gate_id)
    add_child(scaffolding)

func _advance_manifestation(delta: float) -> void:
    manifestation_progress += delta * 0.1  # Slow, deliberate progress

    if manifestation_progress >= 1.0:
        _complete_manifestation()

func _complete_manifestation() -> void:
    # Generate output based on task type
    var output_path = _generate_output(current_task)

    # Send completion notification
    _notify_completion(output_path)

    # Reset state
    is_manifesting = false
    manifestation_progress = 0.0
    current_task = {}

func _calculate_manifestation_node(task: Dictionary) -> int:
    # Map task parameters to Codex node
    var task_type = task.get("type", "")
    match task_type:
        "generate_3d_art":
            return 7  # Magician node
        "compose_music":
            return 12  # High Priestess node
        "build_temple":
            return 33  # Empress node
        _:
            return 1  # Default to Fool node

func _generate_output(task: Dictionary) -> String:
    # This would interface with Rust GDNative for actual generation
    var task_type = task.get("type", "")
    var output_dir = "user://exports/"

    match task_type:
        "generate_3d_art":
            return output_dir + "temple_" + str(randi()) + ".glb"
        "compose_music":
            return output_dir + "soundtrack_" + str(randi()) + ".wav"
        _:
            return output_dir + "output_" + str(randi()) + ".dat"

func _query_project_directory() -> Array:
    # Check for .egregore-request files in external projects
    var requests = []
    var dir = DirAccess.open("user://external_projects/")
    if dir:
        dir.list_dir_begin()
        var file_name = dir.get_next()
        while file_name != "":
            if file_name.ends_with(".egregore-request"):
                var request_data = _parse_request_file(file_name)
                requests.append(request_data)
            file_name = dir.get_next()
    return requests

func _parse_request_file(file_path: String) -> Dictionary:
    var file = FileAccess.open(file_path, FileAccess.READ)
    var json_string = file.get_as_text()
    file.close()

    var json = JSON.new()
    var error = json.parse(json_string)
    if error == OK:
        return json.data
    else:
        return {}

func _setup_websocket_bridge() -> void:
    # Connect to React PWA control panel
    var websocket = WebSocketPeer.new()
    websocket.connect_to_url("ws://localhost:8080/egregore-bridge")

func _notify_completion(output_path: String) -> void:
    # Send WebSocket message to React control panel
    var message = {
        "type": "task_completed",
        "worker_id": name,
        "output_path": output_path,
        "task_type": current_task.get("type", "")
    }

    # Emit signal for local Godot systems
    emit_signal("manifestation_completed", message)

func toggle_mode() -> void:
    mode = WorkerMode.TOOL_MODE if mode == WorkerMode.GAME_MODE else WorkerMode.GAME_MODE

    # Visual transition
    if mode == WorkerMode.TOOL_MODE:
        _enter_tool_mode()
    else:
        _enter_game_mode()

func _enter_tool_mode() -> void:
    # Change appearance: more geometric, less organic
    $Visuals.material_override.emission_enabled = true
    $Visuals.material_override.emission = Color(0.2, 0.8, 1.0)

func _enter_game_mode() -> void:
    # Change appearance: more organic, less geometric
    $Visuals.material_override.emission_enabled = false

func _load_archetype_data() -> void:
    # Load from JSON dataset
    var file = FileAccess.open("res://data/TAROT_MASTER_DATASET.json", FileAccess.READ)
    if file:
        var json_string = file.get_as_text()
        file.close()

        var json = JSON.new()
        var error = json.parse(json_string)
        if error == OK:
            var dataset = json.data
            # Find this worker's archetype
            for card in dataset.major_arcana:
                if card.name == assigned_archetype.get("name", ""):
                    assigned_archetype = card
                    break

# Signals
signal manifestation_completed(data: Dictionary)
signal mode_changed(new_mode: int)