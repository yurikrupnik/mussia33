import { Controller } from "@nestjs/common";
import {
  Payload,
  MessagePattern,
  RedisContext,
  Ctx,
} from "@nestjs/microservices";
import { User } from "@mussia33/node/nest/users-api";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("get.list")
  getData(@Payload() data: number[], @Ctx() context: RedisContext) {
    // console.log("context", context);
    // console.log("context.getArgs()", context.getArgs());
    // console.log("context.getArgs()", context.getChannel());
    return this.appService.findAll({}, "", {});
  }

  @MessagePattern("add.new")
  addPost(@Payload() data: User, @Ctx() context: RedisContext) {
    return this.appService.create(data);
  }
}
