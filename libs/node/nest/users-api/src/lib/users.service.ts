import { Injectable } from "@nestjs/common";
// import { faker } from "@faker-js/faker";
import {
  LoginProviders,
  User,
  UserDocument,
  UserRoles,
} from "./entities/user.entity";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CrudApiService } from "@mussia33/node/nest/generic-api";
// import { randomEnum } from "@mussia33/node/ts-utils";

@Injectable()
export class UsersService extends CrudApiService<
  UserDocument,
  CreateUserDto,
  UpdateUserDto,
  UsersRepository
> {
  constructor(private readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }

  // static createMock(ojb?: Partial<User>): User {
  //   return Object.assign(
  //     {},
  //     {
  //       email: faker.internet.email(),
  //       name: faker.internet.userName(),
  //       password: faker.internet.password(),
  //       tenantId: faker.datatype.uuid(),
  //       provider: randomEnum(LoginProviders),
  //       role: randomEnum(UserRoles),
  //     },
  //     ojb
  //   );
  // }
}
