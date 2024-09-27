import * as pulumi from "@pulumi/pulumi";
import { Account, IAMBinding } from "@pulumi/gcp/serviceaccount";
import {
  WorkloadIdentityPool,
  WorkloadIdentityPoolArgs,
  WorkloadIdentityPoolProvider,
  WorkloadIdentityPoolProviderArgs,
} from "@pulumi/gcp/iam";
import { merge } from "lodash";

export interface WorkloadIdentityResourceProps {
  serviceAccount: Account;
  repos: Array<string>;
  workloadIdentityPoolArgs: WorkloadIdentityPoolArgs;
  workloadIdentityPoolProviderArgs: Omit<
    WorkloadIdentityPoolProviderArgs,
    "workloadIdentityPoolId"
  >;
}

export class WorkloadIdentityResource extends pulumi.ComponentResource {
  public workloadIdentityProvider: pulumi.Output<string>;
  public saEmail: pulumi.Output<string>;

  constructor(
    name: string,
    workloadIdentityResourceProps: WorkloadIdentityResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:workload-identity", name, {}, opts);

    const {
      repos,
      serviceAccount,
      workloadIdentityPoolArgs,
      workloadIdentityPoolProviderArgs,
    } = workloadIdentityResourceProps;

    const pool = new WorkloadIdentityPool(name, workloadIdentityPoolArgs, {
      parent: this,
    });
    const poolProvider = new WorkloadIdentityPoolProvider(
      name,
      merge(
        {
          workloadIdentityPoolId: pool.workloadIdentityPoolId,
        },
        workloadIdentityPoolProviderArgs,
      ),
      { parent: pool },
    );

    const members = repos.map((repo) => {
      return pulumi.interpolate`principalSet://iam.googleapis.com/${pool.name}/attribute.repository/${repo}`;
    });

    new IAMBinding(
      name,
      {
        serviceAccountId: serviceAccount.id,
        role: "roles/iam.workloadIdentityUser",
        members: members,
      },
      { parent: poolProvider },
    );

    this.workloadIdentityProvider = poolProvider.name;
    this.saEmail = serviceAccount.email;
  }
}
