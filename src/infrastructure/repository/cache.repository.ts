import { Cache } from "@domain/interfaces/cache.interface";
import { RedisExternal } from "../external";

export class CacheRepository implements Cache {
  private readonly redisExternal = new RedisExternal();

  get(key: string): Promise<string | null> {
    return this.redisExternal.get(key);
  }

  set(key: string, value: string, expire?: number): Promise<void> {
    return this.redisExternal.set(key, value, expire);
  }
}