// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go github.com/crossplane-contrib/provider-kubernetes/apis/object/v1alpha1

package v1alpha1

import (
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/api/core/v1"
	xpv1 "github.com/crossplane/crossplane-runtime/apis/common/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// ObjectAction defines actions applicable to Object
#ObjectAction: string // #enumObjectAction

#enumObjectAction:
	#ObjectActionCreate |
	#ObjectActionUpdate |
	#ObjectActionDelete

// A ManagementPolicy determines what should happen to the underlying external
// resource when a managed resource is created, updated, deleted, or observed.
// +kubebuilder:validation:Enum=Default;ObserveCreateUpdate;ObserveDelete;Observe
#ManagementPolicy: string // #enumManagementPolicy

#enumManagementPolicy:
	#Default |
	#ObserveCreateUpdate |
	#ObserveDelete |
	#Observe

// Default means the provider can fully manage the resource.
#Default: #ManagementPolicy & "Default"

// ObserveCreateUpdate means the provider can observe, create, or update
// the resource, but can not delete it.
#ObserveCreateUpdate: #ManagementPolicy & "ObserveCreateUpdate"

// ObserveDelete means the provider can observe or delete the resource, but
// can not create and update it.
#ObserveDelete: #ManagementPolicy & "ObserveDelete"

// Observe means the provider can only observe the resource.
#Observe: #ManagementPolicy & "Observe"

// ObjectActionCreate means to create an Object
#ObjectActionCreate: #ObjectAction & "Create"

// ObjectActionUpdate means to update an Object
#ObjectActionUpdate: #ObjectAction & "Update"

// ObjectActionDelete means to delete an Object
#ObjectActionDelete: #ObjectAction & "Delete"

// DependsOn refers to an object by Name, Kind, APIVersion, etc. It is used to
// reference other Object or arbitrary Kubernetes resource which is either
// cluster or namespace scoped.
#DependsOn: {
	// APIVersion of the referenced object.
	// +kubebuilder:default=kubernetes.crossplane.io/v1alpha1
	// +optional
	apiVersion?: string @go(APIVersion)

	// Kind of the referenced object.
	// +kubebuilder:default=Object
	// +optional
	kind?: string @go(Kind)

	// Name of the referenced object.
	name: string @go(Name)

	// Namespace of the referenced object.
	// +optional
	namespace?: string @go(Namespace)
}

// PatchesFrom refers to an object by Name, Kind, APIVersion, etc., and patch
// fields from this object.
#PatchesFrom: {
	#DependsOn

	// FieldPath is the path of the field on the resource whose value is to be
	// used as input.
	fieldPath?: null | string @go(FieldPath,*string)
}

// Reference refers to an Object or arbitrary Kubernetes resource and optionally
// patch values from that resource to the current Object.
#Reference: {
	// DependsOn is used to declare dependency on other Object or arbitrary
	// Kubernetes resource.
	// +optional
	dependsOn?: null | #DependsOn @go(DependsOn,*DependsOn)

	// PatchesFrom is used to declare dependency on other Object or arbitrary
	// Kubernetes resource, and also patch fields from this object.
	// +optional
	patchesFrom?: null | #PatchesFrom @go(PatchesFrom,*PatchesFrom)

	// ToFieldPath is the path of the field on the resource whose value will
	// be changed with the result of transforms. Leave empty if you'd like to
	// propagate to the same path as patchesFrom.fieldPath.
	// +optional
	toFieldPath?: null | string @go(ToFieldPath,*string)
}

// ObjectParameters are the configurable fields of a Object.
#ObjectParameters: {
	// Raw JSON representation of the kubernetes object to be created.
	// +kubebuilder:validation:EmbeddedResource
	// +kubebuilder:pruning:PreserveUnknownFields
	manifest: runtime.#RawExtension @go(Manifest)
}

