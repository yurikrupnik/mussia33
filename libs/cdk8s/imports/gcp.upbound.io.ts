// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * A ProviderConfig configures a GCP provider.
 *
 * @schema ProviderConfig
 */
export class ProviderConfig extends ApiObject {
  /**
   * Returns the apiVersion and kind for "ProviderConfig"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'gcp.upbound.io/v1beta1',
    kind: 'ProviderConfig',
  }

  /**
   * Renders a Kubernetes manifest for "ProviderConfig".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: ProviderConfigProps): any {
    return {
      ...ProviderConfig.GVK,
      ...toJson_ProviderConfigProps(props),
    };
  }

  /**
   * Defines a "ProviderConfig" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: ProviderConfigProps) {
    super(scope, id, {
      ...ProviderConfig.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...ProviderConfig.GVK,
      ...toJson_ProviderConfigProps(resolved),
    };
  }
}

/**
 * A ProviderConfig configures a GCP provider.
 *
 * @schema ProviderConfig
 */
export interface ProviderConfigProps {
  /**
   * @schema ProviderConfig#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * A ProviderConfigSpec defines the desired state of a ProviderConfig.
   *
   * @schema ProviderConfig#spec
   */
  readonly spec: ProviderConfigSpec;

}

/**
 * Converts an object of type 'ProviderConfigProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigProps(obj: ProviderConfigProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_ProviderConfigSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A ProviderConfigSpec defines the desired state of a ProviderConfig.
 *
 * @schema ProviderConfigSpec
 */
export interface ProviderConfigSpec {
  /**
   * Credentials required to authenticate to this provider.
   *
   * @schema ProviderConfigSpec#credentials
   */
  readonly credentials: ProviderConfigSpecCredentials;

  /**
   * ProjectID is the project name (not numerical ID) of this GCP ProviderConfig.
   *
   * @schema ProviderConfigSpec#projectID
   */
  readonly projectId: string;

}

/**
 * Converts an object of type 'ProviderConfigSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigSpec(obj: ProviderConfigSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'credentials': toJson_ProviderConfigSpecCredentials(obj.credentials),
    'projectID': obj.projectId,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Credentials required to authenticate to this provider.
 *
 * @schema ProviderConfigSpecCredentials
 */
export interface ProviderConfigSpecCredentials {
  /**
   * Env is a reference to an environment variable that contains credentials that must be used to connect to the provider.
   *
   * @schema ProviderConfigSpecCredentials#env
   */
  readonly env?: ProviderConfigSpecCredentialsEnv;

  /**
   * Fs is a reference to a filesystem location that contains credentials that must be used to connect to the provider.
   *
   * @schema ProviderConfigSpecCredentials#fs
   */
  readonly fs?: ProviderConfigSpecCredentialsFs;

  /**
   * Use GCP service account impersonation for authentication.
   *
   * @schema ProviderConfigSpecCredentials#impersonateServiceAccount
   */
  readonly impersonateServiceAccount?: ProviderConfigSpecCredentialsImpersonateServiceAccount;

  /**
   * A SecretRef is a reference to a secret key that contains the credentials that must be used to connect to the provider.
   *
   * @schema ProviderConfigSpecCredentials#secretRef
   */
  readonly secretRef?: ProviderConfigSpecCredentialsSecretRef;

  /**
   * Source of the provider credentials.
   *
   * @schema ProviderConfigSpecCredentials#source
   */
  readonly source: ProviderConfigSpecCredentialsSource;

