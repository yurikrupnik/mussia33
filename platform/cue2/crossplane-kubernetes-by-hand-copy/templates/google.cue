package templates

import (
//	crossplane "apiextensions.crossplane.io/composition/v1"
//	crossplane "crossplane/crossplane/apis/apiextensions/v1beta1"
//	crossplane "github.com/crossplane/crossplane/apis/apiextensions/v1"
)

//#Google: crossplane.#Composition & {
//    _config:    #Config
//    apiVersion: #Config.apiVersion
//	kind:       "Composition"
//	metadata: {
//		name: "cluster-google-official"
//		labels: {
//			"cluster": "gke"
//			"provider": "google-official"
//		}
//	}
//    spec: {
//		compositeTypeRef: _config.compositeTypeRef
//		mode: "Pipeline"
//		pipeline: [{
//			step: "patch-and-transform"
//			functionRef: name: "function-patch-and-transform"
//			input: {
//				apiVersion: "pt.fn.crossplane.io/v1beta1"
//				kind: "Resources"
//				resources: [
//					#GoogleCluster,
//					#GoogleNodePool,
//					#GoogleProviderConfigHelmLocal,
//					#AppCrossplane & { base: spec: forProvider: chart: version: _config.versions.crossplane },
//					#GoogleCilium & { base: spec: forProvider: chart: version: _config.versions.cilium },
//					#GoogleProviderConfigKubernetesLocal,
//					#ProviderKubernetesSa,
//					#ProviderKubernetesCrb,
//					#ProviderKubernetesCc,
//					#AppCrossplaneProvider & { _composeConfig:
//						name: "kubernetes-provider"
//						base: spec: forProvider: manifest: spec: package: _config.packages.providerKubernetes
//					},
//					#AppCrossplaneProvider & { _composeConfig:
//						name: "helm-provider"
//						base: spec: forProvider: manifest: spec: package: _config.packages.providerHelm
//					},
//					// #AppCrossplaneConfig & { _composeConfig:
//					// 	name: "config-app"
//					// 	base: spec: forProvider: manifest: spec: package: _config.packages.configApp
//					// },
//					#AppCrossplaneConfig & { _composeConfig:
//						name: "config-sql"
//						base: spec: forProvider: manifest: spec: package: _config.packages.configSql
//					},
//				]
//			}
//		} , {
//			step: "namespaces"
//			functionRef: name: "loop"
//			input: {
//				apiVersion: "pt.fn.crossplane.io/v1beta1"
//				kind: "Resources"
//				valuesXrPath: "spec.parameters.namespaces"
//				namePrefix: "ns-"
//				paths: [
//					{"spec.forProvider.manifest.metadata.name"},
//					{"spec.providerConfigRef.name = spec.id"}]
//				resources: [{
//					base: {
//						apiVersion: "kubernetes.crossplane.io/v1alpha1"
//						kind: "Object"
//						spec: forProvider: manifest: {
//							apiVersion: "v1"
//							kind: "Namespace"
//						}
//					}
//				}]
//			}
//		}]
//		writeConnectionSecretsToNamespace: "crossplane-system"
//    }
//}

#location: {
	type: "string"
	description: "The location of the resource"
}
#storageClass: {
	type: "string"
  description: "The storage class of the bucket"
	enum: ["STANDARD", "MULTI_REGIONAL", "REGIONAL", "NEARLINE", "COLDLINE", "ARCHIVE"]
	default: "STANDARD"
}

#Google: {
	apiVersion: "apiextensions.crossplane.io/v1"
	kind: "CompositeResourceDefinition"
	metadata: name: "compositestorages.multicloud.platformref.yurikrupnik.com"
	spec: claimNames: kind: "Storage"
	spec: claimNames: plural: "storages"
	spec: group: "multicloud.platformref.yurikrupnik.com"
	spec: defaultCompositionRef: name: "gcp.compositestorages.multicloud.platformref.yurikrupnik.com"
	spec: names: kind: "CompositeStorage"
	spec: names: plural: "compositestorages"
	spec: versions: [{
		name: "v1alpha1"
		served: true
		referenceable: true
		schema: openAPIV3Schema: {
			required: ["location"]
			properties: {
				location: #location
				storageClass: #storageClass
			}
		}
	}]
}

