use anchor_lang::prelude::*;

declare_id!("Bq4QmQrY2Cys6hSVAatYsWTbbrJczFsxVWQYTaUhoX65");

#[program]
pub mod nutriaid_solana {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn analyze_food(ctx: Context<AnalyzeFood>, food_name: String) -> Result<()> {
        let food_analysis = &mut ctx.accounts.food_analysis;
        food_analysis.data = food_name; // Store the food name in the analysis
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AnalyzeFood<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 200 // Adjust the space as needed
    )]
    pub food_analysis: Account<'info, Analysis>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Analysis {
    pub data: String,
}
