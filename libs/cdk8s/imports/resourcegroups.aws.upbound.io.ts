// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * Group is the Schema for the Groups API. Provides a Resource Group.
 *
 * @schema Group
 */
export class Group extends ApiObject {
  /**
   * Returns the apiVersion and kind for "Group"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'resourcegroups.aws.upbound.io/v1beta1',
    kind: 'Group',
  }

  /**
   * Renders a Kubernetes manifest for "Group".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: GroupProps): any {
    return {
      ...Group.GVK,
      ...toJson_GroupProps(props),
    };
  }

  /**
   * Defines a "Group" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: GroupProps) {
    super(scope, id, {
      ...Group.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...Group.GVK,
      ...toJson_GroupProps(resolved),
    };
  }
}

/**
 * Group is the Schema for the Groups API. Provides a Resource Group.
 *
 * @schema Group
 */
export interface GroupProps {
  /**
   * @schema Group#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * GroupSpec defines the desired state of Group
   *
   * @schema Group#spec
   */
  readonly spec: GroupSpec;

}

/**
 * Converts an object of type 'GroupProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupProps(obj: GroupProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_GroupSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * GroupSpec defines the desired state of Group
 *
 * @schema GroupSpec
 */
export interface GroupSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
   *
   * @schema GroupSpec#deletionPolicy
   */
  readonly deletionPolicy?: GroupSpecDeletionPolicy;

  /**
   * @schema GroupSpec#forProvider
   */
  readonly forProvider: GroupSpecForProvider;

  /**
   * THIS IS AN ALPHA FIELD. Do not use it in production. It is not honored unless the relevant Crossplane feature flag is enabled, and may be changed or removed without notice. ManagementPolicy specifies the level of control Crossplane has over the managed external resource. This field is planned to replace the DeletionPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
   *
   * @schema GroupSpec#managementPolicy
   */
  readonly managementPolicy?: GroupSpecManagementPolicy;

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema GroupSpec#providerConfigRef
   */
  readonly providerConfigRef?: GroupSpecProviderConfigRef;

  /**
   * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
   *
   * @schema GroupSpec#providerRef
   */
  readonly providerRef?: GroupSpecProviderRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema GroupSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: GroupSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema GroupSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: GroupSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'GroupSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpec(obj: GroupSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_GroupSpecForProvider(obj.forProvider),
    'managementPolicy': obj.managementPolicy,
    'providerConfigRef': toJson_GroupSpecProviderConfigRef(obj.providerConfigRef),
    'providerRef': toJson_GroupSpecProviderRef(obj.providerRef),
    'publishConnectionDetailsTo': toJson_GroupSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_GroupSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
 *
 * @schema GroupSpecDeletionPolicy
 */
export enum GroupSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema GroupSpecForProvider
 */
export interface GroupSpecForProvider {
  /**
   * A configuration associates the resource group with an AWS service and specifies how the service can interact with the resources in the group. See below for details.
   *
   * @schema GroupSpecForProvider#configuration
   */
  readonly configuration?: GroupSpecForProviderConfiguration[];

  /**
   * A description of the resource group.
   *
   * @schema GroupSpecForProvider#description
   */
  readonly description?: string;

  /**
   * Region is the region you'd like your resource to be created in.
   *
   * @schema GroupSpecForProvider#region
   */
  readonly region: string;

  /**
   * A resource_query block. Resource queries are documented below.
   *
   * @schema GroupSpecForProvider#resourceQuery
   */
  readonly resourceQuery?: GroupSpecForProviderResourceQuery[];

  /**
   * Key-value map of resource tags.
   *
   * @schema GroupSpecForProvider#tags
   */
  readonly tags?: { [key: string]: string };

}

/**
 * Converts an object of type 'GroupSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecForProvider(obj: GroupSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configuration': obj.configuration?.map(y => toJson_GroupSpecForProviderConfiguration(y)),
    'description': obj.description,
    'region': obj.region,
    'resourceQuery': obj.resourceQuery?.map(y => toJson_GroupSpecForProviderResourceQuery(y)),
    'tags': ((obj.tags) === undefined) ? undefined : (Object.entries(obj.tags).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * THIS IS AN ALPHA FIELD. Do not use it in production. It is not honored unless the relevant Crossplane feature flag is enabled, and may be changed or removed without notice. ManagementPolicy specifies the level of control Crossplane has over the managed external resource. This field is planned to replace the DeletionPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
 *
 * @schema GroupSpecManagementPolicy
 */
export enum GroupSpecManagementPolicy {
  /** FullControl */
  FULL_CONTROL = "FullControl",
  /** ObserveOnly */
  OBSERVE_ONLY = "ObserveOnly",
  /** OrphanOnDelete */
  ORPHAN_ON_DELETE = "OrphanOnDelete",
}

/**
 * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
 *
 * @schema GroupSpecProviderConfigRef
 */
export interface GroupSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema GroupSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema GroupSpecProviderConfigRef#policy
   */
  readonly policy?: GroupSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'GroupSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecProviderConfigRef(obj: GroupSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_GroupSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProviderReference specifies the provider that will be used to create, observe, update, and delete this managed resource. Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
 *
 * @schema GroupSpecProviderRef
 */
export interface GroupSpecProviderRef {
  /**
   * Name of the referenced object.
   *
   * @schema GroupSpecProviderRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema GroupSpecProviderRef#policy
   */
  readonly policy?: GroupSpecProviderRefPolicy;

}

/**
 * Converts an object of type 'GroupSpecProviderRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecProviderRef(obj: GroupSpecProviderRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_GroupSpecProviderRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema GroupSpecPublishConnectionDetailsTo
 */
export interface GroupSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema GroupSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: GroupSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema GroupSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: GroupSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema GroupSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'GroupSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecPublishConnectionDetailsTo(obj: GroupSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_GroupSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_GroupSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema GroupSpecWriteConnectionSecretToRef
 */
export interface GroupSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema GroupSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema GroupSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'GroupSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecWriteConnectionSecretToRef(obj: GroupSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
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
 * @schema GroupSpecForProviderConfiguration
 */
export interface GroupSpecForProviderConfiguration {
  /**
   * A collection of parameters for this group configuration item. See below for details.
   *
   * @schema GroupSpecForProviderConfiguration#parameters
   */
  readonly parameters?: GroupSpecForProviderConfigurationParameters[];

