// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * IdsEndpoint is the Schema for the IdsEndpoints API. Cloud IDS is an intrusion detection service that provides threat detection for intrusions, malware, spyware, and command-and-control attacks on your network.
 *
 * @schema IdsEndpoint
 */
export class IdsEndpoint extends ApiObject {
  /**
   * Returns the apiVersion and kind for "IdsEndpoint"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'cloud.gcp.upbound.io/v1beta1',
    kind: 'IdsEndpoint',
  }

  /**
   * Renders a Kubernetes manifest for "IdsEndpoint".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: IdsEndpointProps): any {
    return {
      ...IdsEndpoint.GVK,
      ...toJson_IdsEndpointProps(props),
    };
  }

  /**
   * Defines a "IdsEndpoint" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: IdsEndpointProps) {
    super(scope, id, {
      ...IdsEndpoint.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...IdsEndpoint.GVK,
      ...toJson_IdsEndpointProps(resolved),
    };
  }
}

/**
 * IdsEndpoint is the Schema for the IdsEndpoints API. Cloud IDS is an intrusion detection service that provides threat detection for intrusions, malware, spyware, and command-and-control attacks on your network.
 *
 * @schema IdsEndpoint
 */
export interface IdsEndpointProps {
  /**
   * @schema IdsEndpoint#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * IdsEndpointSpec defines the desired state of IdsEndpoint
   *
   * @schema IdsEndpoint#spec
   */
  readonly spec: IdsEndpointSpec;

}

/**
 * Converts an object of type 'IdsEndpointProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointProps(obj: IdsEndpointProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_IdsEndpointSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * IdsEndpointSpec defines the desired state of IdsEndpoint
 *
 * @schema IdsEndpointSpec
 */
export interface IdsEndpointSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
   *
   * @schema IdsEndpointSpec#deletionPolicy
   */
  readonly deletionPolicy?: IdsEndpointSpecDeletionPolicy;

  /**
   * @schema IdsEndpointSpec#forProvider
   */
  readonly forProvider: IdsEndpointSpecForProvider;

  /**
   * THIS IS AN ALPHA FIELD. Do not use it in production. It is not honored unless the relevant Crossplane feature flag is enabled, and may be changed or removed without notice. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
   *
   * @schema IdsEndpointSpec#initProvider
   */
  readonly initProvider?: IdsEndpointSpecInitProvider;

  /**
   * THIS IS AN ALPHA FIELD. Do not use it in production. It is not honored unless the relevant Crossplane feature flag is enabled, and may be changed or removed without notice. ManagementPolicies specify the array of actions Crossplane is allowed to take on the managed and external resources. This field is planned to replace the DeletionPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. If both are custom, the DeletionPolicy field will be ignored. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223 and this one: https://github.com/crossplane/crossplane/blob/444267e84783136daa93568b364a5f01228cacbe/design/one-pager-ignore-changes.md
   *
   * @schema IdsEndpointSpec#managementPolicies
   */
  readonly managementPolicies?: IdsEndpointSpecManagementPolicies[];

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema IdsEndpointSpec#providerConfigRef
   */
  readonly providerConfigRef?: IdsEndpointSpecProviderConfigRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema IdsEndpointSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: IdsEndpointSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema IdsEndpointSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: IdsEndpointSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'IdsEndpointSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpec(obj: IdsEndpointSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_IdsEndpointSpecForProvider(obj.forProvider),
    'initProvider': toJson_IdsEndpointSpecInitProvider(obj.initProvider),
    'managementPolicies': obj.managementPolicies?.map(y => y),
    'providerConfigRef': toJson_IdsEndpointSpecProviderConfigRef(obj.providerConfigRef),
    'publishConnectionDetailsTo': toJson_IdsEndpointSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_IdsEndpointSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
 *
 * @schema IdsEndpointSpecDeletionPolicy
 */
export enum IdsEndpointSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema IdsEndpointSpecForProvider
 */
export interface IdsEndpointSpecForProvider {
  /**
   * An optional description of the endpoint.
   *
   * @schema IdsEndpointSpecForProvider#description
   */
  readonly description?: string;

  /**
   * The location for the endpoint.
   *
   * @schema IdsEndpointSpecForProvider#location
   */
  readonly location?: string;

  /**
   * Name of the endpoint in the format projects/{project_id}/locations/{locationId}/endpoints/{endpointId}.
   *
   * @schema IdsEndpointSpecForProvider#name
   */
  readonly name?: string;

  /**
   * Name of the VPC network that is connected to the IDS endpoint. This can either contain the VPC network name itself (like "src-net") or the full URL to the network (like "projects/{project_id}/global/networks/src-net").
   *
   * @schema IdsEndpointSpecForProvider#network
   */
  readonly network?: string;

  /**
   * Reference to a Network in compute to populate network.
   *
   * @schema IdsEndpointSpecForProvider#networkRef
   */
  readonly networkRef?: IdsEndpointSpecForProviderNetworkRef;

