import { User } from "./user.interface";
import { WithId } from "./mongodb.interface";

export interface GetUser {
  execute(id: string): Promise<WithId<User> | null>;
}