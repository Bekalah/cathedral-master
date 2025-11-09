#!/usr/bin/env python3
"""
PATTERN-SCIENCE FORGE: Text to Game Tiles
Converts public-domain paragraphs into playable board game tiles
Each tile has unique connections and powers based on text content
"""

from sigilise import sigilise
from colour import textToHSL
import json
from pathlib import Path

def para_to_tile(paragraph: str) -> dict:
    """
    Convert any paragraph into a playable game tile

    Args:
        paragraph: Text to convert (30-300 chars recommended)

    Returns:
        Tile data with connections, power, and visual elements
    """
    assert 30 < len(paragraph) < 300, "Paragraph must be 30-300 characters"

    # Generate unique ID from sigil
    tile_id = sigilise(paragraph)[-16:-8]  # 8-hex unique ID

    # Generate PNG sigil (base64 encoded)
    png_sigil = sigilise(paragraph)

    # Generate color from text
    hsl_color = textToHSL(paragraph)

    # Extract power from last sentence (game mechanic)
    sentences = paragraph.split('.')
    power_text = sentences[-1].strip() if sentences else "Default power"

    # Generate connections (N-E-S-W) based on word count
    word_count = len(paragraph.split())
    connections = {
        "north": word_count % 4 == 0,
        "east": word_count % 3 == 0,
        "south": word_count % 2 == 0,
        "west": word_count % 5 == 0
    }

    return {
        "id": tile_id,
        "png": png_sigil,
        "colour": hsl_color,
        "power": power_text,
        "connections": connections,
        "source_paragraph": paragraph[:100] + "..." if len(paragraph) > 100 else paragraph
    }

def export_tile_set(tiles: list, output_file: str = "tile_set.json"):
    """Export tile set to JSON for Godot TileSet import"""
    tile_set = {
        "name": "Public Domain Tile Set",
        "tiles": tiles,
        "rules": {
            "connection_rules": "Tiles connect via matching boolean values",
            "power_activation": "Last sentence triggers when tile is placed",
            "color_meaning": "HSL represents paragraph's emotional tone"
        }
    }

    Path(output_file).write_text(json.dumps(tile_set, indent=2))
    print(f"Tile set exported to {output_file}")

if __name__ == "__main__":
    # Example usage with public domain text
    sample_paragraphs = [
        "The moon hung low in the sky, casting silver light across the ancient stones. Whispers of forgotten magic stirred in the cool night air.",
        "Deep within the forest, a hidden grove contained secrets older than memory. The trees themselves seemed to guard ancient wisdom.",
        "Stars wheeled overhead in their eternal dance, marking the passage of time that humans could scarcely comprehend."
    ]

    tiles = [para_to_tile(p) for p in sample_paragraphs]
    export_tile_set(tiles)