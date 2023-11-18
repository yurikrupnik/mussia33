import { App, Chart, ChartProps, Helm, OwnerReference } from "cdk8s";
// import {MyChart}  from './src/deployment';
import { Construct } from "constructs";
// import { Application, ApplicationV1Beta1 } from "../imports/core.oam.dev";
// import {  } from "../imports/aws.upbound.io";
// import {Application} from '../imports/standard.oam.dev'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { k8s, argoproj } from '@nx-multi-cloud/k8s-resources';

// works
// when array of imports in tsconfig.base.json, does not show type but works also
// import { IntOrString } from '@nx-multi-cloud/imports/k8s';
import { IntOrString } from "../imports/k8s";
import {
  ConfigMap,
  Namespace,
  ServiceAccount,
  Pod,
  Deployment,
  Container,
} from "cdk8s-plus-25";
// import { doit } from '@nx-multi-cloud/k8s-shit';
// import { platformCdk8s } from '@mussia30/platform/cdk8s';
// fails
import { WebService } from "./lib/platform-cdk8s";
// import { Bucket, BucketProps } from "../imports/storage.gcp.upbound.io";
import { Topic, Schema } from "../imports/pubsub.gcp.upbound.io";
// import { Bucket as AWSBucket, BucketProps as AWSBucketProps, BucketSpec as AWSBucketSpec, BucketSpecDeletionPolicy } from "../imports/s3.aws.upbound.io";
import { Bucket as GCSBucket } from "../imports/storage.gcp.upbound.io";
import { Network, Subnetwork } from "../imports/compute.gcp.upbound.io";
import {
  Vpc,
  InternetGateway,
  Subnet,
  RouteTable,
  SecurityGroup,
} from "../imports/ec2.aws.upbound.io";
// import { Queue } from "../imports/sqs.aws.upbound.io";
// import { Topic as SNSTopic } from "../imports/sns.aws.upbound.io";

// import { XTopicBucket } from '../imports/custom-api.example.org';

import { Application as A } from "../imports/argoproj.io";
// import { Application } from "../imports/argo";
import {} from "../imports/argocd.crossplane.io";
import { Application } from "../imports/applications.argocd.crossplane.io";
import { Release } from "../imports/helm.crossplane.io";
import {} from "../imports/apiextensions.crossplane.io";
import {} from "../imports/pkg.crossplane.io";
import { Function } from "../imports/meta.pkg.crossplane.io";
// import { App } from "../imports/argoproj.io"
// const s = Function.manifest({
//   metadata: {
//     name: "ads",
//   },
//   spec: {
//     crossplane: { version: "v1alpha1" },
//     dependsOn: [],
//   },
// });

// const helmChars: Array<Application> = [
//   {
//     metadata: {
//       name: "example-application",
//     },
//     spec: {
//       forProvider: {
//         destination: {
//           namespace: "default",
//           server: "https://kubernetes.default.svc",
//         },
//         project: "default",
//         source: {
//           path: "charts/podinfo",
//           repoURL: "https://github.com/stefanprodan/podinfo/",
//           targetRevision: "HEAD",
//         },
//       },
//     },
//     // name: "sd",
//
//     // metadata: {
//     //   name: "external-secrets",
//     //   namespace: "argocd",
//     //   labels: {},
//     //   annotations: {},
//     //   finalizers: {},
//     // },
//     // spec: {
//     //   project: "default",
//     //   source: {
//     //     chart: "external-secrets",
//     //     targetRevision: "0.8.3",
//     //     repoURL: "https://charts.external-secrets.io/",
//     //     helm: {
//     //       releaseName: "external-secrets",
//     //     },
//     //   },
//     //   destination: {
//     //     server: "https://kubernetes.default.svc",
//     //     namespace: "external-secrets",
//     //   },
//     //   syncPolicy: {
//     //     syncOptions: {},
//     //     automated: {
//     //       selfHeal: true,
//     //       prune: true,
//     //       allowEmpty: true,
//     //     },
//     //   },
//     // },
//   },
// ];