#GoogleStorage: {
	apiVersion: "apiextensions.crossplane.io/v1"
	kind: "Composition"
	metadata: name: "gcp.compositestorages.multicloud.platformref.yurikrupnik.com"
	metadata: labels: { "provider": "gcp" }
	spec: writeConnectionSecretsToNamespace: "crossplane-system"
	spec: compositeTypeRef: {
		apiVersion: "multicloud.platformref.yurikrupnik.com/v1alpha1"
		kind: "CompositeStorage"
	}
	spec: resources: [
		{
			base: {
				apiVersion: "storage.gcp.upbound.io/v1alpha1"
				kind: "Bucket"
				spec: {
					forProvider: {
						location: "us-east1"
						storageClass: "STANDARD"
					}
				}
			}
			patches: [
				{ fromFieldPath: "spec.id", toFieldPath: "metadata.name" },
				{ fromFieldPath: "spec.location", toFieldPath: "spec.forProvider.region" },
//				{ fromFieldPath: "spec.parameters.location", toFieldPath: "spec.forProvider.location" },
//				{ fromFieldPath: "spec.parameters.storageClass", toFieldPath: "spec.forProvider.storageClass" },
//				{ fromFieldPath: "spec.claimRef.namespace", toFieldPath: "spec.writeConnectionSecretToRef.namespace" },
//				{ fromFieldPath: "spec.id", toFieldPath: "spec.writeConnectionSecretToRef.name" },
//				{ fromFieldPath: "status.atProvider.bucketName", toFieldPath: "status.field1" }
			]
//			connectionDetails: [
//				{ type: "FromConnectionSecretKey", fromConnectionSecretKey: "bucketName", name: "bucketName" },
//				{ type: "FromConnectionSecretKey", fromConnectionSecretKey: "bucketName", name: "value" }
//			]
		}
	]
}

#AwsStorage: {
	apiVersion: "apiextensions.crossplane.io/v1"
	kind: "Composition"
	metadata: name: "aws.compositestorages.multicloud.platformref.yurikrupnik.com"
	metadata: labels: { "provider": "aws" }
	spec: writeConnectionSecretsToNamespace: "crossplane-system"
	spec: compositeTypeRef: {
		apiVersion: "multicloud.platformref.yurikrupnik.com/v1alpha1"
		kind: "CompositeStorage"
	}
	spec: resources: [
		{
			base: {
				apiVersion: "s3.aws.upbound.io/v1beta1"
				kind: "Bucket"
				spec: {
					forProvider: {
						region: "eu-west-1"
					}
				}
			}
			patches: [
				{ fromFieldPath: "spec.id", toFieldPath: "metadata.name" },
//				{ fromFieldPath: "spec.parameters.location", toFieldPath: "spec.forProvider.location" },
//				{ fromFieldPath: "spec.parameters.storageClass", toFieldPath: "spec.forProvider.storageClass" },
//				{ fromFieldPath: "spec.claimRef.namespace", toFieldPath: "spec.writeConnectionSecretToRef.namespace" },
//				{ fromFieldPath: "spec.id", toFieldPath: "spec.writeConnectionSecretToRef.name" },
//				{ fromFieldPath: "status.atProvider.bucketName", toFieldPath: "status.field1" }
			]
//			connectionDetails: [
//				{ type: "FromConnectionSecretKey", fromConnectionSecretKey: "bucketName", name: "bucketName" },
//				{ type: "FromConnectionSecretKey", fromConnectionSecretKey: "bucketName", name: "value" }
//			]
		}
	]
}

#GoogleCilium: #AppHelm & { _composeConfig:
	name: "cilium"
	base: spec: forProvider: {
		chart: { repository: "https://helm.cilium.io", version: string }
		set: [
			{ name: "nodeinit.enabled", value: "true"},
			{ name: "nodeinit.reconfigureKubelet", value: "true" },
			{ name: "nodeinit.removeCbrBridge", value: "true" },
			{ name: "cni.binPath", value: "/home/kubernetes/bin" },
			{ name: "gke.enabled", value: "true" },
			{ name: "ipam.mode", value: "kubernetes" },
			{ name: "ipv4NativeRoutingCIDR" }
		]
	}
	patches: [{
		fromFieldPath: "spec.id"
		toFieldPath: "metadata.name"
		transforms: [{
			type: "string"
			string: { fmt: "%s-" + _composeConfig.name, type: "Format" }
		}]},
		{ fromFieldPath: "spec.id", toFieldPath: "spec.providerConfigRef.name" },
		{ fromFieldPath: "status.field1", toFieldPath: "spec.forProvider.set[6].value", type: "FromCompositeFieldPath" }
	]
}

