// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * Contact is the Schema for the Contacts API. A contact that will receive notifications from Google Cloud.
 *
 * @schema Contact
 */
export class Contact extends ApiObject {
  /**
   * Returns the apiVersion and kind for "Contact"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'essentialcontacts.gcp.upbound.io/v1beta1',
    kind: 'Contact',
  }

  /**
   * Renders a Kubernetes manifest for "Contact".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: ContactProps): any {
    return {
      ...Contact.GVK,
      ...toJson_ContactProps(props),
    };
  }

  /**
   * Defines a "Contact" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: ContactProps) {
    super(scope, id, {
      ...Contact.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...Contact.GVK,
      ...toJson_ContactProps(resolved),
    };
  }
}

/**
 * Contact is the Schema for the Contacts API. A contact that will receive notifications from Google Cloud.
 *
 * @schema Contact
 */
export interface ContactProps {
  /**
   * @schema Contact#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * ContactSpec defines the desired state of Contact
   *
   * @schema Contact#spec
   */
  readonly spec: ContactSpec;

}

/**
 * Converts an object of type 'ContactProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactProps(obj: ContactProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_ContactSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ContactSpec defines the desired state of Contact
 *
 * @schema ContactSpec
 */
export interface ContactSpec {
  /**
   * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
   *
   * @schema ContactSpec#deletionPolicy
   */
  readonly deletionPolicy?: ContactSpecDeletionPolicy;

  /**
   * @schema ContactSpec#forProvider
   */
  readonly forProvider: ContactSpecForProvider;

  /**
   * THIS IS AN ALPHA FIELD. Do not use it in production. It is not honored unless the relevant Crossplane feature flag is enabled, and may be changed or removed without notice. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
   *
   * @schema ContactSpec#initProvider
   */
  readonly initProvider?: ContactSpecInitProvider;

  /**
   * THIS IS AN ALPHA FIELD. Do not use it in production. It is not honored unless the relevant Crossplane feature flag is enabled, and may be changed or removed without notice. ManagementPolicies specify the array of actions Crossplane is allowed to take on the managed and external resources. This field is planned to replace the DeletionPolicy field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. If both are custom, the DeletionPolicy field will be ignored. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223 and this one: https://github.com/crossplane/crossplane/blob/444267e84783136daa93568b364a5f01228cacbe/design/one-pager-ignore-changes.md
   *
   * @schema ContactSpec#managementPolicies
   */
  readonly managementPolicies?: ContactSpecManagementPolicies[];

  /**
   * ProviderConfigReference specifies how the provider that will be used to create, observe, update, and delete this managed resource should be configured.
   *
   * @schema ContactSpec#providerConfigRef
   */
  readonly providerConfigRef?: ContactSpecProviderConfigRef;

  /**
   * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
   *
   * @schema ContactSpec#publishConnectionDetailsTo
   */
  readonly publishConnectionDetailsTo?: ContactSpecPublishConnectionDetailsTo;

  /**
   * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
   *
   * @schema ContactSpec#writeConnectionSecretToRef
   */
  readonly writeConnectionSecretToRef?: ContactSpecWriteConnectionSecretToRef;

}

/**
 * Converts an object of type 'ContactSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpec(obj: ContactSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'deletionPolicy': obj.deletionPolicy,
    'forProvider': toJson_ContactSpecForProvider(obj.forProvider),
    'initProvider': toJson_ContactSpecInitProvider(obj.initProvider),
    'managementPolicies': obj.managementPolicies?.map(y => y),
    'providerConfigRef': toJson_ContactSpecProviderConfigRef(obj.providerConfigRef),
    'publishConnectionDetailsTo': toJson_ContactSpecPublishConnectionDetailsTo(obj.publishConnectionDetailsTo),
    'writeConnectionSecretToRef': toJson_ContactSpecWriteConnectionSecretToRef(obj.writeConnectionSecretToRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * DeletionPolicy specifies what will happen to the underlying external when this managed resource is deleted - either "Delete" or "Orphan" the external resource. This field is planned to be deprecated in favor of the ManagementPolicies field in a future release. Currently, both could be set independently and non-default values would be honored if the feature flag is enabled. See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
 *
 * @schema ContactSpecDeletionPolicy
 */
export enum ContactSpecDeletionPolicy {
  /** Orphan */
  ORPHAN = "Orphan",
  /** Delete */
  DELETE = "Delete",
}

/**
 * @schema ContactSpecForProvider
 */
export interface ContactSpecForProvider {
  /**
   * The email address to send notifications to. This does not need to be a Google account.
   *
   * @schema ContactSpecForProvider#email
   */
  readonly email?: string;

