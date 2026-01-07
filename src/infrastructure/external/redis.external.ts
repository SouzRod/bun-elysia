import { RedisClient } from "bun";

import { ConfigImpl } from '@application/config';
import { Config } from '@domain/interfaces';

export class RedisExternal {
  private client: RedisClient;
  private config: Config = new ConfigImpl();

  constructor() {
    this.client = this.config.redis.enabled ? new RedisClient(this.config.redis.uri)
      : { get: async () => null, set: async () => { }, expire: async () => { } } as unknown as RedisClient;
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, expire: number = this.config.redis.defaultExpire): Promise<void> {
    await this.client.set(key, value);
    await this.client.expire(key, expire);
  }
}