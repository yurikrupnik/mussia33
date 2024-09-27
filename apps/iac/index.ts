// import * as storage from "@pulumi/gcp/storage";
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import * as aws from "@pulumi/aws";
// import { GetNetworkArgs, Subnetwork } from "@pulumi/gcp/compute";
import { BigqueryResource } from "./src/design-system/core/bigquery";
import { KmsIamMembersResource } from "./src/design-system/core/kms-iam-members";
import { KmsResource } from "./src/design-system/core/kms";
import { WorkloadIdentityResource } from "./src/design-system/core/workloadIdentity";
import { ServiceAccountResource } from "./src/design-system/core/service-account";
import { NetworkResource } from "./src/design-system/core/network";
import { PubSubResource } from "./src/design-system/core/pubsub";
import { AwsResource } from "./src/design-system/core/aws";
// import { ServiceResource } from "./src/design-system/core/gcp-service";
import { AirwayzResource } from "./src/design-system/page/airwayz";

// Get the current stack name
const currentStack = pulumi.getStack();
// Get some provider-namespaced configuration values
const providerCfg = new pulumi.Config("gcp");
const gcpProject = providerCfg.require("project");
const gcpRegion = providerCfg.get("region") || "europe-central2";
const awsProviderCfg = new pulumi.Config("aws");
const awsRegion = awsProviderCfg.get("region") || "il-central-1";

// Todo aws new user
const lbUser = new aws.iam.User("crossplaneUser", {
  path: "/system/",
  name: "crossplane-lb-user",
  tags: {
    "tag-key": "tag-value",
  },
});
const lbAccessKey = new aws.iam.AccessKey("crossplaneUserAccessKey", {
  user: lbUser.name,
});
const lbRoPolicyDocument = aws.iam.getPolicyDocument({
  statements: [
    {
      effect: "Allow",
      actions: ["ec2:Describe*", "s3:*"],
      resources: ["*"],
    },
  ],
});
const lbRoUserPolicy = new aws.iam.UserPolicy("lbRoUserPolicy", {
  user: lbUser.name,
  policy: lbRoPolicyDocument.then(
    (lbRoPolicyDocument) => lbRoPolicyDocument.json,
  ),
});

const gcpProjectNumberPromise = gcp.organizations
  .getProject({ projectId: gcpProject })
  .then((res) => res.number);

const subscriberProjects = ["platform-manager-dev", "platform-manager-prod"];

const uniqName = {
  kms: "airwayz-manager",
  workloadIdentityPoolId: "github-pool1",
  projects: subscriberProjects,
};

const compute = new gcp.projects.Service("compute.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "compute.googleapis.com",
  project: gcpProject,
});

const certificatemanager = new gcp.projects.Service(
  "certificatemanager.googleapis.com",
  {
    disableOnDestroy: false,
    disableDependentServices: false,
    service: "certificatemanager.googleapis.com",
    project: gcpProject,
  },
);

const bigquery = new gcp.projects.Service("bigquery.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "bigquery.googleapis.com",
  project: gcpProject,
});

const cloudKMS = new gcp.projects.Service("cloudkms.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "cloudkms.googleapis.com",
  project: gcpProject,
});

const servicenetworking = new gcp.projects.Service(
  "servicenetworking.googleapis.com",
  {
    disableOnDestroy: false,
    disableDependentServices: false,
    service: "servicenetworking.googleapis.com",
    project: gcpProject,
  },
);

const container = new gcp.projects.Service("container.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "container.googleapis.com",
  project: gcpProject,
});

const mesh = new gcp.projects.Service("mesh.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "mesh.googleapis.com",
  project: gcpProject,
});

const gkehub = new gcp.projects.Service("gkehub.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "gkehub.googleapis.com",
  project: gcpProject,
});

const pubsub = new gcp.projects.Service("pubsub.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "pubsub.googleapis.com",
  project: gcpProject,
});

const artifactregistry = new gcp.projects.Service(
  "artifactregistry.googleapis.com",
  {
    disableOnDestroy: false,
    disableDependentServices: false,
    service: "artifactregistry.googleapis.com",
    project: gcpProject,
  },
);

