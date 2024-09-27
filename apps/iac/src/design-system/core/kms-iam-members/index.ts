import * as pulumi from "@pulumi/pulumi";
import { IAMMember, IAMMemberArgs } from "@pulumi/gcp/projects";
import { merge } from "lodash";

export interface KmsIamMembersResourceProps {
  serviceAccounts: Promise<Array<string>>;
  iAMMemberArgs: Omit<IAMMemberArgs, "member">;
}

export class KmsIamMembersResource extends pulumi.ComponentResource {
  public readonly iamMembers: pulumi.Output<Array<IAMMember>>;

  constructor(
    name: string,
    kmsIamMembersResourceProps: KmsIamMembersResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:kmsIamMembersResource", name, {}, opts);

    const { serviceAccounts, iAMMemberArgs } = kmsIamMembersResourceProps;

    const iamMembers = serviceAccounts.then((accounts) => {
      return accounts.map((account) => {
        return new IAMMember(
          `${account}-${iAMMemberArgs.role}`,
          merge(
            {
              member: account,
            } as IAMMemberArgs,
            iAMMemberArgs,
          ),
          merge({ parent: this }, opts),
        );
      });
    });
    this.iamMembers = pulumi.output(iamMembers);
  }
}
