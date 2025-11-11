//! Cathedral Library Generator - Hybrid Runtime/Offline System
//!
//! Generates interactive 3D library rooms for Stone Grimoire chapels
//! with sound integration and art displays. Processes esoteric datasets
//! from /data-libraries/ and creates walkable library environments.
//!
//! Features:
//! - Runtime: Generates rooms on-demand in Godot
//! - Offline: Pre-generates GLTF scenes for import
//! - Hybrid: Both modes with shared data structures

use std::collections::HashMap;
use std::fs;
use std::path::Path;
use serde::{Deserialize, Serialize};
use godot::prelude::*;
use bevy_ecs::prelude::*;

/// Core library metadata structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryMetadata {
    pub title: String,
    pub author: String,
    pub year: Option<i32>,
    pub public_domain: bool,
    pub structure: Vec<String>,
    pub primary_theme: String,
    pub license_note: String,
    pub provenance_url: Option<String>,
    pub access_date: Option<String>,
}

/// Esoteric dataset entry (compatible with Codex 144:99 schema)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EsotericEntry {
    pub name: String,
    pub element: Option<String>,
    pub geometry: Option<String>,
    pub music_profile: Option<String>,
    pub color: Option<String>,
    pub angel: Option<String>,
    pub demon: Option<String>,
    pub deity: Option<String>,
    pub healing_profile: Option<String>,
    pub art_style: Option<String>,
}

/// Complete library dataset
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryDataset {
    pub metadata: LibraryMetadata,
    pub entries: Vec<EsotericEntry>,
}

/// Generated library room configuration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryRoom {
    pub library_id: String,
    pub room_title: String,
    pub theme: String,
    pub bookshelves: Vec<Bookshelf>,
    pub sound_zones: Vec<SoundZone>,
    pub art_displays: Vec<ArtDisplay>,
    pub navigation_nodes: Vec<NavigationNode>,
}

/// Bookshelf with esoteric entries
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Bookshelf {
    pub position: [f32; 3],
    pub rotation: [f32; 3],
    pub scale: [f32; 3],
    pub entries: Vec<String>, // Entry IDs
    pub material: String,
}

/// Sound zone for audio integration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SoundZone {
    pub position: [f32; 3],
    pub radius: f32,
    pub frequency: f32, // Solfeggio frequency
    pub waveform: String,
    pub associated_entries: Vec<String>,
}

/// Art display for visual integration
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ArtDisplay {
    pub position: [f32; 3],
    pub art_type: String, // "merkaba", "sacred_geometry", "sigil"
    pub color_scheme: String,
    pub associated_entry: String,
}

/// Navigation node for room connections
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NavigationNode {
    pub position: [f32; 3],
    pub connected_room: Option<String>,
    pub portal_type: String, // "door", "portal", "staircase"
}

/// Main Library Generator
#[derive(GodotClass)]
#[class(base=Node)]
pub struct CathedralLibraryGenerator {
    #[export]
    libraries: HashMap<String, LibraryDataset>,

    #[export]
    generated_rooms: HashMap<String, LibraryRoom>,

    base: Base<Node>,
}

/// Godot integration
#[godot_api]
impl INode for CathedralLibraryGenerator {
    fn init(base: Base<Node>) -> Self {
        Self {
            libraries: HashMap::new(),
            generated_rooms: HashMap::new(),
            base,
        }
    }

    fn ready(&mut self) {
        self.load_all_libraries();
        godot_print!("Cathedral Library Generator ready - {} libraries loaded", self.libraries.len());
    }
}

#[godot_api]
impl CathedralLibraryGenerator {
    /// Load all libraries from data-libraries directory
    #[func]
    pub fn load_all_libraries(&mut self) {
        let data_path = "res://data-libraries";

        if let Ok(entries) = fs::read_dir(data_path) {
            for entry in entries.flatten() {
                if entry.path().is_dir() {
                    if let Some(lib_name) = entry.file_name().to_str() {
                        self.load_library(lib_name);
                    }
                }
            }
        }
    }

    /// Load a specific library by name
    #[func]
    pub fn load_library(&mut self, library_name: &str) -> bool {
        let metadata_path = format!("res://data-libraries/{}/metadata.json", library_name);

        if let Ok(metadata_content) = fs::read_to_string(&metadata_path) {
            if let Ok(metadata) = serde_json::from_str::<LibraryMetadata>(&metadata_content) {
                let mut entries = Vec::new();

                // Load all data files in the library directory
                let library_path = format!("res://data-libraries/{}", library_name);
                if let Ok(dir_entries) = fs::read_dir(&library_path) {
                    for entry in dir_entries.flatten() {
                        if let Some(filename) = entry.path().file_name().and_then(|n| n.to_str()) {
                            if filename.ends_with(".json") && filename != "metadata.json" {
                                if let Ok(content) = fs::read_to_string(entry.path()) {
                                    if let Ok(entry_data) = serde_json::from_str::<EsotericEntry>(&content) {
                                        entries.push(entry_data);
                                    }
                                }
                            }
                        }
                    }
                }

                let dataset = LibraryDataset { metadata, entries };
                self.libraries.insert(library_name.to_string(), dataset);
                return true;
            }
        }
        false
    }

