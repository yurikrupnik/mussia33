import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { ServicesResource } from "./src/servicesResource";
import { GcpFunctionResource, GcpFunction } from "./src/gcpFunction";
import {
  WorkloadIdentityResource,
  WorkloadIdentityResourceProps,
} from "./src/workloadIdentity";
import { Providers } from "./src/shared";
import { CloudRunResourceProps, CloudRunResource } from "./src/cloudRun";

const config = new pulumi.Config("core");
const nodeCount = config.get("nodeCount");

// functions are no active at me-west1
const gcpConfig = new pulumi.Config("gcp");
const region = gcpConfig.get("region");
const project = gcpConfig.get("project");

const serviceDirectory = new gcp.projects.Service(
  "servicedirectory.googleapis.com",
  {
    disableDependentServices: true,
    service: "servicedirectory.googleapis.com",
  }
);
new gcp.servicedirectory.Namespace("ServiceDirectoryNamespaceA", {
  namespaceId: "client1",
  project,
  labels: {
    client: "a",
  },
  location: region,
});

new gcp.servicedirectory.Namespace("ServiceDirectoryNamespaceB", {
  namespaceId: "client2",
  project,
  labels: {
    client: "b",
  },
  location: region,
});
// security
const cloudKMS = new gcp.projects.Service("cloudkms.googleapis.com", {
  disableDependentServices: true,
  service: "cloudkms.googleapis.com",
});

// const keyRing = new gcp.kms.KeyRing("keyring", {
//   name: "first-keyring",
//   project,
//   location: "europe",
// });

// const example_key = new gcp.kms.CryptoKey("example-key", {
//   name: "first-key",
//   keyRing: keyRing.id,
//   rotationPeriod: "100000s",
// });
//
// const example_asymmetric_sign_key = new gcp.kms.CryptoKey(
//   "example-asymmetric-sign-key",
//   {
//     name: "second-key",
//     keyRing: keyRing.id,
//     // rotationPeriod: "100000s",
//     purpose: "ASYMMETRIC_SIGN",
//     versionTemplate: {
//       algorithm: "EC_SIGN_P384_SHA384",
//     },
//   }
// );
// end security

const tempBucket = new gcp.storage.Bucket("temp-bucket", {
  name: `${project}-temp-bucket`,
  location: region,
  forceDestroy: true,
  labels: {
    type: "temp",
    team: "util",
  },
});

const eventsBucket = new gcp.storage.Bucket("events-bucket", {
  name: `${project}-events-bucket`,
  location: region,
  forceDestroy: true,
  labels: {
    type: "events",
    team: "big-data",
  },
  versioning: { enabled: true },
  // website
});

const funcBucket = new gcp.storage.Bucket(`${project}-func-bucket`, {
  name: `${project}-func-bucket`,
  location: "eu",
  // location: "EU",
  // location: region,
  forceDestroy: true,
  versioning: {
    enabled: true,
  },
  labels: {
    type: "code",
  },
});

const dataset = new gcp.bigquery.Dataset("applications_events", {
  datasetId: "applications_events",
  description: "This is a test description",
  friendlyName: "Test logs",
  location: region,
  // defaultTableExpirationMs: 3600000,
  labels: {
    env: "default",
    name: "aris-test",
  },
});

const servicesNames = [
  "cloudfunctions.googleapis.com",
  "cloudbuild.googleapis.com",
  "pubsub.googleapis.com",
];

const gcpFunctionServices = new ServicesResource("GcpFunctionServices", {
  services: servicesNames,
  provider: Providers.gcp,
});

const functionsPath = "../../dist/apps/node/";

const functions: GcpFunction[] = [
  {
    name: "nest-app",
    bucket: funcBucket,
    path: functionsPath,
    member: "allUsers",
    functionArgs: {
      availableMemoryMb: 256,
      region,
      triggerHttp: true,
      entryPoint: "dead",
      project,
      sourceArchiveBucket: funcBucket.name,
      eventTrigger: undefined,
      runtime: "nodejs18",
    },
  },
];

// const funcs = functions.map((f) => {
//   return new GcpFunctionResource(f.name, f, {
//     dependsOn: gcpFunctionServices,
//     parent: gcpFunctionServices.firstService,
//   });
// });

const computeServices = new ServicesResource(
  "computeServices",
  {
    provider: Providers.gcp,
    services: ["compute.googleapis.com"],
  },
  {}
);

const secretManager = new ServicesResource(
  "secretManagerServices",
  {
    provider: Providers.gcp,
    services: ["secretmanager.googleapis.com"],
  },
  {}
);

const eventarc = new ServicesResource(
  "eventArcServices",
  {
    provider: Providers.gcp,
    services: ["eventarc.googleapis.com"],
  },
  {}
);

new gcp.projects.IAMBinding("pubsub-token-creator", {
  project: project,
  members: [
    "serviceAccount:service-361115404307@gcp-sa-pubsub.iam.gserviceaccount.com",
  ],
  role: "roles/iam.serviceAccountTokenCreator",
});

// new gcp.projects.IAMBinding("evenTarcEventReceiver", {
//   project: project,
//   members: [
//     "serviceAccount:361115404307-compute@developer.gserviceaccount.com ",
//   ],
//   role: "roles/eventarc.eventReceiver",
// });

// const _default = new gcp.cloudrun.Service("default", {
//   location: region,
//   template: {
//     spec: {
//       containers: [
//         {
//           image: "gcr.io/cloudrun/hello",
//         },
//       ],
//     },
//   },
//   traffics: [
//     {
//       percent: 100,
//       latestRevision: true,
//     },
//   ],
// });

