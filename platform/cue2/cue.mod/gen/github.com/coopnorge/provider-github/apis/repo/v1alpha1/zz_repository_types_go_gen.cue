// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go github.com/coopnorge/provider-github/apis/repo/v1alpha1

package v1alpha1

import (
	"github.com/crossplane/crossplane-runtime/apis/common/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

#AdvancedSecurityObservation: {
}

#AdvancedSecurityParameters: {
	// Set to enabled to enable secret scanning on the repository. Can be enabled or disabled. If set to enabled, the repository's visibility must be public or security_and_analysis[0].advanced_security[0].status must also be set to enabled.
	// +kubebuilder:validation:Required
	status?: null | string @go(Status,*string)
}

#PagesObservation: {
	// Whether the rendered GitHub Pages site has a custom 404 page.
	custom404?: null | bool @go(Custom404,*bool)

	// URL to the repository on the web.
	htmlUrl?: null | string @go(HTMLURL,*string)

	// Set to enabled to enable secret scanning on the repository. Can be enabled or disabled. If set to enabled, the repository's visibility must be public or security_and_analysis[0].advanced_security[0].status must also be set to enabled.
	status?: null | string @go(Status,*string)
	url?:    null | string @go(URL,*string)
}

#PagesParameters: {
	// The custom domain for the repository. This can only be set after the repository has been created.
	// +kubebuilder:validation:Optional
	cname?: null | string @go(Cname,*string)

	// The source branch and directory for the rendered Pages site. See GitHub Pages Source below for details.
	// +kubebuilder:validation:Required
	source: [...#SourceParameters] @go(Source,[]SourceParameters)
}

#RepositoryObservation: {
	etag?: null | string @go(Etag,*string)

	// A string of the form "orgname/reponame".
	fullName?: null | string @go(FullName,*string)

	// URL that can be provided to git clone to clone the repository anonymously via the git protocol.
	gitCloneUrl?: null | string @go(GitCloneURL,*string)

	// URL to the repository on the web.
	htmlUrl?: null | string @go(HTMLURL,*string)

	// URL that can be provided to git clone to clone the repository via HTTPS.
	httpCloneUrl?: null | string @go(HTTPCloneURL,*string)
	id?:           null | string @go(ID,*string)

	// GraphQL global node id for use with v4 API
	nodeId?: null | string @go(NodeID,*string)

	// The repository's GitHub Pages configuration. See GitHub Pages Configuration below for details.
	// +kubebuilder:validation:Optional
	pages?: [...#PagesObservation] @go(Pages,[]PagesObservation)

	// GitHub ID for the repository
	repoId?: null | float64 @go(RepoID,*float64)

	// URL that can be provided to git clone to clone the repository via SSH.
	sshCloneUrl?: null | string @go(SSHCloneURL,*string)

	// URL that can be provided to svn checkout to check out the repository via GitHub's Subversion protocol emulation.
	svnUrl?: null | string @go(SvnURL,*string)
}

