export enum Providers {
  "gcp",
  "aws",
  "azure",
  "ali",
}

export enum Subscriptions {
  tess = "my-topic1",
  yes = "my-topic2",
  tes = "my-nest-subscription",
  user = "user-added",
}

export enum Subscriptions1 {
  tess = "my-topic1-extra",
  yes = "my-topic2-extra",
  tes = "my-nest-subscription-extra",
}

export enum Topics {
  "user-added",
}

interface PubSubTopics {
  [topic: string]: string[];
}

export const topics: PubSubTopics = {
  topic1: ["sub1", "sub2"],
  topic2: ["sub1", "sub2"],
  [Subscriptions.user]: ["added", "removed"],
};

// export enum Topics {
//   topic1 = Subscriptions,
//   topic2 = Subscriptions1,
// }
