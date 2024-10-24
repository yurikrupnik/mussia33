// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go github.com/crossplane-contrib/provider-kubernetes/apis/object/v1alpha1

package v1alpha1

import xpv1 "github.com/crossplane/crossplane-runtime/apis/common/v1"

// A ResourceSpec defines the desired state of a managed resource.
#ResourceSpec: {
	// WriteConnectionSecretToReference specifies the namespace and name of a
	// Secret to which any connection details for this managed resource should
	// be written. Connection details frequently include the endpoint, username,
	// and password required to connect to the managed resource.
	// This field is planned to be replaced in a future release in favor of
	// PublishConnectionDetailsTo. Currently, both could be set independently
	// and connection details would be published to both without affecting
	// each other.
	// +optional
	writeConnectionSecretToRef?: null | xpv1.#SecretReference @go(WriteConnectionSecretToReference,*xpv1.SecretReference)

	// PublishConnectionDetailsTo specifies the connection secret config which
	// contains a name, metadata and a reference to secret store config to
	// which any connection details for this managed resource should be written.
	// Connection details frequently include the endpoint, username,
	// and password required to connect to the managed resource.
	// +optional
	publishConnectionDetailsTo?: null | xpv1.#PublishConnectionDetailsTo @go(PublishConnectionDetailsTo,*xpv1.PublishConnectionDetailsTo)

	// ProviderConfigReference specifies how the provider that will be used to
	// create, observe, update, and delete this managed resource should be
	// configured.
	// +kubebuilder:default={"name": "default"}
	providerConfigRef?: null | xpv1.#Reference @go(ProviderConfigReference,*xpv1.Reference)

	// ProviderReference specifies the provider that will be used to create,
	// observe, update, and delete this managed resource.
	// Deprecated: Please use ProviderConfigReference, i.e. `providerConfigRef`
	providerRef?: null | xpv1.#Reference @go(ProviderReference,*xpv1.Reference)

	// DeletionPolicy specifies what will happen to the underlying external
	// when this managed resource is deleted - either "Delete" or "Orphan" the
	// external resource.
	// This field is planned to be deprecated in favor of the ManagementPolicy
	// field in a future release. Currently, both could be set independently and
	// non-default values would be honored if the feature flag is enabled.
	// See the design doc for more information: https://github.com/crossplane/crossplane/blob/499895a25d1a1a0ba1604944ef98ac7a1a71f197/design/design-doc-observe-only-resources.md?plain=1#L223
	// +optional
	// +kubebuilder:default=Delete
	deletionPolicy?: xpv1.#DeletionPolicy @go(DeletionPolicy)
}
