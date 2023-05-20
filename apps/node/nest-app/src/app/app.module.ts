import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PubSubModule } from "./pubsub/pubsub.module";

@Module({
  imports: [PubSubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
