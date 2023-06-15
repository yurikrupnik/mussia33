gcloud config set account yurik@sela.co.il
gcloud config set project yuri-sandbox

# install gcloud components install gke-gcloud-auth-plugin
# see https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke

kubectl cluster-info
gcloud container clusters get-credentials cluster-1 --zone us-central1-c
cat ~/.kube/config
# test retrieving secrets from gke
# https://cloud.google.com/kubernetes-engine/docs/tutorials/workload-identity-secrets
gcloud container --project "yuri-sandbox" clusters create-auto "autopilot-cluster-2" --region "me-west1" --release-channel "regular" --network "projects/yuri-sandbox/global/networks/default" --subnetwork "projects/yuri-sandbox/regions/me-west1/subnetworks/default" --cluster-ipv4-cidr "/17" --services-ipv4-cidr "/22"

gcloud beta container --project "yuri-sandbox" clusters create "cluster-2" --zone "europe-central2-b" --no-enable-basic-auth --cluster-version "1.25.8-gke.500" --release-channel "regular" --machine-type "e2-standard-4" --image-type "COS_CONTAINERD" --disk-type "pd-balanced" --disk-size "100" --metadata disable-legacy-endpoints=true --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" --num-nodes "3" --logging=SYSTEM,WORKLOAD --monitoring=SYSTEM --enable-ip-alias --network "projects/yuri-sandbox/global/networks/default" --subnetwork "projects/yuri-sandbox/regions/europe-central2/subnetworks/default" --no-enable-intra-node-visibility --default-max-pods-per-node "110" --no-enable-master-authorized-networks --addons HorizontalPodAutoscaling,HttpLoadBalancing,GcePersistentDiskCsiDriver --enable-autoupgrade --enable-autorepair --max-surge-upgrade 1 --max-unavailable-upgrade 0 --labels mesh_id=proj-394442038451 --enable-autoprovisioning --min-cpu 1 --max-cpu 1 --min-memory 1 --max-memory 1 --enable-autoprovisioning-autorepair --enable-autoprovisioning-autoupgrade --autoprovisioning-max-surge-upgrade 1 --autoprovisioning-max-unavailable-upgrade 0 --enable-managed-prometheus --enable-vertical-pod-autoscaling --workload-pool "yuri-sandbox.svc.id.goog" --enable-shielded-nodes --node-locations "europe-central2-b"

gcloud beta container --project "yuri-sandbox" clusters create "cluster-2" --zone "europe-central2-b" --no-enable-basic-auth --cluster-version "1.25.8-gke.500" --release-channel "regular" --machine-type "e2-standard-4" --image-type "COS_CONTAINERD" --disk-type "pd-balanced" --disk-size "100" --metadata disable-legacy-endpoints=true --scopes "https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" --num-nodes "3" --logging=SYSTEM,WORKLOAD --monitoring=SYSTEM --enable-ip-alias --network "projects/yuri-sandbox/global/networks/default" --subnetwork "projects/yuri-sandbox/regions/europe-central2/subnetworks/default" --no-enable-intra-node-visibility --default-max-pods-per-node "110" --no-enable-master-authorized-networks --addons HorizontalPodAutoscaling,HttpLoadBalancing,CloudRun,GcePersistentDiskCsiDriver --enable-autoupgrade --enable-autorepair --max-surge-upgrade 1 --max-unavailable-upgrade 0 --labels mesh_id=proj-394442038451 --enable-autoprovisioning --min-cpu 1 --max-cpu 1 --min-memory 1 --max-memory 1 --enable-autoprovisioning-autorepair --enable-autoprovisioning-autoupgrade --autoprovisioning-max-surge-upgrade 1 --autoprovisioning-max-unavailable-upgrade 0 --enable-managed-prometheus --enable-vertical-pod-autoscaling --workload-pool "yuri-sandbox.svc.id.goog" --enable-shielded-nodes --node-locations "europe-central2-b"

export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')

gcloud compute firewall-rules create allow-gateway-http --allow "tcp:$INGRESS_PORT"
gcloud compute firewall-rules create allow-gateway-https --allow "tcp:$SECURE_INGRESS_PORT"

# secrets in gke - check in local dev
#https://cloud.google.com/kubernetes-engine/docs/tutorials/workload-identity-secrets#local-shell

# see docs for gcp ingress
# https://cloud.google.com/architecture/exposing-service-mesh-apps-through-gke-ingress#anthos-service-mesh_2
# check this!
function join_by { local IFS="$1"; shift; echo "$*"; }
ALL_CLUSTER_CIDRS=$(gcloud --project $PROJECT_ID container clusters list --format='value(clusterIpv4Cidr)' | sort | uniq)
ALL_CLUSTER_CIDRS=$(join_by , $(echo "${ALL_CLUSTER_CIDRS}"))
ALL_CLUSTER_NETTAGS=$(gcloud --project $PROJECT_ID compute instances list --format='value(tags.items.[0])' | sort | uniq)
ALL_CLUSTER_NETTAGS=$(join_by , $(echo "${ALL_CLUSTER_NETTAGS}"))

gcloud compute firewall-rules create istio-multicluster-pods \
    --allow=tcp,udp,icmp,esp,ah,sctp \
    --direction=INGRESS \
    --priority=900 \
    --source-ranges="${ALL_CLUSTER_CIDRS}" \
    --target-tags="${ALL_CLUSTER_NETTAGS}" --quiet

# vidos
# https://www.youtube.com/watch?v=dIEfijAex_4
