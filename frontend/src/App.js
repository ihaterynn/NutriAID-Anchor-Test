import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import Homepage from './pages/Homepage';
import AnalysisPage from './pages/AnalysisPage';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectButton = () => {
  const { connect, connected } = useWallet();

  const handleConnect = async () => {
    console.log("Attempting to connect...");
    if (!connected) {
      try {
        await connect();
        console.log("Connection successful");
      } catch (error) {
        console.error("Connection failed:", error);
      }
    }
  };

  return (
    <button onClick={handleConnect} disabled={connected}>
      {connected ? 'Connected' : 'Connect Wallet'}
    </button>
  );
};

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <div className="App">
            <WalletConnectButton />
            <Router basename="/NutriAID">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/analysis" element={<AnalysisPage />} />
              </Routes>
            </Router>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;