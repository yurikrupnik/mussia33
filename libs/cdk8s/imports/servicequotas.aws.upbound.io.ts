// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * ServiceQuota is the Schema for the ServiceQuotas API. Manages an individual Service Quota
 *
 * @schema ServiceQuota
 */
export class ServiceQuota extends ApiObject {
  /**
   * Returns the apiVersion and kind for "ServiceQuota"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'servicequotas.aws.upbound.io/v1beta1',
    kind: 'ServiceQuota',
  }

  /**
   * Renders a Kubernetes manifest for "ServiceQuota".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: ServiceQuotaProps): any {
    return {
      ...ServiceQuota.GVK,
      ...toJson_ServiceQuotaProps(props),
    };
  }

  /**
   * Defines a "ServiceQuota" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: ServiceQuotaProps) {
    super(scope, id, {
      ...ServiceQuota.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...ServiceQuota.GVK,
      ...toJson_ServiceQuotaProps(resolved),
    };
  }
}

/**
 * ServiceQuota is the Schema for the ServiceQuotas API. Manages an individual Service Quota
 *
 * @schema ServiceQuota
 */
export interface ServiceQuotaProps {
  /**
   * @schema ServiceQuota#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * ServiceQuotaSpec defines the desired state of ServiceQuota
   *
   * @schema ServiceQuota#spec
   */
  readonly spec: ServiceQuotaSpec;

}

/**
 * Converts an object of type 'ServiceQuotaProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaProps(obj: ServiceQuotaProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_ServiceQuotaSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ServiceQuotaSpec defines the desired state of ServiceQuota
 *
 * @schema ServiceQuotaSpec
 */
export interface ServiceQuotaSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
   *
   * @schema ServiceQuotaSpec#deletionPolicy
   */
  readonly deletionPolicy?: ServiceQuotaSpecDeletionPolicy;

  /**
   * @schema ServiceQuotaSpec#forProvider
   */
  readonly forProvider: ServiceQuotaSpecForProvider;

  /**
   * THIS IS A BETA FIELD. It will be honored unless the Management Policies feature flag is disabled. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
   *
   * @schema ServiceQuotaSpec#initProvider
   */
  readonly initProvider?: ServiceQuotaSpecInitProvider;

  /**
   * THIS IS A BETA FIELD. It is on by default but can be opted out through a Crossplane feature flag. ManagementPolicies specify the array of actions Crossplane is allowed to take on the managed and external resources. This field is planned to replace the DeletionPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. If both are custom, the DeletionPolicy field will be ignored. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223 and this one: https://github.com/crossplane/crossplane/blob/444267e84783136daa93568b364a5f01228cacbe/design/one-pager-ignore-changes.md
   *
   * @schema ServiceQuotaSpec#managementPolicies
   */
  readonly managementPolicies?: ServiceQuotaSpecManagementPolicies[];

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema ServiceQuotaSpec#providerConfigRef
   */
  readonly providerConfigRef?: ServiceQuotaSpecProviderConfigRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema ServiceQuotaSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: ServiceQuotaSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema ServiceQuotaSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: ServiceQuotaSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'ServiceQuotaSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpec(obj: ServiceQuotaSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_ServiceQuotaSpecForProvider(obj.forProvider),
    'initProvider': toJson_ServiceQuotaSpecInitProvider(obj.initProvider),
    'managementPolicies': obj.managementPolicies?.map(y => y),
    'providerConfigRef': toJson_ServiceQuotaSpecProviderConfigRef(obj.providerConfigRef),
    'publishConnectionDetailsTo': toJson_ServiceQuotaSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_ServiceQuotaSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
 *
 * @schema ServiceQuotaSpecDeletionPolicy
 */
export enum ServiceQuotaSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema ServiceQuotaSpecForProvider
 */
export interface ServiceQuotaSpecForProvider {
  /**
   * Code of the service quota to track. For example: L-F678F1CE. Available values can be found with the AWS CLI service-quotas list-service-quotas command.
   *
   * @schema ServiceQuotaSpecForProvider#quotaCode
   */
  readonly quotaCode?: string;

  /**
   * Region is the region you'd like your resource to be created in.
   *
   * @schema ServiceQuotaSpecForProvider#region
   */
  readonly region: string;

