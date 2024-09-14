#!/bin/bash

set -e

# Function to print error messages
error() {
    echo "Error: $1" >&2
    exit 1
}

# Check for necessary tools
command -v curl >/dev/null 2>&1 || error "curl is required but not installed."
command -v git >/dev/null 2>&1 || error "git is required but not installed."

# Install Rust 1.75.0
if ! command -v rustc >/dev/null 2>&1; then
    echo "Installing Rust 1.75.0..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain 1.75.0
    source $HOME/.cargo/env
else
    echo "Rust is already installed. Ensuring version 1.75.0..."
    rustup default 1.75.0
fi

# Install Solana CLI version 1.16.18
if ! command -v solana >/dev/null 2>&1; then
    echo "Installing Solana CLI 1.16.18..."
    sh -c "$(curl -sSfL https://release.solana.com/v1.16.18/install)"
    export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
else
    echo "Solana CLI is already installed. Ensuring version 1.16.18..."
    solana-install update --version 1.16.18
fi

# Install Anchor CLI version 0.26.0
if ! command -v anchor >/dev/null 2>&1; then
    echo "Installing Anchor CLI 0.26.0..."
    cargo install --git https://github.com/coral-xyz/anchor --tag v0.26.0 anchor-cli --locked
else
    echo "Anchor CLI is already installed. Ensuring version 0.26.0..."
    cargo install --git https://github.com/coral-xyz/anchor --tag v0.26.0 anchor-cli --locked --force
fi

# Install Node.js 16.x
if ! command -v node >/dev/null 2>&1; then
    echo "Installing Node.js 16.x..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js is already installed. Ensuring version 16.x..."
    sudo n 16
fi

# Verify installations
echo "Verifying installations..."
rustc --version | grep "1.75.0" || error "Rust 1.75.0 installation failed"
solana --version | grep "1.16.18" || error "Solana 1.16.18 installation failed"
anchor --version | grep "0.26.0" || error "Anchor 0.26.0 installation failed"
node --version | grep "v16" || error "Node.js 16.x installation failed"
npm --version || error "npm installation failed"

# Update Cargo.toml in the Solana program directory
echo "Updating Cargo.toml..."
sed -i 's/^solana-program = .*/solana-program = "~1.16.18"/' nutriaid_solana/programs/nutriaid_solana/Cargo.toml

# Install project dependencies
echo "Installing project dependencies..."
npm run install-all

# Build Solana program
echo "Building Solana program..."
cd nutriaid_solana && cargo update && anchor build && cd ..

# Build frontend
echo "Building frontend..."
cd frontend && npm run build && cd ..

echo "Setup complete! You can now run 'npm start' to launch the application."