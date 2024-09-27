import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import {
  getImage,
  Disk,
  DiskArgs,
  InstanceTemplate,
  InstanceTemplateArgs,
  ResourcePolicy,
  ResourcePolicyArgs,
} from "@pulumi/gcp/compute";

export interface VMResourceProps {
  resourcePolicyArgs?: ResourcePolicyArgs;
  instanceTemplateArgs?: InstanceTemplateArgs;
  diskArgs: DiskArgs;
}

export class VMResource extends pulumi.ComponentResource {
  // readonly topic: pulumi.Output<string>;
  constructor(
    name: string,
    vmResourceProps: VMResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:vm:", name, {}, opts);
    const { instanceTemplateArgs, diskArgs, resourcePolicyArgs } =
      vmResourceProps;
    const myImage = getImage(
      {
        family: "debian-11",
        project: "debian-cloud",
      },
      { parent: this },
    );
    const foobar = new Disk(
      "foobar",
      {
        name: "existing-disk",
        image: myImage.then((myImage) => myImage.selfLink),
        size: 10,
        type: "pd-ssd",
        zone: "us-central1-a",
      },
      { parent: this },
    );
    const dailyBackup = new ResourcePolicy(
      "daily_backup",
      {
        name: "every-day-4am",
        region: "us-central1",
        snapshotSchedulePolicy: {
          schedule: {
            dailySchedule: {
              daysInCycle: 1,
              startTime: "04:00",
            },
          },
        },
      },
      { parent: this },
    );

    const defaultInstanceTemplate = new InstanceTemplate("default", {
      name: "appserver-template",
      description: "This template is used to create app server instances.",
      tags: ["foo", "bar"],
      labels: {
        environment: "dev",
      },
      instanceDescription: "description assigned to instances",
      machineType: "e2-medium",
      canIpForward: false,
      scheduling: {
        automaticRestart: true,
        onHostMaintenance: "MIGRATE",
      },
      disks: [
        {
          sourceImage: "debian-cloud/debian-11",
          autoDelete: true,
          boot: true,
          resourcePolicies: dailyBackup.id,
        },
        {
          source: foobar.name,
          autoDelete: false,
          boot: false,
        },
      ],
      networkInterfaces: [
        {
          network: "default",
        },
      ],
      metadata: {
        foo: "bar",
      },
      // serviceAccount: {
      //     email: _default.email,
      //     scopes: ["cloud-platform"],
      // },
    });

    // const webservers = new gcp.compute.InstanceGroup("webservers", {
    //     name: "webservers",
    //     description: "Test instance group",
    //     instances: [
    //         // defaultInstanceTemplate.instanceDescription[0].,
    //         // test2.id,
    //     ],
    //     namedPorts: [
    //         {
    //             name: "http",
    //             port: 8080,
    //         },
    //         {
    //             name: "https",
    //             port: 8443,
    //         },
    //     ],
    //     zone: "us-central1-a",
    // });
  }
}
