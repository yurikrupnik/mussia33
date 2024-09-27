import { merge } from "lodash";
import * as pulumi from "@pulumi/pulumi";
import { Instance, InstanceArgs } from "@pulumi/gcp/redis";

export interface RedisResourceProps {
  production: boolean;
  instanceArgs: Omit<InstanceArgs, "memorySizeGb"> & { memorySizeGb?: number };
}

export class RedisResource extends pulumi.ComponentResource {
  readonly instance: pulumi.Output<Instance>;
  constructor(
    name: string,
    redisResourceProps: RedisResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:redis", name, {}, opts);
    const { instanceArgs, production } = redisResourceProps;
    const productionObj: Partial<InstanceArgs> = production
      ? {
          authEnabled: true,
          replicaCount: 2,
          tier: "STANDARD_HA",
          readReplicasMode: "READ_REPLICAS_ENABLED",
          transitEncryptionMode: "SERVER_AUTHENTICATION",
          // connectMode: "DIRECT_PEERING", // PRIVATE_SERVICE_ACCESS
          connectMode: "PRIVATE_SERVICE_ACCESS", // PRIVATE_SERVICE_ACCESS
          persistenceConfig: {
            persistenceMode: "RDB",
            rdbSnapshotPeriod: "ONE_HOUR",
          },
          maintenancePolicy: {
            weeklyMaintenanceWindows: [
              {
                day: "SATURDAY",
                startTime: {
                  hours: 0,
                  minutes: 30,
                  seconds: 0,
                  nanos: 0,
                },
              },
            ],
          },
        }
      : {};
    const redis = new Instance(
      name,
      merge(
        {
          name,
          redisVersion: "REDIS_7_0",
          memorySizeGb: 5,
          labels: {
            iac: "pulumi",
          },
        } as InstanceArgs,
        productionObj,
        instanceArgs,
      ),
      {
        parent: this,
      },
    );
    this.instance = pulumi.output(redis);
  }
}
