import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as aws from "@pulumi/aws";
// import { Bucket, BucketArgs } from "@pulumi/aws/s3";
// import { Bucket, BucketArgs } from "@pulumi/gcp/storage";
// import { ServicesResourceProps } from "./s3";
// import {AWSStorageResource} from './s3';
// import {GCPStorageResource} from './gcs';
import { Repository,RepositoryArgs,Action, getRepository, getImage, getCredentials } from "@pulumi/aws/ecr";

export class CloudContainer extends pulumi.ComponentResource {
  readonly firstService: gcp.projects.Service;
  constructor(
    name: string,
    // project: string,
    // bucketArgs: BucketArgs,
    // servicesResourceProps: ServicesResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    // const {} = servicesResourceProps;
    super("mussia33:bind:sservice:", name, {}, opts);
    const foo = new aws.ecr.Repository("foo", {
      imageScanningConfiguration: {
        scanOnPush: true,
      },
      imageTagMutability: "MUTABLE",
    });
    // const funcBuckets
    // new AWSStorageResource("dfs", project, {versioning: {enabled: true}})
  }
}