  /**
   * Selector for a Network in compute to populate network.
   *
   * @schema IdsEndpointSpecForProvider#networkSelector
   */
  readonly networkSelector?: IdsEndpointSpecForProviderNetworkSelector;

  /**
   * The ID of the project in which the resource belongs. If it is not provided, the provider project is used.
   *
   * @schema IdsEndpointSpecForProvider#project
   */
  readonly project?: string;

  /**
   * The minimum alert severity level that is reported by the endpoint. Possible values are: INFORMATIONAL, LOW, MEDIUM, HIGH, CRITICAL.
   *
   * @schema IdsEndpointSpecForProvider#severity
   */
  readonly severity?: string;

  /**
   * Configuration for threat IDs excluded from generating alerts. Limit: 99 IDs.
   *
   * @schema IdsEndpointSpecForProvider#threatExceptions
   */
  readonly threatExceptions?: string[];

}

/**
 * Converts an object of type 'IdsEndpointSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecForProvider(obj: IdsEndpointSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'description': obj.description,
    'location': obj.location,
    'name': obj.name,
    'network': obj.network,
    'networkRef': toJson_IdsEndpointSpecForProviderNetworkRef(obj.networkRef),
    'networkSelector': toJson_IdsEndpointSpecForProviderNetworkSelector(obj.networkSelector),
    'project': obj.project,
    'severity': obj.severity,
    'threatExceptions': obj.threatExceptions?.map(y => y),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * THIS IS AN ALPHA FIELD. Do not use it in production. It is not honored unless the relevant Crossplane feature flag is enabled, and may be changed or removed without notice. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
 *
 * @schema IdsEndpointSpecInitProvider
 */
export interface IdsEndpointSpecInitProvider {
  /**
   * An optional description of the endpoint.
   *
   * @schema IdsEndpointSpecInitProvider#description
   */
  readonly description?: string;

  /**
   * The location for the endpoint.
   *
   * @schema IdsEndpointSpecInitProvider#location
   */
  readonly location?: string;

  /**
   * Name of the endpoint in the format projects/{project_id}/locations/{locationId}/endpoints/{endpointId}.
   *
   * @schema IdsEndpointSpecInitProvider#name
   */
  readonly name?: string;

  /**
   * The ID of the project in which the resource belongs. If it is not provided, the provider project is used.
   *
   * @schema IdsEndpointSpecInitProvider#project
   */
  readonly project?: string;

  /**
   * The minimum alert severity level that is reported by the endpoint. Possible values are: INFORMATIONAL, LOW, MEDIUM, HIGH, CRITICAL.
   *
   * @schema IdsEndpointSpecInitProvider#severity
   */
  readonly severity?: string;

  /**
   * Configuration for threat IDs excluded from generating alerts. Limit: 99 IDs.
   *
   * @schema IdsEndpointSpecInitProvider#threatExceptions
   */
  readonly threatExceptions?: string[];

}

/**
 * Converts an object of type 'IdsEndpointSpecInitProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecInitProvider(obj: IdsEndpointSpecInitProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'description': obj.description,
    'location': obj.location,
    'name': obj.name,
    'project': obj.project,
    'severity': obj.severity,
    'threatExceptions': obj.threatExceptions?.map(y => y),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A ManagementAction represents an action that the Crossplane controllers can take on an external resource.
 *
 * @schema IdsEndpointSpecManagementPolicies
 */
export enum IdsEndpointSpecManagementPolicies {
  /** Observe */
  OBSERVE = "Observe",
  /** Create */
  CREATE = "Create",
  /** Update */
  UPDATE = "Update",
  /** Delete */
  DELETE = "Delete",
  /** LateInitialize */
  LATE_INITIALIZE = "LateInitialize",
  /** * */
  VALUE_ = "*",
}

/**
 * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
 *
 * @schema IdsEndpointSpecProviderConfigRef
 */
export interface IdsEndpointSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema IdsEndpointSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema IdsEndpointSpecProviderConfigRef#policy
   */
  readonly policy?: IdsEndpointSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'IdsEndpointSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecProviderConfigRef(obj: IdsEndpointSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_IdsEndpointSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema IdsEndpointSpecPublishConnectionDetailsTo
 */
export interface IdsEndpointSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: IdsEndpointSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: IdsEndpointSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'IdsEndpointSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecPublishConnectionDetailsTo(obj: IdsEndpointSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_IdsEndpointSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_IdsEndpointSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema IdsEndpointSpecWriteConnectionSecretToRef
 */
export interface IdsEndpointSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema IdsEndpointSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema IdsEndpointSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'IdsEndpointSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecWriteConnectionSecretToRef(obj: IdsEndpointSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'namespace': obj.namespace,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Reference to a Network in compute to populate network.
 *
 * @schema IdsEndpointSpecForProviderNetworkRef
 */
export interface IdsEndpointSpecForProviderNetworkRef {
  /**
   * Name of the referenced object.
   *
   * @schema IdsEndpointSpecForProviderNetworkRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema IdsEndpointSpecForProviderNetworkRef#policy
   */
  readonly policy?: IdsEndpointSpecForProviderNetworkRefPolicy;

}

/**
 * Converts an object of type 'IdsEndpointSpecForProviderNetworkRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecForProviderNetworkRef(obj: IdsEndpointSpecForProviderNetworkRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_IdsEndpointSpecForProviderNetworkRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Selector for a Network in compute to populate network.
 *
 * @schema IdsEndpointSpecForProviderNetworkSelector
 */
export interface IdsEndpointSpecForProviderNetworkSelector {
  /**
   * MatchControllerRef ensures an object with the same controller reference as the selecting object is selected.
   *
   * @schema IdsEndpointSpecForProviderNetworkSelector#matchControllerRef
   */
  readonly matchControllerRef?: boolean;

