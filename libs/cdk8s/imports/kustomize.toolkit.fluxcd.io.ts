// generated by cdk8s
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';


/**
 * Kustomization is the Schema for the kustomizations API.
 *
 * @schema Kustomization
 */
export class Kustomization extends ApiObject {
  /**
   * Returns the apiVersion and kind for "Kustomization"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'kustomize.toolkit.fluxcd.io/v1beta1',
    kind: 'Kustomization',
  }

  /**
   * Renders a Kubernetes manifest for "Kustomization".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: KustomizationProps = {}): any {
    return {
      ...Kustomization.GVK,
      ...toJson_KustomizationProps(props),
    };
  }

  /**
   * Defines a "Kustomization" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: KustomizationProps = {}) {
    super(scope, id, {
      ...Kustomization.GVK,
      ...props,
    });
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): any {
    const resolved = super.toJson();

    return {
      ...Kustomization.GVK,
      ...toJson_KustomizationProps(resolved),
    };
  }
}

/**
 * Kustomization is the Schema for the kustomizations API.
 *
 * @schema Kustomization
 */
export interface KustomizationProps {
  /**
   * @schema Kustomization#metadata
   */
  readonly metadata?: ApiObjectMetadata;

  /**
   * KustomizationSpec defines the desired state of a kustomization.
   *
   * @schema Kustomization#spec
   */
  readonly spec?: KustomizationSpec;

}

/**
 * Converts an object of type 'KustomizationProps' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationProps(obj: KustomizationProps | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_KustomizationSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * KustomizationSpec defines the desired state of a kustomization.
 *
 * @schema KustomizationSpec
 */
export interface KustomizationSpec {
  /**
   * Decrypt Kubernetes secrets before applying them on the cluster.
   *
   * @schema KustomizationSpec#decryption
   */
  readonly decryption?: KustomizationSpecDecryption;

  /**
   * DependsOn may contain a dependency.CrossNamespaceDependencyReference slice with references to Kustomization resources that must be ready before this Kustomization can be reconciled.
   *
   * @schema KustomizationSpec#dependsOn
   */
  readonly dependsOn?: KustomizationSpecDependsOn[];

  /**
   * Force instructs the controller to recreate resources when patching fails due to an immutable field change.
   *
   * @schema KustomizationSpec#force
   */
  readonly force?: boolean;

  /**
   * A list of resources to be included in the health assessment.
   *
   * @schema KustomizationSpec#healthChecks
   */
  readonly healthChecks?: KustomizationSpecHealthChecks[];

  /**
   * Images is a list of (image name, new name, new tag or digest) for changing image names, tags or digests. This can also be achieved with a patch, but this operator is simpler to specify.
   *
   * @schema KustomizationSpec#images
   */
  readonly images?: KustomizationSpecImages[];

  /**
   * The interval at which to reconcile the Kustomization.
   *
   * @schema KustomizationSpec#interval
   */
  readonly interval: string;

  /**
   * The KubeConfig for reconciling the Kustomization on a remote cluster. When specified, KubeConfig takes precedence over ServiceAccountName.
   *
   * @schema KustomizationSpec#kubeConfig
   */
  readonly kubeConfig?: KustomizationSpecKubeConfig;

  /**
   * Strategic merge and JSON patches, defined as inline YAML objects, capable of targeting objects based on kind, label and annotation selectors.
   *
   * @schema KustomizationSpec#patches
   */
  readonly patches?: KustomizationSpecPatches[];

  /**
   * JSON 6902 patches, defined as inline YAML objects.
   *
   * @schema KustomizationSpec#patchesJson6902
   */
  readonly patchesJson6902?: KustomizationSpecPatchesJson6902[];

  /**
   * Strategic merge patches, defined as inline YAML objects.
   *
   * @schema KustomizationSpec#patchesStrategicMerge
   */
  readonly patchesStrategicMerge?: any[];

  /**
   * Path to the directory containing the kustomization.yaml file, or the set of plain YAMLs a kustomization.yaml should be generated for. Defaults to 'None', which translates to the root path of the SourceRef.
   *
   * @default None', which translates to the root path of the SourceRef.
   * @schema KustomizationSpec#path
   */
  readonly path?: string;

