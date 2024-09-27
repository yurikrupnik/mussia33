import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as eks from "@pulumi/eks";
import { Vpc, VpcArgs, Subnet, SubnetArgs } from "@pulumi/aws/ec2";
import { Account } from "@pulumi/gcp/serviceaccount";
import { Dataset, DatasetArgs, Table, TableArgs } from "@pulumi/gcp/bigquery";
import { merge } from "lodash";

export interface AwsResourceProps {
  vpcArgs?: VpcArgs;
  subnetArgs: Array<Omit<SubnetArgs, "vpcId">>;
  // datasetArgs: DatasetArgs;
  // tableArgs: Omit<TableArgs, "datasetId">;
}

export class AwsResource extends pulumi.ComponentResource {
  // public readonly dataset: Dataset;
  // public readonly kubeconfig: string;
  // public readonly kubeconfig: pulumi.Output<eks.Cluster>;
  // public readonly eksCluster: eks.Cluster;
  constructor(
    name: string,
    awsResourceProps: AwsResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:aws", name, {}, opts);

    const vpc = new Vpc(
      name,
      merge(
        {
          cidrBlock: "10.0.0.0/16",
          enableDnsHostnames: true,
          enableDnsSupport: true,
          // region: "us-west-2", // test region
          labels: {
            iac: "pulumi",
          },
          tags: {
            Name: "main-vpc",
          },
        } as VpcArgs,
        awsResourceProps.vpcArgs,
      ),
      { parent: this },
    );

    const subnets = awsResourceProps.subnetArgs.map((subnet, i) => {
      return new aws.ec2.Subnet(
        `${subnet.availabilityZone}-${subnet.mapPublicIpOnLaunch ? "public" : "private"}`,
        merge(
          {
            vpcId: vpc.id,
            labels: {
              iac: "pulumi",
            },
            tags: {
              IAC: "pulumi",
            },
          } as SubnetArgs,
          subnet,
        ),
        { parent: this },
      );
    });

    // Create an Internet Gateway for the VPC
    const igw = new aws.ec2.InternetGateway(
      "myIgw",
      {
        vpcId: vpc.id,
        tags: {
          Name: "myIgw",
          iac: "pulumi",
        },
      },
      { parent: this },
    );

    // Create NAT gateway
    const natEip = new aws.ec2.Eip(
      "nat-eip",
      {
        vpc: true,
        tags: {
          iac: "pulumi",
        },
      },
      { parent: this },
    );

    const natGateway = new aws.ec2.NatGateway(
      "nat-gateway",
      {
        subnetId: subnets[1].id,
        allocationId: natEip.id,
        tags: {
          Name: "custom-vpc-nat",
          iac: "pulumi",
        },
      },
      { parent: this },
    );

    // Create Route Table for Public Subnets
    const publicRouteTable = new aws.ec2.RouteTable("public-route-table", {
      vpcId: vpc.id,
      routes: [
        {
          cidrBlock: "0.0.0.0/0",
          gatewayId: igw.id,
        },
      ],
      tags: {
        Name: "public-route-table",
        iac: "pulumi",
      },
    });

    const privateRouteTable = new aws.ec2.RouteTable("private-route-table", {
      vpcId: vpc.id,
      routes: [
        {
          cidrBlock: "0.0.0.0/0",
          natGatewayId: natGateway.id,
        },
      ],
      tags: {
        Name: "private-route-table",
      },
    });

    // Associate Route Table with Public Subnets
    new aws.ec2.RouteTableAssociation("privateRouteTableAssoc1", {
      subnetId: subnets[0].id, // publicSubnet1.id,
      routeTableId: privateRouteTable.id,
    });
    new aws.ec2.RouteTableAssociation("publicRouteTableAssoc1", {
      subnetId: subnets[1].id,
      routeTableId: publicRouteTable.id,
    });
    new aws.ec2.RouteTableAssociation("privateRouteTableAssoc2", {
      subnetId: subnets[2].id, // publicSubnet1.id,
      routeTableId: privateRouteTable.id,
    });
    new aws.ec2.RouteTableAssociation("publicRouteTableAssoc2", {
      subnetId: subnets[3].id,
      routeTableId: publicRouteTable.id,
    });
    new aws.ec2.RouteTableAssociation("privateRouteTableAssoc3", {
      subnetId: subnets[4].id, // publicSubnet1.id,
      routeTableId: privateRouteTable.id,
    });
    new aws.ec2.RouteTableAssociation("publicRouteTableAssoc3", {
      subnetId: subnets[5].id,
      routeTableId: publicRouteTable.id,
    });
    // // Set the publicRouteTable as the main route table for the VPC
    // new aws.ec2.MainRouteTableAssociation("mainRouteTableAssoc", {
    //   vpcId: vpc.id,
    //   routeTableId: publicRouteTable.id,
    // });
    // // Set the publicRouteTable as the main route table for the VPC
    // new aws.ec2.MainRouteTableAssociation("mainRouteTableAsses", {
    //   vpcId: vpc.id,
    //   routeTableId: privateRouteTable.id,
    // });

    // cluster
    // Create a security group for the EKS cluster
    const clusterSecurityGroup = new aws.ec2.SecurityGroup("eks-cluster-sg", {
      vpcId: vpc.id,
      description: "Security group for EKS cluster control plane",
      ingress: [
        {
          // Allow all outbound traffic from the control plane
          protocol: "-1",
          fromPort: 0,
          toPort: 0,
          cidrBlocks: ["0.0.0.0/0"],
        },
      ],
      egress: [
        {
          // Allow all outbound traffic
          protocol: "-1",
          fromPort: 0,
          toPort: 0,
          cidrBlocks: ["0.0.0.0/0"],
        },
      ],
      revokeRulesOnDelete: true,
      name: "eks-cluster-sg",
      tags: {
        Name: "eks-cluster-sg",
      },
    });
    // Create a security group for the worker nodes
    // const nodeSecurityGroup = new aws.ec2.SecurityGroup("eks-node-sg", {
    //   vpcId: vpc.id,
    //   description: "Security group for EKS worker nodes",
    //   ingress: [
    //     {
    //       // Allow all inbound traffic from within the same security group (for node-to-node communication)
    //       protocol: "-1",
    //       fromPort: 0,
    //       toPort: 0,
    //       self: true,
    //     },
    //     {
    //       // Allow inbound SSH (optional, for debugging)
    //       protocol: "tcp",
    //       fromPort: 22,
    //       toPort: 22,
    //       cidrBlocks: ["YOUR_IP_ADDRESS/32"], // Replace with your IP or desired CIDR
    //     },
    //     {
    //       // Allow inbound Kubernetes API Server access (optional)
    //       protocol: "tcp",
    //       fromPort: 443,
    //       toPort: 443,
    //       cidrBlocks: ["0.0.0.0/0"], // Adjust as needed for security
    //     },
    //   ],
    //   egress: [
    //     {
    //       // Allow all outbound traffic
    //       protocol: "-1",
    //       fromPort: 0,
    //       toPort: 0,
    //       cidrBlocks: ["0.0.0.0/0"],
    //     },
    //   ],
    //   tags: {
    //     Name: "eks-node-sg",
    //   },
    // });

    // 2. Create a KMS Key for EKS encryption
    // const kmsKey = new aws.kms.Key("eks-kms-key", {
    //   description: "KMS key to encrypt EKS secrets",
    //   deletionWindowInDays: 10,
    //   enableKeyRotation: true, // Enable automatic key rotation
    //   tags: {
    //     Name: "eks-kms-key",
    //   },
    //   // labels: {},
    // });
    // const eksCluster = new aws.eks.Cluster("eksCluster", {
    //   name: "my-shit-eks-cluster",
    //   // roleArn: eksRole.arn,
    //   vpcConfig: {
    //     publicAccessCidrs: ["0.0.0.0/0"],
    //     // publicAccess: true,
    //     privateAccess: true,
    //     subnetIds: [
    //       subnets[0].id,
    //       subnets[1].id,
    //       subnets[2].id,
    //       subnets[3].id,
    //       subnets[4].id,
    //       subnets[5].id,
    //     ],
    //   },
    //   encryptionConfig: [
    //     {
    //       resources: ["secrets"], // Encrypt Kubernetes Secrets
    //       provider: {
    //         keyArn: kmsKey.arn,
    //       },
    //     },
    //   ],
    // });

    const eksCluster = new eks.Cluster("eks-cluster", {
      vpcId: vpc.id,
      publicSubnetIds: [subnets[1].id, subnets[3].id, subnets[5].id],
      privateSubnetIds: [subnets[0].id, subnets[2].id, subnets[4].id],
      name: "my-shit-eks-cluster",
      skipDefaultNodeGroup: true,
    });
    // 3. Add Autoscaling Node Group (Node Pools)
    const nodeGroup = new aws.eks.NodeGroup("eks-node-group", {
      clusterName: eksCluster.eksCluster.name,
      nodeGroupName: "autoscaling-node-group",
      nodeRoleArn: eksCluster.instanceRoles[0].arn, // Use the role created for the EKS cluster
      subnetIds: [subnets[1].id, subnets[3].id, subnets[5].id],
      // capacityType: "",
      scalingConfig: {
        desiredSize: 2,
        minSize: 2,
        maxSize: 5,
      },
      updateConfig: {
        maxUnavailable: 1,
      },
      labels: {
        role: "general",
      },
      instanceTypes: ["t3.medium"], // t3.xlarge
      amiType: "AL2_x86_64", // Amazon Linux 2 AMI for EKS
      tags: {
        Name: "autoscaling-node-group",
      },
    });

    // 4. Security Best Practices
    // - Use VPC, private networking, and security groups to secure the cluster.
    // - Control access to the cluster with IAM policies and roles.

    // Enable IAM Role for the EKS nodes
    const eksNodeRole = new aws.iam.Role("eksNodeRole", {
      assumeRolePolicy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Action: "sts:AssumeRole",
            Effect: "Allow",
            Principal: {
              Service: "ec2.amazonaws.com",
            },
          },
        ],
      }),
    });

    new aws.iam.RolePolicyAttachment("eksNodeRole-AmazonEKSWorkerNodePolicy", {
      role: eksNodeRole.name,
      policyArn: "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
    });

    new aws.iam.RolePolicyAttachment("eksNodeRole-AmazonEKS_CNI_Policy", {
      role: eksNodeRole.name,
      policyArn: "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
    });

    new aws.iam.RolePolicyAttachment(
      "eksNodeRole-AmazonEC2ContainerRegistryReadOnly",
      {
        role: eksNodeRole.name,
        policyArn: "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
      },
    );
    // // Export the cluster's kubeconfig
    // // export const kubeconfig = eksCluster.kubeconfig;
    // this.eksCluster = eksCluster;

    // 4. Create an Amazon ElastiCache (Redis) cluster in private subnet
    // const redisSubnetGroup = new aws.elasticache.SubnetGroup(
    //   "redis-subnet-group",
    //   {
    //     subnetIds: [subnets[0].id],
    //     tags: {
    //       Name: "redis-subnet-group",
    //     },
    //   },
    // );
    //
    // const redisCluster = new aws.elasticache.Cluster("redis-cluster", {
    //   engine: "redis",
    //   nodeType: "cache.t3.micro",
    //   numCacheNodes: 1,
    //   subnetGroupName: redisSubnetGroup.id,
    //   securityGroupIds: [eksCluster.instanceRoles[0].id],
    //   tags: {
    //     Name: "redis-cluster",
    //   },
    // });

    // // 5. Create an Amazon RDS PostgreSQL instance
    // const dbSecurityGroup = new aws.ec2.SecurityGroup("db-security-group", {
    //   vpcId: vpc.id,
    //   ingress: [
    //     {
    //       protocol: "tcp",
    //       fromPort: 5432,
    //       toPort: 5432,
    //       // cidrBlocks: [subnets[0].cidrBlock], // Only allow private subnet access
    //     },
    //   ],
    //   egress: [
    //     {
    //       protocol: "tcp",
    //       fromPort: 0,
    //       toPort: 0,
    //       cidrBlocks: ["0.0.0.0/0"],
    //     },
    //   ],
    //   tags: {
    //     Name: "db-security-group",
    //   },
    // });

    // const dbSecurityGroup = new aws.ec2.SecurityGroup("db-security-group", {
    //   vpcId: vpc.id,
    //   ingress: [
    //     {
    //       protocol: "tcp",
    //       fromPort: 5432,
    //       toPort: 5432,
    //       cidrBlocks: [subnets[1].cidrBlock], // Only allow private subnet access
    //     },
    //   ],
    //   egress: [
    //     {
    //       protocol: "tcp",
    //       fromPort: 0,
    //       toPort: 0,
    //       cidrBlocks: ["0.0.0.0/0"],
    //     },
    //   ],
    //   tags: {
    //     Name: "db-security-group",
    //   },
    // });
    //
    // const dbSubnetGroup = new aws.rds.SubnetGroup("db-subnet-group", {
    //   subnetIds: [subnets[0].id, subnets[1].id],
    //   tags: {
    //     Name: "db-subnet-group",
    //   },
    // });
    // const postgresDb = new aws.rds.Instance("postgres-instance", {
    //   engine: "postgres",
    //   instanceClass: "db.t3.micro",
    //   allocatedStorage: 20,
    //   dbSubnetGroupName: dbSubnetGroup.id,
    //   vpcSecurityGroupIds: [dbSecurityGroup.id],
    //   name: "appdb",
    //   username: "appuser",
    //   password: password,
    //   skipFinalSnapshot: true,
    //   multiAz: true, // High availability
    //   backupRetentionPeriod: 7, // Retain backups for 7 days
    //   publiclyAccessible: false, // No public access to the database
    //   storageEncrypted: true, // Enable encryption at rest
    //   tags: {
    //     Name: "postgres-instance",
    //   },
    // });
    // // 3. Create an EKS Cluster in the private subnets
    // const eksCluster = new eks.Cluster("eks-cluster", {
    //   vpcId: vpc.id,
    //   publicSubnetIds: [subnets[0].id],
    //   privateSubnetIds: [subnets[1].id],
    //   instanceType: "t3.medium",
    //   desiredCapacity: 1,
    //   minSize: 1,
    //   maxSize: 4,
    //   deployDashboard: false, // Disable the Kubernetes dashboard for security
    // });

    // Create subnets
    // const { datasetArgs, tableArgs } = awsResourceProps;

    // this.dataset = dataset;
    // this.table = table;
    // this.registerOutputs({ dataset: this.dataset, table: this.table });
  }
}
