import { NotFoundError } from "@domain/errors";
import { Cache, GetUser, MongoDB, User, WithId } from "@domain/interfaces";

export class GetUserImpl implements GetUser {

  constructor(
    private readonly userRepository: MongoDB<User>,
    private readonly cacheRepository: Cache,
  ) { }

  async execute(id: string): Promise<WithId<User> | null> {
    const cachedUser = await this.cacheRepository.get(`get-user:${id}`);
    if (cachedUser) {
      return JSON.parse(cachedUser) as WithId<User>;
    }

    const user = await this.userRepository.findOne({ _id: id });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    await this.cacheRepository.set(`get-user:${id}`, JSON.stringify(user));
    return user;
  }
}