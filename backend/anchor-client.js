const anchor = require('@project-serum/anchor');
const { Connection, PublicKey, Keypair } = require('@solana/web3.js');

const PROGRAM_ID = new PublicKey('Bq4QmQrY2Cys6hSVAatYsWTbbrJczFsxVWQYTaUhoX65');
const NETWORK = 'https://api.devnet.solana.com';

const connection = new Connection(NETWORK, 'confirmed');
const provider = new anchor.AnchorProvider(connection, new anchor.Wallet(Keypair.generate()), {});
anchor.setProvider(provider);

const program = new anchor.Program(require('./idl.json'), PROGRAM_ID);

async function initializeProgram() {
  await program.methods.initialize().rpc();
}

async function analyzeFood(userPublicKey, analysisData) {
  const analysis = anchor.web3.Keypair.generate();
  await program.methods
    .analyzeFood(JSON.stringify(analysisData))
    .accounts({
      analysis: analysis.publicKey,
      user: userPublicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([analysis])
    .rpc();
  return analysis.publicKey;
}

module.exports = { initializeProgram, analyzeFood };