import { OmitType, PartialType } from "@nestjs/swagger";
import { Body, Controller, Param, Query } from "@nestjs/common";
import { Metadata } from "@grpc/grpc-js";
import { Client, ClientGrpc, Transport } from "@nestjs/microservices";
import { map } from "rxjs";
import { join } from "path";
import { User } from "@mussia33/node/nest/users-api";
import {
  SwaggerGetByIdDecorators,
  SwaggerPostDecorators,
  SwaggerDeleteByIdDecorators,
  SwaggerGetDecorators,
  ControllerDecorators,
} from "@mussia33/node/nest/swagger";
import { users } from "@mussia33/node/grpc";
// import { GrpcStreamCall } from '@nestjs/microservices';
// import * as process from 'process';

enum Projection {
  name = "name",
  role = "role",
  email = "email",
  tenantId = "tenantId",
  provider = "provider",
}

@ControllerDecorators("grpc-users")
export class GrpcController {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: users.APP_PACKAGE_NAME,
      protoPath: join(__dirname, "assets/users.proto"),
      url: process.env.GRPC_HOST || "",
    },
  })
  private client: ClientGrpc;

  private grpcService: users.AppControllerClient;
  // private grpcService: IGrpcService;

  onModuleInit() {
    this.grpcService = this.client.getService<users.AppControllerClient>(
      users.APP_CONTROLLER_SERVICE_NAME,
    );
  }

  // Done
  @SwaggerGetDecorators<User>(
    Projection,
    User,
    PartialType(OmitType(User, ["_id", "password"])),
  )

  // Todo fix stream via grpc
  // @GrpcStreamCall('AppController')
  // lotsOfGreetings(
  //   requestStream: any,
  //   callback: (err: unknown, value: { reply: string }) => void
  // ) {
  //   requestStream.on('data', (message) => {
  //     console.log(message);
  //   });
  //   requestStream.on('end', () => callback(null, { reply: 'Hello, world!' }));
  // }
  findAll(
    @Query("projection") projection: Projection | [Projection] | null,
    @Query("limit") limit = 0,
  ) {
    const payload = {
      limit,
      projection:
        typeof projection === "string" ? projection.split(",") : projection,
    };
    console.log({ payload });
    // return this.grpcService.GetUsersStream(payload).
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.grpcService.getUsers(payload).pipe(
      map((response) => {
        return response.data;
      }),
    );
  }

  // Done
  @SwaggerPostDecorators(User)
  create(@Body() body: users.User) {
    const meta = new Metadata({
      waitForReady: true,
      cacheableRequest: false,
      idempotentRequest: true,
      corked: true,
    });
    return this.grpcService.createUser(body, meta, {});
  }

  // Done
  @SwaggerGetByIdDecorators(Projection, User)
  getUser(
    @Param("id") id: string,
    @Query("projection") projection: Projection | [Projection] | null,
  ) {
    const payload = {
      id,
      projection:
        typeof projection === "string" ? projection.split(",") : projection,
    };
    const meta = new Metadata({
      waitForReady: true,
      cacheableRequest: false,
      idempotentRequest: true,
      corked: true,
    });
    return this.grpcService.getUser(payload, meta, {});
  }

  // Done
  @SwaggerDeleteByIdDecorators()
  deleteUser(@Param("id") id: string) {
    const payload = {
      id,
    };

    const meta = new Metadata({
      waitForReady: true,
      cacheableRequest: false,
      idempotentRequest: true,
      corked: true,
    });
    return this.grpcService.deleteUser(payload, meta, {});
  }
}
