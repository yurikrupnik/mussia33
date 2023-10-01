use clap::Parser;
#[derive(Parser, Debug)]
pub struct ClusterSubcommand {
    #[clap(subcommand)]
    pub action: ClusterAction,
}

#[derive(Parser, Debug)]
pub enum ClusterAction {
    // #[clap(about = "Create a new system")]
    Create(CreateCluster),
    // #[clap(about = "Update a system")]
    Update(UpdateCluster),
    // #[clap(about = "Delete a system")]
    Delete(DeleteCluster),
    // #[clap(about = "Read systems")]
    Read,
}

#[derive(Parser, Debug)]
pub struct CreateCluster {
    // #[clap(about = "System name")]
    #[arg(short, long)]
    name: String,
}
#[derive(Parser, Debug)]
pub struct DeleteCluster {
    // #[clap(about = "System ID")]
    #[arg(short, long)]
    id: String,
}
#[derive(Parser, Debug)]
pub struct UpdateCluster {
    #[arg(short, long)]
    id: String,
    // #[clap(about = "New system name")]
    #[arg(short, long)]
    name: String,
}
