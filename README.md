# NutriAID

<p>Welcome to <strong>NutriAID</strong>, a Node.js-based application designed to help users make informed dietary choices by analyzing food labels. The program uses Optical Character Recognition (OCR) to extract text from food label images and assess the content against predefined health conditions and dietary preferences.</p>

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Node.js (version 14.x or later recommended)
* You have a Windows/Linux/Mac machine

## Installing NutriAID

To install NutriAID, follow these steps:

1. Clone the repository
2. Navigate to the project directory

### Backend Setup

1. Change to the backend directory:
   ```
   cd NutriAID/backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory and add necessary environment variables:
   ```
   PORT=3000
   SOLANA_RPC_URL=your_solana_rpc_url
   USER_PUBLIC_KEY=your_public_key
   ```

### Frontend Setup

1. Change to the frontend directory:
   ```
   cd NutriAID/frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Running NutriAID

To run NutriAID, follow these steps:

1. Start the backend server:
   ```
   cd NutriAID/backend
   npm start
   ```
   The server will start running on `http://localhost:3000` (or the port specified in your .env file)

2. In a new terminal, start the frontend development server:
   ```
   cd NutriAID/frontend
   npm start
   ```
   The React development server will start and should automatically open the application in your default web browser.

3. Upload a clear and legible image of a food label to the application. Ensure that the text in the image is not blurry for better accuracy.

4. Follow the prompts in the application to analyze the food label and receive feedback on potential dietary concerns.

## Dependencies

### Backend Dependencies

- @solana/web3.js: ^1.95.3
- dotenv: ^16.4.5
- express: ^4.19.2
- multer: ^1.4.5-lts.1
- tesseract.js: ^5.1.1
- cors: ^2.8.5

### Frontend Dependencies

- @solana/wallet-adapter-react: ^0.15.35
- axios: ^1.7.7
- react: ^18.3.1
- react-dom: ^18.3.1
- react-scripts: ^5.0.1
- web-vitals: ^2.1.4

## Troubleshooting

If you encounter any issues during setup or running the application:

1. Ensure all dependencies are installed:
   ```
   npm install
   ```
   Run this command in both the backend and frontend directories.

2. If you encounter module not found errors, try cleaning npm cache and reinstalling:
   ```
   npm cache clean --force
   npm install
   ```

3. For native module build issues (e.g., with bigint):
   ```
   npm rebuild
   ```

4. Ensure your Node.js version is compatible (v14.x or later recommended).

## Additional Configuration

- Make sure to set up any necessary environment variables in a `.env` file in the backend directory.
- If you're using Solana integration, ensure you have the appropriate Solana network configuration and wallet setup.

## ⚠️ Disclaimer

Please note the following:

* **Basic Functionalities:** NutriAID is a prototype and includes only basic functionalities.
* **OCR Precision:** The OCR used for text extraction is not always precise or perfect. Some text may not be accurately captured or interpreted.
* **Not for Actual Use:** NutriAID is intended for demonstration and educational purposes only. Do not rely on it for making actual dietary or health decisions.

## Contributing to NutriAID

To contribute to NutriAID, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).