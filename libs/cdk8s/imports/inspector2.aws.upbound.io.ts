// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * Enabler is the Schema for the Enablers API.
 *
 * @schema Enabler
 */
export class Enabler extends ApiObject {
  /**
   * Returns the apiVersion and kind for "Enabler"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'inspector2.aws.upbound.io/v1beta1',
    kind: 'Enabler',
  }

  /**
   * Renders a Kubernetes manifest for "Enabler".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: EnablerProps): any {
    return {
      ...Enabler.GVK,
      ...toJson_EnablerProps(props),
    };
  }

  /**
   * Defines a "Enabler" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: EnablerProps) {
    super(scope, id, {
      ...Enabler.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...Enabler.GVK,
      ...toJson_EnablerProps(resolved),
    };
  }
}

/**
 * Enabler is the Schema for the Enablers API.
 *
 * @schema Enabler
 */
export interface EnablerProps {
  /**
   * @schema Enabler#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * EnablerSpec defines the desired state of Enabler
   *
   * @schema Enabler#spec
   */
  readonly spec: EnablerSpec;

}

/**
 * Converts an object of type 'EnablerProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerProps(obj: EnablerProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_EnablerSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * EnablerSpec defines the desired state of Enabler
 *
 * @schema EnablerSpec
 */
export interface EnablerSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
   *
   * @schema EnablerSpec#deletionPolicy
   */
  readonly deletionPolicy?: EnablerSpecDeletionPolicy;

  /**
   * @schema EnablerSpec#forProvider
   */
  readonly forProvider: EnablerSpecForProvider;

  /**
   * THIS IS A BETA FIELD. It will be honored unless the Management Policies feature flag is disabled. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
   *
   * @schema EnablerSpec#initProvider
   */
  readonly initProvider?: EnablerSpecInitProvider;

  /**
   * THIS IS A BETA FIELD. It is on by default but can be opted out through a Crossplane feature flag. ManagementPolicies specify the array of actions Crossplane is allowed to take on the managed and external resources. This field is planned to replace the DeletionPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. If both are custom, the DeletionPolicy field will be ignored. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223 and this one: https://github.com/crossplane/crossplane/blob/444267e84783136daa93568b364a5f01228cacbe/design/one-pager-ignore-changes.md
   *
   * @schema EnablerSpec#managementPolicies
   */
  readonly managementPolicies?: EnablerSpecManagementPolicies[];

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema EnablerSpec#providerConfigRef
   */
  readonly providerConfigRef?: EnablerSpecProviderConfigRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema EnablerSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: EnablerSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema EnablerSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: EnablerSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'EnablerSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpec(obj: EnablerSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_EnablerSpecForProvider(obj.forProvider),
    'initProvider': toJson_EnablerSpecInitProvider(obj.initProvider),
    'managementPolicies': obj.managementPolicies?.map(y => y),
    'providerConfigRef': toJson_EnablerSpecProviderConfigRef(obj.providerConfigRef),
    'publishConnectionDetailsTo': toJson_EnablerSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_EnablerSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
 *
 * @schema EnablerSpecDeletionPolicy
 */
export enum EnablerSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema EnablerSpecForProvider
 */
export interface EnablerSpecForProvider {
  /**
   * Set of account IDs. Can contain one of: the Organization's Administrator Account, or one or more Member Accounts.
   *
   * @schema EnablerSpecForProvider#accountIds
   */
  readonly accountIds?: string[];

  /**
   * Region is the region you'd like your resource to be created in.
   *
   * @schema EnablerSpecForProvider#region
   */
  readonly region: string;

  /**
   * Type of resources to scan. Valid values are EC2, ECR, and LAMBDA. At least one item is required.
   *
   * @schema EnablerSpecForProvider#resourceTypes
   */
  readonly resourceTypes?: string[];

}

/**
 * Converts an object of type 'EnablerSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecForProvider(obj: EnablerSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'accountIds': obj.accountIds?.map(y => y),
    'region': obj.region,
    'resourceTypes': obj.resourceTypes?.map(y => y),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * THIS IS A BETA FIELD. It will be honored unless the Management Policies feature flag is disabled. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
 *
 * @schema EnablerSpecInitProvider
 */
export interface EnablerSpecInitProvider {
  /**
   * Set of account IDs. Can contain one of: the Organization's Administrator Account, or one or more Member Accounts.
   *
   * @schema EnablerSpecInitProvider#accountIds
   */
  readonly accountIds?: string[];

  /**
   * Type of resources to scan. Valid values are EC2, ECR, and LAMBDA. At least one item is required.
   *
   * @schema EnablerSpecInitProvider#resourceTypes
   */
  readonly resourceTypes?: string[];

}

/**
 * Converts an object of type 'EnablerSpecInitProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecInitProvider(obj: EnablerSpecInitProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'accountIds': obj.accountIds?.map(y => y),
    'resourceTypes': obj.resourceTypes?.map(y => y),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A ManagementAction represents an action that the Crossplane controllers can take on an external resource.
 *
 * @schema EnablerSpecManagementPolicies
 */
export enum EnablerSpecManagementPolicies {
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
 * @schema EnablerSpecProviderConfigRef
 */
export interface EnablerSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema EnablerSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema EnablerSpecProviderConfigRef#policy
   */
  readonly policy?: EnablerSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'EnablerSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecProviderConfigRef(obj: EnablerSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_EnablerSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema EnablerSpecPublishConnectionDetailsTo
 */
export interface EnablerSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema EnablerSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: EnablerSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema EnablerSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: EnablerSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema EnablerSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'EnablerSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecPublishConnectionDetailsTo(obj: EnablerSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_EnablerSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_EnablerSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema EnablerSpecWriteConnectionSecretToRef
 */
export interface EnablerSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema EnablerSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema EnablerSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'EnablerSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecWriteConnectionSecretToRef(obj: EnablerSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
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
 * Policies for referencing.
 *
 * @schema EnablerSpecProviderConfigRefPolicy
 */
export interface EnablerSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema EnablerSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: EnablerSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema EnablerSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: EnablerSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'EnablerSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecProviderConfigRefPolicy(obj: EnablerSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema EnablerSpecPublishConnectionDetailsToConfigRef
 */
export interface EnablerSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema EnablerSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema EnablerSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: EnablerSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'EnablerSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecPublishConnectionDetailsToConfigRef(obj: EnablerSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_EnablerSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema EnablerSpecPublishConnectionDetailsToMetadata
 */
export interface EnablerSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema EnablerSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema EnablerSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema EnablerSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'EnablerSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecPublishConnectionDetailsToMetadata(obj: EnablerSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
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
 * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
 *
 * @schema EnablerSpecProviderConfigRefPolicyResolution
 */
export enum EnablerSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema EnablerSpecProviderConfigRefPolicyResolve
 */
export enum EnablerSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema EnablerSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface EnablerSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema EnablerSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: EnablerSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema EnablerSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: EnablerSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'EnablerSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_EnablerSpecPublishConnectionDetailsToConfigRefPolicy(obj: EnablerSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema EnablerSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum EnablerSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema EnablerSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum EnablerSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

