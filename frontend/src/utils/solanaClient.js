import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import idl from './nutriaid_solana.json'; // You'll need to export this from your Solana project

const programID = new PublicKey('Bq4QmQrY2Cys6hSVAatYsWTbbrJczFsxVWQYTaUhoX65');
const opts = {
  preflightCommitment: "processed"
};

export const getProvider = () => {
  const connection = new Connection("https://api.devnet.solana.com", opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection, 
    window.solana, 
    opts.preflightCommitment,
  );
  return provider;
};

export const analyzeFood = async (foodName) => {
  const provider = getProvider();
  const program = new Program(idl, programID, provider);

  const foodAnalysis = web3.Keypair.generate();

  try {
    await program.methods.analyzeFood(foodName)
      .accounts({
        user: provider.wallet.publicKey,
        foodAnalysis: foodAnalysis.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([foodAnalysis])
      .rpc();

    const account = await program.account.analysis.fetch(foodAnalysis.publicKey);
    return {
      data: account.data,
      publicKey: foodAnalysis.publicKey
    };
  } catch (err) {
    console.error("Transaction error: ", err);
    throw err; // Re-throw the error so it can be caught in UploadComponent
  }
};