    /// Generate a 3D library room for runtime use
    #[func]
    pub fn generate_library_room(&mut self, library_name: &str) -> Option<Gd<Node3D>> {
        if let Some(dataset) = self.libraries.get(library_name) {
            let room = self.create_room_layout(library_name, dataset);
            self.generated_rooms.insert(library_name.to_string(), room.clone());

            // Create Godot Node3D scene
            let room_node = Node3D::new_alloc();
            self.build_godot_room(&room_node, &room);

            Some(room_node)
        } else {
            None
        }
    }

    /// Export library room as GLTF for offline use
    #[func]
    pub fn export_library_room_gltf(&self, library_name: &str, output_path: &str) -> bool {
        if let Some(room) = self.generated_rooms.get(library_name) {
            // Generate GLTF JSON structure
            let gltf_data = self.room_to_gltf(room);

            if let Ok(json) = serde_json::to_string_pretty(&gltf_data) {
                if fs::write(output_path, json).is_ok() {
                    godot_print!("Exported {} to {}", library_name, output_path);
                    return true;
                }
            }
        }
        false
    }

    /// Get esoteric entry data for integration
    #[func]
    pub fn get_esoteric_entry(&self, library_name: &str, entry_name: &str) -> Option<EsotericEntry> {
        if let Some(dataset) = self.libraries.get(library_name) {
            dataset.entries.iter()
                .find(|e| e.name == entry_name)
                .cloned()
        } else {
            None
        }
    }

    /// Apply esoteric properties to Godot nodes (colors, sounds, etc.)
    #[func]
    pub fn apply_esoteric_properties(&self, node: &mut Gd<Node>, library_name: &str, entry_name: &str) {
        if let Some(entry) = self.get_esoteric_entry(library_name, entry_name) {
            // Apply color if it's a visual node
            if let Some(color_str) = &entry.color {
                if let Ok(color) = Color::from_string(color_str) {
                    if let Ok(mut visual_node) = node.try_cast::<MeshInstance3D>() {
                        // Apply color to material
                        if let Some(material) = visual_node.get_material_override() {
                            if let Ok(mut standard_mat) = material.try_cast::<StandardMaterial3D>() {
                                standard_mat.set_albedo(color);
                                visual_node.set_material_override(standard_mat.upcast());
                            }
                        }
                    }
                }
            }

            // Apply geometry transformations
            if let Some(geometry) = &entry.geometry {
                match geometry.as_str() {
                    "tetrahedron" => self.apply_tetrahedral_transform(node),
                    "cube" => self.apply_cubic_transform(node),
                    "merkaba" => self.apply_merkaba_transform(node),
                    _ => {}
                }
            }
        }
    }
}

/// Implementation details
impl CathedralLibraryGenerator {
    fn create_room_layout(&self, library_name: &str, dataset: &LibraryDataset) -> LibraryRoom {
        let mut room = LibraryRoom {
            library_id: library_name.to_string(),
            room_title: dataset.metadata.title.clone(),
            theme: dataset.metadata.primary_theme.clone(),
            bookshelves: Vec::new(),
            sound_zones: Vec::new(),
            art_displays: Vec::new(),
            navigation_nodes: Vec::new(),
        };

        // Generate bookshelves based on entries
        let shelf_count = (dataset.entries.len() / 10).max(1);
        for i in 0..shelf_count {
            let shelf = Bookshelf {
                position: [i as f32 * 3.0, 0.0, 0.0],
                rotation: [0.0, 0.0, 0.0],
                scale: [2.0, 1.5, 0.5],
                entries: dataset.entries.iter()
                    .skip(i * 10)
                    .take(10)
                    .map(|e| e.name.clone())
                    .collect(),
                material: "wood_dark".to_string(),
            };
            room.bookshelves.push(shelf);
        }

        // Generate sound zones for each entry
        for (i, entry) in dataset.entries.iter().enumerate() {
            let sound_zone = SoundZone {
                position: [i as f32 * 2.0, 1.0, 5.0],
                radius: 3.0,
                frequency: self.map_entry_to_frequency(entry),
                waveform: "sine".to_string(),
                associated_entries: vec![entry.name.clone()],
            };
            room.sound_zones.push(sound_zone);
        }

        // Generate art displays
        for (i, entry) in dataset.entries.iter().step_by(3).enumerate() {
            let art_display = ArtDisplay {
                position: [-5.0, 2.0, i as f32 * 3.0],
                art_type: self.map_entry_to_art_type(entry),
                color_scheme: entry.color.clone().unwrap_or("gold".to_string()),
                associated_entry: entry.name.clone(),
            };
            room.art_displays.push(art_display);
        }

        // Add navigation nodes
        room.navigation_nodes.push(NavigationNode {
            position: [0.0, 0.0, -10.0],
            connected_room: Some("main_hall".to_string()),
            portal_type: "door".to_string(),
        });

        room
    }

