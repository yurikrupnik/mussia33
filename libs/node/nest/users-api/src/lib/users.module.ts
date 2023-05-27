import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { mongoConfig } from "@mussia33/node/nest/envs";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";
//import paginate from 'mongoose-paginate-v2';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig().MONGO_URI, {
      // connectionFactory: (connection) => {
      //   connection.plugin(paginate);
      //   return connection;
      // },
    }),
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          //          schema.plugin(paginate);
          // console.log('schema', schema);
          // schema.pre('save', function () {
          //   console.log('Hello from pre save');
          //   // return new Promise((resolve, reject) => {
          //   //   reject(new Error('something went wrong'));
          //   // });
          //   // return;
          // });
          // schema.post('save', function (doc) {
          //   console.log('%s has been saved', doc._id);
          //   // return new Promise((resolve, reject) => {
          //   //   reject(new Error('something went wrong'));
          //   // });
          //   // return;
          // });
          // schema.post('init', function (doc) {
          //   console.log('%s has been initialized from the db', doc._id);
          // });
          // schema.post('validate', function (doc) {
          //   // console.log('doc', doc);
          //   console.log('%s has been validated (but not saved yet)', doc._id);
          // });
          // schema.post('remove', function (doc) {
          //   console.log('%s has been removed', doc._id);
          // });
          //          schema.post('delete', function (doc) {
          //            console.log('%s has been delete', doc._id);
          //          });
          return schema;
        },
      },
    ]),
    // HealthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