  /**
   * The preferred language for notifications, as a ISO 639-1 language code. See Supported languages for a list of supported languages.
   *
   * @schema ContactSpecForProvider#languageTag
   */
  readonly languageTag?: string;

  /**
   * The categories of notifications that the contact will receive communications for.
   *
   * @schema ContactSpecForProvider#notificationCategorySubscriptions
   */
  readonly notificationCategorySubscriptions?: string[];

  /**
   * The resource to save this contact for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   *
   * @schema ContactSpecForProvider#parent
   */
  readonly parent?: string;

}

/**
 * Converts an object of type 'ContactSpecForProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecForProvider(obj: ContactSpecForProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'email': obj.email,
    'languageTag': obj.languageTag,
    'notificationCategorySubscriptions': obj.notificationCategorySubscriptions?.map(y => y),
    'parent': obj.parent,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * THIS IS AN ALPHA FIELD. Do not use it in production. It is not honored unless the relevant Crossplane feature flag is enabled, and may be changed or removed without notice. InitProvider holds the same fields as ForProvider, with the exception of Identifier and other resource reference fields. The fields that are in InitProvider are merged into ForProvider when the resource is created. The same fields are also added to the terraform ignore_changes hook, to avoid updating them after creation. This is useful for fields that are required on creation, but we do not desire to update them after creation, for example because of an external controller is managing them, like an autoscaler.
 *
 * @schema ContactSpecInitProvider
 */
export interface ContactSpecInitProvider {
  /**
   * The email address to send notifications to. This does not need to be a Google account.
   *
   * @schema ContactSpecInitProvider#email
   */
  readonly email?: string;

  /**
   * The preferred language for notifications, as a ISO 639-1 language code. See Supported languages for a list of supported languages.
   *
   * @schema ContactSpecInitProvider#languageTag
   */
  readonly languageTag?: string;

  /**
   * The categories of notifications that the contact will receive communications for.
   *
   * @schema ContactSpecInitProvider#notificationCategorySubscriptions
   */
  readonly notificationCategorySubscriptions?: string[];

  /**
   * The resource to save this contact for. Format: organizations/{organization_id}, folders/{folder_id} or projects/{project_id}
   *
   * @schema ContactSpecInitProvider#parent
   */
  readonly parent?: string;

}

/**
 * Converts an object of type 'ContactSpecInitProvider' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecInitProvider(obj: ContactSpecInitProvider | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'email': obj.email,
    'languageTag': obj.languageTag,
    'notificationCategorySubscriptions': obj.notificationCategorySubscriptions?.map(y => y),
    'parent': obj.parent,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A ManagementAction represents an action that the Crossplane controllers can take on an external resource.
 *
 * @schema ContactSpecManagementPolicies
 */
export enum ContactSpecManagementPolicies {
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
 * @schema ContactSpecProviderConfigRef
 */
export interface ContactSpecProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema ContactSpecProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ContactSpecProviderConfigRef#policy
   */
  readonly policy?: ContactSpecProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'ContactSpecProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecProviderConfigRef(obj: ContactSpecProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ContactSpecProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PublishConnectionDetailsTo specifies the connection secret config which contains a name, metadata and a reference to secret store config to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource.
 *
 * @schema ContactSpecPublishConnectionDetailsTo
 */
export interface ContactSpecPublishConnectionDetailsTo {
  /**
   * SecretStoreConfigRef specifies which secret store config should be used for this ConnectionSecret.
   *
   * @schema ContactSpecPublishConnectionDetailsTo#configRef
   */
  readonly configRef?: ContactSpecPublishConnectionDetailsToConfigRef;

  /**
   * Metadata is the metadata for connection secret.
   *
   * @schema ContactSpecPublishConnectionDetailsTo#metadata
   */
  readonly metadata?: ContactSpecPublishConnectionDetailsToMetadata;

