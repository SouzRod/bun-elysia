import { describe, it, expect } from 'bun:test'
import { DeleteUserImpl } from '../../../src/application/useCase/delete-user.usecase'
import { NotFoundError } from '../../../src/domain/errors/not-found.error'
import type { MongoDB } from '../../../src/domain/interfaces/mongodb.interface'
import type { User } from '../../../src/domain/interfaces'

class MockMongo implements MongoDB<User> {
  public deletedFilter: any = null
  constructor(private existing: any = null) {}
  async findMany() { return [] }
  async findOne() { return this.existing }
  async insertOne() { }
  async updateOne() { }
  async deleteOne(filter: any) { this.deletedFilter = filter }
}

describe('DeleteUserImpl', () => {
  it('deletes existing user', async () => {
    const mongo = new MockMongo({ _id: '1' })
    const usecase = new DeleteUserImpl(mongo as any)

    const res = await usecase.execute('1')
    expect(res).toEqual({ message: 'User deleted successfully' })
    expect(mongo.deletedFilter).toEqual({ _id: '1' })
  })

  it('throws NotFoundError when user not found', async () => {
    const mongo = new MockMongo(null)
    const usecase = new DeleteUserImpl(mongo as any)
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
