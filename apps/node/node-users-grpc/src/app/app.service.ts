import { Injectable } from "@nestjs/common";
import { Connection, FilterQuery, Model, QueryOptions } from "mongoose";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "@mussia33/node/nest/users-api";
import { handleError } from "@mussia33/node/nest/errors";
import { users } from "@mussia33/node/grpc";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectConnection() private connection: Connection // private logger: Logger
  ) {}

  findAll(
    query: FilterQuery<UserDocument>,
    projection: any,
    config: QueryOptions
  ) {
    return this.model.find(query, projection, config).catch(handleError);
  }

  findById(id: string, projection: any) {
    return this.model.findById(id, projection);
  }

  create(createEntityData: Partial<users.User>): Promise<User> {
    const entity = new this.model(createEntityData);
    return entity.save().catch(handleError);
  }

  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
