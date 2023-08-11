local_resource('pnpm', cmd='pnpm install', deps=['package.json'], labels=['pnpm'])
# local_resource('compose', cmd='task compose:up', deps=['scripts/compose.yaml'], labels=['task'])
# local_resource('protoc', cmd='task protoc', deps=['_porot/'], labels=['task'])

#k8s_yaml(local('helm template --set key1=val1,key2=val2 ./charts/main-chart'))
#watch_file('/charts/main-chart')

# include('./k8s/helm/Tiltfile')

# k8s_yaml(["k8s/proto.yaml"])

# k8s_yaml(kustomize('k8s/base'))
# k8s_yaml('k8s/base/core/core.yaml')
# k8s_yaml(["platform/crossplane/storage/compositeResourceDefinition.yaml", "platform/crossplane/storage/composition.yaml"])
# Local dev resources
# include('./libs/cdk8s/Tiltfile')

k8s_yaml(kustomize('_proto/'))
# include('./apps/rust/master_operator/Tiltfile')
include('./apps/rust/actix_app/Tiltfile')
include('./apps/rust/clapper/Tiltfile')
include('./apps/go/fiber-app/Tiltfile')
include('./apps/frontend/solid-app/Tiltfile')
include('./apps/node/nest-app/Tiltfile')
include('./apps/node/node-users-redis/Tiltfile')
# include('./apps/node/node-users-grpc/Tiltfile')
# include('./submodules/tauri-app/Tiltfile') # include if not started via cli
# include('./submodules/first-rust-app/Tiltfile')
k8s_yaml(kustomize('k8s/overlays/dev'))
# k8s_yaml(kustomize('k8s/overlays/prod'))
# local_resource('local-tauri-app', cmd='cargo tauri dev', dir="/examples/personal-desktop-app" deps=['/examples/personal-desktop-app'], labels=['tauri'])
# local_resource('local-kubernetes-operator', cmd='cargo tauri dev', dir="/examples/personal-desktop-app" deps=['/examples/personal-desktop-app'], labels=['tauri'])

# local_resource('setup:crossplane', cmd='task setup:crossplane', deps=['package.json'], labels=['pnpm'])
# local_resource('k8s-operator', cmd='cargo run --bin k8s_operator', deps=[''], labels=['cargo'])
# local_resource('cargo-build-k8s_operator', cmd='cargo build --bin k8s_operator', deps=[''], labels=['cargo'])


# k8s_resource("my-release-grafana", port_forwards="3322:3000")
