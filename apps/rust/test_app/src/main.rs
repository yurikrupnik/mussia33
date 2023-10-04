use std::sync::mpsc;
use std::thread;

fn main() {
    let (sender, receiver) = mpsc::channel();

    thread::spawn(move || {
        let message = "Hello from the sender!";
        sender.send(message).expect("Failed to send message");
    });

    let received = receiver.recv().expect("Failed to receive message");
    println!("{}", received);
}