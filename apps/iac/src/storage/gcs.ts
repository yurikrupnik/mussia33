import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Bucket,BucketArgs } from "@pulumi/gcp/storage";
import { Providers } from "@mussia33/node/shared";

export interface ServicesResourceProps {
  services: Array<string>;
  project?: string;
  provider?: Providers;
}

export class GCPStorageResource extends pulumi.ComponentResource {
  readonly firstService: gcp.projects.Service;
  constructor(
    name: string,
    project: string,
    bucketArgs: BucketArgs,
    // servicesResourceProps: ServicesResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    // const {} = servicesResourceProps;
    const {} = bucketArgs;
    super("mussia33:gcp:service:", name, {}, opts);
    const funcBucket = new Bucket(`${project}-${name}`, {
      name: `${project}-func-bucket`,
      location: "eu",
      // location: "EU",
      // location: region,
      forceDestroy: true,
      versioning: {
        enabled: true,
      },
      labels: {
        type: "code",
      },
      ...bucketArgs
    });
  }
}