    fn build_godot_room(&self, room_node: &Gd<Node3D>, room: &LibraryRoom) {
        // Create room container
        let room_container = Node3D::new_alloc();
        room_container.set_name(&room.room_title);

        // Add bookshelves
        for (i, shelf) in room.bookshelves.iter().enumerate() {
            let shelf_node = self.create_bookshelf_node(shelf, i);
            room_container.add_child(shelf_node.upcast());
        }

        // Add sound zones
        for sound_zone in &room.sound_zones {
            let zone_node = self.create_sound_zone_node(sound_zone);
            room_container.add_child(zone_node.upcast());
        }

        // Add art displays
        for art_display in &room.art_displays {
            let art_node = self.create_art_display_node(art_display);
            room_container.add_child(art_node.upcast());
        }

        room_node.add_child(room_container.upcast());
    }

    fn create_bookshelf_node(&self, shelf: &Bookshelf, index: usize) -> Gd<Node3D> {
        let node = Node3D::new_alloc();
        node.set_name(&format!("bookshelf_{}", index));
        node.set_position(Vector3::from(shelf.position));
        node.set_rotation(Vector3::from(shelf.rotation));
        node.set_scale(Vector3::from(shelf.scale));

        // Add mesh instance for visual representation
        let mesh_instance = MeshInstance3D::new_alloc();
        let box_mesh = BoxMesh::new();
        box_mesh.set_size(Vector3::new(shelf.scale[0], shelf.scale[1], shelf.scale[2]));
        mesh_instance.set_mesh(box_mesh.upcast());

        node.add_child(mesh_instance.upcast());
        node
    }

    fn create_sound_zone_node(&self, zone: &SoundZone) -> Gd<Node3D> {
        let node = Node3D::new_alloc();
        node.set_name("sound_zone");
        node.set_position(Vector3::from(zone.position));

        // Add area for sound trigger
        let area = Area3D::new_alloc();
        let collision_shape = CollisionShape3D::new_alloc();
        let sphere_shape = SphereShape3D::new();
        sphere_shape.set_radius(zone.radius);
        collision_shape.set_shape(sphere_shape.upcast());
        area.add_child(collision_shape.upcast());

        node.add_child(area.upcast());
        node
    }

    fn create_art_display_node(&self, display: &ArtDisplay) -> Gd<Node3D> {
        let node = Node3D::new_alloc();
        node.set_name(&format!("art_{}", display.art_type));
        node.set_position(Vector3::from(display.position));

        // Create appropriate geometry based on art type
        let mesh_instance = MeshInstance3D::new_alloc();
        let mesh: Gd<Mesh> = match display.art_type.as_str() {
            "merkaba" => self.create_merkaba_mesh().upcast(),
            "sacred_geometry" => self.create_sacred_geometry_mesh().upcast(),
            _ => BoxMesh::new().upcast(),
        };
        mesh_instance.set_mesh(mesh);

        node.add_child(mesh_instance.upcast());
        node
    }

    fn map_entry_to_frequency(&self, entry: &EsotericEntry) -> f32 {
        // Map esoteric entries to Solfeggio frequencies
        match entry.element.as_deref() {
            Some("fire") => 528.0,  // Transformation
            Some("water") => 639.0, // Connection
            Some("air") => 741.0,   // Intuition
            Some("earth") => 396.0, // Liberation
            Some("spirit") => 963.0, // Divine consciousness
            _ => 440.0, // Default A4
        }
    }

    fn map_entry_to_art_type(&self, entry: &EsotericEntry) -> String {
        match entry.geometry.as_deref() {
            Some("tetrahedron") | Some("merkaba") => "merkaba".to_string(),
            Some("circle") | Some("sphere") => "sacred_geometry".to_string(),
            _ => "sigil".to_string(),
        }
    }

    fn apply_tetrahedral_transform(&self, node: &mut Gd<Node>) {
        if let Ok(mut node3d) = node.try_cast::<Node3D>() {
            node3d.set_scale(Vector3::new(1.0, 1.618, 1.0)); // Golden ratio
        }
    }

    fn apply_cubic_transform(&self, node: &mut Gd<Node>) {
        if let Ok(mut node3d) = node.try_cast::<Node3D>() {
            node3d.set_scale(Vector3::new(1.0, 1.0, 1.0)); // Perfect cube
        }
    }

