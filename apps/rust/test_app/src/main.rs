extern crate serde;
extern crate serde_json;
mod dmongo;
use serde::{Serialize, Deserialize};

use std::error::Error;
use syrette::injectable;
use syrette::DIContainer;
use syrette::ptr::TransientPtr;

trait IWeapon {
    fn deal_damage(&self, damage: i32);
}

struct Sword {}

#[injectable(IWeapon)]
impl Sword {
    fn new() -> Self {
        Self {}
    }
}

impl IWeapon for Sword {
    fn deal_damage(&self, damage: i32) {
        println!("Sword dealt {} damage!", damage);
    }
}

trait IWarrior {
    fn fight(&self);
}

struct Warrior {
    weapon: TransientPtr<dyn IWeapon>,
}

#[injectable(IWarrior)]
impl Warrior {
    fn new(weapon: TransientPtr<dyn IWeapon>) -> Self {
        Self { weapon }
    }
}

impl IWarrior for Warrior {
    fn fight(&self) {
        self.weapon.deal_damage(30);
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct Person {
    name: String,
    age: u8,
}

fn main() -> Result<(), Box<dyn Error>>
{
    let mut di_container = DIContainer::new();

    di_container.bind::<dyn IWeapon>().to::<Sword>()?;

    di_container.bind::<dyn IWarrior>().to::<Warrior>()?;

    let warrior = di_container.get::<dyn IWarrior>()?.transient()?;

    warrior.fight();

    println!("Warrior has fighted");

    Ok(())
}