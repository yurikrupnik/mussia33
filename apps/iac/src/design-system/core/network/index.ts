import { merge } from "lodash";
import * as pulumi from "@pulumi/pulumi";
import {
  Network,
  NetworkArgs,
  Subnetwork,
  SubnetworkArgs,
  GlobalAddress,
  GlobalAddressArgs,
} from "@pulumi/gcp/compute";
import { Connection, ConnectionArgs } from "@pulumi/gcp/servicenetworking";

export interface NetworkResourceProps {
  networkArgs: NetworkArgs;
  subnetworkArgs: Array<Omit<SubnetworkArgs, "network">>;
  globalAddressArgs?: GlobalAddressArgs;
  connectionArgs?: ConnectionArgs;
}

export class NetworkResource extends pulumi.ComponentResource {
  readonly network: pulumi.Output<Network>;
  readonly subnets: pulumi.Output<Array<Subnetwork>>;
  constructor(
    name: string,
    networkResourceProps: NetworkResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:network", name, {}, opts);
    const { networkArgs, subnetworkArgs, globalAddressArgs, connectionArgs } =
      networkResourceProps;
    const network = new Network(
      name,
      merge(
        {
          autoCreateSubnetworks: false,
          deleteDefaultRoutesOnCreate: false,
        },
        networkArgs,
      ),
      { parent: this },
    );
    this.network = pulumi.output(network);

    let subnets = subnetworkArgs.map((subnet) => {
      return new Subnetwork(
        `${subnet.name ? subnet.name : `subnet-${name}`}`,
        merge(
          {
            // name: subnet.name,
            privateIpGoogleAccess: true,
            network: network.id,
            description: `Subnet for the network at ${subnet.region}`,
            logConfig: {
              aggregationInterval: "INTERVAL_1_MIN",
              flowSampling: 0.5,
            },
          },
          subnet,
        ),
        { parent: network },
      );
    });
    this.subnets = pulumi.output(subnets); // Wrap subnets in pulumi.Output

    const privateIpAddressNetwork = new GlobalAddress(
      name,
      merge(
        {
          name: name,
          purpose: "VPC_PEERING", // "VPC_PEERING/PRIVATE_SERVICE_CONNECT",
          addressType: "INTERNAL",
          description: "Private IP Address for VPC Peering",
          // does not work with PRIVATE_SERVICE_CONNECT
          // see: https://www.pulumi.com/registry/packages/gcp/api-docs/compute/globaladdress/#purpose_nodejs
          prefixLength:
            globalAddressArgs?.purpose === "PRIVATE_SERVICE_CONNECT"
              ? undefined
              : 16,
          network: network.id,
          labels: {
            network: "private-service-connect", // "vpc-peering",
            iac: "pulumi",
          },
        } as GlobalAddressArgs,
        globalAddressArgs,
      ),
      { parent: network, deleteBeforeReplace: true, protect: false },
    );
    const privateVpcConnectionTest = new Connection(
      name,
      merge(
        {
          network: network.id,
          service: "servicenetworking.googleapis.com",
          reservedPeeringRanges: [privateIpAddressNetwork.name],
        } as ConnectionArgs,
        connectionArgs,
      ),
      {
        parent: privateIpAddressNetwork,
        protect: false,
        deleteBeforeReplace: true,
      },
    );
  }
}
