use clap::Parser;

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
  /// Name of the person to greet
  #[arg(short, long)]
  name: String,

  /// Number of times to greet
  #[arg(short, long, default_value_t = 1)]
  count: u8,
}

fn main() {
  let args = Args::parse();

  // let cmd = clap::Command::new("build-configs")
  //   .bin_name("build-configs")
  //   .subcommand_required(true)
  //   .subcommand(clap::command!("generate"));
  for _ in 0..args.count {
    println!("Hello {}!", args.name)
  }
}