const secretmanager = new gcp.projects.Service("secretmanager.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "secretmanager.googleapis.com",
  project: gcpProject,
});

const redis = new gcp.projects.Service("redis.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "redis.googleapis.com",
  project: gcpProject,
});

const network = new NetworkResource(
  "primary-network",
  {
    networkArgs: {
      name: "primary-network",
      description: "A virtual network for your GKE cluster(s)",
    },
    subnetworkArgs: [
      {
        name: "eemshaven",
        region: "europe-west4",
        project: gcpProject,
        ipCidrRange: "12.127.0.0/20",
      },
      {
        name: "warsaw",
        region: "europe-central2",
        project: gcpProject,
        ipCidrRange: "12.128.0.0/20",
      },
      {
        name: "tel-aviv",
        project: gcpProject,
        region: "me-west1",
        ipCidrRange: "12.129.0.0/20",
      },
      {
        name: "zurich",
        region: "europe-west6",
        project: gcpProject,
        ipCidrRange: "12.130.0.0/20",
      },
      {
        name: "las-vegas",
        region: "us-west1",
        project: gcpProject,
        ipCidrRange: "12.131.0.0/20",
      },
      {
        name: "dallas",
        region: "us-west1",
        project: gcpProject,
        ipCidrRange: "12.134.0.0/20",
      },
    ],
  },
  { dependsOn: [compute], parent: compute },
);

// const networkSecondary = new NetworkResource(
//   "secondary-network",
//   {
//     networkArgs: {
//       name: "secondary-network",
//       description: "A virtual network for your GKE cluster(s) - secondary",
//     },
//     subnetworkArgs: [
//       {
//         name: "secondary-network-eemshaven",
//         region: "europe-west4",
//         project: gcpProject,
//         ipCidrRange: "12.127.0.0/20",
//       },
//     ],
//     globalAddressArgs: {
//       project: gcpProject,
//       purpose: "PRIVATE_SERVICE_CONNECT",
//       description: "Private IP Address for VPC private service connect",
//       labels: {
//         type: "private",
//       },
//       name: "secondary-private-connect",
//       address: "12.127.12.0", // Specify a valid IP address here
//     },
//   },
//   { dependsOn: [compute], parent: compute },
// );

const globalKms = new KmsResource(
  uniqName.kms,
  {
    keyRingArgs: {
      project: gcpProject,
      location: "global",
      name: "global-pulumi-keyring",
      // labels: {}
      // gcpRegion,
    },
    cryptoKeyArgs: {
      labels: {
        iac: "pulumi",
      },
    },
  },
  { dependsOn: [cloudKMS], parent: cloudKMS },
);

const euKms = new KmsResource(
  `${uniqName.kms}-eu`,
  {
    keyRingArgs: {
      project: gcpProject,
      location: "europe",
      name: "eu-pulumi-keyring",
      // gcpRegion,
    },
    cryptoKeyArgs: {
      labels: {
        iac: "pulumi",
      },
    },
  },
  { dependsOn: [cloudKMS], parent: cloudKMS },
);

const euw4Kms = new KmsResource(
  `${uniqName.kms}-euw4`,
  {
    keyRingArgs: {
      project: gcpProject,
      location: gcpRegion,
      name: "euw4-pulumi-keyring",
    },
    cryptoKeyArgs: {
      labels: {
        iac: "pulumi",
      },
    },
  },
  { dependsOn: [cloudKMS], parent: cloudKMS },
);

const secretPullerSa = new ServiceAccountResource("secret-puller", {
  accountArgs: {
    project: gcpProject,
    accountId: "secret-puller",
    description: "Service account to get (pull) secrets",
    displayName: "Secret Puller",
  },
  iAMBindingArgs: [
    {
      project: gcpProject,
      role: "roles/secretmanager.secretAccessor",
    },
    // {
    //   project: gcpProject,
    //   role: "roles/container.developer",
    //   // role: "roles/iam.serviceAccountTokenCreator",
    // },
  ],
});

const iacManagerSa = new ServiceAccountResource("iac-manager", {
  accountArgs: {
    project: gcpProject,
    accountId: "iac-manager",
    disabled: false,
    description: "Service account to manage (crud) cloud resources",
    displayName: "IAC Manager",
  },
  iAMBindingArgs: [
    {
      project: gcpProject,
      role: "roles/iam.serviceAccountTokenCreator",
    },
  ],
});

