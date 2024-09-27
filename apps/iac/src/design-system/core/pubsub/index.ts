import * as pulumi from "@pulumi/pulumi";
import { Topic, TopicArgs } from "@pulumi/gcp/pubsub";
import { merge } from "lodash";

export interface PubSubResourceProps {
  topicArgs: TopicArgs;
}

export class PubSubResource extends pulumi.ComponentResource {
  readonly topic: pulumi.Output<Topic>;
  constructor(
    name: string,
    networkResourceProps: PubSubResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:pubsub", name, {}, opts);
    const { topicArgs } = networkResourceProps;
    const topic = new Topic(
      name,
      merge(
        {
          name,
          labels: {
            iac: "pulumi",
          },
        } as TopicArgs,
        topicArgs,
      ),
      merge({ parent: this }, opts),
    );
    this.topic = pulumi.output(topic);
  }
}
