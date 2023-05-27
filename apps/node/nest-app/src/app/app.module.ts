import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "@mussia33/node/nest/health";
import { SwaggerModule } from "@mussia33/node/nest/swagger";
import { LoggerModule } from "@mussia33/node/nest/logger";
import { UsersModule } from "@mussia33/node/nest/users-api";
// import { PubSubModule } from "./pubsub/pubsub.module";
import { RedisModule } from "./redis/redis.module";
import { GrpcModule } from "./grpc/grpc.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthModule,
    SwaggerModule,
    LoggerModule,
    // PubSubModule,
    UsersModule,
    RedisModule,
    GrpcModule,
  ],
})
export class AppModule {}
