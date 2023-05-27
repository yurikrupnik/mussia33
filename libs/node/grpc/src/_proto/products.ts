/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "products";

export interface ListRequestDto {
  limit: string;
  projection: string[];
}

export interface UpdateRequestDto {
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

export interface Product {
  Id: string;
  name: string;
}

export interface Products {
  data: Product[];
}

export const PRODUCTS_PACKAGE_NAME = "products";

/** Declare a service for each controller you have */

export interface ProductsControllerClient {
  /** Declare an rpc for each method that is called via gRPC */

  create(request: Product, metadata: Metadata, ...rest: any): Observable<Product>;

  get(request: GetUserRequestDto, metadata: Metadata, ...rest: any): Observable<Product>;

  delete(request: DeleteUserRequestDto, metadata: Metadata, ...rest: any): Observable<VoidResponse>;

  update(request: UpdateRequestDto, metadata: Metadata, ...rest: any): Observable<Product>;

  list(request: ListRequestDto, metadata: Metadata, ...rest: any): Observable<Products>;

  listStream(request: ListRequestDto, metadata: Metadata, ...rest: any): Observable<Product>;
}

/** Declare a service for each controller you have */

export interface ProductsControllerController {
  /** Declare an rpc for each method that is called via gRPC */

  create(request: Product, metadata: Metadata, ...rest: any): Promise<Product> | Observable<Product> | Product;

  get(request: GetUserRequestDto, metadata: Metadata, ...rest: any): Promise<Product> | Observable<Product> | Product;

  delete(
    request: DeleteUserRequestDto,
    metadata: Metadata,
    ...rest: any
  ): Promise<VoidResponse> | Observable<VoidResponse> | VoidResponse;

  update(request: UpdateRequestDto, metadata: Metadata, ...rest: any): Promise<Product> | Observable<Product> | Product;

  list(request: ListRequestDto, metadata: Metadata, ...rest: any): Promise<Products> | Observable<Products> | Products;

  listStream(request: ListRequestDto, metadata: Metadata, ...rest: any): Observable<Product>;
}

export function ProductsControllerControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "get", "delete", "update", "list", "listStream"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductsController", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductsController", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCTS_CONTROLLER_SERVICE_NAME = "ProductsController";
