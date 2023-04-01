import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Providers } from "@mussia33/node/shared";

export interface NetworkResourceProps {
  region: string;
  project: string;
  provider?: Providers;
}

export class networkResource extends pulumi.ComponentResource {
  constructor(
    name: string,
    networkResourceProps: NetworkResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super("mussia33:core:network:", name, {}, opts);

    const { project, region } = networkResourceProps;

    const vpcAccess = new gcp.projects.Service(
      "vpcaccess.googleapis.com",
      {
        disableDependentServices: true,
        service: "vpcaccess.googleapis.com",
      },
      { parent: this }
    );

    const vpcNetwork = new gcp.compute.Network(
      "vpcNetwork",
      {
        name: "my-first-vpc",
        project,
        description: "My first VPC",
        mtu: 1460,
        autoCreateSubnetworks: false,
      },
      { parent: this }
    );

    const ilSubnet = new gcp.compute.Subnetwork(
      "ilSubnet",
      {
        ipCidrRange: "10.212.0.0/24",
        region: "me-west1",
        network: vpcNetwork.id,
        name: "me-west1-subnet",
        description: "Israel subnet",
      },
      { parent: this }
    );

    const euSubnet = new gcp.compute.Subnetwork(
      "euSubnet",
      {
        ipCidrRange: "10.186.0.0/24",
        region: region,
        network: vpcNetwork.id,
        name: `${region}-subnet`,
        description: "Europe subnet",
      },
      { parent: this }
    );

    const defaultFirewall = new gcp.compute.Firewall(
      "default-firewall",
      {
        network: vpcNetwork.name,
        name: "default-firewall",
        priority: 65534,
        allows: [
          {
            protocol: "icmp",
          },
          {
            protocol: "tcp",
            ports: ["80", "8080", "1000-2000"],
          },
        ],
        sourceTags: ["web"],
      },
      { parent: this }
    );
  }
}
