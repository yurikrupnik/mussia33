import {
  Document,
  FilterQuery,
  QueryOptions,
  // LeanDocument,
  HydratedDocument,
  UpdateQuery,
} from "mongoose";
import { EntityRepository } from "./entity.repository";

export class CrudApiService<
  T extends Document,
  CreateDto,
  UpdateDto extends UpdateQuery<T>,
  Repository extends EntityRepository<T, CreateDto, UpdateDto>,
> {
  constructor(private readonly repository: Repository) {}

  async findAll(
    query: FilterQuery<T>,
    projection: any,
    config: QueryOptions,
  ): Promise<Document<HydratedDocument<T>>[]> {
    return this.repository.findAll(query, projection, config);
  }

  async findById(id: string, projection: any): Promise<T> {
    return this.repository.findById(id, projection);
  }

  async create(body: CreateDto): Promise<T> {
    return this.repository.create(body);
  }

  async update(id: string, body: UpdateDto) {
    return this.repository.findOneAndUpdate(id, body);
  }

  async delete(id: string): Promise<string> {
    return this.repository.deleteOne(id);
  }

  async deleteMany() {
    return this.repository.deleteMany({});
  }
}
