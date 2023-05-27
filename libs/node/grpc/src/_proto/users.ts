/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "app";

export interface GetUsersRequestDto {
  limit: string;
  projection: string[];
}

export interface UpdateUserRequestDto {
  id: string;
}

export interface VoidResponse {
}

export interface DeleteUserRequestDto {
  id: string;
}

export interface GetUserRequestDto {
  id: string;
  projection: string[];
}

export interface User {
  /**
   * mongodb object id - 24 2len chars
   *  string id = 1;
   */
  Id: string;
  /** user personal name */
  name: string;
  /** user email address */
  email: string;
  tenantId: string;
  role: string;
  provider: string;
  password: string;
  updatedAt: string;
  createdAt: string;
}

export interface Users {
  data: User[];
}

export const APP_PACKAGE_NAME = "app";

/** Declare a service for each controller you have */

export interface AppControllerClient {
  /** Declare an rpc for each method that is called via gRPC */

  createUser(request: User, metadata: Metadata, ...rest: any): Observable<User>;

  /** my get user method */

  getUser(request: GetUserRequestDto, metadata: Metadata, ...rest: any): Observable<User>;

  deleteUser(request: DeleteUserRequestDto, metadata: Metadata, ...rest: any): Observable<VoidResponse>;

  updateUser(request: UpdateUserRequestDto, metadata: Metadata, ...rest: any): Observable<User>;

  getUsers(request: GetUsersRequestDto, metadata: Metadata, ...rest: any): Observable<Users>;

  getUsersStream(request: GetUsersRequestDto, metadata: Metadata, ...rest: any): Observable<User>;
}

/** Declare a service for each controller you have */

export interface AppControllerController {
  /** Declare an rpc for each method that is called via gRPC */

  createUser(request: User, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  /** my get user method */

  getUser(request: GetUserRequestDto, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  deleteUser(
    request: DeleteUserRequestDto,
    metadata: Metadata,
    ...rest: any
  ): Promise<VoidResponse> | Observable<VoidResponse> | VoidResponse;

  updateUser(request: UpdateUserRequestDto, metadata: Metadata, ...rest: any): Promise<User> | Observable<User> | User;

  getUsers(request: GetUsersRequestDto, metadata: Metadata, ...rest: any): Promise<Users> | Observable<Users> | Users;

  getUsersStream(request: GetUsersRequestDto, metadata: Metadata, ...rest: any): Observable<User>;
}

export function AppControllerControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getUser", "deleteUser", "updateUser", "getUsers", "getUsersStream"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AppController", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AppController", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const APP_CONTROLLER_SERVICE_NAME = "AppController";
