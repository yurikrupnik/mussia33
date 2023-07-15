apiVersion: "apps/v1"
kind:       "Deployment"
metadata: {
	name: "frontend-solid-app"
	//  namespace: mussia30
	labels: {
		app:     "frontend-solid-app"
		version: "v1"
	}
}
spec: {
	replicas: 1

	template: {
		metadata: {
			name: "frontend-solid-app"
			labels: {
				app:     "frontend-solid-app"
				version: "v1"
			}
			annotations: {
				"linkerd.io/inject":                             "enabled"
				"consul.hashicorp.com/connect-inject":           "true"
				"consul.hashicorp.com/connect-service":          "frontend-solid-app"
				"consul.hashicorp.com/connect-service-protocol": "http"
				"consul.hashicorp.com/service-meta-version":     "v.1.1"
				"prometheus.io/scrape":                          "true"
				"prometheus.io/port":                            "9102"
			}
		}
		spec: {
			serviceAccountName: "frontend-solid-app"
			containers: [{
				name: "frontend-solid-app"
				ports: [{
					containerPort: 80
					name:          "http"
				}]
				//          image: europe-west1-docker.pkg.dev/maya-mussia/nx-go-playground/frontend-solid-app:latest
				image: "yurikrupnik/frontend-solid-app:latest"
				//          image: nginx:latest
				imagePullPolicy: "IfNotPresent"
				volumeMounts: [{
					//            #            - mountPath: /etc/nginx/conf.d
					mountPath: "/etc/nginx/templates"
					name:      "nginx-config"
				}]
				env: [{
					// not` working only front end
					name: "UPSTREAM_HOST"
					valueFrom: configMapKeyRef: {
						key:  "upstream_host"
						name: "proxy-envs"
					}
				}, {
					name: "UPSTREAM_PORT"
					valueFrom: configMapKeyRef: {
						key:  "upstream_port"
						name: "proxy-envs"
					}
				}, {
					name: "UPSTREAM_NAME"
					valueFrom: configMapKeyRef: {
						key:  "upstream_name"
						name: "proxy-envs"
					}
				}]
			}]

			restartPolicy: "Always"
			volumes: [{
				name: "nginx-config"
				configMap: name: "nginx-config"
			}, {
				name: "proxy-envs"
				configMap: name: "proxy-envs"
			}]
		}
	}
	selector: matchLabels: {
		app:     "frontend-solid-app"
		version: "v1"
	}
}
