// import * as mongodbatlas from "@pulumi/mongodbatlas";
import { ClusterArgs, Cluster, Project } from "@pulumi/mongodbatlas";
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { GkeClusterResource, GkeClusterResourceProps } from "../../cluster";

// const s: GkeClusterResourceProps = {
//   provider: '',
//   clusterArgs: {
//     project
//   }
// }

interface LocalProjectResourceProps {}

export class LocalProjectResource extends pulumi.ComponentResource {
  // readonly dockerRepo: pulumi.Output<string>;
  readonly orgId: pulumi.Output<string>;
  constructor(
    name: string,
    localProjectResourceProps: LocalProjectResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("mussia33:core:gke:", name, {}, opts);
    // const { nodePoolArgs, clusterArgs, provider } = gkeClusterResourceProps;

    // const project = new Project("my-demo-project", {
    //   orgId: "12345",
    // });

    // gcp.organizations.Project("", "mussia35", {
    //
    // });

    // const { repositoryArgs } = gkeClusterResourceProps;
    // const { location, project } = repositoryArgs;
    // const artifactRegistryRepo = new Repository(name, repositoryArgs, opts);
    // this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
  }
}
