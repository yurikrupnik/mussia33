


gcloud iam service-accounts create crossplane-sa \
    --description="crossplane-sa" \
    --display-name="My service account for crossplane"

gcloud projects add-iam-policy-binding mussia-infra \
    --member="serviceAccount:crossplane-sa@mussia-infra.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding mussia-infra \
    --member="serviceAccount:crossplane-sa@mussia-infra.iam.gserviceaccount.com" \
    --role="roles/pubsub.admin"

gcloud projects add-iam-policy-binding mussia-infra \
    --member="serviceAccount:crossplane-sa@mussia-infra.iam.gserviceaccount.com" \
    --role="roles/cloudsql.admin"

gcloud projects add-iam-policy-binding mussia-infra \
    --member="serviceAccount:crossplane-sa@mussia-infra.iam.gserviceaccount.com" \
    --role="roles/container.admin"

gcloud iam service-accounts keys create gcp-credentials.json \
    --iam-account=crossplane-sa@mussia-infra.iam.gserviceaccount.com
