//! Stone Grimoire Library Engine
//!
//! Offline-first library generator for sacred/occult datasets feeding the Stone Grimoire,
//! sound chapels, and art chapels in your Cathedral ecosystem.
//!
//! Hybrid strategy (per user selection: Hybrid C):
//! - Phase 1 (now): Offline deterministic generator
//!     - Scans `/data-libraries/**/metadata.json`
//!     - Builds a unified registry JSON used by Godot + web + tools
//!     - (Optionally) emits simple `.tscn` scene blueprints for chapels/rooms
//! - Phase 2 (later): Runtime gdextension
//!     - Loads the registry in Godot 4.x
//!     - Spawns 3D library rooms, soundscapes, and art chapels dynamically
//!
//! Design goals:
//! - Pure data-driven, no hallucinated content
//! - Respect provenance and licenses
//! - Stable schema so other engines (web, Rust, Godot) can consume the same registry
//! - Safe to run repeatedly (idempotent) and integrate into your build system

use serde::{Deserialize, Serialize};
use std::fs;
use std::io;
use std::path::{Path, PathBuf};

/// Root configuration for where to read/write library data.
#[derive(Debug, Clone)]
pub struct EngineConfig {
    /// Path to the root data-libraries directory (e.g. "./data-libraries").
    pub data_root: PathBuf,
    /// Output path for the unified registry JSON.
    pub registry_output: PathBuf,
    /// Optional output directory for generated Godot scene blueprints.
    pub godot_scenes_output: Option<PathBuf>,
}

/// Minimal metadata schema for a single text/library.
/// This is intentionally conservative and ND-safe.
///
/// Example metadata.json:
/// {
///   "id": "liber_777",
///   "title": "Liber 777",
///   "author": "Aleister Crowley",
///   "year": 1909,
///   "public_domain": true,
///   "primary_theme": "correspondences",
///   "license_note": "Public domain / source: sacred-texts.com",
///   "source_url": "https://www.sacred-texts.com/oto/777.htm"
/// }
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryMetadata {
    pub id: String,
    pub title: String,
    pub author: Option<String>,
    pub year: Option<i32>,
    pub public_domain: Option<bool>,
    pub primary_theme: Option<String>,
    pub license_note: Option<String>,
    pub source_url: Option<String>,
    /// Optional: structure hints like ["tables", "commentary", "verses"].
    #[serde(default)]
    pub structure: Vec<String>,
}

/// Chapel/thematic classification for spatial/audio integration.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChapelProfile {
    /// High-level classification, e.g. "kabbalah", "iching", "soyga", "alchemy".
    pub domain: String,
    /// Which Stone Grimoire wing / chapel this belongs to, e.g. "kabbalah_chapel".
    pub chapel_id: String,
    /// Recommended color / light profile, e.g. "#ffffff" or a named gradient preset.
    pub color_profile: Option<String>,
    /// Suggested soundscape key, resolved by your sound engine.
    pub sound_profile: Option<String>,
    /// Optional icon / sigil resource path.
    pub icon: Option<String>,
}

/// One entry in the unified registry, joined from metadata + inferred chapel profile.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryEntry {
    pub id: String,
    pub title: String,
    pub path: String,
    pub metadata: LibraryMetadata,
    pub chapel: ChapelProfile,
}

/// Top-level registry format written to JSON.
/// Godot, web frontends, and tools read this instead of crawling directories.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryRegistry {
    pub version: String,
    pub generated_by: String,
    pub root: String,
    pub libraries: Vec<LibraryEntry>,
}

/// High-level entrypoint:
/// - walks data_root
/// - discovers libraries
/// - writes registry JSON
/// - optionally emits minimal .tscn chapel scenes
pub fn generate_registry(config: &EngineConfig) -> io::Result<LibraryRegistry> {
    let mut entries = Vec::new();

    if !config.data_root.exists() {
        return Err(io::Error::new(
            io::ErrorKind::NotFound,
            format!("data_root not found: {}", config.data_root.display()),
        ));
    }

    for entry in fs::read_dir(&config.data_root)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() {
            if let Some(lib) = load_library_from_folder(&path)? {
                entries.push(lib);
            }
        }
    }

    let registry = LibraryRegistry {
        version: "1.0.0".to_string(),
        generated_by: "stone-grimoire-library-engine".to_string(),
        root: path_to_string(&config.data_root),
        libraries: entries,
    };

    // Write registry JSON
    if let Some(parent) = config.registry_output.parent() {
        fs::create_dir_all(parent)?;
    }
    let json = serde_json::to_string_pretty(&registry)
        .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("serialize registry: {e}")))?;
    fs::write(&config.registry_output, json)?;

    // Optionally emit simple Godot scenes for each entry (Phase 1A).
    if let Some(scene_root) = &config.godot_scenes_output {
        emit_godot_scenes(scene_root, &registry)?;
    }

    Ok(registry)
}

