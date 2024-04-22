use anyhow::Result;
use clap::{App, Arg};
use mongodb::{options::ClientOptions, Client};
use tokio;
#[tokio::main]
async fn main() -> Result<()> {
    let matches = App::new("clap_anyhow")
        .version("1.0")
        .author("Your Name")
        .about("Interacts with a MongoDB database")
        .arg(
            Arg::with_name("insert")
                .long("insert")
                .value_name("DATA")
                .help("Inserts data into the database")
                .takes_value(true),
        )
        .get_matches();

    let client_options = ClientOptions::parse("mongodb://localhost:27017").await?;
    let client = Client::with_options(client_options)?;

    if let Some(data) = matches.value_of("insert") {
        insert_data(&client, data).await?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        let result = 2 + 2;
        assert_eq!(result, 4);
    }
}
