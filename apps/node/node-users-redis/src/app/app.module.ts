import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { mongoConfig } from "@mussia33/node/nest/envs";
import { User, UserSchema } from "@mussia33/node/nest/users-api";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(mongoConfig().MONGO_URI, {}),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // schema.plugin(mongoosePaginate);
          // console.log('schema', schema);
          schema.pre("save", function () {
            console.log("Hello from pre save microservice");
            // return new Promise((resolve, reject) => {
            //   reject(new Error('something went wrong'));
            // });
            // return;
          });
          schema.post("save", function (doc) {
            console.log("%s has been saved in microservice", doc._id);
            // return new Promise((resolve, reject) => {
            //   reject(new Error('something went wrong'));
            // });
            // return;
          });
          schema.post("init", function (doc) {
            console.log(
              "%s has been initialized from the db in microservice",
              doc._id
            );
          });
          schema.post("validate", function (doc) {
            // console.log('doc', doc);
            console.log(
              "%s has been validated (but not saved yet) in microservice",
              doc._id
            );
          });
          // schema.post("remove", function (doc) {
          //   console.log("%s has been removed in microservice", doc._id);
          // });
          // schema.post('delete', function (doc) {
          //   console.log('%s has been delete in microservice', doc._id);
          // });
          return schema;
        },
      },
    ]),
    // HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
