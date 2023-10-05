import { Construct } from "constructs";
import { Names } from "cdk8s";
import { KubeDeployment, KubeService, IntOrString } from "../../imports/k8s";
import { ConfigMap } from "cdk8s-plus-25";
import { createNginxConfig } from "./nginx-config";

export interface RegistryProps {
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

export class Registry extends Construct {
  constructor(scope: Construct, id: string, props: RegistryProps) {
    super(scope, id);
  }
}
