import { Injectable, Logger } from "@nestjs/common";
import { PubSub } from "@google-cloud/pubsub";
import { Subscriptions } from "@mussia33/node/shared";

@Injectable()
export class PubSubService {
  private readonly logger = new Logger(PubSubService.name);
  private readonly pubsub: PubSub;

  constructor() {
    // Replace 'YOUR_PROJECT_ID' with your actual Google Cloud project ID
    this.pubsub = new PubSub({ projectId: "mussia-infra" });
  }

  async subscribeToTopic(topicId: string): Promise<void> {
    const topicName = `projects/mussia-infra/topics/${topicId}`;
    const subscription = this.pubsub
      .topic(topicName)
      // .subscription("my-nest-subscription");
      // .subscription(Subscriptions[Subscriptions["my-nest-subscription"]]);
      .subscription(Subscriptions.yes);
    // .subscription("arisd");

    // Listen for new messages
    subscription.on("message", (message) => this.handleMessage(message));

    this.logger.log(`Subscribed to topic: ${subscription.name}`);
  }

  private handleMessage(message): void {
    this.logger.log(`Received message: ${message.data}`);
    // Acknowledge the message to indicate it has been processed
    message.ack();
  }
}