/// Attempt to load a single library from a folder:
/// - Requires metadata.json
/// - Derives chapel profile by folder name / metadata
fn load_library_from_folder(folder: &Path) -> io::Result<Option<LibraryEntry>> {
    let metadata_path = folder.join("metadata.json");
    if !metadata_path.exists() {
        // Not a library folder
        return Ok(None);
    }

    let raw = fs::read_to_string(&metadata_path)?;
    let mut meta: LibraryMetadata = serde_json::from_str(&raw).map_err(|e| {
        io::Error::new(
            io::ErrorKind::InvalidData,
            format!(
                "Invalid metadata.json in {}: {e}",
                folder.display()
            ),
        )
    })?;

    // If id missing, derive from folder name.
    if meta.id.trim().is_empty() {
        meta.id = folder
            .file_name()
            .and_then(|s| s.to_str())
            .unwrap_or("unknown_library")
            .to_string();
    }

    let chapel = infer_chapel_profile(folder, &meta);
    let entry = LibraryEntry {
        id: meta.id.clone(),
        title: meta.title.clone(),
        path: path_to_string(folder),
        metadata: meta,
        chapel,
    };

    Ok(Some(entry))
}

/// Infer which chapel this belongs to based on id/title/domain.
/// This is deterministic and conservative; you can refine mappings later.
fn infer_chapel_profile(_folder: &Path, meta: &LibraryMetadata) -> ChapelProfile {
    let id = meta.id.to_lowercase();
    let title = meta.title.to_lowercase();

    // Kabbalistic / 777
    if id.contains("777") || title.contains("777") || id.contains("kabbalah") {
        return ChapelProfile {
            domain: "kabbalah".to_string(),
            chapel_id: "stone_grimoire/kabbalah_chapel".to_string(),
            color_profile: Some("#ffffff".to_string()),
            sound_profile: Some("choir_celestial".to_string()),
            icon: Some("res://icons/kabbalah_sigil.png".to_string()),
        };
    }

    // Liber AL / Thelemic current
    if id.contains("liber_al") || title.contains("liber al") {
        return ChapelProfile {
            domain: "thelemic".to_string(),
            chapel_id: "stone_grimoire/thelemic_oracle_chapel".to_string(),
            color_profile: Some("#ffcc00".to_string()),
            sound_profile: Some("solar_fanfare".to_string()),
            icon: Some("res://icons/liber_al_sigil.png".to_string()),
        };
    }

    // I Ching
    if id.contains("iching") || id.contains("i_ching") || title.contains("i ching") {
        return ChapelProfile {
            domain: "iching".to_string(),
            chapel_id: "stone_grimoire/hexagram_chamber".to_string(),
            color_profile: Some("#222222".to_string()),
            sound_profile: Some("water_metal_resonance".to_string()),
            icon: Some("res://icons/iching_trigram.png".to_string()),
        };
    }

    // Soyga / Enochian ciphers
    if id.contains("soyga") || id.contains("enoch") || title.contains("enochian") {
        return ChapelProfile {
            domain: "cipher".to_string(),
            chapel_id: "stone_grimoire/cipher_lab".to_string(),
            color_profile: Some("#330066".to_string()),
            sound_profile: Some("number_station_choir".to_string()),
            icon: Some("res://icons/soyga_square.png".to_string()),
        };
    }

    // Default chapel
    ChapelProfile {
        domain: "general_esoteric".to_string(),
        chapel_id: "stone_grimoire/unified_library".to_string(),
        color_profile: Some("#999999".to_string()),
        sound_profile: Some("ambient_library".to_string()),
        icon: Some("res://icons/library_default.png".to_string()),
    }
}

/// Emit minimal Godot .tscn blueprints for each library.
/// These are intentionally barebones: a Node3D with metadata stored in a child Label3D.
/// You (human) or downstream tools can later decorate them with real architecture and art.
fn emit_godot_scenes(root: &Path, registry: &LibraryRegistry) -> io::Result<()> {
    fs::create_dir_all(root)?;

    for lib in &registry.libraries {
        let scene_name = format!("{}_chapel.tscn", lib.id);
        let scene_path = root.join(scene_name);

        let contents = format!(
            r#"[gd_scene load_steps=2 format=3]

[node name="{title}_Chapel" type="Node3D"]
metadata/id = "{id}"
metadata/domain = "{domain}"
metadata/chapel_id = "{chapel_id}"
metadata/source_path = "{path}"

[node name="Label3D" type="Label3D" parent="."]
text = "{title}"
"#,
            id = escape_godot(&lib.id),
            title = escape_godot(&lib.title),
            domain = escape_godot(&lib.chapel.domain),
            chapel_id = escape_godot(&lib.chapel.chapel_id),
            path = escape_godot(&lib.path),
        );

        fs::write(scene_path, contents)?;
    }

    Ok(())
}

/// Helper: path to string; fall back to normalized display.
fn path_to_string(p: &Path) -> String {
    p.to_str()
        .map(|s| s.to_string())
        .unwrap_or_else(|| p.display().to_string())
}

/// Basic escaping for embedding strings into .tscn.
/// Keeps this minimal and deterministic; extend if you add richer text.
fn escape_godot(input: &str) -> String {
    input
        .replace('\\', "/")
        .replace('"', "\\\"")
        .replace('\n', " ")
}

// Optional: a small CLI-style helper (can be wired via a bin crate):
//
// fn main() {
//     let config = EngineConfig {
//         data_root: PathBuf::from("./data-libraries"),
//         registry_output: PathBuf::from("./data-libraries/registry.json"),
//         godot_scenes_output: Some(PathBuf::from("./godot/scenes/stone_grimoire/chapels")),
//     };
//
//     if let Err(e) = generate_registry(&config) {
//         eprintln!("Stone Grimoire Library Engine error: {e}");
//         std::process::exit(1);
//     }
// }
//
// For now, this module is designed to be invoked from your existing tooling or a thin wrapper.