  /**
   * PostBuild describes which actions to perform on the YAML manifest generated by building the kustomize overlay.
   *
   * @schema KustomizationSpec#postBuild
   */
  readonly postBuild?: KustomizationSpecPostBuild;

  /**
   * Prune enables garbage collection.
   *
   * @schema KustomizationSpec#prune
   */
  readonly prune: boolean;

  /**
   * The interval at which to retry a previously failed reconciliation. When not specified, the controller uses the KustomizationSpec.Interval value to retry failures.
   *
   * @schema KustomizationSpec#retryInterval
   */
  readonly retryInterval?: string;

  /**
   * The name of the Kubernetes service account to impersonate when reconciling this Kustomization.
   *
   * @schema KustomizationSpec#serviceAccountName
   */
  readonly serviceAccountName?: string;

  /**
   * Reference of the source where the kustomization file is.
   *
   * @schema KustomizationSpec#sourceRef
   */
  readonly sourceRef: KustomizationSpecSourceRef;

  /**
   * This flag tells the controller to suspend subsequent kustomize executions, it does not apply to already started executions. Defaults to false.
   *
   * @default false.
   * @schema KustomizationSpec#suspend
   */
  readonly suspend?: boolean;

  /**
   * TargetNamespace sets or overrides the namespace in the kustomization.yaml file.
   *
   * @schema KustomizationSpec#targetNamespace
   */
  readonly targetNamespace?: string;

  /**
   * Timeout for validation, apply and health checking operations. Defaults to 'Interval' duration.
   *
   * @default Interval' duration.
   * @schema KustomizationSpec#timeout
   */
  readonly timeout?: string;

  /**
   * Validate the Kubernetes objects before applying them on the cluster. The validation strategy can be 'client' (local dry-run), 'server' (APIServer dry-run) or 'none'. When 'Force' is 'true', validation will fallback to 'client' if set to 'server' because server-side validation is not supported in this scenario.
   *
   * @schema KustomizationSpec#validation
   */
  readonly validation?: KustomizationSpecValidation;

}

/**
 * Converts an object of type 'KustomizationSpec' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpec(obj: KustomizationSpec | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'decryption': toJson_KustomizationSpecDecryption(obj.decryption),
    'dependsOn': obj.dependsOn?.map(y => toJson_KustomizationSpecDependsOn(y)),
    'force': obj.force,
    'healthChecks': obj.healthChecks?.map(y => toJson_KustomizationSpecHealthChecks(y)),
    'images': obj.images?.map(y => toJson_KustomizationSpecImages(y)),
    'interval': obj.interval,
    'kubeConfig': toJson_KustomizationSpecKubeConfig(obj.kubeConfig),
    'patches': obj.patches?.map(y => toJson_KustomizationSpecPatches(y)),
    'patchesJson6902': obj.patchesJson6902?.map(y => toJson_KustomizationSpecPatchesJson6902(y)),
    'patchesStrategicMerge': obj.patchesStrategicMerge?.map(y => y),
    'path': obj.path,
    'postBuild': toJson_KustomizationSpecPostBuild(obj.postBuild),
    'prune': obj.prune,
    'retryInterval': obj.retryInterval,
    'serviceAccountName': obj.serviceAccountName,
    'sourceRef': toJson_KustomizationSpecSourceRef(obj.sourceRef),
    'suspend': obj.suspend,
    'targetNamespace': obj.targetNamespace,
    'timeout': obj.timeout,
    'validation': obj.validation,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Decrypt Kubernetes secrets before applying them on the cluster.
 *
 * @schema KustomizationSpecDecryption
 */
export interface KustomizationSpecDecryption {
  /**
   * Provider is the name of the decryption engine.
   *
   * @schema KustomizationSpecDecryption#provider
   */
  readonly provider: KustomizationSpecDecryptionProvider;

  /**
   * The secret name containing the private OpenPGP keys used for decryption.
   *
   * @schema KustomizationSpecDecryption#secretRef
   */
  readonly secretRef?: KustomizationSpecDecryptionSecretRef;

}

/**
 * Converts an object of type 'KustomizationSpecDecryption' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecDecryption(obj: KustomizationSpecDecryption | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'provider': obj.provider,
    'secretRef': toJson_KustomizationSpecDecryptionSecretRef(obj.secretRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * CrossNamespaceDependencyReference holds the reference to a dependency.
 *
 * @schema KustomizationSpecDependsOn
 */
export interface KustomizationSpecDependsOn {
  /**
   * Name holds the name reference of a dependency.
   *
   * @schema KustomizationSpecDependsOn#name
   */
  readonly name: string;

