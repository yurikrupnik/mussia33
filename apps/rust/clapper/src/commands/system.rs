// use crate::ClusterSubcommand;
use clap::Parser;

#[derive(Parser, Debug)]
pub struct SystemSubcommand {
    #[clap(subcommand)]
    pub action: SystemAction,
}

#[derive(Parser, Debug)]
pub enum SystemAction {
    // #[clap(about = "Create a new system")]
    Create(CreateSystem),
    // #[clap(about = "Update a system")]
    Update(UpdateSystem),
    // #[clap(about = "Delete a system")]
    Delete(DeleteSystem),
    // #[clap(about = "Read systems")]
    Read,
}
#[derive(Parser, Debug)]
pub struct CreateSystem {
    // #[clap(about = "System name")]
    name: String,
}
#[derive(Parser, Debug)]
pub struct DeleteSystem {
    // #[clap(about = "System ID")]
    // id: String,
}
#[derive(Parser, Debug)]
pub struct UpdateSystem {
    // #[clap(about = "System ID")]
    id: String,
    // #[clap(about = "New system name")]
    name: String,
}
