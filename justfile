set export
set shell := ["sh", "-c"]
GCP_PROJECT := `gcloud config get-value project`

default:
    @just --list --unsorted

git-sub:
  git submodule update --init --recursive

git-add:
  git submodule add https://github.com/yurikrupnik/sdp-demo sdp-demo
git-remove:
  git submodule add https://github.com/yurikrupnik/sdp-demo sdp-demo
# todo with all ts configs!
# https://github.com/stephenh/ts-proto#nestjs-support
daily:
  echo "daily stuffs"

cue:
  cue import platform/crossplane/storage/composition-gcp.yaml
  cue eval platform/crossplane/storage/composition-gcp.cue

cloud:
  gcloud builds submit --region=REGION --config [CONFIG_FILE_PATH] .

#local-mongodb-docker-compose:
#  echo stam
# run mongodb in an k8s cluster
local-cluster-mongodb-docker-compose:
  helm install my-release my-repo/mongodb

task1:
  task -t k8s/Taskfile.yaml up

start:
  -ctlptl create cluster minikube --registry=ctlptl-registry
  minikube addons enable gcp-auth
#  tilt up
stop:
  #tilt down
  ctlptl delete cluster minikube
#  just install-linkerd
#  just run-titl-cluster

install-linkerd:
  linkerd install --crds | kubectl apply -f -
  linkerd install | kubectl apply -f -
  linkerd check

install-viz:
  linkerd viz install | kubectl apply -f -
  linkerd viz dashboard &

build-all:
  pnpm nx affected --target=build.yaml --parallel --max-parallel=10 --prod

# Check for unused packages.
cargo-unused-deps:
  cargo +nightly udeps --all-targets

kaniko:
  docker run \
  -v $HOME/.config/gcloud:/root/.config/gcloud \
  -v $HOME/.config/kaniko/.docker:/root/.config/kaniko.docker \
  -v $PWD/:/workspace \
  gcr.io/kaniko-project/executor:debug \
  --dockerfile /workspace/Dockerfile \
  --destination "yurikrupnik/node-api-rest" \
  --build.yaml-arg "DIST_PATH=dist/apps/node/api-res" \
  --target node

task-list-all:
   task -ap

task-list-k8s:
  task -a -p -t k8s/Taskfile.yaml up
task-run-k8s:
  task -a -p -t k8s/Taskfile.yaml up
task-json:
  task -a -p -j -t k8s/Taskfile.yaml up