  /**
   * MatchLabels ensures an object with matching labels is selected.
   *
   * @schema IdsEndpointSpecForProviderNetworkSelector#matchLabels
   */
  readonly matchLabels?: { [key: string]: string };

  /**
   * Policies for selection.
   *
   * @schema IdsEndpointSpecForProviderNetworkSelector#policy
   */
  readonly policy?: IdsEndpointSpecForProviderNetworkSelectorPolicy;

}

/**
 * Converts an object of type 'IdsEndpointSpecForProviderNetworkSelector' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecForProviderNetworkSelector(obj: IdsEndpointSpecForProviderNetworkSelector | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'matchControllerRef': obj.matchControllerRef,
    'matchLabels': ((obj.matchLabels) === undefined) ? undefined : (Object.entries(obj.matchLabels).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'policy': toJson_IdsEndpointSpecForProviderNetworkSelectorPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema IdsEndpointSpecProviderConfigRefPolicy
 */
export interface IdsEndpointSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema IdsEndpointSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: IdsEndpointSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema IdsEndpointSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: IdsEndpointSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'IdsEndpointSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecProviderConfigRefPolicy(obj: IdsEndpointSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
 *
 * @schema IdsEndpointSpecPublishConnectionDetailsToConfigRef
 */
export interface IdsEndpointSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'IdsEndpointSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecPublishConnectionDetailsToConfigRef(obj: IdsEndpointSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema IdsEndpointSpecPublishConnectionDetailsToMetadata
 */
export interface IdsEndpointSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'IdsEndpointSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecPublishConnectionDetailsToMetadata(obj: IdsEndpointSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'annotations': ((obj.annotations) === undefined) ? undefined : (Object.entries(obj.annotations).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'labels': ((obj.labels) === undefined) ? undefined : (Object.entries(obj.labels).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'type': obj.type,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema IdsEndpointSpecForProviderNetworkRefPolicy
 */
export interface IdsEndpointSpecForProviderNetworkRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema IdsEndpointSpecForProviderNetworkRefPolicy#resolution
   */
  readonly resolution?: IdsEndpointSpecForProviderNetworkRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema IdsEndpointSpecForProviderNetworkRefPolicy#resolve
   */
  readonly resolve?: IdsEndpointSpecForProviderNetworkRefPolicyResolve;

}

/**
 * Converts an object of type 'IdsEndpointSpecForProviderNetworkRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecForProviderNetworkRefPolicy(obj: IdsEndpointSpecForProviderNetworkRefPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for selection.
 *
 * @schema IdsEndpointSpecForProviderNetworkSelectorPolicy
 */
export interface IdsEndpointSpecForProviderNetworkSelectorPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema IdsEndpointSpecForProviderNetworkSelectorPolicy#resolution
   */
  readonly resolution?: IdsEndpointSpecForProviderNetworkSelectorPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema IdsEndpointSpecForProviderNetworkSelectorPolicy#resolve
   */
  readonly resolve?: IdsEndpointSpecForProviderNetworkSelectorPolicyResolve;

}

/**
 * Converts an object of type 'IdsEndpointSpecForProviderNetworkSelectorPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecForProviderNetworkSelectorPolicy(obj: IdsEndpointSpecForProviderNetworkSelectorPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema IdsEndpointSpecProviderConfigRefPolicyResolution
 */
export enum IdsEndpointSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema IdsEndpointSpecProviderConfigRefPolicyResolve
 */
export enum IdsEndpointSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy(obj: IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'resolution': obj.resolution,
    'resolve': obj.resolve,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema IdsEndpointSpecForProviderNetworkRefPolicyResolution
 */
export enum IdsEndpointSpecForProviderNetworkRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema IdsEndpointSpecForProviderNetworkRefPolicyResolve
 */
export enum IdsEndpointSpecForProviderNetworkRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema IdsEndpointSpecForProviderNetworkSelectorPolicyResolution
 */
export enum IdsEndpointSpecForProviderNetworkSelectorPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema IdsEndpointSpecForProviderNetworkSelectorPolicyResolve
 */
export enum IdsEndpointSpecForProviderNetworkSelectorPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum IdsEndpointSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