#GoogleCluster: {
	name: "gkecluster"
	base: {
		apiVersion: "container.gcp.upbound.io/v1beta1"
		kind: "Cluster"
		spec: {
			forProvider: {
				location: "us-east1"
				initialNodeCount: 1
				removeDefaultNodePool: true
				clusterAutoscaling: [{
					autoProvisioningDefaults: [{
						management: [{ autoRepair: true, autoUpgrade: true }]
					}]
				}]
			}
		}
	}
	patches: [
		{ fromFieldPath: "spec.id", toFieldPath: "metadata.name" },
		{
			fromFieldPath: "spec.id"
			toFieldPath: "spec.writeConnectionSecretToRef.name"
			transforms: [{
				type: "string"
				string: {
					fmt:  "%s-cluster"
					type: "Format"
				}
			}]
		},
		{ fromFieldPath: "spec.claimRef.namespace", toFieldPath: "spec.writeConnectionSecretToRef.namespace" },
		{ fromFieldPath: "spec.parameters.version", toFieldPath: "spec.forProvider.minMasterVersion" },
		{ type: "ToCompositeFieldPath", fromFieldPath: "metadata.name", toFieldPath: "status.clusterName" },
		{ type: "ToCompositeFieldPath", fromFieldPath: "status.message", toFieldPath: "status.controlPlaneStatus" },
		{ type: "ToCompositeFieldPath", fromFieldPath: "status.atProvider.clusterIpv4Cidr", toFieldPath: "status.field1" }
	]
	connectionDetails: [
		{ type: "FromConnectionSecretKey", fromConnectionSecretKey: "kubeconfig", name: "kubeconfig" },
		{ type: "FromConnectionSecretKey", fromConnectionSecretKey: "kubeconfig", name: "value" }
	]
}

#GoogleNodePool: {
	name: "nodepool"
    base: {
		apiVersion: "container.gcp.upbound.io/v1beta1"
      	kind: "NodePool"
      	spec: {
			forProvider: {
				nodeLocations: [{ "us-east1-b" }, { "us-east1-c" }, { "us-east1-d" }]
				clusterSelector: { matchControllerRef: true }
				nodeConfig: [{
					oauthScopes: [{ "https://www.googleapis.com/auth/cloud-platform" }]
					taint: [{ key: "node.cilium.io/agent-not-ready", value: "true", effect: "NO_EXECUTE" }]
				}]
				autoscaling: [{ maxNodeCount: 3 }]
				management: [{ autoRepair: true, autoUpgrade: true }]
			}
		}
	}
    patches: [
		{ fromFieldPath: "spec.id", toFieldPath: "metadata.name" },
		{ fromFieldPath: "spec.parameters.version", toFieldPath: "spec.forProvider.version" },
		{ fromFieldPath: "spec.parameters.minNodeCount", toFieldPath: "spec.forProvider.initialNodeCount" },
		{ fromFieldPath: "spec.parameters.minNodeCount", toFieldPath: "spec.forProvider.autoscaling[0].minNodeCount" },
		{
			fromFieldPath: "spec.parameters.nodeSize"
			toFieldPath: "spec.forProvider.nodeConfig[0].machineType"
			transforms: [{
				type: "map"
				map: { small: "e2-standard-2", medium: "e2-standard-4", large: "e2-standard-16" }
			}]},
		{ type: "ToCompositeFieldPath", fromFieldPath: "status.message", toFieldPath: "status.nodePoolStatus" }
	]
}

#GoogleProviderConfigLocal: {
	name: string
    base: {
        apiVersion: string
        kind:       "ProviderConfig"
        spec: {
            credentials: {
                secretRef: { key: "kubeconfig", name: "kubeconfig", namespace: "crossplane-system" }
                source: "Secret"
            }
			identity: {
				type: "GoogleApplicationCredentials"
				source: "Secret"
				secretRef: { name: "gcp-creds", namespace: "crossplane-system", key: "creds" }
			}
        }
    }
    patches: [
		{ fromFieldPath: "spec.id", toFieldPath:   "metadata.name" },
		{ fromFieldPath: "spec.claimRef.namespace", toFieldPath:   "spec.credentials.secretRef.namespace" },
		{
			fromFieldPath: "spec.id"
			toFieldPath:   "spec.credentials.secretRef.name"
			transforms: [{
				string: { fmt: "%s-cluster", type: "Format" }
				type: "string"
			}]
    }]
    readinessChecks: [{ type: "None" }]
}

#GoogleProviderConfigHelmLocal: {
    #GoogleProviderConfigLocal & {
        name: "helm"
        base: apiVersion: "helm.crossplane.io/v1beta1"
    }
}

#GoogleProviderConfigKubernetesLocal: {
    #GoogleProviderConfigLocal & {
        name: "kubernetes"
        base: apiVersion: "kubernetes.crossplane.io/v1alpha1"
    }
}

#GoogleServiceAccount: {

}
