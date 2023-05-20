/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

// import {} from "@mussia33/node/shared";

import { AppModule } from "./app/app.module";
import { PubSubService } from "./app/pubsub/pubsub.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  const pubsubService = app.get(PubSubService);

  // Replace 'YOUR_TOPIC_ID' with the actual Pub/Sub topic ID
  // await pubsubService.subscribeToTopic("trigger");
  await pubsubService.subscribeToTopic("user-added");

  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