  /**
   * Namespace holds the namespace reference of a dependency.
   *
   * @schema KustomizationSpecDependsOn#namespace
   */
  readonly namespace?: string;

}

/**
 * Converts an object of type 'KustomizationSpecDependsOn' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecDependsOn(obj: KustomizationSpecDependsOn | undefined): Record<string, any> | undefined {
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
 * NamespacedObjectKindReference contains enough information to let you locate the typed referenced object in any namespace
 *
 * @schema KustomizationSpecHealthChecks
 */
export interface KustomizationSpecHealthChecks {
  /**
   * API version of the referent, if not specified the Kubernetes preferred version will be used
   *
   * @schema KustomizationSpecHealthChecks#apiVersion
   */
  readonly apiVersion?: string;

  /**
   * Kind of the referent
   *
   * @schema KustomizationSpecHealthChecks#kind
   */
  readonly kind: string;

  /**
   * Name of the referent
   *
   * @schema KustomizationSpecHealthChecks#name
   */
  readonly name: string;

  /**
   * Namespace of the referent, when not specified it acts as LocalObjectReference
   *
   * @schema KustomizationSpecHealthChecks#namespace
   */
  readonly namespace?: string;

}

/**
 * Converts an object of type 'KustomizationSpecHealthChecks' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecHealthChecks(obj: KustomizationSpecHealthChecks | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'apiVersion': obj.apiVersion,
    'kind': obj.kind,
    'name': obj.name,
    'namespace': obj.namespace,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Image contains an image name, a new name, a new tag or digest, which will replace the original name and tag.
 *
 * @schema KustomizationSpecImages
 */
export interface KustomizationSpecImages {
  /**
   * Digest is the value used to replace the original image tag. If digest is present NewTag value is ignored.
   *
   * @schema KustomizationSpecImages#digest
   */
  readonly digest?: string;

  /**
   * Name is a tag-less image name.
   *
   * @schema KustomizationSpecImages#name
   */
  readonly name: string;

  /**
   * NewName is the value used to replace the original name.
   *
   * @schema KustomizationSpecImages#newName
   */
  readonly newName?: string;

  /**
   * NewTag is the value used to replace the original tag.
   *
   * @schema KustomizationSpecImages#newTag
   */
  readonly newTag?: string;

}

/**
 * Converts an object of type 'KustomizationSpecImages' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecImages(obj: KustomizationSpecImages | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'digest': obj.digest,
    'name': obj.name,
    'newName': obj.newName,
    'newTag': obj.newTag,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * The KubeConfig for reconciling the Kustomization on a remote cluster. When specified, KubeConfig takes precedence over ServiceAccountName.
 *
 * @schema KustomizationSpecKubeConfig
 */
export interface KustomizationSpecKubeConfig {
  /**
   * SecretRef holds the name to a secret that contains a 'value' key with the kubeconfig file as the value. It must be in the same namespace as the Kustomization. It is recommended that the kubeconfig is self-contained, and the secret is regularly updated if credentials such as a cloud-access-token expire. Cloud specific `cmd-path` auth helpers will not function without adding binaries and credentials to the Pod that is responsible for reconciling the Kustomization.
   *
   * @schema KustomizationSpecKubeConfig#secretRef
   */
  readonly secretRef?: KustomizationSpecKubeConfigSecretRef;

}

/**
 * Converts an object of type 'KustomizationSpecKubeConfig' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecKubeConfig(obj: KustomizationSpecKubeConfig | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'secretRef': toJson_KustomizationSpecKubeConfigSecretRef(obj.secretRef),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Patch contains either a StrategicMerge or a JSON6902 patch, either a file or inline, and the target the patch should be applied to.
 *
 * @schema KustomizationSpecPatches
 */
export interface KustomizationSpecPatches {
  /**
   * Patch contains the JSON6902 patch document with an array of operation objects.
   *
   * @schema KustomizationSpecPatches#patch
   */
  readonly patch?: string;

