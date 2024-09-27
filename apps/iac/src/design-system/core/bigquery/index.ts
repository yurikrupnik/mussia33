import * as pulumi from "@pulumi/pulumi";
import { Account } from "@pulumi/gcp/serviceaccount";
import { Dataset, DatasetArgs, Table, TableArgs } from "@pulumi/gcp/bigquery";
import { merge } from "lodash";

export interface BigqueryResourceProps {
  serviceAccount?: Account;
  datasetArgs: DatasetArgs;
  tableArgs: Omit<TableArgs, "datasetId">;
}

export class BigqueryResource extends pulumi.ComponentResource {
  public readonly dataset: Dataset;
  public readonly table: Table;
  constructor(
    name: string,
    bigqueryResourceProps: BigqueryResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:bigquery", name, {}, opts);

    const { datasetArgs, tableArgs } = bigqueryResourceProps;

    const dataset = new Dataset(
      name,
      merge(
        {
          datasetId: "example-pulumi_dataset",
          friendlyName: "test",
          description: "This is a test description",
          location: "EU",
          defaultTableExpirationMs: 3600000,
          labels: {
            iac: "pulumi",
          },
          accesses: [
            {
              role: "OWNER",
              userByEmail: "yuri@airwayz.co",
            },
            {
              role: "READER",
              userByEmail: "krupnik.yuri@gmail.com",
            },
            {
              role: "READER",
              domain: "airwayz.co",
            },
          ],
        } as DatasetArgs,
        datasetArgs,
      ),
      merge({ parent: this }, opts),
    );

    const table = new Table(
      name,
      merge(
        {
          labels: {
            iac: "pulumi",
          },
          deletionProtection: false,
          description: "GKE EU Table",
          tableId: "gke-events",
          datasetId: dataset.datasetId,
          friendlyName: "gke-events",
        } as TableArgs,
        tableArgs,
      ),
      merge({ parent: dataset }, opts),
    );
    this.dataset = dataset;
    this.table = table;
    this.registerOutputs({ dataset: this.dataset, table: this.table });
  }
}
