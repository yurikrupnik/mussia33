PROJECT_ID=shared-v1
SA_NAME=crossplane-sa
ACCOUNT=$SA_NAME@$PROJECT_ID.iam.gserviceaccount.com

gcloud iam service-accounts keys delete crossplane-sa \
    --iam-account=$ACCOUNT

gcloud iam service-accounts delete $ACCOUNT
