import * as pulumi from "@pulumi/pulumi";
import { SecretVersion } from "@pulumi/gcp/secretmanager";
import {
  ManagedSslCertificate,
  ManagedSslCertificateArgs,
} from "@pulumi/gcp/compute";
import { RedisResource, RedisResourceProps } from "../../core/redis";
import { PostgresResource, PostgresResourceProps } from "../../core/postgres";
import { ClusterResource, ClusterResourceProps } from "../../core/gke";
import { SecretResource, SecretResourceProps } from "../../core/secret";
import { merge } from "lodash";

type KubernetesLabel = { [key: string]: string };

type Shared = {
  production: boolean;
  networkId: pulumi.Output<string> | string;
  networkName: pulumi.Output<string> | string;
  // test with location - pulumi.OutputInstance<string> - fails with passing network resource
  location: pulumi.Output<string> | string;
  project: string;
  labels: KubernetesLabel;
  kms?: pulumi.Output<string>;
};

export interface AirwayzResourceProps {
  shared: Shared;
  componentProps: {
    postgresResourceProps?: Partial<PostgresResourceProps>;
    clusterResourceProps?: Partial<ClusterResourceProps>;
    redisResourceProps?: Partial<RedisResourceProps>;
    secretResourceProps?: Partial<SecretResourceProps>;
    managedSslCertificateArgs?: Partial<ManagedSslCertificateArgs>;
  };
}

export class AirwayzResource extends pulumi.ComponentResource {
  constructor(
    name: string,
    airwayzResourceProps: AirwayzResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:airwayz", name, {}, opts);
    const {
      shared: {
        kms,
        networkName,
        networkId,
        production,
        labels,
        location,
        project,
      },
      componentProps: {
        postgresResourceProps,
        redisResourceProps,
        clusterResourceProps,
        secretResourceProps,
        managedSslCertificateArgs,
      },
    } = airwayzResourceProps;

    let redis = new RedisResource(
      name,
      merge(
        {
          production,
          instanceArgs: {
            name,
            labels,
            network: networkName,
            project,
            region: location,
            authorizedNetwork: networkName,
            customerManagedKey: production ? kms : undefined,
          },
        } as RedisResourceProps,
        redisResourceProps,
      ),
      merge({ parent: this }, opts),
    );
    let cluster = new ClusterResource(
      name,
      merge(
        {
          production,
          clusterArgs: {
            name,
            project,
            fleet: {
              project: project,
            },
            resourceLabels: labels,
            description: `GKE ${name} ${production ? "production" : "development"} cluster at ${location}`,
            network: networkName,
            // TODO test!
            // clusterAutoscaling: {
            //   enabled: production,
            //   autoProvisioningDefaults: {
            //     bootDiskKmsKey: production ? kms : undefined,
            //   },
            // },
            location: production ? location : `${location}-a`,
            initialNodeCount: 1,
            deletionProtection: false,
          },
          accountArgs: {},
          nodePoolArgs: [
            {
              name,
              project,
              location: production ? location : `${location}-a`,
              initialNodeCount: 1,
              nodeConfig: {
                labels,
                // machineType: production ? "e2-standard-4" : "e2-standard-2",
                machineType: "e2-standard-4",
                bootDiskKmsKey: production ? kms : undefined,
              },
            },
          ],
        } as ClusterResourceProps,
        clusterResourceProps,
      ),
      merge({ parent: this }, opts),
    );

    let postgres = new PostgresResource(
      name,
      merge(
        {
          production,
          databaseInstanceArgs: {
            name,
            region: location,
            project,
            encryptionKeyName: production ? kms : undefined,
            settings: {
              userLabels: labels,
              ipConfiguration: {
                privateNetwork: networkId,
              },
            },
          },
          databaseArgs: {
            name,
          },
        } as PostgresResourceProps,
        postgresResourceProps,
      ),
      merge({ parent: this }, opts),
    );
    const sslCertificate = new ManagedSslCertificate(
      name,
      merge(
        {
          description: "text env",
          project,
          type: "MANAGED",
          managed: {
            domains: ["airwayz-yuri.com"],
          },
          name,
        } as ManagedSslCertificateArgs,
        managedSslCertificateArgs,
      ),
      merge({ parent: this }, opts),
    );

    let secret = new SecretResource(
      name,
      merge(
        {
          production,
          // secretArgs: {
          //   project,
          //   labels,
          //   secretId: name,
          //   // topics: {}
          //   // topics
          // }
          // secretArgs: {
          //   project,
          //   secretId: "a",
          //   // topics: "sa",
          //   labels,
          //   // secretId: "adas",
          //   // topics: ["adas"],
          //   // project: project,
          // },
          // secretArgs: {
          //   project,
          //   labels,
          //   secretId: "",
          //   topics
          // },
        } as SecretResourceProps,
        secretResourceProps,
      ),
      merge({ parent: this }, opts),
    );
    // Transform the Output values and then create the secret
    pulumi
      .all([
        postgres.instance.rootPassword,
        postgres.instance.firstIpAddress,
        redis.instance.authString,
        redis.instance.host,
      ])
      .apply(([rootPassword, firstIpAddress, authString, redisHost]) => {
        const jsonData = {
          // ussp-config secret
          node_env: "docker",
          authenticator_host: "http://utm-authenticator:8081",
          cis_url: "http://cis:80/cis.json",
          dss_host: "http://212.80.206.189",
          rcs_host: "http://rcs",
          mc_host: "http://mc-find-path-service",
          mc_port: "3007",
          converter_host: "http://converter-service",
          converter_port: "4009",
          ussp_id: "devops",
          ussp_url: "http://devops:4004",
          // sql-config
          // "node_env":"docker", // duplicated
          sql_client: "mysql",
          sql_password: "dev1359SqlPass",
          sql_host: "34.65.5.234",
          sql_port: "3306",
          sql_database: "utm",
          sql_charset: "utf8",
          sql_user: "root",
          sql_debug: "false",
          sql_connection: "true",
          // redis-config
          redis_ip: "10.251.233.68",
          redis_port: "6379",
          redis_password: "VYRD4590HtxCjvCHXE534567gIVBhiuyV",
          dam: rootPassword,
          authString: authString,
        };

        // Convert JSON to a string
        const jsonString = JSON.stringify(jsonData);

        // Create the secret version
        new SecretVersion(
          name,
          {
            secret: secret.instance.id,
            secretData: pulumi.secret(jsonString),
          },
          { parent: secret },
        );
      });
  }
}
