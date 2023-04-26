import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { Repository, RepositoryArgs } from "@pulumi/gcp/artifactregistry";
import { Repository as awsRepository,RepositoryArgs as awsRepositoryArgs,Action, getRepository, getImage, getCredentials } from "@pulumi/aws/ecr";
import { Providers } from "@mussia33/node/shared";

enum Ars {
  RepositoryArgs,
  awsRepositoryArgs
}

type Arsa = Array<string>;

const sr: Arsa = ["s", "sdd"];

export interface ArtifactoryResourceProps {
  repositoryArgs: RepositoryArgs;
  // awsRepositoryArgs: AwsRepositoryArgs;
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
    console.log('opts.provider', opts.provider);
    const { provider } = opts
    console.log('opts', opts);
    // if (provider.id === "aws") {
    // } else if (provider.id === "gcp") {
    // }
    // const { repositoryArgs } = artifactoryResourceProps;
    // const { location, project } = repositoryArgs;
    // const artifactRegistryRepo = new Repository(name, repositoryArgs, opts);
    // this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;

    //
    const foo = new aws.ecr.Repository("foo", {
      imageScanningConfiguration: {
        scanOnPush: true,
      },
      imageTagMutability: "MUTABLE",
      name: 'foo-bucket'
    });

  }
}
