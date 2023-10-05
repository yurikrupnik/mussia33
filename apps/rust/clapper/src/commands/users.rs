use clap::Parser;
// use crate::ClusterSubcommand;

#[derive(Parser, Debug)]
pub struct UsersSubcommand {
    #[clap(subcommand)]
    pub action: UserAction,
}

#[derive(Parser, Debug)]
pub enum UserAction {
    // #[clap(about = "Create a new User")]
    Create(CreateUser),
    // #[clap(about = "Update a User")]
    Update(UpdateUser),
    // #[clap(about = "Delete a User")]
    Delete(DeleteUser),
    // #[clap(about = "Read Users")]
    Read,
}

#[derive(Parser, Debug)]
pub struct CreateUser {
    // #[clap(about = "User name")]
    name: String,
}
#[derive(Parser, Debug)]
pub struct DeleteUser {
    // #[clap(about = "User ID")]
    id: String,
}
#[derive(Parser, Debug)]
pub struct UpdateUser {
    // #[clap(about = "User ID")]
    id: String,
    // #[clap(about = "New User name")]
    name: String,
}