#RepositoryParameters: {
	// Set to true to allow auto-merging pull requests on the repository.
	// +kubebuilder:validation:Optional
	allowAutoMerge?: null | bool @go(AllowAutoMerge,*bool)

	// Set to false to disable merge commits on the repository.
	// +kubebuilder:validation:Optional
	allowMergeCommit?: null | bool @go(AllowMergeCommit,*bool)

	// Set to false to disable rebase merges on the repository.
	// +kubebuilder:validation:Optional
	allowRebaseMerge?: null | bool @go(AllowRebaseMerge,*bool)

	// Set to false to disable squash merges on the repository.
	// +kubebuilder:validation:Optional
	allowSquashMerge?: null | bool @go(AllowSquashMerge,*bool)

	// Set to true to always suggest updating pull request branches.
	// +kubebuilder:validation:Optional
	allowUpdateBranch?: null | bool @go(AllowUpdateBranch,*bool)

	// Set to true to archive the repository instead of deleting on destroy.
	// +kubebuilder:validation:Optional
	archiveOnDestroy?: null | bool @go(ArchiveOnDestroy,*bool)

	// Specifies if the repository should be archived. Defaults to false. NOTE Currently, the API does not support unarchiving.
	// +kubebuilder:validation:Optional
	archived?: null | bool @go(Archived,*bool)

	// Set to true to produce an initial commit in the repository.
	// +kubebuilder:validation:Optional
	autoInit?: null | bool @go(AutoInit,*bool)

	// (Deprecated: Use github_branch_default resource instead) The name of the default branch of the repository. NOTE: This can only be set after a repository has already been created,
	// and after a correct reference has been created for the target branch inside the repository. This means a user will have to omit this parameter from the
	// initial repository creation and create the target branch inside of the repository prior to setting this attribute.
	// Can only be set after initial repository creation, and only if the target branch exists
	// +kubebuilder:validation:Optional
	defaultBranch?: null | string @go(DefaultBranch,*string)

	// Automatically delete head branch after a pull request is merged. Defaults to false.
	// +kubebuilder:validation:Optional
	deleteBranchOnMerge?: null | bool @go(DeleteBranchOnMerge,*bool)

	// A description of the repository.
	// +kubebuilder:validation:Optional
	description?: null | string @go(Description,*string)

	// Use the name of the template without the extension. For example, "Haskell".
	// +kubebuilder:validation:Optional
	gitignoreTemplate?: null | string @go(GitignoreTemplate,*string)

	// Set to true to enable GitHub Discussions on the repository. Defaults to false.
	// +kubebuilder:validation:Optional
	hasDiscussions?: null | bool @go(HasDiscussions,*bool)

	// Set to true to enable the (deprecated) downloads features on the repository.
	// +kubebuilder:validation:Optional
	hasDownloads?: null | bool @go(HasDownloads,*bool)

	// Set to true to enable the GitHub Issues features
	// on the repository.
	// +kubebuilder:validation:Optional
	hasIssues?: null | bool @go(HasIssues,*bool)

	// Set to true to enable the GitHub Projects features on the repository. Per the GitHub documentation when in an organization that has disabled repository projects it will default to false and will otherwise default to true. If you specify true when it has been disabled it will return an error.
	// +kubebuilder:validation:Optional
	hasProjects?: null | bool @go(HasProjects,*bool)

	// Set to true to enable the GitHub Wiki features on
	// the repository.
	// +kubebuilder:validation:Optional
	hasWiki?: null | bool @go(HasWiki,*bool)

	// URL of a page describing the project.
	// +kubebuilder:validation:Optional
	homepageUrl?: null | string @go(HomepageURL,*string)

	// Set to true to not call the vulnerability alerts endpoint so the resource can also be used without admin permissions during read.
	// +kubebuilder:validation:Optional
	ignoreVulnerabilityAlertsDuringRead?: null | bool @go(IgnoreVulnerabilityAlertsDuringRead,*bool)

	// Set to true to tell GitHub that this is a template repository.
	// +kubebuilder:validation:Optional
	isTemplate?: null | bool @go(IsTemplate,*bool)

	// Use the name of the template without the extension. For example, "mit" or "mpl-2.0".
	// +kubebuilder:validation:Optional
	licenseTemplate?: null | string @go(LicenseTemplate,*string)

	// Can be PR_BODY, PR_TITLE, or BLANK for a default merge commit message.
	// +kubebuilder:validation:Optional
	mergeCommitMessage?: null | string @go(MergeCommitMessage,*string)

	// Can be PR_TITLE or MERGE_MESSAGE for a default merge commit title.
	// +kubebuilder:validation:Optional
	mergeCommitTitle?: null | string @go(MergeCommitTitle,*string)

	// The repository's GitHub Pages configuration. See GitHub Pages Configuration below for details.
	// +kubebuilder:validation:Optional
	pages?: [...#PagesParameters] @go(Pages,[]PagesParameters)

	// Set to true to create a private repository.
	// Repositories are created as public (e.g. open source) by default.
	// +kubebuilder:validation:Optional
	private?: null | bool @go(Private,*bool)

	// The repository's security and analysis configuration. See Security and Analysis Configuration below for details.
	// Security and analysis settings for the repository. To use this parameter you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository.
	// +kubebuilder:validation:Optional
	securityAndAnalysis?: [...#SecurityAndAnalysisParameters] @go(SecurityAndAnalysis,[]SecurityAndAnalysisParameters)

	// Can be PR_BODY, COMMIT_MESSAGES, or BLANK for a default squash merge commit message.
	// +kubebuilder:validation:Optional
	squashMergeCommitMessage?: null | string @go(SquashMergeCommitMessage,*string)

	// Can be PR_TITLE or COMMIT_OR_PR_TITLE for a default squash merge commit title.
	// +kubebuilder:validation:Optional
	squashMergeCommitTitle?: null | string @go(SquashMergeCommitTitle,*string)

	// Use a template repository to create this resource. See Template Repositories below for details.
	// +kubebuilder:validation:Optional
	template?: [...#TemplateParameters] @go(Template,[]TemplateParameters)

	// The list of topics of the repository.
	// +kubebuilder:validation:Optional
	topics?: [...null | string] @go(Topics,[]*string)

	// Can be public or private. If your organization is associated with an enterprise account using GitHub Enterprise Cloud or GitHub Enterprise Server 2.20+, visibility can also be internal. The visibility parameter overrides the private parameter.
	// +kubebuilder:validation:Optional
	visibility?: null | string @go(Visibility,*string)

	// Set to true to enable security alerts for vulnerable dependencies. Enabling requires alerts to be enabled on the owner level. (Note for importing: GitHub enables the alerts on public repos but disables them on private repos by default.) See GitHub Documentation for details. Note that vulnerability alerts have not been successfully tested on any GitHub Enterprise instance and may be unavailable in those settings.
	// +kubebuilder:validation:Optional
	vulnerabilityAlerts?: null | bool @go(VulnerabilityAlerts,*bool)
}

#SecretScanningObservation: {
}

#SecretScanningParameters: {
	// Set to enabled to enable secret scanning on the repository. Can be enabled or disabled. If set to enabled, the repository's visibility must be public or security_and_analysis[0].advanced_security[0].status must also be set to enabled.
	// +kubebuilder:validation:Required
	status?: null | string @go(Status,*string)
}

