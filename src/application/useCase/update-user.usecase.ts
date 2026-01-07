import { NotFoundError } from "@domain/errors";
import { MongoDB, UpdateUser, User, UserInput } from "@domain/interfaces";

export class UpdateUserImpl implements UpdateUser {

  constructor(
    private readonly userRepository: MongoDB<User>,
  ) { }

  async execute(id: string, user: UserInput): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findOne({ _id: id });
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    const updatedUser = {
      ...user,
      birthDate: new Date(user.birthDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.userRepository.updateOne({ _id: id }, updatedUser);
    return { message: "User updated successfully" };
  }
}