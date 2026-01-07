import { describe, it, expect } from 'bun:test'
import { ListUsersImpl } from '../../../src/application/useCase/list-users.usecase'
import type { MongoDB } from '../../../src/domain/interfaces/mongodb.interface'
import type { Cache } from '../../../src/domain/interfaces/cache.interface'
import type { User, WithId } from '../../../src/domain/interfaces'
import { ObjectId } from 'mongodb'

class MockMongo implements MongoDB<User> {
  constructor(private users: any[] = []) {}
  async findMany() { return this.users }
  async findOne() { return null }
  async insertOne() { }
  async updateOne() { }
  async deleteOne() { }
}

class MockCache implements Cache {
  public data = new Map<string,string>()
  async get(key: string) { return this.data.get(key) ?? null }
  async set(key: string, value: string) { this.data.set(key, value) }
}

describe('ListUsersImpl', () => {
  it('returns cached list when present', async () => {
    const cache = new MockCache()
    const users: WithId<User>[] = [{ _id: new ObjectId('695dbc0d1da66b2cfc586777'), name: 'A', email: 'a@a.com', birthDate: new Date('2000-01-01'), createdAt: new Date(), updatedAt: new Date() }]
    cache.data.set('list-users', JSON.stringify(users))
    const mongo = new MockMongo([])
    const usecase = new ListUsersImpl(mongo as any, cache as any)

    const res = await usecase.execute()
    const expected = JSON.parse(JSON.stringify(users))
    expect(res).toEqual(expected)
  })

  it('fetches from db and caches when not cached', async () => {
    const users: WithId<User>[] = [{ _id: new ObjectId('695dbc0d1da66b2cfc586777'), name: 'B', email: 'b@b.com', birthDate: new Date('1990-01-01'), createdAt: new Date(), updatedAt: new Date() }]
    const mongo = new MockMongo(users)
    const cache = new MockCache()
    const usecase = new ListUsersImpl(mongo as any, cache as any)

    const res = await usecase.execute()
    expect(res).toEqual(users)
    expect(cache.data.get('list-users')).toBe(JSON.stringify(users))
  })
})
