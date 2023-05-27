import { Get, Body, Req } from "@nestjs/common";
import { Client, ClientRedis, Transport } from "@nestjs/microservices";
import {
  ControllerDecorators,
  SwaggerPostDecorators,
} from "@mussia33/node/nest/swagger";
import { User } from "@mussia33/node/nest/users-api";
import { redisConfig } from "@mussia33/node/nest/envs";

@ControllerDecorators("redis-users")
export class RedisUserController {
  @Client({
    transport: Transport.REDIS,
    options: {
      host: redisConfig().REDIS_HOST,
      port: redisConfig().REDIS_PORT,
      password: redisConfig().REDIS_PASSWORD,
    },
  })
  client: ClientRedis;

  @SwaggerPostDecorators(User)
  create(@Body() createRedisUserDto: any) {
    return this.client.send("add.new", createRedisUserDto);
  }

  @Get()
  findAll(@Req() request) {
    console.log("get", request.url);
    console.log("get", request.query);
    console.log("get", request.params);
    return this.client.send("get.list", request.query);
  }
}