// ObjectObservation are the observable fields of a Object.
#ObjectObservation: {
	// Raw JSON representation of the remote object.
	// +kubebuilder:validation:EmbeddedResource
	// +kubebuilder:pruning:PreserveUnknownFields
	manifest?: runtime.#RawExtension @go(Manifest)
}

// A ObjectSpec defines the desired state of a Object.
#ObjectSpec: {
	#ResourceSpec
	connectionDetails?: [...#ConnectionDetail] @go(ConnectionDetails,[]ConnectionDetail)
	forProvider: #ObjectParameters @go(ForProvider)

	// +kubebuilder:default=Default
	managementPolicy?: #ManagementPolicy @go(ManagementPolicy)
	references?: [...#Reference] @go(References,[]Reference)
	readiness?: #Readiness @go(Readiness)
}

// ReadinessPolicy defines how the Object's readiness condition should be computed.
#ReadinessPolicy: string // #enumReadinessPolicy

#enumReadinessPolicy:
	#ReadinessPolicySuccessfulCreate |
	#ReadinessPolicyDeriveFromObject

// ReadinessPolicySuccessfulCreate means the object is marked as ready when the
// underlying external resource is successfully created.
#ReadinessPolicySuccessfulCreate: #ReadinessPolicy & "SuccessfulCreate"

// ReadinessPolicyDeriveFromObject means the object is marked as ready if and only if the underlying
// external resource is considered ready.
#ReadinessPolicyDeriveFromObject: #ReadinessPolicy & "DeriveFromObject"

// Readiness defines how the object's readiness condition should be computed,
// if not specified it will be considered ready as soon as the underlying external
// resource is considered up-to-date.
#Readiness: {
	// Policy defines how the Object's readiness condition should be computed.
	// +optional
	// +kubebuilder:validation:Enum=SuccessfulCreate;DeriveFromObject
	// +kubebuilder:default=SuccessfulCreate
	policy?: #ReadinessPolicy @go(Policy)
}

// ConnectionDetail represents an entry in the connection secret for an Object
#ConnectionDetail: {
	v1.#ObjectReference
	toConnectionSecretKey?: string @go(ToConnectionSecretKey)
}

// A ObjectStatus represents the observed state of a Object.
#ObjectStatus: {
	xpv1.#ResourceStatus
	atProvider?: #ObjectObservation @go(AtProvider)
}

// A Object is an provider Kubernetes API type
// +kubebuilder:subresource:status
// +kubebuilder:printcolumn:name="KIND",type="string",JSONPath=".spec.forProvider.manifest.kind"
// +kubebuilder:printcolumn:name="APIVERSION",type="string",JSONPath=".spec.forProvider.manifest.apiVersion",priority=1
// +kubebuilder:printcolumn:name="METANAME",type="string",JSONPath=".spec.forProvider.manifest.metadata.name",priority=1
// +kubebuilder:printcolumn:name="METANAMESPACE",type="string",JSONPath=".spec.forProvider.manifest.metadata.namespace",priority=1
// +kubebuilder:printcolumn:name="PROVIDERCONFIG",type="string",JSONPath=".spec.providerConfigRef.name"
// +kubebuilder:printcolumn:name="SYNCED",type="string",JSONPath=".status.conditions[?(@.type=='Synced')].status"
// +kubebuilder:printcolumn:name="READY",type="string",JSONPath=".status.conditions[?(@.type=='Ready')].status"
// +kubebuilder:printcolumn:name="AGE",type="date",JSONPath=".metadata.creationTimestamp"
// +kubebuilder:resource:scope=Cluster,categories={crossplane,managed,kubernetes}
#Object: {
	metav1.#TypeMeta
	metadata?: metav1.#ObjectMeta @go(ObjectMeta)
	spec:      #ObjectSpec        @go(Spec)
	status?:   #ObjectStatus      @go(Status)
}

// ObjectList contains a list of Object
#ObjectList: {
	metav1.#TypeMeta
	metadata?: metav1.#ListMeta @go(ListMeta)
	items: [...#Object] @go(Items,[]Object)
}