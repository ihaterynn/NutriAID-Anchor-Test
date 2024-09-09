import React, { useState, useMemo } from 'react';
import UploadComponent from './components/UploadComponent';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  // Set up wallet connection
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="App">
            <h1>NutriAID: Analyze Food Labels</h1>
            <WalletMultiButton />
            <UploadComponent onAnalysisComplete={handleAnalysisComplete} />
            {analysisResult && (
              <div>
                <h2>Analysis Result</h2>
                <p>Recommendation: {analysisResult.recommendation}</p>
                {analysisResult.concerns.length > 0 && (
                  <div>
                    <h3>Concerns:</h3>
                    <ul>
                      {analysisResult.concerns.map((concern, index) => (
                        <li key={index}>{concern}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysisResult.harmfulIngredients.length > 0 && (
                  <div>
                    <h3>Potentially Harmful/Unhealthy Ingredients:</h3>
                    <ul>
                      {analysisResult.harmfulIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {analysisResult.solanaAnalysis && (
                  <div>
                    <h3>Solana Analysis Result:</h3>
                    <p>{analysisResult.solanaAnalysis}</p>
                  </div>
                )}
                {analysisResult.analysisPubkey && (
                  <div>
                    <h3>Analysis Public Key:</h3>
                    <p>{analysisResult.analysisPubkey}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;