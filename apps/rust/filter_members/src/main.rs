extern crate toml;
use clap::Parser;
use colored::*;
use std::fs::{read_to_string, write};
use toml::{from_str, Value};

/// Simple program to filter members in a Cargo.toml file.
#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// Name of the app to filter by.
    #[arg(short, long)]
    app: String,

    /// Path of where to save the filtered Cargo.toml.
    #[arg(short, long, default_value = "tmp/Cargo.toml")]
    path: String,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Args::parse();

    let app = &args.app;
    let path = &args.path;

    println!("{}", format!("Filtering members for app '{}'", &app).blue());

    // Read toml file
    let toml_str = read_to_string("Cargo.toml")?;

    // Parse the TOML string into a Value
    let mut parsed_toml: Value = from_str(&toml_str)?;

    // Get the members array
    let members = parsed_toml
        .get_mut("workspace")
        .and_then(|w| w.get_mut("members"))
        .and_then(|members| members.as_array_mut())
        .expect("Failed to get members");

    members.retain(|x| {
        x.as_str()
            .map(|s| s.contains("libs") || s.contains(app))
            .unwrap_or(false)
    });

    //check at least one member of apps is present
    let has_apps = members
        .iter()
        .any(|x| x.as_str().map(|s| s.contains(app)).unwrap_or(false));

    // expect!(!has_apps, "No members contain the string 'apps'");
    if !has_apps {
        // Print an error in red
        eprintln!("{}", "No members contain the string 'apps'".red());
        return Err("No members contain the string 'apps'".into());
    }

    // Write the modified TOML to a new file
    let modified_toml_str = toml::to_string(&parsed_toml)?;

    write(path, modified_toml_str)?;
    println!(
        "{}",
        format!("Filtered TOML file saved as '{}'", path).blue()
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    // use std::fs::remove_file;

    #[test]
    fn test_args_parsing() {
        let args = vec!["program", "--app", "my_app", "--path", "/tmp/Cargo.toml"];
        let args = Args::parse_from(args);
        assert_eq!(args.app, "my_app");
        assert_eq!(args.path, "/tmp/Cargo.toml");
    }
    #[test]
    fn test_toml_filtering() {
        // Setup - Create a temporary file and write a sample Cargo.toml content to it
        let tmp_dir = tempfile::tempdir().unwrap();
        let cargo_toml_path = tmp_dir.path().join("Cargo.toml");
        let sample_toml = r#"
        [workspace]
        members = [
            "libs/my_lib",
            "apps/my_app",
            "services/my_service",
        ]
    "#;
        std::fs::write(&cargo_toml_path, sample_toml).unwrap();

        // Execute the filtering logic here (you may need to adjust the code to be testable)

        // Assert that the filtering works as expected
        // You can read back the modified TOML file and check if the filtering logic is correct
    }
    #[test]
    fn test_error_handling_missing_file() {
        // Simulate the case where the Cargo.toml does not exist or cannot be read
        // Ensure the program produces the correct error message or behavior
    }
}
