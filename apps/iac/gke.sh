gcloud beta container --project "platform-hostv3" clusters create "manual1" \
  --region "europe-west4" --no-enable-basic-auth --cluster-version "1.29.6-gke.1038001" \
  --release-channel "regular" --machine-type "e2-standard-4" --image-type "COS_CONTAINERD" \
  --disk-type "pd-balanced" --disk-size "100" \
  --boot-disk-kms-key "projects/platform-hostv3/locations/europe-west4/keyRings/euw4-pulumi-keyring/cryptoKeys/airwayz-manager7-euw4" \
  --metadata disable-legacy-endpoints=true \
  --service-account "node-sa@platform-hostv3.iam.gserviceaccount.com" \
  --num-nodes "3" --logging=SYSTEM,WORKLOAD --monitoring=SYSTEM,STORAGE,POD,DEPLOYMENT,STATEFULSET,DAEMONSET,HPA,CADVISOR,KUBELET --enable-master-global-access --private-endpoint-subnetwork="projects/platform-hostv3/regions/europe-west4/subnetworks/eemshaven" --enable-ip-alias --network "projects/platform-hostv3/global/networks/primary-network" --subnetwork "projects/platform-hostv3/regions/europe-west4/subnetworks/eemshaven" --enable-intra-node-visibility --default-max-pods-per-node "110" --enable-autoscaling --min-nodes "0" --max-nodes "6" --location-policy "BALANCED" --security-posture=standard --workload-vulnerability-scanning=standard --enable-dataplane-v2 --enable-dataplane-v2-metrics --enable-dataplane-v2-flow-observability --no-enable-master-authorized-networks --addons HorizontalPodAutoscaling,HttpLoadBalancing,GcePersistentDiskCsiDriver,BackupRestore --enable-autoupgrade --enable-autorepair --max-surge-upgrade 1 --max-unavailable-upgrade 0 --labels mesh_id=proj-216307608115 --binauthz-evaluation-mode=DISABLED --enable-autoprovisioning --min-cpu 1 --max-cpu 1 --min-memory 1 --max-memory 1 --autoprovisioning-service-account=cluster-sa@platform-hostv3.iam.gserviceaccount.com --enable-autoprovisioning-autorepair \
  --enable-autoprovisioning-autoupgrade --autoprovisioning-max-surge-upgrade 1 --autoprovisioning-max-unavailable-upgrade 0 --database-encryption-key "projects/platform-hostv3/locations/europe-west4/keyRings/euw4-pulumi-keyring/cryptoKeys/airwayz-manager7-euw4" --enable-managed-prometheus --enable-vertical-pod-autoscaling \
  --resource-usage-bigquery-dataset "eu_gke_dataset" --enable-network-egress-metering \
  --enable-resource-consumption-metering --workload-pool "platform-hostv3.svc.id.goog" \
  --enable-shielded-nodes --security-group "gke-security-groups@airwayz.co" \
  --notification-config=pubsub=ENABLED,pubsub-topic=projects/platform-hostv3/topics/gke-topic \
  --enable-image-streaming --fleet-project=platform-hostv3


pulumi stack init
pulumi config set gcp:project platform-hostv4
pulumi config set gcp:region europe-west4
pulumi config set aws:region il-central-1
aws eks update-kubeconfig --region il-central-1 --name my-shit-eks-cluster
# In aws confisg
#aws configure region <region_name>
#aws set region <region_name>