  /**
   * Target points to the resources that the patch document should be applied to.
   *
   * @schema KustomizationSpecPatches#target
   */
  readonly target?: KustomizationSpecPatchesTarget;

}

/**
 * Converts an object of type 'KustomizationSpecPatches' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecPatches(obj: KustomizationSpecPatches | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'patch': obj.patch,
    'target': toJson_KustomizationSpecPatchesTarget(obj.target),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * JSON6902Patch contains a JSON6902 patch and the target the patch should be applied to.
 *
 * @schema KustomizationSpecPatchesJson6902
 */
export interface KustomizationSpecPatchesJson6902 {
  /**
   * Patch contains the JSON6902 patch document with an array of operation objects.
   *
   * @schema KustomizationSpecPatchesJson6902#patch
   */
  readonly patch: KustomizationSpecPatchesJson6902Patch[];

  /**
   * Target points to the resources that the patch document should be applied to.
   *
   * @schema KustomizationSpecPatchesJson6902#target
   */
  readonly target: KustomizationSpecPatchesJson6902Target;

}

/**
 * Converts an object of type 'KustomizationSpecPatchesJson6902' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecPatchesJson6902(obj: KustomizationSpecPatchesJson6902 | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'patch': obj.patch?.map(y => toJson_KustomizationSpecPatchesJson6902Patch(y)),
    'target': toJson_KustomizationSpecPatchesJson6902Target(obj.target),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * PostBuild describes which actions to perform on the YAML manifest generated by building the kustomize overlay.
 *
 * @schema KustomizationSpecPostBuild
 */
export interface KustomizationSpecPostBuild {
  /**
   * Substitute holds a map of key/value pairs. The variables defined in your YAML manifests that match any of the keys defined in the map will be substituted with the set value. Includes support for bash string replacement functions e.g. ${var:=default}, ${var:position} and ${var/substring/replacement}.
   *
   * @schema KustomizationSpecPostBuild#substitute
   */
  readonly substitute?: { [key: string]: string };

  /**
   * SubstituteFrom holds references to ConfigMaps and Secrets containing the variables and their values to be substituted in the YAML manifests. The ConfigMap and the Secret data keys represent the var names and they must match the vars declared in the manifests for the substitution to happen.
   *
   * @schema KustomizationSpecPostBuild#substituteFrom
   */
  readonly substituteFrom?: KustomizationSpecPostBuildSubstituteFrom[];

}

/**
 * Converts an object of type 'KustomizationSpecPostBuild' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecPostBuild(obj: KustomizationSpecPostBuild | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'substitute': ((obj.substitute) === undefined) ? undefined : (Object.entries(obj.substitute).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {})),
    'substituteFrom': obj.substituteFrom?.map(y => toJson_KustomizationSpecPostBuildSubstituteFrom(y)),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Reference of the source where the kustomization file is.
 *
 * @schema KustomizationSpecSourceRef
 */
export interface KustomizationSpecSourceRef {
  /**
   * API version of the referent
   *
   * @schema KustomizationSpecSourceRef#apiVersion
   */
  readonly apiVersion?: string;

  /**
   * Kind of the referent
   *
   * @schema KustomizationSpecSourceRef#kind
   */
  readonly kind: KustomizationSpecSourceRefKind;

  /**
   * Name of the referent
   *
   * @schema KustomizationSpecSourceRef#name
   */
  readonly name: string;

