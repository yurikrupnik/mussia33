// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from '../entities/user.entity';
// import { Seeder, DataFactory } from 'nestjs-seeder';
//
// @Injectable()
// export class UsersSeeder implements Seeder {
//   constructor(@InjectModel(User.name) private readonly user: Model<User>) {}
//
//   async seed(): Promise<any> {
//     // Generate 10 users.
//     const users = DataFactory.createForClass(User).generate(10);
//
//     // Insert into the database.
//     return this.user.insertMany(users);
//   }
//
//   async drop(): Promise<any> {
//     return this.user.deleteMany({});
//   }
// }
