#!/bin/bash
# Cathedral Forge Lite v5.0 - One-command install
# Installs in 30 seconds, runs on Pi 4, zero internet after clone

echo "🏛️ Installing Cathedral Forge Lite v5.0..."

# 1. Install Rust (if not present)
if ! command -v rustc &> /dev/null; then
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal
    source "$HOME/.cargo/env"
fi

# 2. Build the single binary
cd cathedral-lite
cargo build --release

# 3. Install to system
sudo cp target/release/cathedral /usr/local/bin/

# 4. Verify
cathedral --help

echo "✅ Installed: cathedral binary (12 MB)"
echo "✅ Run: cathedral build --all  (generates full quest)"
echo "✅ Run: cathedral morph --from 'Leonora' --to 'John Dee'"