  /**
   * Upbound defines the options for authenticating using Upbound as an identity provider.
   *
   * @schema ProviderConfigSpecCredentials#upbound
   */
  readonly upbound?: ProviderConfigSpecCredentialsUpbound;

}

/**
 * Converts an object of type 'ProviderConfigSpecCredentials' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigSpecCredentials(obj: ProviderConfigSpecCredentials | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'env': toJson_ProviderConfigSpecCredentialsEnv(obj.env),
    'fs': toJson_ProviderConfigSpecCredentialsFs(obj.fs),
    'impersonateServiceAccount': toJson_ProviderConfigSpecCredentialsImpersonateServiceAccount(obj.impersonateServiceAccount),
    'secretRef': toJson_ProviderConfigSpecCredentialsSecretRef(obj.secretRef),
    'source': obj.source,
    'upbound': toJson_ProviderConfigSpecCredentialsUpbound(obj.upbound),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Env is a reference to an environment variable that contains credentials that must be used to connect to the provider.
 *
 * @schema ProviderConfigSpecCredentialsEnv
 */
export interface ProviderConfigSpecCredentialsEnv {
  /**
   * Name is the name of an environment variable.
   *
   * @schema ProviderConfigSpecCredentialsEnv#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'ProviderConfigSpecCredentialsEnv' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigSpecCredentialsEnv(obj: ProviderConfigSpecCredentialsEnv | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Fs is a reference to a filesystem location that contains credentials that must be used to connect to the provider.
 *
 * @schema ProviderConfigSpecCredentialsFs
 */
export interface ProviderConfigSpecCredentialsFs {
  /**
   * Path is a filesystem path.
   *
   * @schema ProviderConfigSpecCredentialsFs#path
   */
  readonly path: string;

}

/**
 * Converts an object of type 'ProviderConfigSpecCredentialsFs' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigSpecCredentialsFs(obj: ProviderConfigSpecCredentialsFs | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'path': obj.path,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Use GCP service account impersonation for authentication.
 *
 * @schema ProviderConfigSpecCredentialsImpersonateServiceAccount
 */
export interface ProviderConfigSpecCredentialsImpersonateServiceAccount {
  /**
   * GCP service account email address
   *
   * @schema ProviderConfigSpecCredentialsImpersonateServiceAccount#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'ProviderConfigSpecCredentialsImpersonateServiceAccount' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigSpecCredentialsImpersonateServiceAccount(obj: ProviderConfigSpecCredentialsImpersonateServiceAccount | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A SecretRef is a reference to a secret key that contains the credentials that must be used to connect to the provider.
 *
 * @schema ProviderConfigSpecCredentialsSecretRef
 */
export interface ProviderConfigSpecCredentialsSecretRef {
  /**
   * The key to select.
   *
   * @schema ProviderConfigSpecCredentialsSecretRef#key
   */
  readonly key: string;

  /**
   * Name of the secret.
   *
   * @schema ProviderConfigSpecCredentialsSecretRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema ProviderConfigSpecCredentialsSecretRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'ProviderConfigSpecCredentialsSecretRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigSpecCredentialsSecretRef(obj: ProviderConfigSpecCredentialsSecretRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'key': obj.key,
    'name': obj.name,
    'namespace': obj.namespace,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Source of the provider credentials.
 *
 * @schema ProviderConfigSpecCredentialsSource
 */
export enum ProviderConfigSpecCredentialsSource {
  /** None */
  NONE = "None",
  /** Secret */
  SECRET = "Secret",
  /** AccessToken */
  ACCESS_TOKEN = "AccessToken",
  /** ImpersonateServiceAccount */
  IMPERSONATE_SERVICE_ACCOUNT = "ImpersonateServiceAccount",
  /** InjectedIdentity */
  INJECTED_IDENTITY = "InjectedIdentity",
  /** Environment */
  ENVIRONMENT = "Environment",
  /** Filesystem */
  FILESYSTEM = "Filesystem",
  /** Upbound */
  UPBOUND = "Upbound",
}

/**
 * Upbound defines the options for authenticating using Upbound as an identity provider.
 *
 * @schema ProviderConfigSpecCredentialsUpbound
 */
export interface ProviderConfigSpecCredentialsUpbound {
  /**
   * Federation is the configuration for federated identity.
   *
   * @schema ProviderConfigSpecCredentialsUpbound#federation
   */
  readonly federation?: ProviderConfigSpecCredentialsUpboundFederation;

}

/**
 * Converts an object of type 'ProviderConfigSpecCredentialsUpbound' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigSpecCredentialsUpbound(obj: ProviderConfigSpecCredentialsUpbound | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'federation': toJson_ProviderConfigSpecCredentialsUpboundFederation(obj.federation),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Federation is the configuration for federated identity.
 *
 * @schema ProviderConfigSpecCredentialsUpboundFederation
 */
export interface ProviderConfigSpecCredentialsUpboundFederation {
  /**
   * ProviderID is the fully-qualified identifier for the identity provider on GCP. The format is `projects/<project-id>/locations/global/workloadIdentityPools/<identity-pool>/providers/<identity-provider>`.
   *
   * @schema ProviderConfigSpecCredentialsUpboundFederation#providerID
   */
  readonly providerId: string;

