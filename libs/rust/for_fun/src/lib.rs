use clap::Parser;
extern crate cpuid;

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

fn call_cli() {
  let args = Args::parse();
  for _ in 0..args.count {
    println!("Hello {}!", args.name)
  }
}

fn call_cpu() {
  call_cli();
  match cpuid::identify() {
    Ok(info) => {
      println!("Found: {} CPU, model: {}", info.vendor, info.codename);
      println!("The full brand string is: {}", info.brand);
      println!("Hardware AES support: {}", if info.has_feature(cpuid::CpuFeature::AES) { "yes" } else { "no" });
    },
    Err(err) => println!("cpuid error: {}", err),
  };
  match cpuid::clock_frequency() {
    Some(frequency) => println!("CPU speed: {} MHz", frequency),
    None => println!("Couldn't get CPU speed."),
  };
}


#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
