#[macro_export]
macro_rules! hello {
    () => {
        println!("Hello, world!");
    };
    ("hello") => {
        println!("Hello, world!");
    };
    ("hello", $name:expr) => {
        println!("Hello, {}!", $name);
    };
    ("hello", $name:expr, $age:expr) => {
        println!("Hello, {} year old named {}!", $age, $name);
    };
    ($($arg:tt)*) => {
        println!("Hello, world!");
    };
}