  /**
   * ServiceAccount is the email address for the attached service account.
   *
   * @schema ProviderConfigSpecCredentialsUpboundFederation#serviceAccount
   */
  readonly serviceAccount: string;

}

/**
 * Converts an object of type 'ProviderConfigSpecCredentialsUpboundFederation' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigSpecCredentialsUpboundFederation(obj: ProviderConfigSpecCredentialsUpboundFederation | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'providerID': obj.providerId,
    'serviceAccount': obj.serviceAccount,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */


/**
 * A ProviderConfigUsage indicates that a resource is using a ProviderConfig.
 *
 * @schema ProviderConfigUsage
 */
export class ProviderConfigUsage extends ApiObject {
  /**
   * Returns the apiVersion and kind for "ProviderConfigUsage"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'gcp.upbound.io/v1beta1',
    kind: 'ProviderConfigUsage',
  }

  /**
   * Renders a Kubernetes manifest for "ProviderConfigUsage".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: ProviderConfigUsageProps): any {
    return {
      ...ProviderConfigUsage.GVK,
      ...toJson_ProviderConfigUsageProps(props),
    };
  }

  /**
   * Defines a "ProviderConfigUsage" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: ProviderConfigUsageProps) {
    super(scope, id, {
      ...ProviderConfigUsage.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...ProviderConfigUsage.GVK,
      ...toJson_ProviderConfigUsageProps(resolved),
    };
  }
}

/**
 * A ProviderConfigUsage indicates that a resource is using a ProviderConfig.
 *
 * @schema ProviderConfigUsage
 */
export interface ProviderConfigUsageProps {
  /**
   * @schema ProviderConfigUsage#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * ProviderConfigReference to the provider config being used.
   *
   * @schema ProviderConfigUsage#providerConfigRef
   */
  readonly providerConfigRef: ProviderConfigUsageProviderConfigRef;

  /**
   * ResourceReference to the managed resource using the provider config.
   *
   * @schema ProviderConfigUsage#resourceRef
   */
  readonly resourceRef: ProviderConfigUsageResourceRef;

}

/**
 * Converts an object of type 'ProviderConfigUsageProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigUsageProps(obj: ProviderConfigUsageProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'providerConfigRef': toJson_ProviderConfigUsageProviderConfigRef(obj.providerConfigRef),
    'resourceRef': toJson_ProviderConfigUsageResourceRef(obj.resourceRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ProviderConfigReference to the provider config being used.
 *
 * @schema ProviderConfigUsageProviderConfigRef
 */
export interface ProviderConfigUsageProviderConfigRef {
  /**
   * Name of the referenced object.
   *
   * @schema ProviderConfigUsageProviderConfigRef#name
   */
  readonly name: string;

  /**
   * Policies for referencing.
   *
   * @schema ProviderConfigUsageProviderConfigRef#policy
   */
  readonly policy?: ProviderConfigUsageProviderConfigRefPolicy;

}

/**
 * Converts an object of type 'ProviderConfigUsageProviderConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigUsageProviderConfigRef(obj: ProviderConfigUsageProviderConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
    'policy': toJson_ProviderConfigUsageProviderConfigRefPolicy(obj.policy),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ResourceReference to the managed resource using the provider config.
 *
 * @schema ProviderConfigUsageResourceRef
 */
export interface ProviderConfigUsageResourceRef {
  /**
   * APIVersion of the referenced object.
   *
   * @schema ProviderConfigUsageResourceRef#apiVersion
   */
  readonly apiVersion: string;

