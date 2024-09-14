# Use Ubuntu 20.04 as the base image
FROM ubuntu:20.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages
RUN apt-get update && apt-get install -y curl build-essential pkg-config libssl-dev libudev-dev python3 git

# Install Rust 1.75.0
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain 1.75.0
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Solana CLI version 1.16.18
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.16.18/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Install Anchor CLI version 0.26.0
RUN cargo install --git https://github.com/coral-xyz/anchor --tag v0.26.0 anchor-cli --locked

# Verify installationsuiwedeuwjdjj run scusto== version .ioueudjieij h
RUN rustc --version && \
    cargo --version && \
    solana --version && \
    anchor --version

# Set the working directory in the container
WORKDIR /app

# Copy Solana program files first
COPY nutriaid_solana/Anchor.toml nutriaid_solana/Cargo.toml ./nutriaid_solana/
COPY nutriaid_solana/programs ./nutriaid_solana/programs

# Update Cargo.toml in the Solana program directory
RUN sed -i 's/^solana-program = .*/solana-program = "~1.16.18"/' nutriaid_solana/programs/nutriaid_solana/Cargo.toml

# Build the Solana program
RUN cd nutriaid_solana && \
    cargo update && \
    anchor build

# Now proceed with the rest of the application setup
# Install Node.js 16.x
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# Copy package.json and package-lock.json for all parts of the project
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
COPY nutriaid_solana/package*.json ./nutriaid_solana/

# Install dependencies
RUN npm run install-all

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Expose ports for frontend and backend
EXPOSE 3000 3001

# Start the application
CMD ["npm", "start"]