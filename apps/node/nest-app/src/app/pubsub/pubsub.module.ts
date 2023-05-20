import { Module } from "@nestjs/common";
import { PubSubService } from "./pubsub.service";

@Module({
  providers: [PubSubService],
})
export class PubSubModule {}