  /**
   * Kind of the referenced object.
   *
   * @schema ProviderConfigUsageResourceRef#kind
   */
  readonly kind: string;

  /**
   * Name of the referenced object.
   *
   * @schema ProviderConfigUsageResourceRef#name
   */
  readonly name: string;

  /**
   * UID of the referenced object.
   *
   * @schema ProviderConfigUsageResourceRef#uid
   */
  readonly uid?: string;

}

/**
 * Converts an object of type 'ProviderConfigUsageResourceRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigUsageResourceRef(obj: ProviderConfigUsageResourceRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'apiVersion': obj.apiVersion,
    'kind': obj.kind,
    'name': obj.name,
    'uid': obj.uid,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Policies for referencing.
 *
 * @schema ProviderConfigUsageProviderConfigRefPolicy
 */
export interface ProviderConfigUsageProviderConfigRefPolicy {
  /**
   * Resolution specifies whether resolution of this reference is required. The default is 'Required', which means the reconcile will fail if the reference cannot be resolved. 'Optional' means this reference will be a no-op if it cannot be resolved.
   *
   * @schema ProviderConfigUsageProviderConfigRefPolicy#resolution
   */
  readonly resolution?: ProviderConfigUsageProviderConfigRefPolicyResolution;

  /**
   * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
   *
   * @schema ProviderConfigUsageProviderConfigRefPolicy#resolve
   */
  readonly resolve?: ProviderConfigUsageProviderConfigRefPolicyResolve;

}

/**
 * Converts an object of type 'ProviderConfigUsageProviderConfigRefPolicy' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_ProviderConfigUsageProviderConfigRefPolicy(obj: ProviderConfigUsageProviderConfigRefPolicy | undefined): Record<string, any> | undefined {
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
 * @schema ProviderConfigUsageProviderConfigRefPolicyResolution
 */
export enum ProviderConfigUsageProviderConfigRefPolicyResolution {
  /** Required */
  REQUIRED = "Required",
  /** Optional */
  OPTIONAL = "Optional",
}

/**
 * Resolve specifies when this reference should be resolved. The default is 'IfNotPresent', which will attempt to resolve the reference only when the corresponding field is not present. Use 'Always' to resolve the reference on every reconcile.
 *
 * @schema ProviderConfigUsageProviderConfigRefPolicyResolve
 */
export enum ProviderConfigUsageProviderConfigRefPolicyResolve {
  /** Always */
  ALWAYS = "Always",
  /** IfNotPresent */
  IF_NOT_PRESENT = "IfNotPresent",
}


/**
 * A StoreConfig configures how GCP controller should store connection details.
 *
 * @schema StoreConfig
 */
export class StoreConfig extends ApiObject {
  /**
   * Returns the apiVersion and kind for "StoreConfig"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'gcp.upbound.io/v1alpha1',
    kind: 'StoreConfig',
  }

  /**
   * Renders a Kubernetes manifest for "StoreConfig".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: StoreConfigProps): any {
    return {
      ...StoreConfig.GVK,
      ...toJson_StoreConfigProps(props),
    };
  }

  /**
   * Defines a "StoreConfig" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: StoreConfigProps) {
    super(scope, id, {
      ...StoreConfig.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...StoreConfig.GVK,
      ...toJson_StoreConfigProps(resolved),
    };
  }
}

/**
 * A StoreConfig configures how GCP controller should store connection details.
 *
 * @schema StoreConfig
 */
export interface StoreConfigProps {
  /**
   * @schema StoreConfig#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * A StoreConfigSpec defines the desired state of a ProviderConfig.
   *
   * @schema StoreConfig#spec
   */
  readonly spec: StoreConfigSpec;

}

/**
 * Converts an object of type 'StoreConfigProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigProps(obj: StoreConfigProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_StoreConfigSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A StoreConfigSpec defines the desired state of a ProviderConfig.
 *
 * @schema StoreConfigSpec
 */
export interface StoreConfigSpec {
  /**
   * DefaultScope used for scoping secrets for "cluster-scoped" resources. If store type is "Kubernetes", this would mean the default namespace to store connection secrets for cluster scoped resources. In case of "Vault", this would be used as the default parent path. Typically, should be set as Crossplane installation namespace.
   *
   * @schema StoreConfigSpec#defaultScope
   */
  readonly defaultScope: string;

