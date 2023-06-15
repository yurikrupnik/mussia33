# local_resource('pnpm', cmd='pnpm install', deps=['package.json'], labels=['pnpm'])
# local_resource('compose', cmd='task compose:up', deps=['scripts/compose.yaml'], labels=['task'])
# local_resource('protoc', cmd='task protoc', deps=['_porot/'], labels=['task'])

#k8s_yaml(local('helm template --set key1=val1,key2=val2 ./charts/main-chart'))
#watch_file('/charts/main-chart')

# include('./k8s/helm/Tiltfile')

# k8s_yaml(["k8s/proto.yaml"])

# k8s_yaml(kustomize('k8s/base'))
# k8s_yaml(kustomize('_proto/'))
# Local dev resources
# include('./libs/cdk8s/Tiltfile')
include('./apps/frontend/solid-app/Tiltfile')
include('./apps/node/nest-app/Tiltfile')
include('./apps/node/node-users-redis/Tiltfile')
include('./apps/node/node-users-grpc/Tiltfile')

# local_resource('local-tauri-app', cmd='cargo tauri dev', dir="/examples/personal-desktop-app" deps=['/examples/personal-desktop-app'], labels=['tauri'])
# local_resource('local-kubernetes-operator', cmd='cargo tauri dev', dir="/examples/personal-desktop-app" deps=['/examples/personal-desktop-app'], labels=['tauri'])

# local_resource('setup:crossplane', cmd='task setup:crossplane', deps=['package.json'], labels=['pnpm'])
# local_resource('k8s-operator', cmd='cargo run --bin k8s_operator', deps=[''], labels=['cargo'])
# local_resource('cargo-build-k8s_operator', cmd='cargo build --bin k8s_operator', deps=[''], labels=['cargo'])