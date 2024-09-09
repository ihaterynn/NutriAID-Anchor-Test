import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { NutriaidSolana } from "../target/types/nutriaid_solana";
import { expect } from 'chai';

describe("nutriaid_solana", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.NutriaidSolana as Program<NutriaidSolana>;

  it("Initializes the program", async () => {
    // Add your test here
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Analyzes food", async () => {
    const foodAnalysis = anchor.web3.Keypair.generate();
    await program.methods.analyzeFood("Apple")
      .accounts({
        user: provider.wallet.publicKey,
        foodAnalysis: foodAnalysis.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([foodAnalysis])
      .rpc();

    // Add assertions here to check if the food was analyzed correctly
  });
});