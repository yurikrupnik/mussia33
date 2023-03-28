import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { Providers } from "@mussia33/node/shared";

export interface ServicesResourceProps {
  services: Array<string>;
  project?: string;
  provider?: Providers;
}

export class ServicesResource extends pulumi.ComponentResource {
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

    // TODO! finish it!
    // this.registerOutputs({
    //   services: pulumi.all(promises).apply((r) => r.map((s) => s.service)),
    // });
  }
}
