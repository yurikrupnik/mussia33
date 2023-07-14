// config:
//   gcp:project: mussia-devops
// gcp:region: europe-central2
// gcp:zone: europe-central2-b

import * as pulumi from "@pulumi/pulumi";
// import * as k8s from "@pulumi/kubernetes";
import * as gcp from "@pulumi/gcp";
// import * as gcp from "@pulumi/datadog";
import {ServicesResource} from "./src/servicesResource";
import {NetworkResource} from "./src/network";
import {ArtifactoryResource} from "./src/artifactory";
import {GcpFunction} from "./src/gcpFunction";
import {WorkloadIdentityResource} from "./src/workloadIdentity";
import {Providers, Subscriptions} from "../../libs/node/shared/src";
// new GkeClusterResource("first-gke-cluster", {
//   provider: Providers.gcp,
//
//   // clusterArgs: {
//   //   name: "my-cluster-test",
//   //   project,
//   //   location: "us-central1"
//   // }
// })
// import * as aws from "@pulumi/aws";

const config = new pulumi.Config("core");
const nodeCount = config.get("nodeCount");

// functions are no active at me-west1
const gcpConfig = new pulumi.Config("gcp");
const region = gcpConfig.get("region");
const project = gcpConfig.get("project");

// import * as k8s from "@pulumi/kubernetes";

// let myk8s = new k8s.Provider("myk8s", { context: "test-ci" });
// let myk8s1 = new gcp.Provider("myk8s", { project, region });

// const appLabels = { app: "nginx" };
// const deployment = new k8s.apps.v1.Deployment("nginx", {
//   spec: {
//     selector: { matchLabels: appLabels },
//     replicas: 1,
//     template: {
//       metadata: { labels: appLabels },
//       spec: { containers: [{ name: "nginx", image: "nginx" }] },
//     },
//   },
// });

// export const name = deployment.metadata.name;

// import * as datadog from "@pulumi/datadog";
//
// const user = new datadog.User("my-policy", {
//   email: "new@example.com",
//   disabled: false,
//   roles: [],
//   sendUserInvitation: false,
//   // handle: "new@example.com",
//   name: "New User",
// })

// Create a new Slack channel
// const channel = new slack.Conversation("acc-test", {
//   topic: "my topic",
//   isPrivate: false,
// });
//
// // Get the id of the new channel as an output
// export const channelId = channel.id;

// const exampleRepository = new github.Repository("exampleRepository", {});
// const exampleTeam = new github.Team("exampleTeam", {});
// const exampleBranchProtectionV3 = new github.BranchProtectionV3("exampleBranchProtectionV3", {
//   repository: exampleRepository.name,
//   branch: "main",
//   enforceAdmins: true,
//   requiredStatusChecks: {
//     strict: false,
//     checks: ["ci/check:824642007264"],
//   },
//   requiredPullRequestReviews: {
//     dismissStaleReviews: true,
//     dismissalUsers: ["foo-user"],
//     // dismissalTeams: [exampleTeam.slug],
//     // bypassPullRequestAllowances: {
//     //   users: ["foo-user"],
//     //   teams: [exampleTeam.slug],
//     //   apps: ["foo-app"],
//     // },
//   },
//   // restrictions: {
//   //   users: ["foo-user"],
//   //   teams: [exampleTeam.slug],
//   //   apps: ["foo-app"],
//   // },
// });
// const exampleTeamRepository = new github.TeamRepository("exampleTeamRepository", {
//   teamId: exampleTeam.id,
//   repository: exampleRepository.name,
//   permission: "pull",
// });

const dataflow = new gcp.projects.Service("dataflow.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "dataflow.googleapis.com",
  project,
});

