import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import { HealthModule } from "@mussia33/node/nest/health";
import { SwaggerModule } from "@mussia33/node/nest/swagger";
import { LoggerModule } from "@mussia33/node/nest/logger";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { UsersModule } from "./users/users.module";
// import { User } from "./users/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // HealthModule,
    SwaggerModule,
    LoggerModule,
    // TypeOrmModule.forRoot({
    //   type: "mysql",
    //   host: "34.165.140.145" || "localhost",
    //   // port: 3306,
    //   username: "admin",
    //   password: "123456" || "root",
    //   database: "test",
    //   entities: [User],
    //   synchronize: true,
    // }),
    // UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
