import * as mongodbatlas from "@pulumi/mongodbatlas";
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { GkeClusterResourceProps } from "../cluster";

export class MongoResource extends pulumi.ComponentResource {
  // readonly dockerRepo: pulumi.Output<string>;
  readonly orgId: pulumi.Output<string>;
  constructor(
    name: string,
    gkeClusterResourceProps: GkeClusterResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("mussia33:core:gke:", name, {}, opts);
    // const { nodePoolArgs, clusterArgs, provider } = gkeClusterResourceProps;

    const project = new mongodbatlas.Project("my-demo-project", {
      orgId: "12345",
    });

    // const { repositoryArgs } = gkeClusterResourceProps;
    // const { location, project } = repositoryArgs;
    // const artifactRegistryRepo = new Repository(name, repositoryArgs, opts);
    // this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
  }
}
