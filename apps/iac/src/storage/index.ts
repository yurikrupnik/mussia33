import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Bucket, BucketArgs } from "@pulumi/aws/s3";
// import { Bucket, BucketArgs } from "@pulumi/gcp/storage";
import { ServicesResourceProps } from "./s3";
import {AWSStorageResource} from './s3';
import {GCPStorageResource} from './gcs';


export class CloudStorage extends pulumi.ComponentResource {
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

    // const funcBuckets
    // new AWSStorageResource("dfs", project, {versioning: {enabled: true}})
  }
}
