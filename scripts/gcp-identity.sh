#! /bin/bash
set -e

export PROJECT_ID="gcp-playground-365316" # update with your value

gcloud iam service-accounts create "docker-builder" \
  --project "${PROJECT_ID}"

gcloud services enable iamcredentials.googleapis.com \
  --project "${PROJECT_ID}"

gcloud iam workload-identity-pools create "my-pool" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --display-name="Demo pool"

WORKLOAD_IDENTITY_POOL_ID=$(gcloud iam workload-identity-pools describe "my-pool" \
            --project="${PROJECT_ID}" \
            --location="global" \
            --format="value(name)")

echo $WORKLOAD_IDENTITY_POOL_ID

gcloud iam workload-identity-pools providers create-oidc "my-provider" \
  --project="${PROJECT_ID}" \
  --location="global" \
  --workload-identity-pool="my-pool" \
  --display-name="Demo provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"

export REPO="yurikrupnik/nx-go-playground"

gcloud iam service-accounts add-iam-policy-binding \
  "my-service-account@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="${PROJECT_ID}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${REPO}"
