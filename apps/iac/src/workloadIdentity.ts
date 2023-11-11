import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Providers } from "@mussia33/node/shared";

export interface WorkloadIdentityResourceProps {
  // services: Array<string>;
  repos: Array<String>;
  project?: string;
  provider?: Providers;
}

export class WorkloadIdentityResource extends pulumi.ComponentResource {
  public workload_identity_provider: pulumi.Output<string>;
  public saEmail: pulumi.Output<string>;

  constructor(
    name: string,
    workloadIdentityResourceProps: WorkloadIdentityResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("mussia33:core:workloadIdentity:", name, {}, opts);

    const { repos, project } = workloadIdentityResourceProps;

    const sa = new gcp.serviceaccount.Account(
      "container-builder-sa",
      {
        project,
        accountId: "container-builder-sa",
        disabled: false,
        description: "Github actions service account to create containers",
        displayName: "Container builder",
      },
      { parent: this },
    );

    new gcp.projects.IAMBinding(
      "github-sa-artifact-registry-writer",
      {
        project: project,
        members: [sa.email.apply((email) => `serviceAccount:${email}`)],
        role: "roles/artifactregistry.writer",
      },
      { parent: this },
    );

    const pool = new gcp.iam.WorkloadIdentityPool(
      "example-pool-pulumi",
      {
        description: "Git Pool",
        displayName: "Git pool",
        workloadIdentityPoolId: "git-pool",
        project,
      },
      { parent: this },
    );
    const poolProvider = new gcp.iam.WorkloadIdentityPoolProvider(
      "github-pool-provider",
      {
        workloadIdentityPoolId: pool.workloadIdentityPoolId,
        workloadIdentityPoolProviderId: "github-identity-pool-provider",
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
      { parent: this },
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
      { parent: this },
    );

    this.workload_identity_provider = poolProvider.name;
    this.saEmail = sa.email;
    // this.registerOutputs({ saEmail: sa.email });
  }
}
