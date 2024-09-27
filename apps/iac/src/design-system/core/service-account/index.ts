import { merge } from "lodash";
import * as pulumi from "@pulumi/pulumi";
import { Account, AccountArgs } from "@pulumi/gcp/serviceaccount";
import { IAMBinding, IAMBindingArgs } from "@pulumi/gcp/projects";
export interface ServiceAccountResourceProps {
  accountArgs: AccountArgs;
  iAMBindingArgs: Array<Partial<IAMBindingArgs>>; // todo change only members to not required
}

export class ServiceAccountResource extends pulumi.ComponentResource {
  public serviceAccount: Account;
  public account: pulumi.Output<Account>;
  public bindings: pulumi.Output<Array<IAMBinding>>;

  constructor(
    name: string,
    serviceAccountResourceProps: ServiceAccountResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:gcp-service-account", name, {}, opts);

    const { accountArgs, iAMBindingArgs } = serviceAccountResourceProps;

    const sa = new Account(
      name,
      merge(
        {
          disabled: false,
        } as AccountArgs,
        accountArgs,
      ) as AccountArgs,
      merge({ parent: this }, opts),
    );

    const bindings = iAMBindingArgs.map((binding, i) => {
      return new IAMBinding(
        `${name}-${i}`,
        merge(
          {
            members: [sa.email.apply((email) => `serviceAccount:${email}`)],
          } as Partial<IAMBindingArgs>,
          binding,
        ) as IAMBindingArgs,
        { parent: sa },
      );
    });

    this.account = pulumi.output(sa);
    this.serviceAccount = sa;
    this.bindings = pulumi.output(bindings);
  }
}