  /**
   * Code of the service to track. For example: vpc. Available values can be found with the AWS CLI service-quotas list-services command.
   *
   * @schema ServiceQuotaSpecForProvider#serviceCode
   */
  readonly serviceCode?: string;

  /**
   * Float specifying the desired value for the service quota. If the desired value is higher than the current value, a quota increase request is submitted. When a known request is submitted and pending, the value reflects the desired value of the pending request.
   *
   * @schema ServiceQuotaSpecForProvider#value
   */
  readonly value?: number;

}

/**
 * Converts an object of type 'ServiceQuotaSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecForProvider(obj: ServiceQuotaSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'quotaCode': obj.quotaCode,
    'region': obj.region,
    'serviceCode': obj.serviceCode,
    'value': obj.value,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * THIS IS A BETA FIELD. It will be honored unless the Management Policies feature flag is disabled. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
 *
 * @schema ServiceQuotaSpecInitProvider
 */
export interface ServiceQuotaSpecInitProvider {
  /**
   * Code of the service quota to track. For example: L-F678F1CE. Available values can be found with the AWS CLI service-quotas list-service-quotas command.
   *
   * @schema ServiceQuotaSpecInitProvider#quotaCode
   */
  readonly quotaCode?: string;

  /**
   * Code of the service to track. For example: vpc. Available values can be found with the AWS CLI service-quotas list-services command.
   *
   * @schema ServiceQuotaSpecInitProvider#serviceCode
   */
  readonly serviceCode?: string;

  /**
   * Float specifying the desired value for the service quota. If the desired value is higher than the current value, a quota increase request is submitted. When a known request is submitted and pending, the value reflects the desired value of the pending request.
   *
   * @schema ServiceQuotaSpecInitProvider#value
   */
  readonly value?: number;

}

/**
 * Converts an object of type 'ServiceQuotaSpecInitProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecInitProvider(obj: ServiceQuotaSpecInitProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'quotaCode': obj.quotaCode,
    'serviceCode': obj.serviceCode,
    'value': obj.value,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A ManagementAction represents an action that the Crossplane controllers can take on an external resource.
 *
 * @schema ServiceQuotaSpecManagementPolicies
 */
export enum ServiceQuotaSpecManagementPolicies {
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
 * @schema ServiceQuotaSpecProviderConfigRef
 */
export interface ServiceQuotaSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema ServiceQuotaSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ServiceQuotaSpecProviderConfigRef#policy
   */
  readonly policy?: ServiceQuotaSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'ServiceQuotaSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecProviderConfigRef(obj: ServiceQuotaSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ServiceQuotaSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema ServiceQuotaSpecPublishConnectionDetailsTo
 */
export interface ServiceQuotaSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: ServiceQuotaSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: ServiceQuotaSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'ServiceQuotaSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecPublishConnectionDetailsTo(obj: ServiceQuotaSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_ServiceQuotaSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_ServiceQuotaSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema ServiceQuotaSpecWriteConnectionSecretToRef
 */
export interface ServiceQuotaSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema ServiceQuotaSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema ServiceQuotaSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'ServiceQuotaSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecWriteConnectionSecretToRef(obj: ServiceQuotaSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
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
 * @schema ServiceQuotaSpecProviderConfigRefPolicy
 */
export interface ServiceQuotaSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ServiceQuotaSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: ServiceQuotaSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ServiceQuotaSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: ServiceQuotaSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'ServiceQuotaSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecProviderConfigRefPolicy(obj: ServiceQuotaSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ServiceQuotaSpecPublishConnectionDetailsToConfigRef
 */
export interface ServiceQuotaSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'ServiceQuotaSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecPublishConnectionDetailsToConfigRef(obj: ServiceQuotaSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema ServiceQuotaSpecPublishConnectionDetailsToMetadata
 */
export interface ServiceQuotaSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'ServiceQuotaSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecPublishConnectionDetailsToMetadata(obj: ServiceQuotaSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
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
 * @schema ServiceQuotaSpecProviderConfigRefPolicyResolution
 */
export enum ServiceQuotaSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ServiceQuotaSpecProviderConfigRefPolicyResolve
 */
export enum ServiceQuotaSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy(obj: ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum ServiceQuotaSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

