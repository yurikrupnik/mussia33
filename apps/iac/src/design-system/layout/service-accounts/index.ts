import { ServiceAccountResource } from "../../core/service-account";

function ServiceAccounts(project: string) {
  const secretPullerSa = new ServiceAccountResource("secret-pullera", {
    accountArgs: {
      project: project,
      accountId: "secret-puller",
      description: "Service account to get (pull) secrets",
      displayName: "Secret Puller",
    },
    iAMBindingArgs: [
      {
        project: project,
        role: "roles/secretmanager.secretAccessor",
      },
      // {
      //   project: gcpProject,
      //   role: "roles/container.developer",
      //   // role: "roles/iam.serviceAccountTokenCreator",
      // },
    ],
  });

  const iacManagerSa = new ServiceAccountResource("iac-manager", {
    accountArgs: {
      project: project,
      accountId: "iac-manager",
      disabled: false,
      description: "Service account to manage (crud) cloud resources",
      displayName: "IAC Manager",
    },
    iAMBindingArgs: [
      {
        project: project,
        role: "roles/iam.serviceAccountTokenCreator",
      },
    ],
  });

  const containerWriterSa = new ServiceAccountResource(
    "github-container-writer",
    {
      accountArgs: {
        project: project,
        accountId: "container-writer",
        disabled: false,
        description: "Service account to write (push) containers",
        displayName: "Container writer",
      },
      iAMBindingArgs: [
        {
          project: project,
          role: "roles/artifactregistry.writer",
        },
      ],
    },
  );

  const containerReaderSa = new ServiceAccountResource(
    "github-container-reader",
    {
      accountArgs: {
        project: project,
        accountId: "container-reader",
        disabled: false,
        description: "Service account to read (pull) containers",
        displayName: "Container reader",
      },
      iAMBindingArgs: [
        {
          project: project,
          role: "roles/artifactregistry.reader",
        },
      ],
    },
  );
}
