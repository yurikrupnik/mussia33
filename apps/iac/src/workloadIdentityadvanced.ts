import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Providers } from "@mussia33/node/shared";

export interface WorkloadIdentityResourceProps {
  // services: Array<string>;
  repos: Array<String>;
  project?: string;
  provider?: Providers;
}

export class WorkloadIdentityResourceAdvanced extends pulumi.ComponentResource {
  public workload_identity_provider: pulumi.Output<string>;
  public saEmail: pulumi.Output<string>;

  constructor(
    name: string,
    workloadIdentityResourceProps: WorkloadIdentityResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super("mussia33:core:workloadIdentity:", name, {}, opts);

    const { repos, project } = workloadIdentityResourceProps;

    const sa = new gcp.serviceaccount.Account(
      "k8s-service-account",
      {
        project,
        accountId: "k8s-service-account",
        disabled: false,
        description: "Kubernetes SA for workload identity pool ",
        displayName: "WorkloadIdentityPool SA",
      },
      { parent: this, ...opts }
    );

    // Create a Kubernetes role binding
    const k8sRoleBinding = new gcp.container.ClusterIAMBinding(
      "k8s-role-binding",
      {
        cluster: "my-existing-cluster",
        role: "roles/iam.workloadIdentityUser",
        members: [`serviceAccount:${sa.email}`],
      }
    );

    new gcp.projects.IAMBinding(
      "github-sa-artifact-registry-writer",
      {
        project: project,
        members: [sa.email.apply((email) => `serviceAccount:${email}`)],
        role: "roles/artifactregistry.writer",
      },
      { parent: this, ...opts }
    );

    const pool = new gcp.iam.WorkloadIdentityPool(
      "example-pool-pulumi",
      {
        description: "Github Pool",
        displayName: "Github pool",
        workloadIdentityPoolId: "github-pool",
        project,
      },
      { parent: this, ...opts }
    );
    const poolProvider = new gcp.iam.WorkloadIdentityPoolProvider(
      "github-pool-provider",
      {
        workloadIdentityPoolId: pool.workloadIdentityPoolId,
        workloadIdentityPoolProviderId: "github-provider",
        displayName: "Github provider",
        attributeMapping: {
          "google.subject": "assertion.sub",
          "attribute.actor": "assertion.actor",
          "attribute.repository": "assertion.repository",
        },
        oidc: {
          issuerUri: "https://token.actions.githubusercontent.com",
        },
      },
      { parent: this, ...opts }
    );

    const members = repos.map((repo) => {
      return pulumi.interpolate`principalSet://iam.googleapis.com/${pool.name}/attribute.repository/${repo}`;
    });

    new gcp.serviceaccount.IAMBinding(
      "workloadIdentityUser",
      {
        serviceAccountId: sa.id,
        role: "roles/iam.workloadIdentityUser",
        members: members,
      },
      { parent: this, ...opts }
    );

    this.workload_identity_provider = poolProvider.name;
    this.saEmail = sa.email;
    // this.registerOutputs({ saEmail: sa.email });
  }
}
