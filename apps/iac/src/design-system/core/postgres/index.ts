import {
  Database,
  DatabaseArgs,
  User,
  UserArgs,
  DatabaseInstance,
  DatabaseInstanceArgs,
} from "@pulumi/gcp/sql";
import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";
import { merge } from "lodash";

export interface PostgresResourceProps {
  production: boolean;
  databaseInstanceArgs?: Partial<DatabaseInstanceArgs>;
  userArgs?: UserArgs;
  databaseArgs?: DatabaseArgs;
}

export class PostgresResource extends pulumi.ComponentResource {
  readonly instance: pulumi.Output<DatabaseInstance>;
  readonly user: pulumi.Output<User>;
  readonly database: pulumi.Output<Database>;
  constructor(
    name: string,
    postgresResourceProps: PostgresResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:postgres", name, {}, opts);
    const { production, databaseArgs, databaseInstanceArgs, userArgs } =
      postgresResourceProps;
    const dbInstance = new DatabaseInstance(
      name,
      merge(
        {
          name: name,
          databaseVersion: "POSTGRES_15",
          // generate random secret
          rootPassword: new random.RandomPassword(
            `${name}-password`,
            {
              length: 16,
              special: true,
              overrideSpecial: "_%@",
            },
            { parent: this },
          ).result,
          deletionProtection: false, // todo use production after finishing testing
          settings: {
            tier: production ? "db-perf-optimized-N-2" : "db-f1-micro", // 2 vCPU, 8MB ram
            diskSize: production ? 100 : 50,
            enableGoogleMlIntegration: production,
            edition: production ? "ENTERPRISE_PLUS" : "ENTERPRISE",
            dataCacheConfig: {
              dataCacheEnabled: production,
            },
            userLabels: {
              iac: "pulumi",
              app: name,
            },
            insightsConfig: {
              queryInsightsEnabled: true,
              recordClientAddress: true,
            },
            maintenanceWindow: {
              day: 6,
            },
            backupConfiguration: {
              enabled: production,
            },
            availabilityType: production ? "REGIONAL" : "ZONAL",
            ipConfiguration: {
              ipv4Enabled: !production,
              requireSsl: production,
              sslMode: production
                ? "TRUSTED_CLIENT_CERTIFICATE_REQUIRED"
                : "ENCRYPTED_ONLY",
              enablePrivatePathForGoogleCloudServices: production,
            },
          },
        } as DatabaseInstanceArgs,
        databaseInstanceArgs,
      ),
      { parent: this },
    );

    this.instance = pulumi.output(dbInstance);
    const sqlUser = new User(
      name,
      merge(
        {
          name: "root",
          instance: dbInstance.id,
          type: "BUILT_IN",
          deletionPolicy: "ABANDON",
          password: new random.RandomPassword(
            `${name}-user-password`,
            {
              length: 16,
              special: true,
              overrideSpecial: "_%@",
            },
            { parent: this },
          ).result,
        } as UserArgs,
        userArgs,
      ),
      { parent: dbInstance },
    );
    this.user = pulumi.output(sqlUser);
    // pulumi always changes - but nothing changed - maybe coz regional instance
    const database = new Database(
      name,
      merge(
        {
          instance: dbInstance.name,
          name: "utm",
          // charset: "utf8",
          // collation: "utf8_general_ci"
        } as DatabaseArgs,
        databaseArgs,
      ),
      { parent: dbInstance },
    );
    this.database = pulumi.output(database);
  }
}
