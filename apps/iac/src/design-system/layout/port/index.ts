import * as pulumi from '@pulumi/pulumi';
import * as port from '@port-labs/port';
import { Repository, RepositoryArgs } from '@pulumi/gcp/artifactregistry';

export interface PortResourceProps {
  // repositoryArgs: RepositoryArgs;
}

export class PortResource extends pulumi.ComponentResource {
  // readonly dockerRepo: pulumi.Output<string>;
  constructor(
    name: string,
    portResourceProps: PortResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super('airwayz:core:artifactory:', name, {}, opts);
    const blueprint = new port.Blueprint('microservice', {
      identifier: 'microservice',
      title: 'Microservice',
      properties: {
        stringProps: {
          language: {
            default: 'Go',
          },
          velaType: {
            default: 'webserver', //
          },
        },
      },
    });

    const entity = new port.Entity('monolith', {
      identifier: 'monolith',
      title: 'monolith',
      blueprint: blueprint.identifier,
      properties: {
        stringProps: {
          language: 'Node',
        },
      },
    });

    // const { repositoryArgs } = portResourceProps;
    // const { location, project } = repositoryArgs;
    // const artifactRegistryRepo = new Repository(name, repositoryArgs, {
    //   parent: this,
    //   ...opts,
    // });
    // this.dockerRepo = pulumi.interpolate`${location}-docker.pkg.dev/${project}/${artifactRegistryRepo.repositoryId}`;
  }
}
