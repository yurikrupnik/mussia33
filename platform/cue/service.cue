package templates

import (
	"strings"
	corev1 "k8s.io/api/core/v1"
)

Deployment: spec: template: metadata:
	annotations: "prometheus.io/scrape": *"true" | "false"

Deployment: spec: template: spec: containers: [...{
	livenessProbe: {
		httpGet: path: "/debug/health"
		httpGet: port: *8080 | int
		initialDelaySeconds: *40 | >10
		periodSeconds: *3 | int
	}
}]

#Service: corev1.#Service & {
	_config: #Config
	apiVersion: "v1"
	kind: "Service"
	metadata: _config.metadata
	spec: corev1.#ServiceSpec & {
		type: corev1.#ServiceTypeClusterIP
		selector: _config.selectorLabels
		ports: [
			{
				name: "http"
				port: _config.service.port
				targetPort: _config.service.targetPort
				protocol: "TCP"
			}
		]
	}
}


#Video: {
	id: string
	url: *"https://youtube/" | string
	title: string & strings.MaxRunes(70)
	description: *"N/A" | string
	likes: *0 | int & >= 0
}