const containerWriterSa = new ServiceAccountResource(
  "github-container-writer",
  {
    accountArgs: {
      project: gcpProject,
      accountId: "container-writer",
      disabled: false,
      description: "Service account to write (push) containers",
      displayName: "Container writer",
    },
    iAMBindingArgs: [
      {
        project: gcpProject,
        role: "roles/artifactregistry.writer",
      },
    ],
  },
);

const containerReaderSa = new ServiceAccountResource(
  "github-container-reader",
  {
    accountArgs: {
      project: gcpProject,
      accountId: "container-reader",
      disabled: false,
      description: "Service account to read (pull) containers",
      displayName: "Container reader",
    },
    iAMBindingArgs: [
      {
        project: gcpProject,
        role: "roles/artifactregistry.reader",
      },
    ],
  },
);

const clusterSa = new ServiceAccountResource("cluster-sa", {
  accountArgs: {
    project: gcpProject,
    accountId: "cluster-sa",
    disabled: false,
    description: "GKE cluster service account",
    displayName: "Cluster manager SA",
  },
  iAMBindingArgs: [
    {
      role: "roles/cloudkms.cryptoKeyEncrypterDecrypter",
      project: gcpProject,
    },
  ],
});

const nodeSa = new ServiceAccountResource("node-sa", {
  accountArgs: {
    project: gcpProject,
    accountId: "node-sa",
    disabled: false,
    description: "GKE node service account",
    displayName: "Node manager SA",
  },
  iAMBindingArgs: [
    {
      role: "roles/cloudkms.cryptoKeyEncrypterDecrypter",
      project: gcpProject,
    },
  ],
});

const serviceAccounts = gcpProjectNumberPromise.then((gcpProjectNumber) => {
  return [
    // ui
    `serviceAccount:bq-${gcpProjectNumber}@bigquery-encryption.iam.gserviceaccount.com`,
    // ui storage
    `serviceAccount:service-${gcpProjectNumber}@gcp-sa-artifactregistry.iam.gserviceaccount.com`,
    `serviceAccount:service-${gcpProjectNumber}@gs-project-accounts.iam.gserviceaccount.com`,
    `serviceAccount:service-${gcpProjectNumber}@compute-system.iam.gserviceaccount.com`,
    `serviceAccount:service-${gcpProjectNumber}@container-engine-robot.iam.gserviceaccount.com`,
    `serviceAccount:service-${gcpProjectNumber}@cloud-redis.iam.gserviceaccount.com`,
    // ui
    `serviceAccount:service-${gcpProjectNumber}@gcp-sa-cloud-sql.iam.gserviceaccount.com`,
    // ui
    `serviceAccount:service-${gcpProjectNumber}@gcp-sa-pubsub.iam.gserviceaccount.com`,
  ];
});

const iamMembers = new KmsIamMembersResource(
  "cryptoKeyIamMembers",
  {
    serviceAccounts,
    iAMMemberArgs: {
      role: "roles/cloudkms.cryptoKeyEncrypterDecrypter",
      project: gcpProject,
    },
  },
  {
    dependsOn: [
      cloudKMS,
      pubsub,
      redis,
      bigquery,
      compute,
      artifactregistry,
      servicenetworking,
      container,
    ],
  },
);

const workloadIdentity = new WorkloadIdentityResource(
  "github-repos-with-gcp-container-pusher",
  {
    workloadIdentityPoolArgs: {
      project: gcpProject,
      workloadIdentityPoolId: uniqName.workloadIdentityPoolId,
      description: "Git Pool",
      displayName: "Git pool",
    },
    workloadIdentityPoolProviderArgs: {
      workloadIdentityPoolProviderId: "github-identity-pool-provider",
      displayName: "Github provider",
      attributeMapping: {
        "google.subject": "assertion.sub",
        "attribute.actor": "assertion.actor",
        "attribute.repository": "assertion.repository",
      },
      oidc: {
        issuerUri: "https://token.actions.githubusercontent.com",
      },
    },
    repos: [
      "https://github.com/yurikrupnik-airwayz/rust-monorepo",
      "https://github.com/Airwayz-Drones/ussp-monorepo",
    ],
    serviceAccount: containerWriterSa.serviceAccount,
  },
  { parent: containerWriterSa },
);

