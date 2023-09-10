import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "@mussia33/node/nest/users-api";
import {
  Connection,
  FilterQuery,
  HydratedDocument,
  // LeanDocument,
  Document,
  Model,
  QueryOptions,
} from "mongoose";
import { handleError } from "@mussia33/node/nest/errors";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectConnection() private connection: Connection, // private logger: Logger
  ) {}
  getData(): { message: string } {
    return { message: "Welcome to users-service!" };
  }
  async findAll(
    query: FilterQuery<UserDocument>,
    projection: any,
    config: QueryOptions,
  ): Promise<Document<HydratedDocument<UserDocument>>[]> {
    return this.model.find(query, projection, config).catch(handleError);
  }

  async create(createEntityData: Partial<User>): Promise<User> {
    const entity = new this.model(createEntityData);
    return entity.save().catch(handleError);
  }
}