// const helmChartCorssplane: Array<Application> = [
//   {
//     metadata: {
//       namespace: "argocd",
//       name: "external-secrets",
//     },
//     // reclaimPolicy: 'Delete',
//     spec: {
//       providerConfigRef: {
//         name: "argocd-provide",
//       },
//       forProvider: {
//         // path: "charts/podinfo",
//         source: {
//           chart: "external-secrets",
//           repoUrl: "https://charts.external-secrets.io/",
//           targetRevision: "0.9.5",
//
//           // repoUrl: "https://charts.external-secrets.io/",
//           // targetRevision: "HEAD",
//         },
//         destination: {
//           server: "https://kubernetes.default.svc",
//           namespace: "external-secrets",
//         },
//         project: "default",
//         // todo check
//         // sources: [{}],
//       },
//     },
//   },
// ];

import { RegistryRepository } from "../imports/artifact.gcp.upbound.io";
import { Repository } from "../imports/ecr.aws.upbound.io";
import { ProjectService } from "../imports/cloudplatform.gcp.upbound.io";

const map = [[]];

export class MyChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);
    new CompositeResourceDefinition(this, "ds", {
      metadata: {
        name: "xnetworks.custom-api.example.org",
      },
      spec: {
        // writeConnectionSecretsToNamespace: 'crossplane-system',
        group: "custom-api.example.org",
        names: {
          kind: "XNetwork",
          plural: "xnetworks",
        },
        claimNames: {
          kind: "Network",
          plural: "xNetworks",
        },

        versions: [
          {
            name: "v1alpha1",
            served: true,
            referenceable: true,
            schema: {
              openApiv3Schema: {
                type: "object",
                properties: {
                  spec: {
                    type: "object",
                    properties: {
                      location: {
                        type: "string",
                        oneOf: [
                          {
                            pattern: "^EU$",
                          },
                          {
                            pattern: "^US$",
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });

    // const bucket = new GCSBucket(this, 'yurikrupnik-bucket', {
    //   spec: {
    //     forProvider: {
    //       location: "europe-west1",
    //       labels: {
    //         iac: 'crossplane',
    //         provider: 'gcp',
    //         module: "bigdata"
    //       },
    //     },
    //
    //     // deletionPolicy: BucketSpecDeletionPolicy.DELETE,
    //     // deletionPolicy: BucketSpecDeletionPolicy.ORPHAN,
    //     // deletionPolicy: "DELETE",
    //   },
    //   metadata: {
    //     labels: {
    //       provider: 'gcp',
    //       region: "eu",
    //     },
    //   },
    // });

    new Composition(this, "gcp-network", {
      metadata: {
        name: "gcp.networks",
        labels: {
          provider: "GCP",
        },
      },
      spec: {
        compositeTypeRef: {
          apiVersion: "custom-api.example.org/v1alpha1",
          kind: "XNetwork",
        },
        resources: [
          {
            name: "crossplane-yuri-network-storage",
            base: GCSBucket.manifest({
              spec: {
                forProvider: {
                  location: "europe-west1",
                  labels: {
                    iac: "crossplane",
                    provider: "gcp",
                    module: "bigdata",
                  },
                },

                // deletionPolicy: BucketSpecDeletionPolicy.DELETE,
                // deletionPolicy: BucketSpecDeletionPolicy.ORPHAN,
                // deletionPolicy: "DELETE",
              },
              metadata: {
                labels: {
                  provider: "gcp",
                  region: "eu",
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.location",
                toFieldPath: "spec.forProvider.location",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-vpc",
            base: Network.manifest({
              metadata: {
                name: "my-network",
              },
              spec: {
                forProvider: {
                  autoCreateSubnetworks: false,
                },
              },
            }),
          },
          {
            name: "crossplane-yuri-network-subnet",
            base: Subnetwork.manifest({
              metadata: {},
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  description: "my euro subnet",
                  region: "us-west2",
                  privateIpGoogleAccess: true,
                  ipCidrRange: "172.16.0.0/16",
                  // network: 'my-first-vpc'
                  networkSelector: {
                    matchControllerRef: true,
                  },
                  // secondaryIpRanges: [
                  //   {
                  //     rangeName: 'pods',
                  //     ipCidrRange: '10.200.0.0/14'
                  //   },
                  //   {
                  //     rangeName: 'services',
                  //     ipCidrRange: "10.204.0.0/16"
                  //   }
                  // ],
                },
              },
            }),
          },
        ],
      },
    });

    new Composition(this, "aws-network", {
      metadata: {
        name: "aws.networks",
        labels: {
          provider: "AWS",
        },
      },
      spec: {
        // writeConnectionSecretsToNamespace: "crossplane-system",
        compositeTypeRef: {
          apiVersion: "custom-api.example.org/v1alpha1",
          kind: "XNetwork",
        },
        resources: [
          {
            name: "crossplane-yuri-network-storage",
            base: Vpc.manifest({
              spec: {
                forProvider: {
                  region: "us-west-2",
                  cidrBlock: "192.168.0.0/16",
                  // enableDnsSupport: true,
                  // enableDnsHostNames: true
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-vpc",
            base: InternetGateway.manifest({
              metadata: {
                name: "my-network",
              },
              spec: {
                forProvider: {
                  region: "us-west-2",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2a",
                  access: "public",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.0.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2a",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet1",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2a",
                  access: "public",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.128.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2a",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
              {
                fromFieldPath: "spec.clusterRef.id",
                toFieldPath: "spec.forProvider.tags[0].key",
                transforms: [
                  {
                    type: CompositionSpecResourcesPatchesTransformsType.STRING,
                    string: {
                      fmt: "kubernetes.io/cluster/%s",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet2",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2b",
                  access: "private",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.192.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2b",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                    shared: "",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
              {
                fromFieldPath: "spec.clusterRef.id",
                toFieldPath: "spec.forProvider.tags[0].key",
                transforms: [
                  {
                    type: CompositionSpecResourcesPatchesTransformsType.STRING,
                    string: {
                      fmt: "kubernetes.io/cluster/%s",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet3",
            base: RouteTable.manifest({
              spec: {
                forProvider: {
                  region: "us-west-2",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  // routes: {
                  //   destinationCidrBlock: '0.0.0.0/0',
                  //   gatewayIdSelector: {
                  //     matchControllerRef: true
                  //   }
                  // },
                  // associations: [
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2a",
                  //         access: 'public'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2b",
                  //         access: 'public'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2a",
                  //         access: 'private'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2b",
                  //         access: 'private'
                  //       }
                  //     }
                  //   }
                  // ]
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-group",
            base: SecurityGroup.manifest({
              metadata: {},
              spec: {
                forProvider: {
                  region: "us-west-2",
                  // name: "my-group1",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  // groupName: "multik8s-cluster",
                  description: "Allow access to PostgreSQL",
                  // ingress: [
                  //   {
                  //     fromPort: 5432,
                  //     toPort: 5432,
                  //     ipProtocol: 'tcp',
                  //     ipRanges: [{}]
                  //   }
                  // ]
                },
              },
            }),
          },
        ],
      },
    });

    // TODO resolve - ref https://cdk8s.io/docs/latest/basics/helm/
    // new Helm(this, 'redis', {
    //   chart: 'bitnami/redis',
    //   values: {
    //     // sentinel: {
    //     //   enabled: true
    //     // }
    //   }
    // });
    // new XTopicBucket(this, 'dsa', {
    //   metadata: {
    //     name: "yurikrupnik-bucket1",
    //   },
    //   spec: {
    //     location: "US"
    //   }
    // });
    // const dashboard = new Include(this, 'dashboard', {
    //   // url: 'https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml',
    //   url: `${__dirname}/lib/argocd.yaml`,
    // });
    // const deploymentApiObject = dashboard.apiObjects.find(c => c.kind === 'Deployment');
    // if (deploymentApiObject) {
    //   console.log('deploymentApiObject.name', deploymentApiObject.name);
    // }
    // serviceAccount.permissions.
    // const namespace = new Namespace(this, "namespace", {
    //   metadata: {
    //     name: "users",
    //     // namespace: 'users',
    //     annotations: {},
    //     labels: {},
    //     finalizers: [],
    //     // ownerReferences: ''
    //   },
    // });
  }
}

export class SecondChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);
    new CompositeResourceDefinition(this, "project", {
      metadata: {
        name: "xprojects.custom-api.example.org",
      },
      spec: {
        // writeConnectionSecretsToNamespace: 'crossplane-system',
        group: "custom-api.example.org",
        names: {
          kind: "XProject",
          plural: "xprojects",
        },
        claimNames: {
          kind: "Project",
          plural: "xProjects",
        },

        versions: [
          {
            name: "v1alpha1",
            served: true,
            referenceable: true,
            schema: {
              openApiv3Schema: {
                type: "object",
                properties: {
                  spec: {
                    type: "object",
                    properties: {
                      location: {
                        type: "string",
                        oneOf: [
                          {
                            pattern: "^EU$",
                          },
                          {
                            pattern: "^US$",
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });

    new Composition(this, "gcp-project", {
      metadata: {
        name: "gcp.projects",
        labels: {
          provider: "GCP",
        },
      },
      spec: {
        compositeTypeRef: {
          apiVersion: "custom-api.example.org/v1alpha1",
          kind: "Xproject",
        },
        resources: [
          {
            name: "helm-some-release",
            base: Release.manifest({
              metadata: {
                name: "my-network",
              },
              spec: {
                forProvider: {
                  chart: {
                    name: "wordpress",
                    repository: "https://charts.bitnami.com/bitnami",
                    version: "15.2.5",
                  },
                  namespace: "wordpress",
                  set: [
                    {
                      name: "ad",
                      value: "das",
                    },
                  ],
                  values: {
                    service: {
                      type: "ClusterIP",
                    },
                  },

                  // values: {},
                },
              },
            }),
          },
          {
            name: "crossplane-yuri-network-subnet",
            base: Application.manifest({
              metadata: {
                namespace: "argocd",
                name: "external-secrets",
              },
              // reclaimPolicy: 'Delete',
              spec: {
                providerConfigRef: {
                  name: "argocd-provide",
                },
                forProvider: {
                  // path: "charts/podinfo",
                  source: {
                    chart: "external-secrets",
                    repoUrl: "https://charts.external-secrets.io/",
                    targetRevision: "0.9.5",

                    // repoUrl: "https://charts.external-secrets.io/",
                    // targetRevision: "HEAD",
                  },
                  destination: {
                    server: "https://kubernetes.default.svc",
                    namespace: "external-secrets",
                  },
                  project: "default",
                  // todo check
                  // sources: [{}],
                },
              },
            }),
          },
        ],
      },
    });

    new Composition(this, "aws-network", {
      metadata: {
        name: "aws.networks",
        labels: {
          provider: "AWS",
        },
      },
      spec: {
        // writeConnectionSecretsToNamespace: "crossplane-system",
        compositeTypeRef: {
          apiVersion: "custom-api.example.org/v1alpha1",
          kind: "XNetwork",
        },
        resources: [
          {
            name: "crossplane-yuri-network-storage",
            base: Vpc.manifest({
              spec: {
                forProvider: {
                  region: "us-west-2",
                  cidrBlock: "192.168.0.0/16",
                  // enableDnsSupport: true,
                  // enableDnsHostNames: true
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-vpc",
            base: InternetGateway.manifest({
              metadata: {
                name: "my-network",
              },
              spec: {
                forProvider: {
                  region: "us-west-2",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2a",
                  access: "public",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.0.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2a",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet1",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2a",
                  access: "public",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.128.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2a",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
              {
                fromFieldPath: "spec.clusterRef.id",
                toFieldPath: "spec.forProvider.tags[0].key",
                transforms: [
                  {
                    type: CompositionSpecResourcesPatchesTransformsType.STRING,
                    string: {
                      fmt: "kubernetes.io/cluster/%s",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet2",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2b",
                  access: "private",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.192.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2b",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                    shared: "",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
              {
                fromFieldPath: "spec.clusterRef.id",
                toFieldPath: "spec.forProvider.tags[0].key",
                transforms: [
                  {
                    type: CompositionSpecResourcesPatchesTransformsType.STRING,
                    string: {
                      fmt: "kubernetes.io/cluster/%s",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet3",
            base: RouteTable.manifest({
              spec: {
                forProvider: {
                  region: "us-west-2",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  // routes: {
                  //   destinationCidrBlock: '0.0.0.0/0',
                  //   gatewayIdSelector: {
                  //     matchControllerRef: true
                  //   }
                  // },
                  // associations: [
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2a",
                  //         access: 'public'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2b",
                  //         access: 'public'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2a",
                  //         access: 'private'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2b",
                  //         access: 'private'
                  //       }
                  //     }
                  //   }
                  // ]
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-group",
            base: SecurityGroup.manifest({
              metadata: {},
              spec: {
                forProvider: {
                  region: "us-west-2",
                  // name: "my-group1",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  // groupName: "multik8s-cluster",
                  description: "Allow access to PostgreSQL",
                  // ingress: [
                  //   {
                  //     fromPort: 5432,
                  //     toPort: 5432,
                  //     ipProtocol: 'tcp',
                  //     ipRanges: [{}]
                  //   }
                  // ]
                },
              },
            }),
          },
        ],
      },
    });

    // TODO resolve - ref https://cdk8s.io/docs/latest/basics/helm/
    new Helm(this, "redis", {
      chart: "bitnami/redis",
      values: {
        // sentinel: {
        //   enabled: true
        // }
      },
    });
    // const dashboard = new Include(this, 'dashboard', {
    //   // url: 'https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml',
    //   url: `${__dirname}/lib/argocd.yaml`,
    // });
    // const deploymentApiObject = dashboard.apiObjects.find(c => c.kind === 'Deployment');
    // if (deploymentApiObject) {
    //   console.log('deploymentApiObject.name', deploymentApiObject.name);
    // }
    // serviceAccount.permissions.

    // const app11 = new Application(this, "ads", {

    // TODO fix
    // const app11 = new ApplicationV1Beta1(this, "ads", {
    //   metadata: {
    //     name: "app1",
    //     labels: {
    //       application: "app1",
    //     },
    //     annotations: {
    //       application: "app1",
    //     },
    //     // namespace: "app11",
    //   },
    //   spec: {
    //     // policies: [],
    //     components: [
    //       {
    //         name: "front",
    //         type: "webservice",
    //         properties: {
    //           image: "yurikrupnik/frontend-solid-app:main",
    //           ports: [
    //             {
    //               port: '80',
    //               expose: true
    //             }
    //           ]
    //         },
    //         traits: [
    //           {
    //             type: "scaler",
    //             properties: {
    //               replicas: 1
    //             },
    //           },
    //           {
    //             type: "ingress",
    //             properties: {
    //               domain: "localhost",
    //               http: {
    //                 '/': '80'
    //               }
    //             }
    //           }
    //         ],
    //       },
    //       {
    //         name: "back",
    //         type: "webservice",
    //         properties: {
    //           image: "yurikrupnik/nest-app:main",
    //           ports: [
    //             {
    //               port: '8080',
    //               expose: true
    //             }
    //           ]
    //         },
    //         traits: [
    //           {
    //             type: "scaler",
    //             properties: {
    //               replicas: 1
    //             },
    //           },
    //           {
    //             type: "ingress",
    //             properties: {
    //               domain: "localhost",
    //               http: {
    //                 '/': '8080'
    //               }
    //             }
    //           }
    //         ],
    //       },
    //     ],
    //   },
    // });

    // const kustomization = new Manifest(this, "my-kustomization");
    // kustomization.synth();
  }
}

// interface Config {}

// const config = {};

const CROSSPLANE_GROUP = "multicloud.yurikrupnik.com";

import {
  CompositeResourceDefinition,
  CompositeResourceDefinitionProps,
  CompositeResourceDefinitionSpec,
  Composition,
  CompositionSpecResourcesPatchesTransformsType,
} from "../imports/apiextensions.crossplane.io";

interface CrossplanePackage {
  composite: CompositeResourceDefinitionProps;
  ads: [];
}

const packages = {
  storage: {
    claimNames: {
      kind: "Storage",
      plural: "storages",
    },
    group: CROSSPLANE_GROUP,
    providers: ["AWS", "GCP"],
  },
  project: {
    claimNames: {
      kind: "project",
      plural: "projects",
    },
    group: CROSSPLANE_GROUP,
    providers: ["AWS", "GCP"],
  },
};

export class OutputChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);
    new Repository(this, "fsdf", {
      spec: {
        forProvider: {
          region: "",
          tags: {},
        },
      },
    });
    new RegistryRepository(this, "ds", {
      metadata: {},
      spec: {
        forProvider: {},
      },
    });

    new CompositeResourceDefinition(this, "project", {
      metadata: {
        name: `project.${CROSSPLANE_GROUP}`,
      },
      spec: {
        // writeConnectionSecretsToNamespace: 'crossplane-system',
        group: CROSSPLANE_GROUP,
        names: {
          kind: "Project",
          plural: "projects",
        },
        claimNames: {
          kind: "Project",
          plural: "Projects",
        },

        versions: [
          {
            name: "v1alpha1",
            served: true,
            referenceable: true,
            schema: {
              openApiv3Schema: {
                type: "object",
                properties: {
                  spec: {
                    type: "object",
                    properties: {
                      location: {
                        type: "string",
                        oneOf: [
                          {
                            pattern: "^EU$",
                          },
                          {
                            pattern: "^US$",
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });

    new Composition(this, "gcp-project", {
      metadata: {
        name: "gcp.projects",
        labels: {
          provider: "GCP",
        },
      },
      spec: {
        compositeTypeRef: {
          apiVersion: "custom-api.example.org/v1alpha1",
          kind: "Xproject",
        },
        resources: [
          {
            name: "helm-some-release",
            base: Release.manifest({
              metadata: {
                name: "my-network",
              },
              spec: {
                forProvider: {
                  chart: {
                    name: "wordpress",
                    repository: "https://charts.bitnami.com/bitnami",
                    version: "15.2.5",
                  },
                  namespace: "wordpress",
                  set: [
                    {
                      name: "ad",
                      value: "das",
                    },
                  ],
                  values: {
                    service: {
                      type: "ClusterIP",
                    },
                  },

                  // values: {},
                },
              },
            }),
          },
          {
            name: "crossplane-yuri-network-subnet",
            base: Application.manifest({
              metadata: {
                namespace: "argocd",
                name: "external-secrets",
              },
              // reclaimPolicy: 'Delete',
              spec: {
                providerConfigRef: {
                  name: "argocd-provide",
                },
                forProvider: {
                  // path: "charts/podinfo",
                  source: {
                    chart: "external-secrets",
                    repoUrl: "https://charts.external-secrets.io/",
                    targetRevision: "0.9.5",

                    // repoUrl: "https://charts.external-secrets.io/",
                    // targetRevision: "HEAD",
                  },
                  destination: {
                    server: "https://kubernetes.default.svc",
                    namespace: "external-secrets",
                  },
                  project: "default",
                  // todo check
                  // sources: [{}],
                },
              },
            }),
          },
        ],
      },
    });

    new Composition(this, "aws-project", {
      metadata: {
        name: "aws.networks",
        labels: {
          provider: "AWS",
        },
      },
      spec: {
        // writeConnectionSecretsToNamespace: "crossplane-system",
        compositeTypeRef: {
          apiVersion: "custom-api.example.org/v1alpha1",
          kind: "XNetwork",
        },
        resources: [
          {
            name: "crossplane-yuri-network-storage",
            base: Vpc.manifest({
              spec: {
                forProvider: {
                  region: "us-west-2",
                  cidrBlock: "192.168.0.0/16",
                  // enableDnsSupport: true,
                  // enableDnsHostNames: true
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-vpc",
            base: InternetGateway.manifest({
              metadata: {
                name: "my-network",
              },
              spec: {
                forProvider: {
                  region: "us-west-2",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2a",
                  access: "public",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.0.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2a",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet1",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2a",
                  access: "public",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.128.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2a",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
              {
                fromFieldPath: "spec.clusterRef.id",
                toFieldPath: "spec.forProvider.tags[0].key",
                transforms: [
                  {
                    type: CompositionSpecResourcesPatchesTransformsType.STRING,
                    string: {
                      fmt: "kubernetes.io/cluster/%s",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet2",
            base: Subnet.manifest({
              metadata: {
                labels: {
                  zone: "us-west-2b",
                  access: "private",
                },
              },
              // reclaimPolicy: 'Delete',
              spec: {
                forProvider: {
                  region: "us-west-2",
                  mapPublicIpOnLaunch: true,
                  cidrBlock: "192.168.192.0/18",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  availabilityZone: "us-west-2b",
                  tags: {
                    "kubernetes.io/role/elb": "1",
                    shared: "",
                  },
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
              {
                fromFieldPath: "spec.clusterRef.id",
                toFieldPath: "spec.forProvider.tags[0].key",
                transforms: [
                  {
                    type: CompositionSpecResourcesPatchesTransformsType.STRING,
                    string: {
                      fmt: "kubernetes.io/cluster/%s",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "crossplane-yuri-network-subnet3",
            base: RouteTable.manifest({
              spec: {
                forProvider: {
                  region: "us-west-2",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  // routes: {
                  //   destinationCidrBlock: '0.0.0.0/0',
                  //   gatewayIdSelector: {
                  //     matchControllerRef: true
                  //   }
                  // },
                  // associations: [
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2a",
                  //         access: 'public'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2b",
                  //         access: 'public'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2a",
                  //         access: 'private'
                  //       }
                  //     }
                  //   },
                  //   {
                  //     subnetIdSelector: {
                  //       matchControllerRef: true,
                  //       matchLabels: {
                  //         zone: "us-west-2b",
                  //         access: 'private'
                  //       }
                  //     }
                  //   }
                  // ]
                },
              },
            }),
            patches: [
              {
                fromFieldPath: "spec.id",
                toFieldPath:
                  "metadata.labels[networks.multik8s.platformref.crossplane.io/network-id]",
              },
            ],
          },
          {
            name: "crossplane-yuri-network-group",
            base: SecurityGroup.manifest({
              metadata: {},
              spec: {
                forProvider: {
                  region: "us-west-2",
                  // name: "my-group1",
                  vpcIdSelector: {
                    matchControllerRef: true,
                  },
                  // groupName: "multik8s-cluster",
                  description: "Allow access to PostgreSQL",
                  // ingress: [
                  //   {
                  //     fromPort: 5432,
                  //     toPort: 5432,
                  //     ipProtocol: 'tcp',
                  //     ipRanges: [{}]
                  //   }
                  // ]
                },
              },
            }),
          },
        ],
      },
    });
  }
}

// const app = new App({
//   outdir: `${__dirname}/dist-output/`
// });
const app1 = new App({});
new MyChart(app1, "cdk8s-example", {
  // replicas: 1
  // image: "shit",
  // tag: "latest",
});
// new MyChart(app, 'cdk8s-example1', {
//   // replicas: 1
//   // image: "shit",
//   // tag: "latest",
// });
// new SecondChart(app, 'kustomize-example', {
//   // replicas: 1
//   // image: "shit",
//   // tag: "latest",
// });
new SecondChart(app1, "app1", {
  // provider: 'gcp',
  // replicas: 1
  // image: "shit",
  // tag: "latest",
});
new SecondChart(app1, "app2", {
  // provider: 'gcp',
  // replicas: 1
  // image: "shit",
  // tag: "latest",
});
new OutputChart(app1, "crossplane-multicloud", {
  // provider: 'gcp',
  // replicas: 1
  // image: "shit",
  // tag: "latest",
});

app1.synth();