const gkeTopic = new PubSubResource(
  "gke-topic",
  {
    topicArgs: {
      name: "gke-topic",
      project: gcpProject,
      labels: {
        iac: "pulumi",
        team: "platform",
        sector: "k8s",
        kms: "false",
      },
    },
  },
  { dependsOn: [pubsub, iamMembers] },
);

const gkeTopicSecret = new PubSubResource(
  "gke-topic-secret",
  {
    topicArgs: {
      name: "gke-topic-secret",
      project: gcpProject,
      labels: {
        iac: "pulumi",
        team: "platform",
        sector: "k8s",
        kms: "true",
      },
      kmsKeyName: globalKms.keyId,
    },
  },
  { dependsOn: [pubsub, iamMembers] },
);

const gkeTopic1 = new PubSubResource(
  "gke-topic1",
  {
    topicArgs: {
      name: "gke-topic1",
      project: gcpProject,
      labels: {
        man: "pulumi",
        team: "platform",
        sector: "k8s",
      },
      kmsKeyName: euw4Kms.keyId,
    },
  },
  { dependsOn: [pubsub, iamMembers] },
);

const finOpsTopic = new PubSubResource(
  "fin-ops-topic",
  {
    topicArgs: {
      name: "fin-ops-topic",
      project: gcpProject,
      labels: {
        iac: "pulumi",
        team: "platform",
        sector: "finance",
      },
      kmsKeyName: euKms.keyId,
    },
  },
  { dependsOn: [pubsub, iamMembers] },
);

const stamTopic = new PubSubResource(
  "stam-topic",
  {
    topicArgs: {
      name: "stam-topic",
      project: gcpProject,
      labels: {
        iac: "pulumi",
        team: "platform",
        sector: "test",
      },
      kmsKeyName: globalKms.keyId,
    },
  },
  { dependsOn: [pubsub, iamMembers] },
);

const gkeDataset = new BigqueryResource(
  "gke-dataset",
  {
    datasetArgs: {
      datasetId: "gke_dataset",
      friendlyName: "GKE exported data",
      description: "This is GKE usage exported data",
      location: "EU",
      defaultTableExpirationMs: 3600000,
      labels: {
        env: "dev",
      },
      deleteContentsOnDestroy: true,
      // TODO fails
      // defaultEncryptionConfiguration: {
      //   kmsKeyName: euKms.keyId,
      // },
    },
    tableArgs: {
      project: gcpProject,
      labels: {
        env: "dev",
      },
      description: "GKE EU Table",
      tableId: "gke-exports",
      friendlyName: "gke-events",
      // TODO fails
      // encryptionConfiguration: {
      //   kmsKeyName: euKms.keyName,
      // },
    },
  },
  { dependsOn: [bigquery] },
);

const example = new aws.s3.BucketV2("example", {
  bucket: "my-tf-test-bucket111",
  tags: {
    Name: "My bucket",
    Environment: "Dev",
  },
});

// const awsResource = new AwsResource("aws-pulumi", {
//   subnetArgs: [
//     {
//       cidrBlock: "10.0.1.0/24",
//       mapPublicIpOnLaunch: false,
//       availabilityZone: `${awsRegion}a`,
//       tags: {
//         Name: "private-subnet-1",
//       },
//     },
//     {
//       cidrBlock: "10.0.2.0/24",
//       mapPublicIpOnLaunch: true,
//       availabilityZone: `${awsRegion}a`,
//       tags: {
//         Name: "public-subnet-1",
//       },
//     },
//     {
//       cidrBlock: "10.0.3.0/24",
//       mapPublicIpOnLaunch: false,
//       availabilityZone: `${awsRegion}b`,
//       tags: {
//         Name: "private-subnet-2",
//       },
//     },
//     {
//       cidrBlock: "10.0.4.0/24",
//       mapPublicIpOnLaunch: true,
//       availabilityZone: `${awsRegion}b`,
//       tags: {
//         Name: "public-subnet-2",
//       },
//     },
//     {
//       cidrBlock: "10.0.5.0/24",
//       mapPublicIpOnLaunch: false,
//       availabilityZone: `${awsRegion}c`,
//       tags: {
//         Name: "private-subnet-3",
//       },

