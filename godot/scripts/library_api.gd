extends Node

# Cathedral Library API - Godot Integration
# Connects esoteric datasets to game mechanics

class_name LibraryAPI

# Reference to Rust library generator (when compiled)
@onready var rust_generator = null

# Cache for loaded libraries
var loaded_libraries = {}
var current_room = null

func _ready():
	print("Library API initialized - connecting esoteric knowledge to game world")
	_load_rust_generator()

func _load_rust_generator():
	# Try to load the Rust GDNative library
	if ResourceLoader.exists("res://godot-rust-integration/target/release/libcathedral_game_engine.so"):
		var lib = load("res://godot-rust-integration/target/release/libcathedral_game_engine.so")
		if lib:
			rust_generator = lib.new()
			print("Rust library generator loaded successfully")
		else:
			print("Failed to load Rust library - using fallback mode")
	else:
		print("Rust library not found - using pure GDScript mode")

# Load a library dataset
func load_library(library_name: String) -> bool:
	var metadata_path = "res://data-libraries/" + library_name + "/metadata.json"

	if FileAccess.file_exists(metadata_path):
		var file = FileAccess.open(metadata_path, FileAccess.READ)
		var json = JSON.new()
		var error = json.parse(file.get_as_text())

		if error == OK:
			loaded_libraries[library_name] = json.data
			print("Loaded library: ", library_name)
			return true

	return false

# Get esoteric entry data
func get_esoteric_entry(library_name: String, entry_name: String) -> Dictionary:
	if loaded_libraries.has(library_name):
		var library_data = loaded_libraries[library_name]

		# Look for entry files in the library directory
		var entry_path = "res://data-libraries/" + library_name + "/" + entry_name.to_lower() + ".json"

		if FileAccess.file_exists(entry_path):
			var file = FileAccess.open(entry_path, FileAccess.READ)
			var json = JSON.new()
			var error = json.parse(file.get_as_text())

			if error == OK:
				return json.data

	return {}

# Generate a 3D library room
func generate_library_room(library_name: String) -> Node3D:
	var room = Node3D.new()
	room.name = library_name + "_library_room"

	if rust_generator:
		# Use Rust generator for high-performance room creation
		var rust_room = rust_generator.generate_library_room(library_name)
		if rust_room:
			return rust_room
	else:
		# Fallback GDScript room generation
		room = _generate_gdscript_room(library_name)

	return room

# Fallback room generation in pure GDScript
func _generate_gdscript_room(library_name: String) -> Node3D:
	var room = Node3D.new()
	room.name = library_name + "_room"

	# Create basic room structure
	var floor = CSGBox3D.new()
	floor.size = Vector3(20, 0.2, 20)
	floor.position = Vector3(0, -0.1, 0)
	room.add_child(floor)

	# Add some basic bookshelves based on library data
	if loaded_libraries.has(library_name):
		var library_data = loaded_libraries[library_name]
		var entry_count = _count_entries(library_name)

		for i in range(min(entry_count / 10, 5)):  # Max 5 shelves
			var shelf = _create_bookshelf(i)
			room.add_child(shelf)

	return room

func _create_bookshelf(index: int) -> Node3D:
	var shelf = Node3D.new()
	shelf.name = "bookshelf_" + str(index)

	var shelf_mesh = CSGBox3D.new()
	shelf_mesh.size = Vector3(2, 1.5, 0.3)
	shelf_mesh.position = Vector3(index * 3, 0.75, 0)

	shelf.add_child(shelf_mesh)
	return shelf

func _count_entries(library_name: String) -> int:
	var count = 0
	var dir_path = "res://data-libraries/" + library_name

	if DirAccess.dir_exists_absolute(dir_path):
		var dir = DirAccess.open(dir_path)
		if dir:
			dir.list_dir_begin()
			var file_name = dir.get_next()
			while file_name != "":
				if file_name.ends_with(".json") and file_name != "metadata.json":
					count += 1
				file_name = dir.get_next()

	return count

# Apply esoteric properties to game objects
func apply_esoteric_properties(node: Node, library_name: String, entry_name: String):
	var entry_data = get_esoteric_entry(library_name, entry_name)

	if entry_data.is_empty():
		return

	# Apply color if it's a visual node
	if entry_data.has("color") and node is MeshInstance3D:
		var color_str = entry_data["color"]
		var color = Color.html(color_str)

		# Create or modify material
		var material = StandardMaterial3D.new()
		material.albedo_color = color
		node.material_override = material

	# Apply geometry transformations
	if entry_data.has("geometry"):
		var geometry = entry_data["geometry"]
		_apply_geometry_transform(node, geometry)

	# Apply sound properties
	if entry_data.has("music_profile"):
		_apply_sound_properties(node, entry_data)

func _apply_geometry_transform(node: Node, geometry: String):
	if not node is Node3D:
		return

	var node3d = node as Node3D

	match geometry:
		"tetrahedron":
			node3d.scale = Vector3(1, 1.618, 1)  # Golden ratio
		"cube":
			node3d.scale = Vector3(1, 1, 1)  # Perfect proportions
		"merkaba":
			# Add rotation animation for merkaba effect
			var tween = create_tween()
			tween.tween_property(node3d, "rotation:y", 2 * PI, 10.0).set_loops()

func _apply_sound_properties(node: Node, entry_data: Dictionary):
	# Create audio player if it doesn't exist
	var audio_player = node.get_node_or_null("AudioStreamPlayer3D")
	if not audio_player:
		audio_player = AudioStreamPlayer3D.new()
		audio_player.name = "AudioStreamPlayer3D"
		node.add_child(audio_player)

	# Map esoteric properties to audio
	if entry_data.has("element"):
		var frequency = _map_element_to_frequency(entry_data["element"])
		# Note: Would need audio synthesis here
		print("Audio frequency for ", entry_data["element"], ": ", frequency, " Hz")

func _map_element_to_frequency(element: String) -> float:
	match element:
		"fire": return 528.0   # Transformation
		"water": return 639.0  # Connection
		"air": return 741.0    # Intuition
		"earth": return 396.0  # Liberation
		"spirit": return 963.0 # Divine consciousness
		_: return 440.0        # Default A4

# Export room to GLTF for external use
func export_room_gltf(library_name: String, output_path: String) -> bool:
	if rust_generator:
		return rust_generator.export_library_room_gltf(library_name, output_path)
	else:
		print("GLTF export requires Rust library generator")
		return false

# Get library metadata
func get_library_metadata(library_name: String) -> Dictionary:
	if loaded_libraries.has(library_name):
		return loaded_libraries[library_name]
	return {}

# List all available libraries
func get_available_libraries() -> Array:
	var libraries = []
	var data_dir = "res://data-libraries"

	if DirAccess.dir_exists_absolute(data_dir):
		var dir = DirAccess.open(data_dir)
		if dir:
			dir.list_dir_begin()
			var dir_name = dir.get_next()
			while dir_name != "":
				if dir.dir_exists(dir_name) and FileAccess.file_exists(data_dir + "/" + dir_name + "/metadata.json"):
					libraries.append(dir_name)
				dir_name = dir.get_next()

	return libraries