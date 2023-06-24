import { App, Chart, ChartProps, Helm } from "cdk8s";
// import {MyChart}  from './src/deployment';
import { Construct } from "constructs";
import { Application, ApplicationV1Beta1 } from "../imports/core.oam.dev";
// import {  } from "../imports/aws.upbound.io";
// import { Topic, Schema } from "../imports/sql.gcp.upbound.io";
// import { Topic, Schema } from "../imports/storage.gcp.upbound.io";
// import { Topic, Schema } from "../imports/s3.aws.upbound.io";
// import {Application} from '../imports/standard.oam.dev'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { k8s, argoproj } from '@nx-multi-cloud/k8s-resources';

// works
// when array of imports in tsconfig.base.json, does not show type but works also
// import { IntOrString } from '@nx-multi-cloud/imports/k8s';
import { IntOrString } from "../imports/k8s";
import { ConfigMap, Namespace, ServiceAccount, Pod } from "cdk8s-plus-25";
// import { doit } from '@nx-multi-cloud/k8s-shit';
// import { platformCdk8s } from '@mussia30/platform/cdk8s';
// fails
import { WebService } from "./lib/platform-cdk8s";
// import { Bucket, BucketProps } from "../imports/storage.gcp.upbound.io";
import { Topic, Schema } from "../imports/pubsub.gcp.upbound.io";
// import { Bucket as AWSBucket, BucketProps as AWSBucketProps, BucketSpec as AWSBucketSpec, BucketSpecDeletionPolicy } from "../imports/s3.aws.upbound.io";
// import { Bucket as GCSBucket, BucketProps as GCPBucketProps, BucketSpec as GCPBucketSpec } from "../imports/storage.gcp.upbound.io";
import { Queue } from "../imports/sqs.aws.upbound.io";
import { Topic as SNSTopic } from "../imports/sns.aws.upbound.io";

// export class MyChart extends Chart {
//   constructor(scope: Construct, id: string, props: ChartProps = {}) {
//     super(scope, id, props);
//     // TODO resolve - ref https://cdk8s.io/docs/latest/basics/helm/
//     // new Helm(this, 'redis', {
//     //   chart: 'bitnami/redis',
//     //   values: {
//     //     // sentinel: {
//     //     //   enabled: true
//     //     // }
//     //   }
//     // });
//     // const dashboard = new Include(this, 'dashboard', {
//     //   // url: 'https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml',
//     //   url: `${__dirname}/lib/argocd.yaml`,
//     // });
//     // const deploymentApiObject = dashboard.apiObjects.find(c => c.kind === 'Deployment');
//     // if (deploymentApiObject) {
//     //   console.log('deploymentApiObject.name', deploymentApiObject.name);
//     // }
//     // serviceAccount.permissions.
//     const namespace = new Namespace(this, 'namespace', {
//       metadata: {
//         name: 'users',
//         // namespace: 'users',
//         annotations: {},
//         labels: {},
//         finalizers: [],
//         // ownerReferences: ''
//       },
//     });
//
//     // const kaniko = new Pod(this, 'kaniko', {
//     //   volumes: [
//     //     {
//     //       // name: 'ads',
//     //       // config: "da",
//     //       // node: ""
//     //     },
//     //   ],
//     //   metadata: {},
//     // });
//     // console.log('doit', doit());
//     console.log('namespace', namespace);
//     const serviceAccount = new ServiceAccount(this, 'sa', {
//       metadata: {
//         name: 'users-sa',
//         namespace: namespace.name,
//         labels: {
//           account: 'users-client',
//         },
//         annotations: {
//           annotations: 'annotation1',
//         },
//       },
//       secrets: [],
//       automountToken: true,
//     });
//     console.log('serviceAccount', serviceAccount.name);
//
//     // new ConfigMap(this, 'proxy-envs', {
//     //   metadata: {
//     //     name: 'proxy-envs',
//     //   },
//     //   data: {
//     //     upstream_host: 'users-api-service',
//     //     upstream_port: '8080',
//     //     upstream_name: 'backend',
//     //   },
//     // });
//     //
//     new ConfigMap(this, 'nginx-config', {
//       metadata: {
//         finalizers: [],
//         // labels: {
//         // label1: IntOrString.fromString('label-value1').value,
//         // label3: IntOrString.fromString('label-value3').value,
//         // label2: 'label-value2',
//         // },
//         name: 'nginx-config',
//         annotations: {
//           annotation1: 'annotation1',
//           annotation2: 'annotation2',
//         },
//         namespace: namespace.name,
//       },
//       data: {
//         stam: 'my data here',
//         // "nginx-config":
//         // "more-data": "more of my data here"
//       },
//     });
//     new WebService(this, 'api', {
//       image: 'nginx',
//       replicas: 1,
//       namespace: namespace.name,
//     });
//     // new WebService(this, 'web', {
//     //   image: 'nginx',
//     //   containerPort: 80,
//     //   namespace: namespace.name,
//     // });
//   }
// }