  /**
   * Name is the name of the connection secret.
   *
   * @schema ContactSpecPublishConnectionDetailsTo#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'ContactSpecPublishConnectionDetailsTo' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecPublishConnectionDetailsTo(obj: ContactSpecPublishConnectionDetailsTo | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_ContactSpecPublishConnectionDetailsToConfigRef(obj.configRef),
    'metadata': toJson_ContactSpecPublishConnectionDetailsToMetadata(obj.metadata),
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * WriteConnectionSecretToReference specifies the namespace and name of a Secret to which any connection details for this managed resource should be written. Connection details frequently include the endpoint, username, and password required to connect to the managed resource. This field is planned to be replaced in a future release in favor of PublishConnectionDetailsTo. Currently, both could be set independently and connection details would be published to both without affecting each other.
 *
 * @schema ContactSpecWriteConnectionSecretToRef
 */
export interface ContactSpecWriteConnectionSecretToRef {
  /**
   * Name of the secret.
   *
   * @schema ContactSpecWriteConnectionSecretToRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema ContactSpecWriteConnectionSecretToRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'ContactSpecWriteConnectionSecretToRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecWriteConnectionSecretToRef(obj: ContactSpecWriteConnectionSecretToRef | undefined): Record<string, any> | undefined {
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
 * @schema ContactSpecProviderConfigRefPolicy
 */
export interface ContactSpecProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ContactSpecProviderConfigRefPolicy#resolution
   */
  readonly resolution?: ContactSpecProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ContactSpecProviderConfigRefPolicy#resolve
   */
  readonly resolve?: ContactSpecProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'ContactSpecProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecProviderConfigRefPolicy(obj: ContactSpecProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ContactSpecPublishConnectionDetailsToConfigRef
 */
export interface ContactSpecPublishConnectionDetailsToConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema ContactSpecPublishConnectionDetailsToConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ContactSpecPublishConnectionDetailsToConfigRef#policy
   */
  readonly policy?: ContactSpecPublishConnectionDetailsToConfigRefPolicy;

}

/**
 * Converts an object of type 'ContactSpecPublishConnectionDetailsToConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecPublishConnectionDetailsToConfigRef(obj: ContactSpecPublishConnectionDetailsToConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ContactSpecPublishConnectionDetailsToConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Metadata is the metadata for connection secret.
 *
 * @schema ContactSpecPublishConnectionDetailsToMetadata
 */
export interface ContactSpecPublishConnectionDetailsToMetadata {
  /**
   * Annotations are the annotations to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.annotations". - It is up to Secret Store implementation for others store types.
   *
   * @schema ContactSpecPublishConnectionDetailsToMetadata#annotations
   */
  readonly annotations?: { [key: string]: string };

  /**
   * Labels are the labels/tags to be added to connection secret. - For Kubernetes secrets, this will be used as "metadata.labels". - It is up to Secret Store implementation for others store types.
   *
   * @schema ContactSpecPublishConnectionDetailsToMetadata#labels
   */
  readonly labels?: { [key: string]: string };

  /**
   * Type is the SecretType for the connection secret. - Only valid for Kubernetes Secret Stores.
   *
   * @schema ContactSpecPublishConnectionDetailsToMetadata#type
   */
  readonly type?: string;

}

/**
 * Converts an object of type 'ContactSpecPublishConnectionDetailsToMetadata' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecPublishConnectionDetailsToMetadata(obj: ContactSpecPublishConnectionDetailsToMetadata | undefined): Record<string, any> | undefined {
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
 * @schema ContactSpecProviderConfigRefPolicyResolution
 */
export enum ContactSpecProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ContactSpecProviderConfigRefPolicyResolve
 */
export enum ContactSpecProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

/**
 * Policies for referencing.
 *
 * @schema ContactSpecPublishConnectionDetailsToConfigRefPolicy
 */
export interface ContactSpecPublishConnectionDetailsToConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ContactSpecPublishConnectionDetailsToConfigRefPolicy#resolution
   */
  readonly resolution?: ContactSpecPublishConnectionDetailsToConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ContactSpecPublishConnectionDetailsToConfigRefPolicy#resolve
   */
  readonly resolve?: ContactSpecPublishConnectionDetailsToConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'ContactSpecPublishConnectionDetailsToConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ContactSpecPublishConnectionDetailsToConfigRefPolicy(obj: ContactSpecPublishConnectionDetailsToConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ContactSpecPublishConnectionDetailsToConfigRefPolicyResolution
 */
export enum ContactSpecPublishConnectionDetailsToConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ContactSpecPublishConnectionDetailsToConfigRefPolicyResolve
 */
export enum ContactSpecPublishConnectionDetailsToConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}

