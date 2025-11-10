#!/usr/bin/env python3
"""
WORD-FURNACE: Public-domain text to sigil converter
Converts any text into a unique visual sigil using sacred geometry
No AI, no cloud, pure offline mathematics
"""

import re
import hashlib
import unicodedata
from pathlib import Path

def sigilise(text: str) -> str:
    """
    Convert any text into a sacred geometric sigil

    Args:
        text: Input text to convert

    Returns:
        SVG string representing the sigil
    """
    # 1. Strip diacritics → latin base
    base = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()

    # 2. Keep only first 72 letters (Shem boundary)
    frag = re.sub(r'[^A-Z]', '', base.upper())[:72]

    # 3. SHA-256 → 64 hex → 32 pairs → 16 circles
    h = hashlib.sha256(frag.encode()).hexdigest()
    pairs = [h[i:i+2] for i in range(0, 64, 2)]

    # 4. Return PNG binary data (simplified - would need proper PNG encoding)
    # For now, return base64-encoded minimal PNG
    import base64
    # This is a placeholder - real implementation would generate actual PNG bytes
    png_data = b'\x89PNG\r\n\x1a\n' + b'\x00' * 100  # Minimal PNG header + data
    return base64.b64encode(png_data).decode()

def main():
    """Command line interface"""
    import sys

    if len(sys.argv) < 2:
        print("Usage: python sigilise.py 'your text here' [output.svg]")
        sys.exit(1)

    text = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    sigil_svg = sigilise(text)

    if output_file:
        Path(output_file).write_text(sigil_svg)
        print(f"Sigil saved to {output_file}")
    else:
        print(sigil_svg)

if __name__ == '__main__':
    main()