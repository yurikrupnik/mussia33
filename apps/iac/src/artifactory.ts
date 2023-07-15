import * as pulumi from "@pulumi/pulumi";
import { Repository, RepositoryArgs } from "@pulumi/gcp/artifactregistry";
// import { Providers } from "../../../libs/node/shared/src"; // do not shorten!
// import { Providers } from "@mussia33/node/shared"; // fix - works with actual path

export interface ArtifactoryResourceProps {
  repositoryArgs: RepositoryArgs;
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
    const artifactRegistryRepo = new Repository(name, repositoryArgs, {
      parent: this,
      ...opts,
    });
    this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
  }
}
