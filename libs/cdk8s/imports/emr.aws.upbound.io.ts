// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * SecurityConfiguration is the Schema for the SecurityConfigurations API. Provides a resource to manage AWS EMR Security Configurations
 *
 * @schema SecurityConfiguration
 */
export class SecurityConfiguration extends ApiObject {
  /**
   * Returns the apiVersion and kind for "SecurityConfiguration"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'emr.aws.upbound.io/v1beta1',
    kind: 'SecurityConfiguration',
  }

  /**
   * Renders a Kubernetes manifest for "SecurityConfiguration".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: SecurityConfigurationProps): any {
    return {
      ...SecurityConfiguration.GVK,
      ...toJson_SecurityConfigurationProps(props),
    };
  }

  /**
   * Defines a "SecurityConfiguration" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: SecurityConfigurationProps) {
    super(scope, id, {
      ...SecurityConfiguration.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...SecurityConfiguration.GVK,
      ...toJson_SecurityConfigurationProps(resolved),
    };
  }
}

/**
 * SecurityConfiguration is the Schema for the SecurityConfigurations API. Provides a resource to manage AWS EMR Security Configurations
 *
 * @schema SecurityConfiguration
 */
export interface SecurityConfigurationProps {
  /**
   * @schema SecurityConfiguration#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * SecurityConfigurationSpec defines the desired state of SecurityConfiguration
   *
   * @schema SecurityConfiguration#spec
   */
  readonly spec: SecurityConfigurationSpec;

}

/**
 * Converts an object of type 'SecurityConfigurationProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationProps(obj: SecurityConfigurationProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_SecurityConfigurationSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * SecurityConfigurationSpec defines the desired state of SecurityConfiguration
 *
 * @schema SecurityConfigurationSpec
 */
export interface SecurityConfigurationSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
   *
   * @schema SecurityConfigurationSpec#deletionPolicy
   */
  readonly deletionPolicy?: SecurityConfigurationSpecDeletionPolicy;

  /**
   * @schema SecurityConfigurationSpec#forProvider
   */
  readonly forProvider: SecurityConfigurationSpecForProvider;

  /**
   * THIS IS A BETA FIELD. It will be honored unless the Management Policies feature flag is disabled. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
   *
   * @schema SecurityConfigurationSpec#initProvider
   */
  readonly initProvider?: SecurityConfigurationSpecInitProvider;

  /**
   * THIS IS A BETA FIELD. It is on by default but can be opted out through a Crossplane feature flag. ManagementPolicies specify the array of actions Crossplane is allowed to take on the managed and external resources. This field is planned to replace the DeletionPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. If both are custom, the DeletionPolicy field will be ignored. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223 and this one: https://github.com/crossplane/crossplane/blob/444267e84783136daa93568b364a5f01228cacbe/design/one-pager-ignore-changes.md
   *
   * @schema SecurityConfigurationSpec#managementPolicies
   */
  readonly managementPolicies?: SecurityConfigurationSpecManagementPolicies[];

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema SecurityConfigurationSpec#providerConfigRef
   */
  readonly providerConfigRef?: SecurityConfigurationSpecProviderConfigRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema SecurityConfigurationSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: SecurityConfigurationSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema SecurityConfigurationSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: SecurityConfigurationSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'SecurityConfigurationSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpec(obj: SecurityConfigurationSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_SecurityConfigurationSpecForProvider(obj.forProvider),
    'initProvider': toJson_SecurityConfigurationSpecInitProvider(obj.initProvider),
    'managementPolicies': obj.managementPolicies?.map(y => y),
    'providerConfigRef': toJson_SecurityConfigurationSpecProviderConfigRef(obj.providerConfigRef),
    'publishConnectionDetailsTo': toJson_SecurityConfigurationSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_SecurityConfigurationSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
 *
 * @schema SecurityConfigurationSpecDeletionPolicy
 */
export enum SecurityConfigurationSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema SecurityConfigurationSpecForProvider
 */
export interface SecurityConfigurationSpecForProvider {
  /**
   * A JSON formatted Security Configuration
   *
   * @schema SecurityConfigurationSpecForProvider#configuration
   */
  readonly configuration?: string;

  /**
   * Region is the region you'd like your resource to be created in.
   *
   * @schema SecurityConfigurationSpecForProvider#region
   */
  readonly region: string;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecForProvider(obj: SecurityConfigurationSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configuration': obj.configuration,
    'region': obj.region,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * THIS IS A BETA FIELD. It will be honored unless the Management Policies feature flag is disabled. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
 *
 * @schema SecurityConfigurationSpecInitProvider
 */
export interface SecurityConfigurationSpecInitProvider {
  /**
   * A JSON formatted Security Configuration
   *
   * @schema SecurityConfigurationSpecInitProvider#configuration
   */
  readonly configuration?: string;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecInitProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecInitProvider(obj: SecurityConfigurationSpecInitProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configuration': obj.configuration,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A ManagementAction represents an action that the Crossplane controllers can take on an external resource.
 *
 * @schema SecurityConfigurationSpecManagementPolicies
 */
export enum SecurityConfigurationSpecManagementPolicies {
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
 * @schema SecurityConfigurationSpecProviderConfigRef
 */
export interface SecurityConfigurationSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema SecurityConfigurationSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema SecurityConfigurationSpecProviderConfigRef#policy
   */
  readonly policy?: SecurityConfigurationSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecProviderConfigRef(obj: SecurityConfigurationSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_SecurityConfigurationSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema SecurityConfigurationSpecPublishConnectionDetailsTo
 */
export interface SecurityConfigurationSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: SecurityConfigurationSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: SecurityConfigurationSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecPublishConnectionDetailsTo(obj: SecurityConfigurationSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_SecurityConfigurationSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_SecurityConfigurationSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema SecurityConfigurationSpecWriteConnectionSecretToRef
 */
export interface SecurityConfigurationSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema SecurityConfigurationSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema SecurityConfigurationSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecWriteConnectionSecretToRef(obj: SecurityConfigurationSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
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
 * @schema SecurityConfigurationSpecProviderConfigRefPolicy
 */
export interface SecurityConfigurationSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema SecurityConfigurationSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: SecurityConfigurationSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema SecurityConfigurationSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: SecurityConfigurationSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecProviderConfigRefPolicy(obj: SecurityConfigurationSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema SecurityConfigurationSpecPublishConnectionDetailsToConfigRef
 */
export interface SecurityConfigurationSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecPublishConnectionDetailsToConfigRef(obj: SecurityConfigurationSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema SecurityConfigurationSpecPublishConnectionDetailsToMetadata
 */
export interface SecurityConfigurationSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecPublishConnectionDetailsToMetadata(obj: SecurityConfigurationSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
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
 * @schema SecurityConfigurationSpecProviderConfigRefPolicyResolution
 */
export enum SecurityConfigurationSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema SecurityConfigurationSpecProviderConfigRefPolicyResolve
 */
export enum SecurityConfigurationSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy(obj: SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum SecurityConfigurationSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

