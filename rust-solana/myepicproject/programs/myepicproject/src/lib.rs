use anchor_lang::prelude::*;

declare_id!("Gon2VYM1roqdiSPnC9fAnBhL1ENJFVXm56aNZmRqjxjH");

#[program]
pub mod myepicproject {
    use super::*;

    pub fn start_stuff_off(_ctx: Context<StartStuffOff>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StartStuffOff {}