  /**
   * Namespace of the referent, defaults to the Kustomization namespace
   *
   * @schema KustomizationSpecSourceRef#namespace
   */
  readonly namespace?: string;

}

/**
 * Converts an object of type 'KustomizationSpecSourceRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecSourceRef(obj: KustomizationSpecSourceRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'apiVersion': obj.apiVersion,
    'kind': obj.kind,
    'name': obj.name,
    'namespace': obj.namespace,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Validate the Kubernetes objects before applying them on the cluster. The validation strategy can be 'client' (local dry-run), 'server' (APIServer dry-run) or 'none'. When 'Force' is 'true', validation will fallback to 'client' if set to 'server' because server-side validation is not supported in this scenario.
 *
 * @schema KustomizationSpecValidation
 */
export enum KustomizationSpecValidation {
  /** none */
  NONE = "none",
  /** client */
  CLIENT = "client",
  /** server */
  SERVER = "server",
}

/**
 * Provider is the name of the decryption engine.
 *
 * @schema KustomizationSpecDecryptionProvider
 */
export enum KustomizationSpecDecryptionProvider {
  /** sops */
  SOPS = "sops",
}

/**
 * The secret name containing the private OpenPGP keys used for decryption.
 *
 * @schema KustomizationSpecDecryptionSecretRef
 */
export interface KustomizationSpecDecryptionSecretRef {
  /**
   * Name of the referent
   *
   * @schema KustomizationSpecDecryptionSecretRef#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'KustomizationSpecDecryptionSecretRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecDecryptionSecretRef(obj: KustomizationSpecDecryptionSecretRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * SecretRef holds the name to a secret that contains a 'value' key with the kubeconfig file as the value. It must be in the same namespace as the Kustomization. It is recommended that the kubeconfig is self-contained, and the secret is regularly updated if credentials such as a cloud-access-token expire. Cloud specific `cmd-path` auth helpers will not function without adding binaries and credentials to the Pod that is responsible for reconciling the Kustomization.
 *
 * @schema KustomizationSpecKubeConfigSecretRef
 */
export interface KustomizationSpecKubeConfigSecretRef {
  /**
   * Name of the referent
   *
   * @schema KustomizationSpecKubeConfigSecretRef#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'KustomizationSpecKubeConfigSecretRef' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecKubeConfigSecretRef(obj: KustomizationSpecKubeConfigSecretRef | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Target points to the resources that the patch document should be applied to.
 *
 * @schema KustomizationSpecPatchesTarget
 */
export interface KustomizationSpecPatchesTarget {
  /**
   * AnnotationSelector is a string that follows the label selection expression https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#api It matches with the resource annotations.
   *
   * @schema KustomizationSpecPatchesTarget#annotationSelector
   */
  readonly annotationSelector?: string;

  /**
   * Group is the API group to select resources from. Together with Version and Kind it is capable of unambiguously identifying and/or selecting resources. https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/api-group.md
   *
   * @schema KustomizationSpecPatchesTarget#group
   */
  readonly group?: string;

  /**
   * Kind of the API Group to select resources from. Together with Group and Version it is capable of unambiguously identifying and/or selecting resources. https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/api-group.md
   *
   * @schema KustomizationSpecPatchesTarget#kind
   */
  readonly kind?: string;

  /**
   * LabelSelector is a string that follows the label selection expression https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#api It matches with the resource labels.
   *
   * @schema KustomizationSpecPatchesTarget#labelSelector
   */
  readonly labelSelector?: string;

  /**
   * Name to match resources with.
   *
   * @schema KustomizationSpecPatchesTarget#name
   */
  readonly name?: string;

  /**
   * Namespace to select resources from.
   *
   * @schema KustomizationSpecPatchesTarget#namespace
   */
  readonly namespace?: string;

  /**
   * Version of the API Group to select resources from. Together with Group and Kind it is capable of unambiguously identifying and/or selecting resources. https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/api-group.md
   *
   * @schema KustomizationSpecPatchesTarget#version
   */
  readonly version?: string;

}

/**
 * Converts an object of type 'KustomizationSpecPatchesTarget' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecPatchesTarget(obj: KustomizationSpecPatchesTarget | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'annotationSelector': obj.annotationSelector,
    'group': obj.group,
    'kind': obj.kind,
    'labelSelector': obj.labelSelector,
    'name': obj.name,
    'namespace': obj.namespace,
    'version': obj.version,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * JSON6902 is a JSON6902 operation object. https://tools.ietf.org/html/rfc6902#section-4
 *
 * @schema KustomizationSpecPatchesJson6902Patch
 */
export interface KustomizationSpecPatchesJson6902Patch {
  /**
   * @schema KustomizationSpecPatchesJson6902Patch#from
   */
  readonly from?: string;

  /**
   * @schema KustomizationSpecPatchesJson6902Patch#op
   */
  readonly op: KustomizationSpecPatchesJson6902PatchOp;

  /**
   * @schema KustomizationSpecPatchesJson6902Patch#path
   */
  readonly path: string;

