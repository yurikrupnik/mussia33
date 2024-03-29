// Code generated by cue get go. DO NOT EDIT.

//cue:generate cue get go helm.sh/helm/v3/pkg/chart

package chart

#APIVersionV1: "v1"

#APIVersionV2: "v2"

// Chart is a helm package that contains metadata, a default config, zero or more
// optionally parameterizable templates, and zero or more charts (dependencies).
#Chart: {
	// Metadata is the contents of the Chartfile.
	metadata?: null | #Metadata @go(Metadata,*Metadata)

	// Lock is the contents of Chart.lock.
	lock?: null | #Lock @go(Lock,*Lock)

	// Templates for this chart.
	templates: [...null | #File] @go(Templates,[]*File)

	// Values are default config for this chart.
	values: {...} @go(Values,map[string]interface{})

	// Schema is an optional JSON schema for imposing structure on Values
	schema: bytes @go(Schema,[]byte)

	// Files are miscellaneous files in a chart archive,
	// e.g. README, LICENSE, etc.
	files: [...null | #File] @go(Files,[]*File)
}

#CRD: {
	// Name is the File.Name for the crd file
	Name: string

	// Filename is the File obj Name including (sub-)chart.ChartFullPath
	Filename: string

	// File is the File obj for the crd
	File?: null | #File @go(,*File)
}