//     },
//     {
//       cidrBlock: "10.0.6.0/24",
//       mapPublicIpOnLaunch: true,
//       availabilityZone: `${awsRegion}c`,
//       tags: {
//         Name: "public-subnet-3",
//       },
//     },
//   ],
// });

// export const kubeconfig = cluster.eksCluster.kubeconfig;

// new gcp.kms.CryptoKeyIAMBinding("keyEncrypterDecrypterBinding", {
//   cryptoKeyId: euw4Kms.keyId,
//   members: [`serviceAccount:${clusterSa.account.email}`],
//   role: "roles/cloudkms.cryptoKeyEncrypterDecrypter",
// });

// let airwayz = new AirwayzResource(
//   "yuri-dev",
//   {
//     shared: {
//       networkId: network.network.id,
//       networkName: network.network.name,
//       //     kms: euw4Kms.keyId,
//       project: gcpProject,
//       location: "europe-west4",
//       // location: network.subnets[0].region.apply((v) => v),
//       production: false,
//       labels: {
//         purpose: "yuri",
//         prod: "false",
//       },
//     },
//     componentProps: {
//       // secretResourceProps: {},
//       clusterResourceProps: {
//         clusterArgs: {
//           // description: "A GKE Airwayz Production Cluster",
//           resourceLabels: {
//             shit: "shit",
//           },
//           notificationConfig: {
//             pubsub: {
//               enabled: true,
//               topic: gkeTopic.topic.id,
//             },
//           },
//           resourceUsageExportConfig: {
//             bigqueryDestination: {
//               datasetId: gkeDataset.dataset.datasetId,
//             },
//             enableNetworkEgressMetering: true,
//             enableResourceConsumptionMetering: true,
//           },
//           subnetwork: network.subnets[0].name,
//           // clusterAutoscaling: {
//           //   enabled: true,
//           // },
//         },
//         nodePoolArgs: [
//           {
//             autoscaling: {
//               minNodeCount: 1,
//               maxNodeCount: 5,
//             },
//             nodeConfig: {
//               serviceAccount: nodeSa.account.email,
//               // machineType: "e2-standard-8",
//             },
//           },
//         ],
//       },
//       redisResourceProps: {
//         instanceArgs: {
//           // memorySizeGb: 15,
//         },
//       },
//     },
//   },
//   { dependsOn: [network, gkeDataset] },
// );
//
// let airwayz0 = new AirwayzResource(
//   "yuri-deva",
//   {
//     shared: {
//       networkId: network.network.id,
//       networkName: network.network.name,
//       //     kms: euw4Kms.keyId,
//       project: gcpProject,
//       // location: network.subnets[1].region,
//       location: "europe-central2",
//       production: false,
//       labels: {
//         purpose: "yuri",
//         prod: "false",
//       },
//     },
//     componentProps: {
//       // secretResourceProps: {},
//       clusterResourceProps: {
//         clusterArgs: {
//           // description: "A GKE Airwayz Production Cluster",
//           resourceLabels: {
//             shit: "shit",
//           },
//           // subnetwork: "europe-west4",
//           // Todo fails!!
//           subnetwork: network.subnets[1].name,
//           notificationConfig: {
//             pubsub: {
//               enabled: true,
//               topic: gkeTopic.topic.id,
//             },
//           },
//           resourceUsageExportConfig: {
//             bigqueryDestination: {
//               datasetId: gkeDataset.dataset.datasetId,
//             },
//             enableNetworkEgressMetering: true,
//             enableResourceConsumptionMetering: true,
//           },
//           // subnetwork: "tel-aviv",
//           // clusterAutoscaling: {
//           //   enabled: true,
//           // },
//         },
//         nodePoolArgs: [
//           {
//             name: "dev",
//             autoscaling: {
//               minNodeCount: 1,
//               maxNodeCount: 10,
//             },
//
//             nodeConfig: {
//               serviceAccount: nodeSa.account.email,
//               // machineType: "e2-standard-8",
//             },
//           },
//           {
//             name: "ci",
//             autoscaling: {
//               minNodeCount: 1,
//               maxNodeCount: 5,
//             },
//
//             nodeConfig: {
//               serviceAccount: nodeSa.account.email,
//               // machineType: "e2-standard-8",
//               preemptible: true,
//             },
//             initialNodeCount: 1,
//           },
//         ],
//       },
//       redisResourceProps: {
//         instanceArgs: {
//           // authorizedNetwork: network.network.name,
//           memorySizeGb: 15,
//         },
//       },
//       // postgresResourceProps: {
//       //   databaseInstanceArgs: {},
//       // },
//     },
//   },
//   { dependsOn: [network, gkeDataset] },
// );
//
// let airwayz1 = new AirwayzResource(
//   "yuri-prod",
//   {
//     shared: {
//       networkId: network.network.id,
//       networkName: network.network.name,
//       kms: euw4Kms.keyId,
//       project: gcpProject,
//       location: "europe-west4",
//       production: true,
//       labels: {
//         purpose: "yuri",
//         prod: "true",
//       },
//     },
//     componentProps: {
//       // secretResourceProps: {},
//       clusterResourceProps: {
//         clusterArgs: {
//           resourceLabels: {
//             shit: "shit1",
//           },
//           subnetwork: network.subnets[0].name,
//           notificationConfig: {
//             pubsub: {
//               enabled: true,
//               topic: gkeTopicSecret.topic.id,
//             },
//           },
//           resourceUsageExportConfig: {
//             bigqueryDestination: {
//               datasetId: gkeDataset.dataset.datasetId,
//             },
//             enableNetworkEgressMetering: true,
//             enableResourceConsumptionMetering: true,
//           },
//           // clusterAutoscaling: {
//           //   enabled: true,
//           // },
//         },
//         nodePoolArgs: [
//           {
//             autoscaling: {
//               minNodeCount: 1,
//               maxNodeCount: 6,
//             },
//             nodeConfig: {
//               serviceAccount: nodeSa.serviceAccount.email,
//               bootDiskKmsKey: euw4Kms.keyId,
//               machineType: "e2-standard-8",
//             },
//           },
//         ],
//       },
//       redisResourceProps: {
//         instanceArgs: {
//           // authorizedNetwork: network.network.name,
//           // memorySizeGb: 15,
//         },
//       },
//     },
//   },
//   { dependsOn: [network, gkeDataset, euw4Kms] },
// );

