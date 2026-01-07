import { describe, it, expect } from 'bun:test'
import { GetUserImpl } from '../../../src/application/useCase/get-user.usecase'
import { NotFoundError } from '../../../src/domain/errors/not-found.error'
import type { MongoDB } from '../../../src/domain/interfaces/mongodb.interface'
import type { Cache } from '../../../src/domain/interfaces/cache.interface'
import type { User, WithId } from '../../../src/domain/interfaces'
import { ObjectId } from 'mongodb'

class MockMongo implements MongoDB<User> {
  public stored: WithId<User> | null = null
  constructor(stored?: WithId<User> | null) { this.stored = stored ?? null }
  async findMany() { return [] }
  async findOne() { return this.stored }
  async insertOne() { }
  async updateOne() { }
  async deleteOne() { }
}

class MockCache implements Cache {
  public data = new Map<string,string>()
  async get(key: string) { return this.data.get(key) ?? null }
  async set(key: string, value: string) { this.data.set(key, value) }
}

describe('GetUserImpl', () => {
  it('returns cached user when available', async () => {
    const cache = new MockCache()
    const user: WithId<User> = { _id: new ObjectId('695dbc0d1da66b2cfc586777'), name: 'A', email: 'a@b.com', birthDate: new Date('2000-01-01'), createdAt: new Date(), updatedAt: new Date() }
    cache.data.set('get-user:695dbc0d1da66b2cfc586777', JSON.stringify(user))
    const mongo = new MockMongo(null)
    const usecase = new GetUserImpl(mongo as any, cache as any)

    const res = await usecase.execute('695dbc0d1da66b2cfc586777')
    const expected = JSON.parse(JSON.stringify(user))
    expect(res).toEqual(expected)
  })

  it('fetches from db and caches when not in cache', async () => {
    const user: WithId<User> = { _id: new ObjectId('695dbc0d1da66b2cfc586777'), name: 'B', email: 'b@b.com', birthDate: new Date('1990-01-01'), createdAt: new Date(), updatedAt: new Date() }
    const mongo = new MockMongo(user)
    const cache = new MockCache()
    const usecase = new GetUserImpl(mongo as any, cache as any)

    const res = await usecase.execute('695dbc0d1da66b2cfc586777')
    expect(res).toEqual(user)
    expect(cache.data.get('get-user:695dbc0d1da66b2cfc586777')).toBe(JSON.stringify(user))
  })

  it('throws NotFoundError when user missing', async () => {
    const mongo = new MockMongo(null)
    const cache = new MockCache()
    const usecase = new GetUserImpl(mongo as any, cache as any)

    let threw = false
    try {
      await usecase.execute('nope')
    } catch (err) {
      threw = true
      expect(err).toBeInstanceOf(NotFoundError)
    }
    expect(threw).toBe(true)
  })
})
