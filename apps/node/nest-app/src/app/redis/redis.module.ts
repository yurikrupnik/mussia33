import { Module } from "@nestjs/common";
import { RedisUserController } from "./redis.controller";

@Module({
  controllers: [RedisUserController],
})
export class RedisModule {}
