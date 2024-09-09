#!/bin/bash

# Check for WSL
if grep -q Microsoft /proc/version; then
    echo "WSL detected. Proceeding with setup..."
else
    echo "This script is designed for WSL. Please run in a WSL environment or adapt for your OS."
    exit 1
fi

# Install Rust and Cargo
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/v1.14.17/install)"

# Install Anchor
cargo install --git https://github.com/project-serum/anchor avm --locked --force
avm install latest
avm use latest

# Setup Solana wallet
solana-keygen new --no-bip39-passphrase

# Install project dependencies
npm run install-all

# Build Solana program
npm run build-solana

echo "Setup complete! You can now run 'npm start' to launch the application."