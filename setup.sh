#!/bin/bash

set -e

# Function to print error messages
error() {
    echo "Error: $1" >&2
    exit 1
}

# Detect and convert Windows line endings if necessary
if [[ "$(head -c 2 "$0")" == $'\r\n' ]]; then
    echo "Converting Windows line endings to Unix..."
    sed -i 's/\r$//' "$0"
    exec bash "$0" "$@"
fi

# Check for WSL
if ! grep -qi microsoft /proc/version; then
    error "This script is designed for WSL. Please run in a WSL environment or adapt for your OS."
fi

echo "WSL detected. Proceeding with setup..."

# Update and upgrade packages
echo "Updating and upgrading packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js v16 using nvm
echo "Installing Node.js v16..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 16
nvm use 16

# Install Rust
echo "Installing Rust..."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

# Update Rust and install required components
rustup update
rustup component add rustfmt clippy

# Install Solana CLI (version 1.16.18)
echo "Installing Solana CLI v1.16.18..."
sh -c "$(curl -sSfL https://release.solana.com/v1.16.18/install)"

# Update PATH
echo "Updating PATH..."
export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"
echo 'export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install or update Anchor
echo "Installing or updating Anchor..."
if command -v avm &> /dev/null; then
    echo "AVM (Anchor Version Manager) is already installed. Updating Anchor..."
    avm update
    avm use latest
else
    echo "Installing AVM and latest Anchor..."
    cargo install --git https://github.com/coral-xyz/anchor avm --locked
    avm install latest
    avm use latest
fi

# Verify installations
echo "Verifying installations..."
node --version || error "Node.js installation failed"
npm --version || error "npm installation failed"
cargo --version || error "Cargo installation failed"
solana --version || error "Solana installation failed"
anchor --version || error "Anchor installation failed"

# Setup Solana wallet
echo "Setting up Solana wallet..."
solana-keygen new --no-bip39-passphrase

# Clean up existing node_modules and package-lock.json
echo "Cleaning up existing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json
cd frontend && rm -rf node_modules package-lock.json && cd ..
cd backend && rm -rf node_modules package-lock.json && cd ..
cd nutriaid_solana && rm -rf node_modules package-lock.json && cd ..

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend && npm install && cd ..

# Install Solana program dependencies
echo "Installing Solana program dependencies..."
cd nutriaid_solana && npm install && cd ..

# Build Solana program
echo "Building Solana program..."
cd nutriaid_solana && anchor build && cd ..

echo "Setup complete! You can now run 'npm start' to launch the application."