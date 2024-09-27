import * as pulumi from "@pulumi/pulumi";
import {
  NodePool,
  NodePoolArgs,
  Cluster,
  ClusterArgs,
} from "@pulumi/gcp/container";
// import { Account, AccountArgs } from "@pulumi/gcp/serviceaccount";
import { merge } from "lodash";

export interface ClusterResourceProps {
  production: boolean;
  clusterArgs: ClusterArgs;
  nodePoolArgs: Array<Omit<NodePoolArgs, "cluster">>;
  // accountArgs?: AccountArgs;
}

export class ClusterResource extends pulumi.ComponentResource {
  readonly cluster: pulumi.Output<Cluster>;
  readonly nodePools: pulumi.Output<Array<NodePool>>;
  readonly kubeconfig: pulumi.Output<string>;
  constructor(
    name: string,
    clusterResourceProps: ClusterResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:gke", name, {}, opts);
    const { production, clusterArgs, nodePoolArgs } = clusterResourceProps;

    // Create a new GKE cluster
    const gkeCluster = new Cluster(
      name,
      merge(
        {
          deletionProtection: false,
          // nodePoolAutoConfig: {},
          enableIntranodeVisibility: true,
          verticalPodAutoscaling: {
            enabled: true,
          },
          gatewayApiConfig: {
            channel: "CHANNEL_STANDARD",
          },
          datapathProvider: "ADVANCED_DATAPATH",
          monitoringConfig: {
            advancedDatapathObservabilityConfigs: [
              {
                enableMetrics: true,
                enableRelay: true,
              },
            ],
            // enableComponents: [
            //   "SYSTEM_METRICS",
            //   "STORAGE",
            //   "HPA",
            //   "POD",
            //   "DAEMONSET",
            //   "DEPLOYMENT",
            //   "STATEFULSET",
            //   "KUBELET",
            //   "CADVISOR",
            //   "DCGM",
            // ],
          },
          nodePools: [],
          protectConfig: {
            workloadConfig: {
              auditMode: "BASIC",
            },
            workloadVulnerabilityMode: "BASIC",
          },
          removeDefaultNodePool: true,
          workloadIdentityConfig: {
            workloadPool: `${clusterArgs.project}.svc.id.goog`,
          },
          // enableFqdnNetworkPolicy: true,
          resourceLabels: {
            iac: "pulumi",
            app: name,
          },
          costManagementConfig: {
            enabled: true,
          },
          securityPostureConfig: {
            mode: "BASIC",
            vulnerabilityMode: "VULNERABILITY_BASIC",
          },
          addonsConfig: {
            // not valid for autopilot clusters
            // cloudrunConfig: {
            //   disabled: false,
            //   loadBalancerType: "LOAD_BALANCER_TYPE_INTERNAL",
            // },
            // configConnectorConfig: {
            //   enabled: false,
            // },
            dnsCacheConfig: {
              enabled: true,
            },
            // gcpFilestoreCsiDriverConfig: {
            //   enabled: true,
            // },
            // gcsFuseCsiDriverConfig: {
            //   enabled: true,
            // },
            horizontalPodAutoscaling: {
              disabled: false,
            },
            gkeBackupAgentConfig: {
              enabled: true,
            },
            istioConfig: {
              disabled: true,
            },
          },
          ipAllocationPolicy: {
            clusterIpv4CidrBlock: "/14",
            servicesIpv4CidrBlock: "/16",
          },
        } as ClusterArgs,
        clusterArgs,
        { parent: this },
      ),
    );
    this.cluster = pulumi.output(gkeCluster);
    // Create a new Node Pools
    const nodePools = nodePoolArgs.map((np, i) => {
      return new NodePool(
        `${name}-${i}`,
        merge(
          {
            cluster: gkeCluster.id,
            name: `main-${i}`,
            nodeConfig: merge(
              {
                workloadMetadataConfig: {
                  mode: "GKE_METADATA",
                },
                labels: {
                  app: name,
                  iac: "pulumi",
                },
                machineType: "e2-standard-4",
                oauthScopes: ["https://www.googleapis.com/auth/cloud-platform"],
                // serviceAccount: gkeNodepoolSa.email,
              },
              np.nodeConfig,
            ),
          } as NodePoolArgs,
          np,
        ),
        { parent: gkeCluster },
      );
    });
    this.nodePools = pulumi.output(nodePools);

    // Build a Kubeconfig for accessing the cluster
    const clusterKubeconfig = pulumi.interpolate`apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${gkeCluster.masterAuth.clusterCaCertificate}
    server: https://${gkeCluster.endpoint}
  name: ${gkeCluster.name}
contexts:
- context:
    cluster: ${gkeCluster.name}
    user: ${gkeCluster.name}
  name: ${gkeCluster.name}
current-context: ${gkeCluster.name}
kind: Config
preferences: {}
users:
- name: ${gkeCluster.name}
  user:
    exec:
      apiVersion: client.authentication.k8s.io/v1beta1
      command: gke-gcloud-auth-plugin
      installHint: Install gke-gcloud-auth-plugin for use with kubectl by following
        https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
      provideClusterInfo: true
`;

    // const repoName = 'fleet-infra';
    // const branch = 'main';
    // const path = 'clusters/dev';
    // const githubOwner = 'yurikrupnik-airwayz';

    // Generate ssh keys
    // const key = new tls.PrivateKey('key', {
    //   algorithm: 'ECDSA',
    //   ecdsaCurve: 'P256',
    // });
    //
    // // Create Github repository
    // let s = new github.getRepository({
    //   // name: '',
    //   fullName: `${githubOwner}/${repoName}`,
    //   // homepageUrl: 'ads',
    //   // description: 'sd',
    //   // fullName?: string;
    //   // homepageUrl?: string;
    //   // name?: string;
    // });
    // const repo = new github.Repository('repo', {
    //   name: repoName,
    //   visibility: 'private',
    //   autoInit: true,
    // });
    //
    // new github.BranchDefault('default', {
    //   repository: repo.name,
    //   branch: branch,
    // });
    //
    // // Add generated public key to Github deploy key
    // const deployKey = new github.RepositoryDeployKey('key', {
    //   title: 'fluxcd',
    //   repository: repo.name,
    //   key: key.publicKeyOpenssh,
    //   readOnly: false,
    // });
    //
    // const provider = new flux.Provider('flux', {
    //   kubernetes: {
    //     configPath: '~/.kube/config',
    //   },
    //   git: {
    //     url: `ssh://git@github.com/${githubOwner}/${repoName}.git`,
    //     branch: branch,
    //     ssh: {
    //       username: 'git',
    //       privateKey: key.privateKeyPem,
    //     },
    //   },
    // });
    //
    // const resource = new flux.FluxBootstrapGit(
    //   'flux',
    //   {
    //     path: path,
    //   },
    //   {
    //     provider: provider,
    //     dependsOn: deployKey,
    //   }
    // );

    // Export some values for use elsewhere
    // this.networkName = gkeNetwork.name;
    // this.networkId = gkeNetwork.id;
    // this.clusterName = gkeCluster.name;
    // this.clusterId = gkeCluster.id;
    this.kubeconfig = clusterKubeconfig;
  }
}
