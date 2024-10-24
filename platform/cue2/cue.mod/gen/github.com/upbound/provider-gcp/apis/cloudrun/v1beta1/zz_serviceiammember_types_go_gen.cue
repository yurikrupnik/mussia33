// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go github.com/upbound/provider-gcp/apis/cloudrun/v1beta1

package v1beta1

import (
	"github.com/crossplane/crossplane-runtime/apis/common/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

#ConditionInitParameters: {
	description?: null | string @go(Description,*string)
	expression?:  null | string @go(Expression,*string)
	title?:       null | string @go(Title,*string)
}

#ConditionObservation: {
	description?: null | string @go(Description,*string)
	expression?:  null | string @go(Expression,*string)
	title?:       null | string @go(Title,*string)
}

#ConditionParameters: {
	// +kubebuilder:validation:Optional
	description?: null | string @go(Description,*string)

	// +kubebuilder:validation:Optional
	expression?: null | string @go(Expression,*string)

	// +kubebuilder:validation:Optional
	title?: null | string @go(Title,*string)
}

#ServiceIAMMemberInitParameters: {
	condition?: [...#ConditionInitParameters] @go(Condition,[]ConditionInitParameters)
	location?: null | string @go(Location,*string)
	member?:   null | string @go(Member,*string)
	role?:     null | string @go(Role,*string)
}

#ServiceIAMMemberObservation: {
	condition?: [...#ConditionObservation] @go(Condition,[]ConditionObservation)
	etag?:     null | string @go(Etag,*string)
	id?:       null | string @go(ID,*string)
	location?: null | string @go(Location,*string)
	member?:   null | string @go(Member,*string)
	project?:  null | string @go(Project,*string)
	role?:     null | string @go(Role,*string)
	service?:  null | string @go(Service,*string)
}

#ServiceIAMMemberParameters: {
	// +kubebuilder:validation:Optional
	condition?: [...#ConditionParameters] @go(Condition,[]ConditionParameters)

	// +kubebuilder:validation:Optional
	location?: null | string @go(Location,*string)

	// +kubebuilder:validation:Optional
	member?: null | string @go(Member,*string)

	// +crossplane:generate:reference:type=github.com/upbound/provider-gcp/apis/cloudplatform/v1beta1.Project
	// +kubebuilder:validation:Optional
	project?: null | string @go(Project,*string)

	// Reference to a Project in cloudplatform to populate project.
	// +kubebuilder:validation:Optional
	projectRef?: null | v1.#Reference @go(ProjectRef,*v1.Reference)

	// Selector for a Project in cloudplatform to populate project.
	// +kubebuilder:validation:Optional
	projectSelector?: null | v1.#Selector @go(ProjectSelector,*v1.Selector)

	// +kubebuilder:validation:Optional
	role?: null | string @go(Role,*string)

	// +crossplane:generate:reference:type=Service
	// +kubebuilder:validation:Optional
	service?: null | string @go(Service,*string)

	// Reference to a Service to populate service.
	// +kubebuilder:validation:Optional
	serviceRef?: null | v1.#Reference @go(ServiceRef,*v1.Reference)

	// Selector for a Service to populate service.
	// +kubebuilder:validation:Optional
	serviceSelector?: null | v1.#Selector @go(ServiceSelector,*v1.Selector)
}

// ServiceIAMMemberSpec defines the desired state of ServiceIAMMember
#ServiceIAMMemberSpec: {
	v1.#ResourceSpec
	forProvider: #ServiceIAMMemberParameters @go(ForProvider)

	// THIS IS A BETA FIELD. It will be honored
	// unless the Management Policies feature flag is disabled.
	// InitProvider holds the same fields as ForProvider, with the exception
	// of Identifier and other resource reference fields. The fields that are
	// in InitProvider are merged into ForProvider when the resource is created.
	// The same fields are also added to the terraform ignore_changes hook, to
	// avoid updating them after creation. This is useful for fields that are
	// required on creation, but we do not desire to update them after creation,
	// for example because of an external controller is managing them, like an
	// autoscaler.
	initProvider?: #ServiceIAMMemberInitParameters @go(InitProvider)
}

// ServiceIAMMemberStatus defines the observed state of ServiceIAMMember.
#ServiceIAMMemberStatus: {
	v1.#ResourceStatus
	atProvider?: #ServiceIAMMemberObservation @go(AtProvider)
}

// ServiceIAMMember is the Schema for the ServiceIAMMembers API. <no value>
// +kubebuilder:printcolumn:name="READY",type="string",JSONPath=".status.conditions[?(@.type=='Ready')].status"
// +kubebuilder:printcolumn:name="SYNCED",type="string",JSONPath=".status.conditions[?(@.type=='Synced')].status"
// +kubebuilder:printcolumn:name="EXTERNAL-NAME",type="string",JSONPath=".metadata.annotations.crossplane\\.io/external-name"
// +kubebuilder:printcolumn:name="AGE",type="date",JSONPath=".metadata.creationTimestamp"
// +kubebuilder:subresource:status
// +kubebuilder:resource:scope=Cluster,categories={crossplane,managed,gcp}
#ServiceIAMMember: {
	metav1.#TypeMeta
	metadata?: metav1.#ObjectMeta @go(ObjectMeta)

	// +kubebuilder:validation:XValidation:rule="!('*' in self.managementPolicies || 'Create' in self.managementPolicies || 'Update' in self.managementPolicies) || has(self.forProvider.location) || (has(self.initProvider) && has(self.initProvider.location))",message="spec.forProvider.location is a required parameter"
	// +kubebuilder:validation:XValidation:rule="!('*' in self.managementPolicies || 'Create' in self.managementPolicies || 'Update' in self.managementPolicies) || has(self.forProvider.member) || (has(self.initProvider) && has(self.initProvider.member))",message="spec.forProvider.member is a required parameter"
	// +kubebuilder:validation:XValidation:rule="!('*' in self.managementPolicies || 'Create' in self.managementPolicies || 'Update' in self.managementPolicies) || has(self.forProvider.role) || (has(self.initProvider) && has(self.initProvider.role))",message="spec.forProvider.role is a required parameter"
	spec:    #ServiceIAMMemberSpec   @go(Spec)
	status?: #ServiceIAMMemberStatus @go(Status)
}

// ServiceIAMMemberList contains a list of ServiceIAMMembers
#ServiceIAMMemberList: {
	metav1.#TypeMeta
	metadata?: metav1.#ListMeta @go(ListMeta)
	items: [...#ServiceIAMMember] @go(Items,[]ServiceIAMMember)
}
