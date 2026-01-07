import { UserInput } from "./user-input.interface";

export interface AddUser {
  execute(input: UserInput): Promise<{ message: string }>;
}