  /**
   * Specifies the type of group configuration item.
   *
   * @schema GroupSpecForProviderConfiguration#type
   */
  readonly type: string;

}

/**
 * Converts an object of type 'GroupSpecForProviderConfiguration' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecForProviderConfiguration(obj: GroupSpecForProviderConfiguration | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'parameters': obj.parameters?.map(y => toJson_GroupSpecForProviderConfigurationParameters(y)),
    'type': obj.type,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * @schema GroupSpecForProviderResourceQuery
 */
export interface GroupSpecForProviderResourceQuery {
  /**
   * The resource query as a JSON string.
   *
   * @schema GroupSpecForProviderResourceQuery#query
   */
  readonly query: string;

  /**
   * The type of the resource query. Defaults to TAG_FILTERS_1_0.
   *
   * @default TAG_FILTERS_1_0.
   * @schema GroupSpecForProviderResourceQuery#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'GroupSpecForProviderResourceQuery' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecForProviderResourceQuery(obj: GroupSpecForProviderResourceQuery | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'query': obj.query,
    'type': obj.type,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema GroupSpecProviderConfigRefPolicy
 */
export interface GroupSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema GroupSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: GroupSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema GroupSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: GroupSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'GroupSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecProviderConfigRefPolicy(obj: GroupSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * Policies for referencing.
 *
 * @schema GroupSpecProviderRefPolicy
 */
export interface GroupSpecProviderRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema GroupSpecProviderRefPolicy#resolution
   */
  readonly resolution?: GroupSpecProviderRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema GroupSpecProviderRefPolicy#resolve
   */
  readonly resolve?: GroupSpecProviderRefPolicyResolve;

}

/**
 * Converts an object of type 'GroupSpecProviderRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecProviderRefPolicy(obj: GroupSpecProviderRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema GroupSpecPublishConnectionDetailsToConfigRef
 */
export interface GroupSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema GroupSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema GroupSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: GroupSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'GroupSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecPublishConnectionDetailsToConfigRef(obj: GroupSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_GroupSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema GroupSpecPublishConnectionDetailsToMetadata
 */
export interface GroupSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema GroupSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema GroupSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema GroupSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'GroupSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecPublishConnectionDetailsToMetadata(obj: GroupSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
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
 * @schema GroupSpecForProviderConfigurationParameters
 */
export interface GroupSpecForProviderConfigurationParameters {
  /**
   * The name of the group configuration parameter.
   *
   * @schema GroupSpecForProviderConfigurationParameters#name
   */
  readonly name: string;

  /**
   * The value or values to be used for the specified parameter.
   *
   * @schema GroupSpecForProviderConfigurationParameters#values
   */
  readonly values: string[];

}

/**
 * Converts an object of type 'GroupSpecForProviderConfigurationParameters' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecForProviderConfigurationParameters(obj: GroupSpecForProviderConfigurationParameters | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'values': obj.values?.map(y => y),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema GroupSpecProviderConfigRefPolicyResolution
 */
export enum GroupSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema GroupSpecProviderConfigRefPolicyResolve
 */
export enum GroupSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema GroupSpecProviderRefPolicyResolution
 */
export enum GroupSpecProviderRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema GroupSpecProviderRefPolicyResolve
 */
export enum GroupSpecProviderRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema GroupSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface GroupSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema GroupSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: GroupSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema GroupSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: GroupSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'GroupSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_GroupSpecPublishConnectionDetailsToConfigRefPolicy(obj: GroupSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema GroupSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum GroupSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema GroupSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum GroupSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}