// security
const cloudKMS = new gcp.projects.Service("cloudkms.googleapis.com", {
  disableOnDestroy: false,
  disableDependentServices: false,
  service: "cloudkms.googleapis.com",
  project,
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
  provider: Providers.GCP,
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
//
// const bucket = new aws.s3.Bucket("bucket", {
//   acl: "private",
//   tags: {
//     Environment: "Dev",
//     Name: "My bucket",
//   },
// });
//
// const bucket1 = new aws.s3.Bucket("bucket1", {
//   // acl: "private",
//   tags: {
//     Environment: "Test",
//     Name: "My Test bucket",
//   },
//   versioning: {
//     enabled: true
//   },
//   lifecycleRules: [
//     { enabled: true, prefix: "te"}
//   ]
// });
// bucket1.
// export const bucketA = bucket.bucketDomainName;
// export const bucketA1 = bucket1.bucketDomainName;

const secretManager = new ServicesResource(
  "secretManagerServices",
  {
    provider: Providers.GCP,
    services: ["secretmanager.googleapis.com"],
  },
  {}
);

const eventarc = new ServicesResource(
  "eventArcServices",
  {
    provider: Providers.GCP,
    services: ["eventarc.googleapis.com"],
  },
  {}
);

const _project = gcp.organizations.getProject({});
// allow eventarc pubsub
new gcp.projects.IAMBinding("pubsub-token-creator", {
  project: project,
  members: [
    _project.then(
      (project) =>
        `serviceAccount:service-${project.number}@gcp-sa-pubsub.iam.gserviceaccount.com`
    ),
  ],
  role: "roles/iam.serviceAccountTokenCreator",
});

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

const deadLetter = new gcp.pubsub.Topic(
  "dead-letter",
  {
    name: "dead-letter",
  },
  {
    // provider: Providers.gcp
  }
);

const userAdded = new gcp.pubsub.Topic("user-added", {
  name: "user-added",
});

const sub = new gcp.pubsub.Subscription("exampleSubscription", {
  topic: userAdded.id,
  labels: {
    foo: "bar",
  },
  name: Subscriptions.yes,
  enableMessageOrdering: true,
});

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

const eventarcpublishing = new gcp.projects.Service(
  "eventarcpublishing.googleapis.com",
  {
    disableDependentServices: true,
    service: "eventarcpublishing.googleapis.com",
  }
);

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
    repos: [
      "yurikrupnik/mussia33",
      "yurikrupnik/first-rust-app",
      "yurikrupnik/fiber-mongo",
    ],
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

const binaryAuthorization = new gcp.projects.Service(
  "binaryauthorization.googleapis.com",
  {
    disableDependentServices: true,
    service: "binaryauthorization.googleapis.com",
  }
);

// high price
// const scanning = new gcp.projects.Service("containerscanning.googleapis.com", {
//   disableDependentServices: true,
//   service: "containerscanning.googleapis.com",
// });

const artifactRegistry = new gcp.projects.Service(
  "artifactregistry.googleapis.com",
  {
    disableDependentServices: true,
    service: "artifactregistry.googleapis.com",
  }
);

// let useast1 = new aws.Provider("useast1", { region: "us-east-1" });
// let myk8s = new kubernetes.Provider("myk8s", { context: "test-ci" });

const dockerRegistry = new ArtifactoryResource(
  "docker-registry",
  {
    provider: Providers.GCP,
    repositoryArgs: {
      mode: "STANDARD_REPOSITORY",
      project,
      labels: {},
      repositoryId: "container-repository",
      location: region,
      format: "DOCKER",
      description: "Example docker repository.",
    },
  }
  // { parent: artifactRegistry, dependsOn: [artifactRegistry] }
);

const mesh = new gcp.projects.Service("mesh.googleapis.com", {
  disableDependentServices: true,
  service: "mesh.googleapis.com",
});

// networking
const computeServices = new ServicesResource(
  "computeServices",
  {
    provider: Providers.GCP,
    services: ["compute.googleapis.com"],
  },
  {}
);

new NetworkResource(
  "network",
  {
    region,
    project,
  },
  { dependsOn: computeServices }
);
// DB SQL
const migrationServices = new ServicesResource(
  "migrationServices",
  {
    provider: Providers.GCP,
    services: ["datamigration.googleapis.com"],
  },
  {}
);

// const instance = new gcp.sql.DatabaseInstance("instance", {
//   name: "test-instance",
//   project,
//   region,
//   databaseVersion: "MYSQL_8_0",
//   settings: {
//     tier: "db-f1-micro",
//   },
//   rootPassword: "123456",
//   // replicaConfiguration: {
//   //
//   // },create
//   // instanceType: "",
//   deletionProtection: false,
// });
//
// const users = new gcp.sql.User("users", {
//   name: "my-user",
//   project,
//   instance: instance.name,
//   host: "me.com",
//   type: "CLOUD_IAM_USER",
//   password: "111111"
// });
//
// const database = new gcp.sql.Database("database", {instance: instance.name,name: 'first-database'});

// export const databaseSelfLink = database.selfLink;
// export const firstIpAddress = instance.firstIpAddress;
// export const ipAddresses = instance.ipAddresses;
// export const publicIpAddress = instance.publicIpAddress;
// export const sqlUrl = instance.selfLink;
// END DB SQL
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

const containerReaderSa = new gcp.serviceaccount.Account(
  "container-puller-sa",
  {
    project,
    accountId: "container-puller-sa",
    disabled: false,
    description: "Kubernetes containers puller sa",
    displayName: "Container puller",
  }
);

new gcp.projects.IAMBinding("artifact-registry-reader", {
  project: project,
  members: [
    containerReaderSa.email.apply((email) => `serviceAccount:${email}`),
  ],
  role: "roles/artifactregistry.reader",
});

export const dockerRepo1 = pulumi.interpolate`${region}-docker.pkg.dev/${project}/${dockerRegistry.dockerRepo}`;
export const dockerRepo = dockerRegistry.dockerRepo;
export const workloadName = workloadIdentity.workload_identity_provider;
export const workloadSAEmail = workloadIdentity.saEmail;
