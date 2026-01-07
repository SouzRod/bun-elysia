import { WithId } from "mongodb";
export type { WithId } from "mongodb";

export interface MongoDB<T> {
  findMany(filter: Record<string, any>): Promise<WithId<T>[] | []>;
  findOne(filter: Record<string, any>): Promise<WithId<T> | null>;
  insertOne(document: T): Promise<void>;
  updateOne(filter: Record<string, any>, update: T): Promise<void>;
  deleteOne(filter: Record<string, any>): Promise<void>;
}