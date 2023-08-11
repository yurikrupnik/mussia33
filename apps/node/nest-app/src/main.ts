import { register, collectDefaultMetrics, Registry } from "prom-client";
import { VersioningType, ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "@mussia33/node/nest/filters";
import { SwaggerModule } from "@mussia33/node/nest/swagger";
import { AppModule } from "./app/app.module";
// import { PubSubService } from "./app/pubsub/pubsub.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  // Register Prometheus metrics
  // const collectDefaultMetrics = collectDefaultMetrics;
  // const register = new Registry();
  collectDefaultMetrics({});
  // start custom config here
  const globalPrefix = "api";
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());
  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks();

  // const pubsubService = app.get(PubSubService);
  // // Replace 'YOUR_TOPIC_ID' with the actual Pub/Sub topic ID
  // // await pubsubService.subscribeToTopic("trigger");
  // await pubsubService.subscribeToTopic("user-added");

  const logger = app.get(Logger);
  const docs = app.get(SwaggerModule);
  docs.setup(app, globalPrefix, "Nodejs Rest API", "General use api docs!");

  const port = configService.get("PORT") || 8080;
  // const port = process.env.PORT || 8080;

  await app.listen(port, () => {
    logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
  });
}

bootstrap();
