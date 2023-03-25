enum ContainerRegistryProvider {
  DOCKER,
  GCP,
  AWS,
  AZURE,
  GITHUB,
}

enum SecretManagerProviders {
  GCP_SECRET_MANAGER,
  AWS_SECRET_MANAGER,
  VAULT_SECRET_MANAGER,
  LOCAL_SECRET_MANAGER,
  PULUMI_SECRET_MANAGER,
  ONE_PASSWORD_SECRET_MANAGER,
}

const dropDownData = [{}];

const SecretManager = () => {
  return <div>SecretManager</div>;
};

export default SecretManager;
