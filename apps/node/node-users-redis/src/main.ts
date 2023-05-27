import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { redisConfig } from "@mussia33/node/nest/envs";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: redisConfig().REDIS_HOST,
        port: redisConfig().REDIS_PORT,
        password: redisConfig().REDIS_PASSWORD,
      },
    }
  );

  app.listen().then(() => {
    console.log("Posts service is listening...");
  });
}

bootstrap();