  /**
   * Kubernetes configures a Kubernetes secret store. If the "type" is "Kubernetes" but no config provided, in cluster config will be used.
   *
   * @schema StoreConfigSpec#kubernetes
   */
  readonly kubernetes?: StoreConfigSpecKubernetes;

  /**
   * Plugin configures External secret store as a plugin.
   *
   * @schema StoreConfigSpec#plugin
   */
  readonly plugin?: StoreConfigSpecPlugin;

  /**
   * Type configures which secret store to be used. Only the configuration block for this store will be used and others will be ignored if provided. Default is Kubernetes.
   *
   * @default Kubernetes.
   * @schema StoreConfigSpec#type
   */
  readonly type?: StoreConfigSpecType;

}

/**
 * Converts an object of type 'StoreConfigSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigSpec(obj: StoreConfigSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'defaultScope': obj.defaultScope,
    'kubernetes': toJson_StoreConfigSpecKubernetes(obj.kubernetes),
    'plugin': toJson_StoreConfigSpecPlugin(obj.plugin),
    'type': obj.type,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Kubernetes configures a Kubernetes secret store. If the "type" is "Kubernetes" but no config provided, in cluster config will be used.
 *
 * @schema StoreConfigSpecKubernetes
 */
export interface StoreConfigSpecKubernetes {
  /**
   * Credentials used to connect to the Kubernetes API.
   *
   * @schema StoreConfigSpecKubernetes#auth
   */
  readonly auth: StoreConfigSpecKubernetesAuth;

}

/**
 * Converts an object of type 'StoreConfigSpecKubernetes' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigSpecKubernetes(obj: StoreConfigSpecKubernetes | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'auth': toJson_StoreConfigSpecKubernetesAuth(obj.auth),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Plugin configures External secret store as a plugin.
 *
 * @schema StoreConfigSpecPlugin
 */
export interface StoreConfigSpecPlugin {
  /**
   * ConfigRef contains store config reference info.
   *
   * @schema StoreConfigSpecPlugin#configRef
   */
  readonly configRef?: StoreConfigSpecPluginConfigRef;

  /**
   * Endpoint is the endpoint of the gRPC server.
   *
   * @schema StoreConfigSpecPlugin#endpoint
   */
  readonly endpoint?: string;

}

/**
 * Converts an object of type 'StoreConfigSpecPlugin' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigSpecPlugin(obj: StoreConfigSpecPlugin | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'configRef': toJson_StoreConfigSpecPluginConfigRef(obj.configRef),
    'endpoint': obj.endpoint,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Type configures which secret store to be used. Only the configuration block for this store will be used and others will be ignored if provided. Default is Kubernetes.
 *
 * @default Kubernetes.
 * @schema StoreConfigSpecType
 */
export enum StoreConfigSpecType {
  /** Kubernetes */
  KUBERNETES = "Kubernetes",
  /** Vault */
  VAULT = "Vault",
  /** Plugin */
  PLUGIN = "Plugin",
}

/**
 * Credentials used to connect to the Kubernetes API.
 *
 * @schema StoreConfigSpecKubernetesAuth
 */
export interface StoreConfigSpecKubernetesAuth {
  /**
   * Env is a reference to an environment variable that contains credentials that must be used to connect to the provider.
   *
   * @schema StoreConfigSpecKubernetesAuth#env
   */
  readonly env?: StoreConfigSpecKubernetesAuthEnv;

  /**
   * Fs is a reference to a filesystem location that contains credentials that must be used to connect to the provider.
   *
   * @schema StoreConfigSpecKubernetesAuth#fs
   */
  readonly fs?: StoreConfigSpecKubernetesAuthFs;

  /**
   * A SecretRef is a reference to a secret key that contains the credentials that must be used to connect to the provider.
   *
   * @schema StoreConfigSpecKubernetesAuth#secretRef
   */
  readonly secretRef?: StoreConfigSpecKubernetesAuthSecretRef;

