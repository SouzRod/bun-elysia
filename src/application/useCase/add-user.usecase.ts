import { AddUser, MongoDB, User, UserInput } from "@domain/interfaces";

export class AddUserImpl implements AddUser {

  constructor(
    private readonly userRepository: MongoDB<User>,
  ) { }

  async execute(input: UserInput): Promise<{ message: string }> {
    const newUser = {
      ...input,
      birthDate: new Date(input.birthDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.userRepository.insertOne(newUser);
    return { message: "User added successfully" };
  }
}