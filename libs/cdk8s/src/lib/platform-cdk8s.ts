import { Construct } from 'constructs';
import { Names } from 'cdk8s';
import { KubeDeployment, KubeService, IntOrString } from '../../imports/k8s';
import { ConfigMap } from 'cdk8s-plus-25';
import { createNginxConfig } from './nginx-config';

export interface WebServiceProps {
  /**
   * The Docker image to use for this service.
   * @default nginx
   */
  readonly image: string;

  /**
   * Number of replicas.
   *
   * @default 1
   */
  readonly replicas?: number;

  /**
   * External port.
   *
   * @default 8080
   */
  readonly port?: number;

  /**
   * Internal port.
   *
   * @default 8080
   */
  readonly containerPort?: number;

  /**
   * Internal namespace.
   *
   * @default default
   */
  readonly namespace?: string;

  /**
   * Service type.
   *
   * @default ClusterIP
   */
  readonly type?: string;

  /**
   * Deployment name.
   *
   * @default default-name
   */
  readonly name?: string;
}

export class WebService extends Construct {
  constructor(scope: Construct, id: string, props: WebServiceProps) {
    super(scope, id);

    const name = props.name || 'default-name';
    const port = props.port || 8080;
    const namespace = props.namespace || 'default';
    const containerPort = props.containerPort || 8080;
    // const label = { app: Names.toDnsLabel(this) };
    const label = { app: Names.toLabelValue(this) };
    const replicas = props.replicas ?? 1;
    const type = props.type ?? 'ClusterIP';
    const service = new KubeService(this, 'service', {
      metadata: {
        name: `${name}-service`,
        namespace,
      },
      spec: {
        type: type,
        ports: [{ port, targetPort: IntOrString.fromNumber(containerPort) }],
        selector: label,
      },
    });

    const isUi = name.includes('client');
    let nginxConfig = null;
    let proxyEnvs = null;

    if (name.includes('client')) {
      proxyEnvs = new ConfigMap(this, 'proxy-envs', {
        metadata: {
          name: 'proxy-envs',
          namespace,
        },
        data: {
          // upstream_host: "users-api-service",
          upstream_host: service.name,
          // upstream_port: service.metadata.toJson().port,
          upstream_port: port.toString(),
          // upstream_portas: service.toJson().data,
          upstream_name: 'backend',
        },
      });
      proxyEnvs.addData('my-klry', 'shit value');
      // s.addBinaryData("ar", "sd") // should be base64
      nginxConfig = new ConfigMap(this, 'nginx-config', {
        metadata: {
          finalizers: [],
          labels: {
            // label1: IntOrString.fromString('label-value1').value,
            // label3: IntOrString.fromString('label-value3').value,
            // label2: 'label-value2',
          },
          name: 'nginx-config',
          annotations: {
            annotation1: 'annotation1',
            annotation2: 'annotation2',
          },
          namespace: namespace,
        },
        data: {
          'default.conf.template': createNginxConfig([
            {
              name: 'test',
              host: 'teset',
              port: port.toString(),
            },
            {
              port: proxyEnvs.data.upstream_port,
              name: proxyEnvs.data.upstream_name,
              host: proxyEnvs.data.upstream_host,
            },
            // {
            //     name: "test1",
            //     host: "tese1",
            //     port: "12345"
            // }
          ]),
          stam: 'my data here',
          // "nginx-config":
          // "more-data": "more of my data here"
        },
      });
    }

    // console.log('service', service.toJson())
    new KubeDeployment(this, 'deployment', {
      metadata: {
        namespace,
        name,
      },
      spec: {
        replicas,
        selector: {
          matchLabels: label,
        },
        template: {
          metadata: {
            labels: label,  annotations: {
              // should be on argo app
              "argocd-image-updater.argoproj.io/image-list": "some/image:2.x-0",
              "argocd-image-updater.argoproj.io/<image>.update-strategy": "semver",
              "argocd-image-updater.argoproj.io/myimage.update-strategy": "latest",
              "argocd-image-updater.argoproj.io/myimage.ignore-tags": "latest, master",
              annotation2: 'annotation2',
            }
          },
          spec: {
            containers: [
              {
                name: 'app',
                image: props.image,
                // image: 'nginx:latest',
                // image: "mongo",
                ports: [{ containerPort }],
                volumeMounts: [
                  {
                    name: 'nginx-config',
                    mountPath: '/etc/nginx/templates',
                  },
                ],
                // env: [{
                //
                // }]
              },
            ],
            // volumes: !isUi
            //   ? undefined
            //   : [
            //       {
            //         name: proxyEnvs?.name!,
            //         configMap: {
            //           name: proxyEnvs?.name,
            //         },
            //       },
            //       {
            //         name: nginxConfig?.name!,
            //         configMap: {
            //           name: 'nginx-config',
            //         },
            //       },
            //     ],
          },
        },
      },
    });
    // console.log('name', name)
    // return service;
  }
}
