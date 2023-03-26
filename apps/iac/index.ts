import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { ServicesResource } from "./src/servicesResource";
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
// Export the DNS name of the bucket
// export const bucketName = tempBucket.url;
