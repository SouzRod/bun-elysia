import { UserInput } from "./user-input.interface";

export interface UpdateUser {
  execute(id: string, user: UserInput): Promise<{ message: string }>;
}