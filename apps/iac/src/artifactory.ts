import * as pulumi from "@pulumi/pulumi";
import {
  Repository as GcpRepository,
  RepositoryArgs as GcpRepositoryArgs,
} from "@pulumi/gcp/artifactregistry";
import {
  Repository as AwsRepository,
  RepositoryArgs as AwsRepositoryArgs,
} from "@pulumi/aws/ecr";
import { Providers } from "../../../libs/node/shared/src"; // do not shorten!
// import { Providers } from "@mussia33/node/shared"; // fix - works with actual path

export interface ArtifactoryResourceProps {
  provider: Providers;
  repositoryArgs: GcpRepositoryArgs | AwsRepositoryArgs;
}

export class ArtifactoryResource extends pulumi.ComponentResource {
  readonly dockerRepo: pulumi.Output<string>;
  constructor(
    name: string,
    artifactoryResourceProps: ArtifactoryResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super("mussia33:core:artifactory:", name, {}, opts);
    const { repositoryArgs, provider } = artifactoryResourceProps;
    if (provider === Providers.GCP) {
      const repoArgs = repositoryArgs as GcpRepositoryArgs;
      const { location, project } = repoArgs;
      const artifactRegistryRepo = new GcpRepository(name, repoArgs, {
        parent: this,
        ...opts,
      });
      this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
    } else if (provider === Providers.AWS) {
      const repoArgs = repositoryArgs as AwsRepositoryArgs;
      const awsRepo = new AwsRepository(name, repoArgs, {
        parent: this,
        ...opts,
      });
      this.dockerRepo = awsRepo.repositoryUrl;
    } else {
      throw new Error("Provider must be passed");
    }
  }
}
