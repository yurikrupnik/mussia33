import { Module } from "@nestjs/common";
import { GrpcController } from "./grpc.controller";

@Module({
  controllers: [GrpcController],
})
export class GrpcModule {}
