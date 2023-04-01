import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Providers } from "@mussia33/node/shared";
import {
  Service,
  ServiceArgs,
  ServiceIamBindingArgs,
} from "@pulumi/gcp/cloudrunv2";

export interface CloudRunResourceProps {
  name: string;
  serviceArgs: ServiceArgs;
  project?: string;
  provider?: Providers;
}

export class CloudRunResource extends pulumi.ComponentResource {
  constructor(
    name: string,
    cloudRunResourceProps: CloudRunResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super("mussia33:core:cloudRun:", name, {}, opts);
    // if () {
    // }
    const sa = new gcp.serviceaccount.Account(
      "cloud-run-sa",
      {
        project: cloudRunResourceProps.project,
        accountId: "cloud-run-sa",
        disabled: false,
        description: "Cloud Run dedicated service account",
        displayName: "Cloud Run SA",
      },
      { parent: this }
    );

    new gcp.projects.IAMBinding(
      "cloud-run-sa-role1",
      {
        project: cloudRunResourceProps.project,
        members: [sa.email.apply((email) => `serviceAccount:${email}`)],
        role: "roles/artifactregistry.writer",
      },
      { parent: this }
    );

    new Service(
      cloudRunResourceProps.name,
      {
        template: {
          serviceAccount: sa.email,
        },
        ...cloudRunResourceProps.serviceArgs,
      },
      {
        parent: this,
      }
    );
  }
}
