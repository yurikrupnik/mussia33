import * as pulumi from "@pulumi/pulumi";
import {
  KeyRing,
  KeyRingArgs,
  CryptoKey,
  CryptoKeyArgs,
} from "@pulumi/gcp/kms";

export interface KmsResourceProps {
  keyRingArgs: KeyRingArgs;
  cryptoKeyArgs?: Partial<CryptoKeyArgs>;
}

export class KmsResource extends pulumi.ComponentResource {
  readonly keyName: pulumi.Output<string>;
  readonly keyRing: pulumi.Output<string>;
  readonly keyId: pulumi.Output<string>;
  constructor(
    name: string,
    kmsResourceProps: KmsResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:kms", name, {}, opts);

    const { keyRingArgs, cryptoKeyArgs } = kmsResourceProps;

    const keyRing = new KeyRing(
      name,
      {
        name,
        ...keyRingArgs,
      },
      { parent: this },
    );

    const example_key = new CryptoKey(
      name,
      {
        rotationPeriod: "100000s",
        name,
        labels: {
          iac: "pulumi",
        },
        ...cryptoKeyArgs,
        keyRing: keyRing.id,
      },
      {
        parent: keyRing,
      },
    );

    this.keyName = example_key.name;
    this.keyRing = example_key.keyRing;
    this.keyId = example_key.id;
  }
}
