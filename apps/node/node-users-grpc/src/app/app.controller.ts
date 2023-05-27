import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices"; // GrpcStreamMethod
import { ServerUnaryCall, Metadata } from "@grpc/grpc-js";
import { users } from "@mussia33/node/grpc";
import { AppService } from "./app.service";

users.AppControllerControllerMethods();
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod("AppController", "GetUsers")
  getData(
    body: users.GetUsersRequestDto,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ) {
    console.log({ body });
    console.log({ metadata });
    console.log({ call });
    return this.appService
      .findAll({}, body.projection, {
        limit: parseInt(body.limit, 10),
        projection: body.projection,
      })
      .then((res) => {
        return { data: res };
      });
  }

  @GrpcMethod("AppController", "GetUser")
  getUser(body: users.GetUserRequestDto, metadata: Metadata) {
    // console.log({ metadata });
    return this.appService.findById(body.id, body.projection);
  }

  // done
  @GrpcMethod("AppController", "CreateUser")
  create(data: Partial<users.User>) {
    console.log("data", data);
    return this.appService.create(data);
  }

  // done
  @GrpcMethod("AppController", "DeleteUser")
  delete(body: Omit<users.GetUserRequestDto, "projection">) {
    return this.appService.delete(body.id);
  }
}
