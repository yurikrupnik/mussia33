import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Repository, RepositoryArgs } from "@pulumi/gcp/artifactregistry";
import {} from "@pulumi/gcp/compute";
// import { Repository,RepositoryArgs,Action, getRepository, getImage, getCredentials } from "@pulumi/aws/ecr";
import { Cluster, ClusterArgs, NodePoolArgs } from "@pulumi/gcp/container";
// import { ClusterArgs } from "@pulumi/gcp/container/Cluster";
// import { NodePoolArgs } from "@pulumi/gcp/container/NodePool";
import { Providers } from "@mussia33/node/shared";

export interface GkeClusterResourceProps {
  nodePoolArgs?: NodePoolArgs;
  clusterArgs?: ClusterArgs;
  provider?: Providers;
}

export class GkeClusterResource extends pulumi.ComponentResource {
  readonly dockerRepo: pulumi.Output<string>;
  constructor(
    name: string,
    gkeClusterResourceProps: GkeClusterResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("mussia33:core:gke:", name, {}, opts);
    const { nodePoolArgs, clusterArgs, provider } = gkeClusterResourceProps;
    const _default = new gcp.serviceaccount.Account(
      "default",
      {
        accountId: "service-k8s-account-id",
        displayName: "Service Account for GKE",
      },
      { parent: this },
    );
    const primary = new gcp.container.Cluster(
      "primary",
      {
        location: "us-central1",
        removeDefaultNodePool: true,
        initialNodeCount: 1,
        ...clusterArgs,
      },
      { parent: this },
    );
    const primaryPreemptibleNodes = new gcp.container.NodePool(
      "primaryPreemptibleNodes",
      {
        location: "us-central1",
        cluster: primary.name,
        nodeCount: 1,
        nodeConfig: {
          preemptible: true,
          machineType: "e2-medium",
          serviceAccount: _default.email,
          oauthScopes: ["https://www.googleapis.com/auth/cloud-platform"],
        },
        ...nodePoolArgs,
      },
      { parent: this },
    );

    // const { repositoryArgs } = gkeClusterResourceProps;
    // const { location, project } = repositoryArgs;
    // const artifactRegistryRepo = new Repository(name, repositoryArgs, opts);
    // this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
  }
}
