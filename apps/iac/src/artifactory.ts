import * as pulumi from "@pulumi/pulumi";
import { Repository, RepositoryArgs } from "@pulumi/gcp/artifactregistry";
import { Providers } from "@mussia33/node/shared";

export interface ArtifactoryResourceProps {
  repositoryArgs: RepositoryArgs;
  provider?: Providers;
}

export class ArtifactoryResource extends pulumi.ComponentResource {
  readonly dockerRepo: pulumi.Output<string>;
  constructor(
    name: string,
    artifactoryResourceProps: ArtifactoryResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super("mussia33:core:artifactory:", name, {}, opts);

    const { repositoryArgs } = artifactoryResourceProps;
    const { location, project } = repositoryArgs;
    const artifactRegistryRepo = new Repository(name, repositoryArgs, opts);
    this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
  }
}
