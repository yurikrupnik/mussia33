package workflows

import (
	"tool/file"
	"encoding/yaml"
	"json.schemastore.org/github"
)

workflows: [...{
	filename: string
	workflow: github.#Workflow
}]

workflows: [
	{
		filename: "workflow1.yaml"
		workflow: Workflow1
	},
	{
		filename: "workflow2.yaml"
		workflow: Workflow2
	}
]

command: genworkflows: {
	for w in workflows {
		"\(w.filename)": file.Create & {
			filename: w.filename
			contents: yaml.Marshal(w.workflow)
		}
	}
}

_#bashWorkflow: github.#Workflow & {
	jobs: [string]: defaults: run: shell: "bash"
}

_#installGo: _#step & {
	name: "Install Go"
	uses: "actions/setug-go@v4"
	with: "go-version": string
}
