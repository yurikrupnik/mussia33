import { BadRequestException } from "@nestjs/common";

export function handleError(err: Error): never {
  throw new BadRequestException(err.message);
}