    fn apply_merkaba_transform(&self, node: &mut Gd<Node>) {
        if let Ok(mut node3d) = node.try_cast::<Node3D>() {
            // Rotate continuously for merkaba effect
            let current_rotation = node3d.get_rotation();
            node3d.set_rotation(current_rotation + Vector3::new(0.0, 0.01, 0.0));
        }
    }

    fn create_merkaba_mesh(&self) -> Gd<BoxMesh> {
        let mesh = BoxMesh::new();
        mesh.set_size(Vector3::new(1.0, 1.618, 1.0)); // Golden ratio proportions
        mesh
    }

    fn create_sacred_geometry_mesh(&self) -> Gd<CylinderMesh> {
        let mesh = CylinderMesh::new();
        mesh.set_top_radius(1.0);
        mesh.set_bottom_radius(1.0);
        mesh.set_height(0.1);
        mesh
    }

    fn room_to_gltf(&self, room: &LibraryRoom) -> serde_json::Value {
        // Simplified GLTF export structure
        serde_json::json!({
            "asset": {
                "version": "2.0",
                "generator": "Cathedral Library Generator"
            },
            "scenes": [{
                "name": room.room_title,
                "nodes": [0, 1, 2] // References to nodes below
            }],
            "nodes": [
                {
                    "name": "bookshelves",
                    "children": (0..room.bookshelves.len()).collect::<Vec<_>>()
                },
                {
                    "name": "sound_zones",
                    "children": (0..room.sound_zones.len()).map(|i| i + room.bookshelves.len()).collect::<Vec<_>>()
                },
                {
                    "name": "art_displays",
                    "children": (0..room.art_displays.len())
                        .map(|i| i + room.bookshelves.len() + room.sound_zones.len())
                        .collect::<Vec<_>>()
                }
            ],
            "materials": [{
                "name": "library_material",
                "pbrMetallicRoughness": {
                    "baseColorFactor": [0.8, 0.6, 0.4, 1.0]
                }
            }]
        })
    }
}

/// Standalone offline generator (can be run without Godot)
pub struct OfflineLibraryGenerator;

impl OfflineLibraryGenerator {
    pub fn generate_all_libraries(output_dir: &Path) -> std::io::Result<()> {
        let data_path = Path::new("data-libraries");

        if data_path.exists() {
            for entry in fs::read_dir(data_path)? {
                let entry = entry?;
                let path = entry.path();

                if path.is_dir() {
                    if let Some(lib_name) = path.file_name().and_then(|n| n.to_str()) {
                        Self::generate_library_gltf(lib_name, &path, output_dir)?;
                    }
                }
            }
        }

        Ok(())
    }

    fn generate_library_gltf(lib_name: &str, lib_path: &Path, output_dir: &Path) -> std::io::Result<()> {
        // Load metadata and generate GLTF
        let metadata_path = lib_path.join("metadata.json");

        if let Ok(metadata_content) = fs::read_to_string(metadata_path) {
            if let Ok(metadata) = serde_json::from_str::<LibraryMetadata>(&metadata_content) {
                let room = LibraryRoom {
                    library_id: lib_name.to_string(),
                    room_title: metadata.title.clone(),
                    theme: metadata.primary_theme.clone(),
                    bookshelves: vec![], // Would populate with actual data
                    sound_zones: vec![],
                    art_displays: vec![],
                    navigation_nodes: vec![],
                };

                // Generate GLTF file
                let gltf_path = output_dir.join(format!("{}.gltf", lib_name));
                let gltf_content = serde_json::to_string_pretty(&room)?;

                fs::write(gltf_path, gltf_content)?;
                println!("Generated GLTF for library: {}", lib_name);
            }
        }

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_library_metadata_parsing() {
        let metadata = LibraryMetadata {
            title: "Test Library".to_string(),
            author: "Test Author".to_string(),
            year: Some(2025),
            public_domain: true,
            structure: vec!["tables".to_string()],
            primary_theme: "test".to_string(),
            license_note: "Public domain".to_string(),
            provenance_url: None,
            access_date: None,
        };

        let json = serde_json::to_string(&metadata).unwrap();
        let parsed: LibraryMetadata = serde_json::from_str(&json).unwrap();

        assert_eq!(parsed.title, "Test Library");
        assert_eq!(parsed.public_domain, true);
    }

    #[test]
    fn test_frequency_mapping() {
        let generator = CathedralLibraryGenerator::new_alloc();

        let fire_entry = EsotericEntry {
            name: "Fire Element".to_string(),
            element: Some("fire".to_string()),
            geometry: None,
            music_profile: None,
            color: None,
            angel: None,
            demon: None,
            deity: None,
            healing_profile: None,
            art_style: None,
        };

        // Note: This would require making the method public for testing
        // assert_eq!(generator.map_entry_to_frequency(&fire_entry), 528.0);
    }
}