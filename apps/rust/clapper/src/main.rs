// use clap::Parser;

/// Simple program to greet a person
#[derive(clap::Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
  /// Name of the person to greet
  #[arg(short, long)]
  name: String,

  /// Number of times to greet
  #[arg(short, long, default_value_t = 1)]
  count: u8,
}

#[derive(Clone, PartialEq, Eq, clap::ValueEnum)]
enum OutputMode {
  Pretty,
  Yaml,
}

impl OutputMode {
  fn as_str(&self) -> &'static str {
    match self {
      Self::Pretty => "pretty",
      Self::Yaml => "yaml",
    }
  }
}

#[derive(Clone, PartialEq, Eq, Debug, clap::ValueEnum)]
enum Verb {
  Get,
  Delete,
  Edit,
  Watch,
  Apply,
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