  /**
   * Source of the credentials.
   *
   * @schema StoreConfigSpecKubernetesAuth#source
   */
  readonly source: StoreConfigSpecKubernetesAuthSource;

}

/**
 * Converts an object of type 'StoreConfigSpecKubernetesAuth' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigSpecKubernetesAuth(obj: StoreConfigSpecKubernetesAuth | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'env': toJson_StoreConfigSpecKubernetesAuthEnv(obj.env),
    'fs': toJson_StoreConfigSpecKubernetesAuthFs(obj.fs),
    'secretRef': toJson_StoreConfigSpecKubernetesAuthSecretRef(obj.secretRef),
    'source': obj.source,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * ConfigRef contains store config reference info.
 *
 * @schema StoreConfigSpecPluginConfigRef
 */
export interface StoreConfigSpecPluginConfigRef {
  /**
   * APIVersion of the referenced config.
   *
   * @schema StoreConfigSpecPluginConfigRef#apiVersion
   */
  readonly apiVersion: string;

  /**
   * Kind of the referenced config.
   *
   * @schema StoreConfigSpecPluginConfigRef#kind
   */
  readonly kind: string;

  /**
   * Name of the referenced config.
   *
   * @schema StoreConfigSpecPluginConfigRef#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'StoreConfigSpecPluginConfigRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigSpecPluginConfigRef(obj: StoreConfigSpecPluginConfigRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'apiVersion': obj.apiVersion,
    'kind': obj.kind,
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Env is a reference to an environment variable that contains credentials that must be used to connect to the provider.
 *
 * @schema StoreConfigSpecKubernetesAuthEnv
 */
export interface StoreConfigSpecKubernetesAuthEnv {
  /**
   * Name is the name of an environment variable.
   *
   * @schema StoreConfigSpecKubernetesAuthEnv#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'StoreConfigSpecKubernetesAuthEnv' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigSpecKubernetesAuthEnv(obj: StoreConfigSpecKubernetesAuthEnv | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Fs is a reference to a filesystem location that contains credentials that must be used to connect to the provider.
 *
 * @schema StoreConfigSpecKubernetesAuthFs
 */
export interface StoreConfigSpecKubernetesAuthFs {
  /**
   * Path is a filesystem path.
   *
   * @schema StoreConfigSpecKubernetesAuthFs#path
   */
  readonly path: string;

}

/**
 * Converts an object of type 'StoreConfigSpecKubernetesAuthFs' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigSpecKubernetesAuthFs(obj: StoreConfigSpecKubernetesAuthFs | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'path': obj.path,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * A SecretRef is a reference to a secret key that contains the credentials that must be used to connect to the provider.
 *
 * @schema StoreConfigSpecKubernetesAuthSecretRef
 */
export interface StoreConfigSpecKubernetesAuthSecretRef {
  /**
   * The key to select.
   *
   * @schema StoreConfigSpecKubernetesAuthSecretRef#key
   */
  readonly key: string;

  /**
   * Name of the secret.
   *
   * @schema StoreConfigSpecKubernetesAuthSecretRef#name
   */
  readonly name: string;

  /**
   * Namespace of the secret.
   *
   * @schema StoreConfigSpecKubernetesAuthSecretRef#namespace
   */
  readonly namespace: string;

}

/**
 * Converts an object of type 'StoreConfigSpecKubernetesAuthSecretRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_StoreConfigSpecKubernetesAuthSecretRef(obj: StoreConfigSpecKubernetesAuthSecretRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'key': obj.key,
    'name': obj.name,
    'namespace': obj.namespace,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Source of the credentials.
 *
 * @schema StoreConfigSpecKubernetesAuthSource
 */
export enum StoreConfigSpecKubernetesAuthSource {
  /** None */
  NONE = "None",
  /** Secret */
  SECRET = "Secret",
  /** Environment */
  ENVIRONMENT = "Environment",
  /** Filesystem */
  FILESYSTEM = "Filesystem",
}

