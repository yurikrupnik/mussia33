// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go helm.sh/helm/v3/pkg/release

package release

import "helm.sh/helm/v3/pkg/time"

// Info describes release information.
#Info: {
	// FirstDeployed is when the release was first deployed.
	first_deployed?: time.#Time @go(FirstDeployed)

	// LastDeployed is when the release was last deployed.
	last_deployed?: time.#Time @go(LastDeployed)

	// Deleted tracks when this object was deleted.
	deleted: time.#Time @go(Deleted)

	// Description is human-friendly "log entry" about this release.
	description?: string @go(Description)

	// Status is the current state of the release
	status?: #Status @go(Status)

	// Contains the rendered templates/NOTES.txt if available
	notes?: string @go(Notes)
}
