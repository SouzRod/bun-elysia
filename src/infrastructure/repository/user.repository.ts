import { ObjectId, WithId } from "mongodb";

import { MongoDB, User } from "@domain/interfaces";
import { MongoDBExternal } from "../external";

export class UserRepository implements MongoDB<User> {
  private mongoDB: MongoDBExternal = new MongoDBExternal();

  async findMany(filter: Record<string, any>): Promise<WithId<User>[] | []> {
    const collection = await this.mongoDB.getCollection("users");
    return (await collection.find(filter).toArray()) as WithId<User>[] | [];
  }

  async findOne(filter: Record<string, any>): Promise<WithId<User> | null> {
    const collection = await this.mongoDB.getCollection("users");
    return (await collection.findOne({ ...filter, _id: filter._id ? new ObjectId(filter._id) : undefined })) as WithId<User> | null;
  }

  async insertOne(document: User): Promise<void> {
    const collection = await this.mongoDB.getCollection("users");
    await collection.insertOne(document);
  }

  async updateOne(filter: Record<string, any>, update: User): Promise<void> {
    const collection = await this.mongoDB.getCollection("users");
    await collection.updateOne({ ...filter, _id: filter._id ? new ObjectId(filter._id) : undefined }, { $set: update });
  }

  async deleteOne(filter: Record<string, any>): Promise<void> {
    const collection = await this.mongoDB.getCollection("users");
    await collection.deleteOne({ ...filter, _id: filter._id ? new ObjectId(filter._id) : undefined });
  }
}