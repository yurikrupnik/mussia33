import { Secret, SecretArgs } from "@pulumi/gcp/secretmanager";
import * as pulumi from "@pulumi/pulumi";
import { merge } from "lodash";
// import { Network as NetworkNative, Subnetwork as SubnetworkNative } from './redis';
// } from '@pulumi/google-native/compute/v1';

export interface SecretResourceProps {
  secretArgs?: Partial<SecretArgs>;
}

export class SecretResource extends pulumi.ComponentResource {
  readonly instance: pulumi.Output<Secret>;
  constructor(
    name: string,
    secretResourceProps: SecretResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:secret", name, {}, opts);
    const { secretArgs } = secretResourceProps;

    const se = new Secret(
      name,
      merge(
        {
          secretId: name,
          replication: {
            auto: {},
          },
          labels: {
            iac: "pulumi",
            app: name,
          },
        } as SecretArgs,
        secretArgs,
      ),
      { parent: this },
    );
    this.instance = pulumi.output(se);
  }
}
