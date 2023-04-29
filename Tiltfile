
#k8s_yaml(local('helm template --set key1=val1,key2=val2 ./charts/main-chart'))
#watch_file('/charts/main-chart')

# include('./k8s/helm/Tiltfile')

local_resource('task-lists', cmd='task -a', labels=['task'])
# local_resource('local-tauri-app', cmd='cargo tauri dev', dir="/examples/personal-desktop-app" deps=['/examples/personal-desktop-app'], labels=['tauri'])
# local_resource('local-kubernetes-operator', cmd='cargo tauri dev', dir="/examples/personal-desktop-app" deps=['/examples/personal-desktop-app'], labels=['tauri'])

local_resource('pnpm', cmd='pnpm install', deps=['package.json'], labels=['pnpm'])

local_resource('setup:crossplane', cmd='task setup:crossplane', deps=['package.json'], labels=['pnpm'])
# local_resource('k8s-operator', cmd='cargo run --bin k8s_operator', deps=[''], labels=['cargo'])
# local_resource('cargo-build-k8s_operator', cmd='cargo build --bin k8s_operator', deps=[''], labels=['cargo'])
local_resource('proto-generate', cmd='just proto-generate', deps=['_proto/'], labels=['just'])

