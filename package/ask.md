# Azure AKS Example

## Setup

```bash
# Create a management Kubernetes cluster manually (e.g., minikube, Rancher Desktop, eksctl, etc.)

helm repo add crossplane-stable \
    https://charts.crossplane.io/stable

helm repo update

helm upgrade --install crossplane crossplane-stable/crossplane \
    --namespace crossplane-system --create-namespace --wait

export SUBSCRIPTION_ID=$(az account show --query id -o tsv)

az ad sp create-for-rbac --sdk-auth --role Owner \
    --scopes /subscriptions/$SUBSCRIPTION_ID \
    | tee azure-creds.json

kubectl --namespace crossplane-system \
    create secret generic azure-creds \
    --from-file creds=./azure-creds.json

kubectl apply \
    --filename ../providers/provider-kubernetes-incluster.yaml

kubectl apply --filename ../config.yaml

kubectl create namespace infra

kubectl get pkgrev

# Wait until all the packages are healthy

kubectl apply \
    --filename ../providers/provider-config-azure.yaml
```

## Create an AKS Cluster

```bash
kubectl --namespace infra apply \
    --filename ../examples/azure-aks.yaml

kubectl get managed

kubectl --namespace infra get clusterclaims

export KUBECONFIG=$PWD/kubeconfig.yaml

az aks get-credentials --resource-group ateamaks \
    --name ateamaks --file $KUBECONFIG

kubectl get nodes
```

## Destroy

```bash
unset KUBECONFIG

kubectl --namespace infra delete \
    --filename ../examples/azure-aks.yaml

kubectl get managed
```