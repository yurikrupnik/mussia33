import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { ServicesResource } from "./src/servicesResource";
import {
  WorkloadIdentityResource,
  WorkloadIdentityResourceProps,
} from "./src/workloadIdentity";
import { Providers } from "./src/shared";

const config = new pulumi.Config("core");
const nodeCount = config.get("nodeCount");

// functions are no active at me-west1
const gcpConfig = new pulumi.Config("gcp");
const region = gcpConfig.get("region");
const project = gcpConfig.get("project");

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

const GcpFunctionServices = new ServicesResource("GcpFunctionServices", {
  services: servicesNames,
  provider: Providers.gcp,
});

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
    repos: ["yurikrupnik/mussia33"],
    project,
  },
  { dependsOn: [iamcredentials], parent: iamcredentials }
);

const artifactRegistry = new gcp.projects.Service(
  "artifactregistry.googleapis.com",
  {
    disableDependentServices: true,
    service: "artifactregistry.googleapis.com",
  }
);

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

export const dockerRepo = pulumi.interpolate`${region}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
export const workloadName = workloadIdentity.workload_identity_provider;
export const workloadSAEmail = workloadIdentity.saEmail;