// let airwayz2 = new AirwayzResource(
//   "yuri-private",
//   {
//     shared: {
//       networkId: network.network.id,
//       networkName: network.network.name,
//       kms: euw4Kms.keyId,
//       project: gcpProject,
//       location: "me-west1",
//       production: true,
//       labels: {
//         purpose: "yuri",
//         prod: "true",
//       },
//     },
//     componentProps: {
//       // secretResourceProps: {},
//       clusterResourceProps: {
//         clusterArgs: {
//           resourceLabels: {
//             shit: "shit1",
//             type: "private",
//           },
//           subnetwork: network.subnets[2].name,
//           privateClusterConfig: {
//             enablePrivateEndpoint: false,
//             enablePrivateNodes: true,
//           },
//           notificationConfig: {
//             pubsub: {
//               enabled: true,
//               topic: gkeTopicSecret.topic.id,
//             },
//           },
//           // clusterAutoscaling: {
//           //   enabled: true,
//           // },
//         },
//         nodePoolArgs: [
//           {
//             autoscaling: {
//               minNodeCount: 1,
//               maxNodeCount: 6,
//             },
//             nodeConfig: {
//               serviceAccount: nodeSa.serviceAccount.email,
//               bootDiskKmsKey: euw4Kms.keyId,
//               machineType: "e2-standard-8",
//             },
//           },
//         ],
//       },
//       redisResourceProps: {
//         instanceArgs: {
//           // authorizedNetwork: network.network.name,
//           // memorySizeGb: 15,
//         },
//       },
//     },
//   },
//   { dependsOn: [network, gkeDataset] },
// );
