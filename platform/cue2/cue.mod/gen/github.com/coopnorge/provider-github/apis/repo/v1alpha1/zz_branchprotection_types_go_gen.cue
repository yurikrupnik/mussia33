// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go github.com/coopnorge/provider-github/apis/repo/v1alpha1

package v1alpha1

import (
	"github.com/crossplane/crossplane-runtime/apis/common/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

#BranchProtectionObservation: {
	id?: null | string @go(ID,*string)
}

#BranchProtectionParameters: {
	// Boolean, setting this to true to allow the branch to be deleted.
	// +kubebuilder:validation:Optional
	allowsDeletions?: null | bool @go(AllowsDeletions,*bool)

	// Boolean, setting this to true to allow force pushes on the branch.
	// +kubebuilder:validation:Optional
	allowsForcePushes?: null | bool @go(AllowsForcePushes,*bool)

	// Boolean, setting this to true to block creating the branch.
	// +kubebuilder:validation:Optional
	blocksCreations?: null | bool @go(BlocksCreations,*bool)

	// Boolean, setting this to true enforces status checks for repository administrators.
	// +kubebuilder:validation:Optional
	enforceAdmins?: null | bool @go(EnforceAdmins,*bool)

	// Boolean, Setting this to true will make the branch read-only and preventing any pushes to it. Defaults to false
	// +kubebuilder:validation:Optional
	lockBranch?: null | bool @go(LockBranch,*bool)

	// Identifies the protection rule pattern.
	// +kubebuilder:validation:Required
	pattern?: null | string @go(Pattern,*string)

	// The list of actor Names/IDs that may push to the branch. Actor names must either begin with a "/" for users or the organization name followed by a "/" for teams.
	// +kubebuilder:validation:Optional
	pushRestrictions?: [...null | string] @go(PushRestrictions,[]*string)

	// The name or node ID of the repository associated with this branch protection rule.
	// Node ID or name of repository
	// +crossplane:generate:reference:type=github.com/coopnorge/provider-github/apis/repo/v1alpha1.Repository
	// +kubebuilder:validation:Optional
	repositoryId?: null | string @go(RepositoryID,*string)

	// Reference to a Repository in repo to populate repositoryId.
	// +kubebuilder:validation:Optional
	repositoryIdRef?: null | v1.#Reference @go(RepositoryIDRef,*v1.Reference)

	// Selector for a Repository in repo to populate repositoryId.
	// +kubebuilder:validation:Optional
	repositoryIdSelector?: null | v1.#Selector @go(RepositoryIDSelector,*v1.Selector)

	// Boolean, setting this to true requires all conversations on code must be resolved before a pull request can be merged.
	// +kubebuilder:validation:Optional
	requireConversationResolution?: null | bool @go(RequireConversationResolution,*bool)

	// Boolean, setting this to true requires all commits to be signed with GPG.
	// +kubebuilder:validation:Optional
	requireSignedCommits?: null | bool @go(RequireSignedCommits,*bool)

	// Boolean, setting this to true enforces a linear commit Git history, which prevents anyone from pushing merge commits to a branch
	// +kubebuilder:validation:Optional
	requiredLinearHistory?: null | bool @go(RequiredLinearHistory,*bool)

	// Enforce restrictions for pull request reviews. See Required Pull Request Reviews below for details.
	// +kubebuilder:validation:Optional
	requiredPullRequestReviews?: [...#RequiredPullRequestReviewsParameters] @go(RequiredPullRequestReviews,[]RequiredPullRequestReviewsParameters)

	// Enforce restrictions for required status checks. See Required Status Checks below for details.
	// +kubebuilder:validation:Optional
	requiredStatusChecks?: [...#RequiredStatusChecksParameters] @go(RequiredStatusChecks,[]RequiredStatusChecksParameters)
}

#RequiredPullRequestReviewsObservation: {
}

