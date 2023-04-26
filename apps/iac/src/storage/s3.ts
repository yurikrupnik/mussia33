import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
// import { Bucket,BucketArgs } from "@pulumi/gcp/storage";
import { Bucket, BucketArgs } from "@pulumi/aws/s3";
import { Providers } from "@mussia33/node/shared";

export interface ServicesResourceProps {
  services: Array<string>;
  project?: string;
  provider?: Providers;
}

export class AWSStorageResource extends pulumi.ComponentResource {
  readonly firstService: gcp.projects.Service;
  constructor(
    name: string,
    project: string,
    bucketArgs: BucketArgs,
    servicesResourceProps: ServicesResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    const {} = servicesResourceProps;
    super("mussia33:aws:service:", name, {}, opts);
    const funcBucket = new Bucket(`${project}-${name}`, {
      // name: `${project}-func-bucket`,
      // location: "eu",
      // location: "EU",
      // location: region,
      forceDestroy: true,
      versioning: {
        enabled: true,
      },
      // labels: {
      //   type: "code",
      // },
    });
  }
}
