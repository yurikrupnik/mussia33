import { merge } from "lodash";
import * as pulumi from "@pulumi/pulumi";
import { Service, ServiceArgs } from "@pulumi/gcp/projects";

export interface ServiceResourceProps {
  gcpServices: Array<string>;
}

export class ServiceResource extends pulumi.ComponentResource {
  readonly services: pulumi.Output<Array<Service>>;
  constructor(
    name: string,
    serviceResourceProps: ServiceResourceProps,
    opts?: pulumi.ResourceOptions,
  ) {
    super("iac:core:services", name, {}, opts);
    const { gcpServices } = serviceResourceProps;
    let services = gcpServices.map((service, i) => {
      return new Service(
        service,
        merge(
          {
            disableOnDestroy: false,
            disableDependentServices: false,
          } as ServiceArgs,
          service,
        ),
        merge({ parent: this }, opts),
      );
    });
    this.services = pulumi.output(services);
  }
}
