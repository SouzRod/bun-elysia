import { User } from "./user.interface";
import { WithId } from "./mongodb.interface";

export interface ListUsers {
  execute(): Promise<WithId<User>[] | []>;
}