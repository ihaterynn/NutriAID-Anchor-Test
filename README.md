# NutriAID 🍏

NutriAID is a React application that helps users make informed dietary choices by analyzing food labels using Optical Character Recognition (OCR) and Solana blockchain integration.

## Prerequisites

- Windows Subsystem for Linux (WSL) or a Linux/macOS environment
- Node.js (v16 or later)
- npm (usually comes with Node.js)
- Visual Studio Code with Remote - WSL extension installed

## Quick Start

For Windows users with WSL installed:

1. Open WSL terminal (Windows PowerShell or Command Prompt):
   ```
   wsl
   ```

2. Navigate to your project directory:
   ```
   cd /mnt/c/Users/YourUsername/path/to/NutriAID
   ```

3. Open the project in Visual Studio Code:
   ```
   code .
   ```
   This will open VS Code with WSL integration. If prompted, install the Remote - WSL extension in VS Code.

4. In the VS Code terminal (which should now be a WSL terminal), run the setup script:
   ```
   npm run setup
   ```

5. Start the development servers:
   ```
   npm start
   ```

6. Open your web browser and go to http://localhost:3000 to use the application.

For Linux/macOS users:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/NutriAID.git
   cd NutriAID
   ```

2. Run the setup script:
   ```
   npm run setup
   ```

3. Start the development servers:
   ```
   npm start
   ```

4. Open your web browser and go to http://localhost:3000 to use the application.

## Manual Setup

If the quick start doesn't work for you, follow these steps:

1. Ensure you have the following installed:
   - Rust and Cargo
   - Solana CLI tools
   - Anchor framework

2. Clone the repository and navigate to the project directory.

3. Install all dependencies:
   ```
   npm run install-all
   ```

4. Build the Solana program:
   ```
   npm run build-solana
   ```

5. Start the development servers:
   ```
   npm start
   ```

## Deployment

To deploy the frontend to GitHub Pages:
npm run deploy
GitHub Pages: https://ihaterynn.github.io/NutriAID/ 


## Troubleshooting

If you encounter any issues:
- Ensure all prerequisites are correctly installed
- Make sure you're using the correct versions of Node.js, Rust, and Solana
- Check that your Solana wallet is properly configured for devnet

For more detailed instructions or if you're new to Solana development, please refer to our [Detailed Setup Guide](link-to-guide).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