// interface MulticloudStorage  {
//   GCPBucketProps: GCPBucketProps,
//   AWSBucketProps: AWSBucketProps
// }

export class SecondChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    // const b = new GCSBucket(this, 'first-gcp-bucket', {
    //   spec: {
    //     forProvider: {
    //       location: "eu",
    //       labels: {
    //         lol: 'lol',
    //         provider: 'gcp'
    //       },
    //     },
    //
    //     deletionPolicy: BucketSpecDeletionPolicy.DELETE,
    //     // deletionPolicy: BucketSpecDeletionPolicy.ORPHAN,
    //     // deletionPolicy: "DELETE",
    //   },
    //   metadata: {
    //     labels: {
    //       provider: 'gcp',
    //       region: "eu"
    //     },
    //   },
    // });
    // const s = new AWSBucket(this, 'first-aws-bucket', {
    //   spec: {
    //     forProvider: {
    //       forceDestroy: false,
    //       region: 'eu',
    //       tags: {
    //         provider: 'aws'
    //       },
    //       objectLockEnabled: false
    //     },
    //     deletionPolicy: BucketSpecDeletionPolicy.DELETE,
    //   },
    //   metadata: {
    //     labels: {
    //       provider: 'aws',
    //       region: "eu"
    //     },
    //   }
    // });

    const schema = new Schema(this, "example-schema", {
      spec: {
        forProvider: {
          type: "AVRO",
          definition: JSON.stringify({
            type: "record",
            name: "Avro",
            fields: [
              {
                name: "StringField",
                type: "string",
              },
              {
                name: "FloatField",
                type: "float",
              },
              {
                name: "BooleanField",
                type: "boolean",
              },
            ],
          }),
        },
      },
      metadata: {},
    });

    const topic = new Topic(this, "example-topic", {
      metadata: {},
      spec: {
        forProvider: {
          schemaSettings: [
            {
              encoding: "AVRO",
              schema: JSON.stringify({
                type: "record",
                name: "Avro",
                fields: [
                  {
                    name: "StringField",
                    type: "string",
                  },
                  {
                    name: "FloatField",
                    type: "float",
                  },
                  {
                    name: "BooleanField",
                    type: "boolean",
                  },
                ],
              }),
            },
          ],
        },
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
    // const dashboard = new Include(this, 'dashboard', {
    //   // url: 'https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml',
    //   url: `${__dirname}/lib/argocd.yaml`,
    // });
    // const deploymentApiObject = dashboard.apiObjects.find(c => c.kind === 'Deployment');
    // if (deploymentApiObject) {
    //   console.log('deploymentApiObject.name', deploymentApiObject.name);
    // }
    // serviceAccount.permissions.

    const app11 = new ApplicationV1Beta1(this, "ads", {
      metadata: {
        name: "app11",
        labels: {
          application: "app11",
        },
        annotations: {
          application: "app11",
        },
        namespace: "app11",
        // ownerReferences: [
        //   {
        //     // name: "dsas",
        //     // kind: "lds",
        //     // apiVersion: "da",
        //     // controller: true,
        //     // blockOwnerDeletion: false
        //   }
        // ]
      },
      spec: {
        policies: [],
        components: [
          {
            name: "ads",
            type: "webservice",
            // properties: {},
            // scopes: {
            //
            // },
            // settings: {
            //
            // },
            // traits: [
            //   {
            //     name: "sda",
            //     properties: {},
            //   },
            // ],
          },
        ],
      },
      // spec: {
      // components:
      // rolloutPlan: []
      // }
    });
    // const kustomization = new Manifest(this, "my-kustomization");
    // kustomization.synth();
  }
}

const app = new App({
  // outdir: `${__dirname}/dist-output`
});
const app1 = new App({});
// new MyChart(app, "cdk8s-example", {
//   replicas: 1,
//   image: "shit",
//   tag: "latest",
// });
// new MyChart(app, 'cdk8s-example1', {
//   // replicas: 1
//   // image: "shit",
//   // tag: "latest",
// });
new SecondChart(app, "kustomize-example", {
  // replicas: 1
  // image: "shit",
  // tag: "latest",
});
new SecondChart(app1, "kustomize-example-app1", {
  // replicas: 1
  // image: "shit",
  // tag: "latest",
});
// new MyChart(app, 'second-example', {
//   // replicas: 4
//   // image: "shit",
//   // tag: "latest",
// });
// app.synth();
app1.synth();
