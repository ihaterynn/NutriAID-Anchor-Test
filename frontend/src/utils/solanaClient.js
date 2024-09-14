import { PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from './nutriaid_solana.json';
import apiUrl from '../config/api';

const programID = new PublicKey('Bq4QmQrY2Cys6hSVAatYsWTbbrJczFsxVWQYTaUhoX65');
const opts = {
  preflightCommitment: "processed"
};

export const analyzeFood = async (analysisSummary, wallet, connection) => {
  if (!wallet || !connection) {
    throw new Error("Wallet or connection not provided");
  }

  const provider = new AnchorProvider(connection, wallet, opts);
  const program = new Program(idl, programID, provider);

  const foodAnalysis = web3.Keypair.generate();

  try {
    // Make API call to backend
    const response = await fetch(`${apiUrl}/analyze-food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ analysisSummary }),
    });
    const result = await response.json();

    const account = await program.account.analysis.fetch(foodAnalysis.publicKey);
    return {
      data: account.data,
      publicKey: foodAnalysis.publicKey
    };
  } catch (err) {
    console.error("Transaction error: ", err);
    throw err;
  }
};