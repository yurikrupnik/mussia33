import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { join } from "path";
import { users } from "@mussia33/node/grpc";
import { AppModule } from "./app/app.module";

const logger = new Logger("Main");

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: users.APP_PACKAGE_NAME,
    protoPath: join(__dirname, "assets/users.proto"),
    url: process.env.GRPC_HOST || "",
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions
  );
  app.listen().then(() => {
    logger.log("GRPC Microservice is listening...");
  });
}
bootstrap();
