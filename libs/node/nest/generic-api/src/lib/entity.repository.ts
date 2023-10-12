import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  // LeanDocument,
  HydratedDocument,
  UpdateQuery,
} from "mongoose";

import { NotFoundException } from "@nestjs/common";
import { handleError } from "@mussia33/node/nest/errors";

export abstract class EntityRepository<
  T extends Document,
  CreateDto,
  UpdateDto extends UpdateQuery<T>
> {
  constructor(protected readonly model: Model<T>) {}

  async findById(
    id: string,
    projection?: Record<string, unknown>
    // config: QueryOptions
  ): Promise<HydratedDocument<T, any, void>> {
    return (
      this.model
        .findById(id, projection)
        // .lean() // todo failing types
        .then((res) => {
          if (!res) {
            throw new NotFoundException(`resource with id ${id} not found`);
          }
          return res;
        })
        .catch(handleError)
    );
  }

  async findAll(
    query: FilterQuery<T>,
    projection: any,
    config: QueryOptions
  ): Promise<Document<HydratedDocument<T>>[]> {
    return this.model.find(query, projection, config).catch(handleError);
  }

  async create(createEntityData: CreateDto): Promise<T> {
    const entity = new this.model(createEntityData);
    return entity.save().catch(handleError);
  }

  async findOneAndUpdate(
    id: string,
    updateEntityData: UpdateDto
  ): Promise<HydratedDocument<T, any, any> | null> {
    return this.model
      .findByIdAndUpdate(id, updateEntityData, {
        new: true,
        useFindAndModify: false,
      })
      .catch(handleError);
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    return this.model
      .deleteMany(entityFilterQuery)
      .then((deleteResult) => {
        return deleteResult.deletedCount >= 1;
      })
      .catch(handleError);
  }

  async deleteOne(id: string): Promise<string> {
    return this.model
      .findByIdAndDelete(id)
      .then((res) => {
        if (!res) {
          throw new NotFoundException("Not found item");
        }
        return res._id;
      })
      .catch(handleError);
  }

  createMock() {
    // return new this.model({});
  }
}