#SecretScanningPushProtectionObservation: {
}

#SecretScanningPushProtectionParameters: {
	// Set to enabled to enable secret scanning on the repository. Can be enabled or disabled. If set to enabled, the repository's visibility must be public or security_and_analysis[0].advanced_security[0].status must also be set to enabled.
	// +kubebuilder:validation:Required
	status?: null | string @go(Status,*string)
}

#SecurityAndAnalysisObservation: {
}

#SecurityAndAnalysisParameters: {
	// The advanced security configuration for the repository. See Advanced Security Configuration below for details. If a repository's visibility is public, advanced security is always enabled and cannot be changed, so this setting cannot be supplied.
	// +kubebuilder:validation:Optional
	advancedSecurity?: [...#AdvancedSecurityParameters] @go(AdvancedSecurity,[]AdvancedSecurityParameters)

	// The secret scanning configuration for the repository. See Secret Scanning Configuration below for details.
	// +kubebuilder:validation:Optional
	secretScanning?: [...#SecretScanningParameters] @go(SecretScanning,[]SecretScanningParameters)

	// The secret scanning push protection configuration for the repository. See Secret Scanning Push Protection Configuration below for details.
	// +kubebuilder:validation:Optional
	secretScanningPushProtection?: [...#SecretScanningPushProtectionParameters] @go(SecretScanningPushProtection,[]SecretScanningPushProtectionParameters)
}

#SourceObservation: {
}

#SourceParameters: {
	// The repository branch used to publish the site's source files. (i.e. main or gh-pages.
	// +kubebuilder:validation:Required
	branch?: null | string @go(Branch,*string)

	// The repository directory from which the site publishes (Default: /).
	// +kubebuilder:validation:Optional
	path?: null | string @go(Path,*string)
}

#TemplateObservation: {
}

#TemplateParameters: {
	// : Whether the new repository should include all the branches from the template repository (defaults to false, which includes only the default branch from the template).
	// +kubebuilder:validation:Optional
	includeAllBranches?: null | bool @go(IncludeAllBranches,*bool)

	// : The GitHub organization or user the template repository is owned by.
	// +kubebuilder:validation:Required
	owner?: null | string @go(Owner,*string)

	// : The name of the template repository.
	// +kubebuilder:validation:Required
	repository?: null | string @go(Repository,*string)
}

// RepositorySpec defines the desired state of Repository
#RepositorySpec: {
	v1.#ResourceSpec
	forProvider: #RepositoryParameters @go(ForProvider)
}

// RepositoryStatus defines the observed state of Repository.
#RepositoryStatus: {
	v1.#ResourceStatus
	atProvider?: #RepositoryObservation @go(AtProvider)
}

// Repository is the Schema for the Repositorys API. Creates and manages repositories within GitHub organizations or personal accounts
// +kubebuilder:printcolumn:name="READY",type="string",JSONPath=".status.conditions[?(@.type=='Ready')].status"
// +kubebuilder:printcolumn:name="SYNCED",type="string",JSONPath=".status.conditions[?(@.type=='Synced')].status"
// +kubebuilder:printcolumn:name="EXTERNAL-NAME",type="string",JSONPath=".metadata.annotations.crossplane\\.io/external-name"
// +kubebuilder:printcolumn:name="AGE",type="date",JSONPath=".metadata.creationTimestamp"
// +kubebuilder:subresource:status
// +kubebuilder:resource:scope=Cluster,categories={crossplane,managed,github}
#Repository: {
	metav1.#TypeMeta
	metadata?: metav1.#ObjectMeta @go(ObjectMeta)
	spec:      #RepositorySpec    @go(Spec)
	status?:   #RepositoryStatus  @go(Status)
}

// RepositoryList contains a list of Repositorys
#RepositoryList: {
	metav1.#TypeMeta
	metadata?: metav1.#ListMeta @go(ListMeta)
	items: [...#Repository] @go(Items,[]Repository)
}