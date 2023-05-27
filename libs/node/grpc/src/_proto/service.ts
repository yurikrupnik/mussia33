/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "maths";

export interface Request {
  a: number;
  b: number;
}

export interface Response {
  result: number;
}

export const MATHS_PACKAGE_NAME = "maths";

export interface AddServiceClient {
  add(request: Request, metadata: Metadata, ...rest: any): Observable<Response>;

  multiply(request: Request, metadata: Metadata, ...rest: any): Observable<Response>;
}

export interface AddServiceController {
  add(request: Request, metadata: Metadata, ...rest: any): Promise<Response> | Observable<Response> | Response;

  multiply(request: Request, metadata: Metadata, ...rest: any): Promise<Response> | Observable<Response> | Response;
}

export function AddServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["add", "multiply"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AddService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AddService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ADD_SERVICE_NAME = "AddService";
