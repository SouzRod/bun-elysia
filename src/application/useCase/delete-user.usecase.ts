import { NotFoundError } from "@domain/errors";
import { DeleteUser, MongoDB, User } from "@domain/interfaces";

export class DeleteUserImpl implements DeleteUser {

  constructor(
    private readonly userRepository: MongoDB<User>,
  ) { }

  async execute(id: string): Promise<{ message: string }> {
    const existingUser = await this.userRepository.findOne({ _id: id });
    if (!existingUser) {
      throw new NotFoundError("User not found");
    }

    await this.userRepository.deleteOne({ _id: id });
    return { message: "User deleted successfully" };
  }
}