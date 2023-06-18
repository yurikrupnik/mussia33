import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

export interface ServicesResourceProps {
  services: Array<string>;
  project?: string;
}

export class ServicesResource extends pulumi.ComponentResource {
  readonly firstService: gcp.projects.Service;
  constructor(
    name: string,
    servicesResourceProps: ServicesResourceProps,
    opts?: pulumi.ResourceOptions
  ) {
    super("mussia33:core:service:", name, {}, opts);
    const promises = servicesResourceProps.services.map((service) => {
      return new gcp.projects.Service(
        service,
        {
          disableDependentServices: true,
          service,
        },
        { parent: this, ...opts }
      );
    });

    this.firstService = promises[0];
  }
}