  /**
   * @schema KustomizationSpecPatchesJson6902Patch#value
   */
  readonly value?: any;

}

/**
 * Converts an object of type 'KustomizationSpecPatchesJson6902Patch' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecPatchesJson6902Patch(obj: KustomizationSpecPatchesJson6902Patch | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'from': obj.from,
    'op': obj.op,
    'path': obj.path,
    'value': obj.value,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Target points to the resources that the patch document should be applied to.
 *
 * @schema KustomizationSpecPatchesJson6902Target
 */
export interface KustomizationSpecPatchesJson6902Target {
  /**
   * AnnotationSelector is a string that follows the label selection expression https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#api It matches with the resource annotations.
   *
   * @schema KustomizationSpecPatchesJson6902Target#annotationSelector
   */
  readonly annotationSelector?: string;

  /**
   * Group is the API group to select resources from. Together with Version and Kind it is capable of unambiguously identifying and/or selecting resources. https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/api-group.md
   *
   * @schema KustomizationSpecPatchesJson6902Target#group
   */
  readonly group?: string;

  /**
   * Kind of the API Group to select resources from. Together with Group and Version it is capable of unambiguously identifying and/or selecting resources. https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/api-group.md
   *
   * @schema KustomizationSpecPatchesJson6902Target#kind
   */
  readonly kind?: string;

  /**
   * LabelSelector is a string that follows the label selection expression https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#api It matches with the resource labels.
   *
   * @schema KustomizationSpecPatchesJson6902Target#labelSelector
   */
  readonly labelSelector?: string;

  /**
   * Name to match resources with.
   *
   * @schema KustomizationSpecPatchesJson6902Target#name
   */
  readonly name?: string;

  /**
   * Namespace to select resources from.
   *
   * @schema KustomizationSpecPatchesJson6902Target#namespace
   */
  readonly namespace?: string;

  /**
   * Version of the API Group to select resources from. Together with Group and Kind it is capable of unambiguously identifying and/or selecting resources. https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/api-group.md
   *
   * @schema KustomizationSpecPatchesJson6902Target#version
   */
  readonly version?: string;

}

/**
 * Converts an object of type 'KustomizationSpecPatchesJson6902Target' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecPatchesJson6902Target(obj: KustomizationSpecPatchesJson6902Target | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'annotationSelector': obj.annotationSelector,
    'group': obj.group,
    'kind': obj.kind,
    'labelSelector': obj.labelSelector,
    'name': obj.name,
    'namespace': obj.namespace,
    'version': obj.version,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * SubstituteReference contains a reference to a resource containing the variables name and value.
 *
 * @schema KustomizationSpecPostBuildSubstituteFrom
 */
export interface KustomizationSpecPostBuildSubstituteFrom {
  /**
   * Kind of the values referent, valid values are ('Secret', 'ConfigMap').
   *
   * @schema KustomizationSpecPostBuildSubstituteFrom#kind
   */
  readonly kind: KustomizationSpecPostBuildSubstituteFromKind;

  /**
   * Name of the values referent. Should reside in the same namespace as the referring resource.
   *
   * @schema KustomizationSpecPostBuildSubstituteFrom#name
   */
  readonly name: string;

}

/**
 * Converts an object of type 'KustomizationSpecPostBuildSubstituteFrom' to JSON representation.
 */
/* eslint-disable max-len, quote-props */
export function toJson_KustomizationSpecPostBuildSubstituteFrom(obj: KustomizationSpecPostBuildSubstituteFrom | undefined): Record<string, any> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'kind': obj.kind,
    'name': obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
/* eslint-enable max-len, quote-props */

/**
 * Kind of the referent
 *
 * @schema KustomizationSpecSourceRefKind
 */
export enum KustomizationSpecSourceRefKind {
  /** GitRepository */
  GIT_REPOSITORY = "GitRepository",
  /** Bucket */
  BUCKET = "Bucket",
}

/**
 * @schema KustomizationSpecPatchesJson6902PatchOp
 */
export enum KustomizationSpecPatchesJson6902PatchOp {
  /** test */
  TEST = "test",
  /** remove */
  REMOVE = "remove",
  /** add */
  ADD = "add",
  /** replace */
  REPLACE = "replace",
  /** move */
  MOVE = "move",
  /** copy */
  COPY = "copy",
}

/**
 * Kind of the values referent, valid values are ('Secret', 'ConfigMap').
 *
 * @schema KustomizationSpecPostBuildSubstituteFromKind
 */
export enum KustomizationSpecPostBuildSubstituteFromKind {
  /** Secret */
  SECRET = "Secret",
  /** ConfigMap */
  CONFIG_MAP = "ConfigMap",
}

