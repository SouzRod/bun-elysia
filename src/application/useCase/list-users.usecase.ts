import { Cache, ListUsers, MongoDB, User, WithId } from "@domain/interfaces";

export class ListUsersImpl implements ListUsers {

  constructor(
    private readonly userRepository: MongoDB<User>,
    private readonly cacheRepository: Cache,
  ) { }

  async execute(): Promise<WithId<User>[] | []> {
    const cachedUsers = await this.cacheRepository.get(`list-users`);
    if (cachedUsers) {
      return JSON.parse(cachedUsers) as WithId<User>[];
    }

    const users = await this.userRepository.findMany({});
    await this.cacheRepository.set(`list-users`, JSON.stringify(users));
    return users;
  }
}