#RequiredPullRequestReviewsParameters: {
	// :  Dismiss approved reviews automatically when a new commit is pushed. Defaults to false.
	// +kubebuilder:validation:Optional
	dismissStaleReviews?: null | bool @go(DismissStaleReviews,*bool)

	// :  The list of actor Names/IDs with dismissal access. If not empty, restrict_dismissals is ignored. Actor names must either begin with a "/" for users or the organization name followed by a "/" for teams.
	// +kubebuilder:validation:Optional
	dismissalRestrictions?: [...null | string] @go(DismissalRestrictions,[]*string)

	// :  The list of actor Names/IDs that are allowed to bypass pull request requirements. Actor names must either begin with a "/" for users or the organization name followed by a "/" for teams.
	// +kubebuilder:validation:Optional
	pullRequestBypassers?: [...null | string] @go(PullRequestBypassers,[]*string)

	// :  Require an approved review in pull requests including files with a designated code owner. Defaults to false.
	// +kubebuilder:validation:Optional
	requireCodeOwnerReviews?: null | bool @go(RequireCodeOwnerReviews,*bool)

	// :  Require that The most recent push must be approved by someone other than the last pusher.  Defaults to false
	// +kubebuilder:validation:Optional
	requireLastPushApproval?: null | bool @go(RequireLastPushApproval,*bool)

	// 6. This requirement matches GitHub's API, see the upstream documentation for more information.
	// (https://developer.github.com/v3/repos/branches/#parameters-1) for more information.
	// +kubebuilder:validation:Optional
	requiredApprovingReviewCount?: null | float64 @go(RequiredApprovingReviewCount,*float64)

	// :  Restrict pull request review dismissals.
	// +kubebuilder:validation:Optional
	restrictDismissals?: null | bool @go(RestrictDismissals,*bool)
}

#RequiredStatusChecksObservation: {
}

#RequiredStatusChecksParameters: {
	// :  The list of status checks to require in order to merge into this branch. No status checks are required by default.
	// +kubebuilder:validation:Optional
	contexts?: [...null | string] @go(Contexts,[]*string)

	// :  Require branches to be up to date before merging. Defaults to false.
	// +kubebuilder:validation:Optional
	strict?: null | bool @go(Strict,*bool)
}

// BranchProtectionSpec defines the desired state of BranchProtection
#BranchProtectionSpec: {
	v1.#ResourceSpec
	forProvider: #BranchProtectionParameters @go(ForProvider)
}

// BranchProtectionStatus defines the observed state of BranchProtection.
#BranchProtectionStatus: {
	v1.#ResourceStatus
	atProvider?: #BranchProtectionObservation @go(AtProvider)
}

// BranchProtection is the Schema for the BranchProtections API. Protects a GitHub branch.
// +kubebuilder:printcolumn:name="READY",type="string",JSONPath=".status.conditions[?(@.type=='Ready')].status"
// +kubebuilder:printcolumn:name="SYNCED",type="string",JSONPath=".status.conditions[?(@.type=='Synced')].status"
// +kubebuilder:printcolumn:name="EXTERNAL-NAME",type="string",JSONPath=".metadata.annotations.crossplane\\.io/external-name"
// +kubebuilder:printcolumn:name="AGE",type="date",JSONPath=".metadata.creationTimestamp"
// +kubebuilder:subresource:status
// +kubebuilder:resource:scope=Cluster,categories={crossplane,managed,github}
#BranchProtection: {
	metav1.#TypeMeta
	metadata?: metav1.#ObjectMeta      @go(ObjectMeta)
	spec:      #BranchProtectionSpec   @go(Spec)
	status?:   #BranchProtectionStatus @go(Status)
}

// BranchProtectionList contains a list of BranchProtections
#BranchProtectionList: {
	metav1.#TypeMeta
	metadata?: metav1.#ListMeta @go(ListMeta)
	items: [...#BranchProtection] @go(Items,[]BranchProtection)
}