// const deadLetter = new gcp.pubsub.Topic(
//   "dead-letter",
//   {
//     name: "dead-letter",
//   },
//   {}
// );
// const subscription = new gcp.pubsub.Subscription("subscription", {
//   topic: deadLetter.name,
//   pushConfig: {
//     pushEndpoint: _default.statuses.apply((statuses) => statuses[0].url),
//     // oidcToken: {
//     //   serviceAccountEmail: sa.email,
//     // },
//     attributes: {
//       "x-goog-version": "v1",
//     },
//   },
// });
// new gcp.eventarc.Trigger("eventarc-trigger-pubsub", {
//   name: "s",
//   labels: {},
//   location: region,
//   project,
//   destination,
// });

// const iamcredentials = new ServicesResource(
//   "iamCredentialsServices",
//   {
//     provider: Providers.gcp,
//     services: ["iamcredentials.googleapis.com"],
//   },
//   {}
// );

const iamcredentials = new gcp.projects.Service(
  "iamcredentials.googleapis.com",
  {
    disableDependentServices: true,
    service: "iamcredentials.googleapis.com",
  }
);
const workloadIdentity = new WorkloadIdentityResource(
  "WorkloadIdentityResource",
  {
    repos: ["yurikrupnik/mussia33", "yurikrupnik/first-rust-app"],
    project,
  },
  { dependsOn: [iamcredentials], parent: iamcredentials }
);

const cloudScheduler = new gcp.projects.Service(
  "cloudscheduler.googleapis.com",
  {
    disableDependentServices: true,
    service: "cloudscheduler.googleapis.com",
  }
);

const artifactRegistry = new gcp.projects.Service(
  "artifactregistry.googleapis.com",
  {
    disableDependentServices: true,
    service: "artifactregistry.googleapis.com",
  }
);

const binaryAuthorization = new gcp.projects.Service(
  "binaryauthorization.googleapis.com",
  {
    disableDependentServices: true,
    service: "binaryauthorization.googleapis.com",
  }
);

// High price
// const containerScanning = new gcp.projects.Service(
//   "containerscanning.googleapis.com",
//   {
//     disableDependentServices: true,
//     service: "containerscanning.googleapis.com",
//   }
// );

const artifactRegistryRepo = new gcp.artifactregistry.Repository(
  "docker-registry",
  {
    mode: "STANDARD_REPOSITORY",
    project,
    labels: {},
    repositoryId: "container-repository",
    location: region,
    format: "DOCKER",
    description: "Example docker repository.",
  },
  { parent: artifactRegistry, dependsOn: [artifactRegistry] }
);

const mesh = new gcp.projects.Service("mesh.googleapis.com", {
  disableDependentServices: true,
  service: "mesh.googleapis.com",
});

// networking
const vpcAccess = new gcp.projects.Service("vpcaccess.googleapis.com", {
  disableDependentServices: true,
  service: "vpcaccess.googleapis.com",
});

const vpcNetwork = new gcp.compute.Network("vpcNetwork", {
  name: "my-first-vpc",
  project,
  description: "My first VPC",
  mtu: 1460,
  autoCreateSubnetworks: false,
});

const ilSubnet = new gcp.compute.Subnetwork("ilSubnet", {
  ipCidrRange: "10.212.0.0/24",
  region: "me-west1",
  network: vpcNetwork.id,
  name: "me-west1-subnet",
  description: "Israel subnet",
});

const euSubnet = new gcp.compute.Subnetwork("euSubnet", {
  ipCidrRange: "10.186.0.0/24",
  region: region,
  network: vpcNetwork.id,
  name: `${region}-subnet`,
  description: "Europe subnet",
});

const defaultFirewall = new gcp.compute.Firewall("default-firewall", {
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
});

// Serverless VPC Access allows Cloud Functions, Cloud Run (fully managed) services and App Engine standard environment apps to access resources in a VPC network using the internal IP addresses of those resources
// const vpcConnector = new gcp.vpcaccess.Connector("serverless-connector", {
//   name: "serverless-connector",
//   region: region,
//   network: vpcNetwork.id,
//   // subnet: {
//   //   projectId: project,
//   //   name: euSubnet.name,
//   // },
//   ipCidrRange: "10.10.11.0/28", // 10.8.0.0/28 suggested by ui
//   project,
//   minInstances: 2,
//   maxInstances: 3,
//   machineType: "f1-micro", // "e2-micro" default
// });

// Start cloud run
const cloudRun = new CloudRunResource("app1", {
  project,
  name: "cloud-app1",
  serviceArgs: {
    name: "cloud-app1",
    location: region,
    labels: {},
    project,
    description: "my app",
    template: {
      serviceAccount: "",
      containers: [
        {
          name: "as",
          image:
            "europe-central2-docker.pkg.dev/mussia33/container-repository/fiber-app@sha256:beaf33fa7bf4c1347ee84687f99d2c2b9a531ace7205245750884d2a350c5c3f",
        },
      ],
      // serviceAccount: 'cloud-run-sa',
    },
  },
});
// End cloud run

// start compute k8s
// const cluster = new gcp.container.Cluster("autopilot", {
//   name: "autopilot-dev",
//   project,
//   location: region,
//   description: "Development europe autopilot cluster",
//   enableAutopilot: true,
//   // network: vpcNetwork.id,
//   // clusterAutoscaling: {
//   //   enabled: false,
//   // },
//   // initialNodeCount: 3,
//   // notificationConfig: {
//   //   pubsub: "",
//   // },
// });
// end compute k8s
// export const connectorId = vpcConnector.id;
export const dockerRepo = pulumi.interpolate`${region}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
export const workloadName = workloadIdentity.workload_identity_provider;
export const workloadSAEmail = workloadIdentity.saEmail;
