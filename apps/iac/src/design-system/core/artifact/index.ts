import * as pulumi from "@pulumi/pulumi";
import { Repository, RepositoryArgs } from "@pulumi/gcp/artifactregistry";

export interface ArtifactoryResourceProps {
  repositoryArgs: RepositoryArgs;
}

export class ArtifactoryResource extends pulumi.ComponentResource {
  readonly dockerRepo: pulumi.Output<string>;
  constructor(
    name: string,
    artifactoryResourceProps: ArtifactoryResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:artifactory", name, {}, opts);
    const { repositoryArgs } = artifactoryResourceProps;
    const { location, project } = repositoryArgs;
    const artifactRegistryRepo = new Repository(name, repositoryArgs, {
      parent: this,
      ...opts,
    });
    this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
  }
}
