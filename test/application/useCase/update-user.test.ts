import { describe, it, expect } from 'bun:test'
import { UpdateUserImpl } from '../../../src/application/useCase/update-user.usecase'
import { NotFoundError } from '../../../src/domain/errors/not-found.error'
import type { MongoDB } from '../../../src/domain/interfaces/mongodb.interface'
import type { UserInput, User } from '../../../src/domain/interfaces'

class MockMongo implements MongoDB<User> {
  public updatedArgs: any = null
  constructor(private existing: any = null) { }
  async findMany() { return [] }
  async findOne() { return this.existing }
  async insertOne() { }
  async updateOne(filter: any, update: any) { this.updatedArgs = { filter, update } }
  async deleteOne() { }
}

describe('UpdateUserImpl', () => {
  it('updates existing user', async () => {
    const existing = { _id: '1', name: 'Old' }
    const mongo = new MockMongo(existing)
    const usecase = new UpdateUserImpl(mongo as any)

    const input: UserInput = { name: 'New', email: 'n@e.com', birthDate: '1990-01-01' }
    const res = await usecase.execute('1', input)

    expect(res).toEqual({ message: 'User updated successfully' })
    expect(mongo.updatedArgs).toBeTruthy()
    expect(mongo.updatedArgs.filter).toEqual({ _id: '1' })
    expect(mongo.updatedArgs.update.name).toBe('New')
    expect(mongo.updatedArgs.update.birthDate instanceof Date).toBe(true)
  })

  it('throws NotFoundError when user not found', async () => {
    const mongo = new MockMongo(null)
    const usecase = new UpdateUserImpl(mongo as any)
    let threw = false
    try {
      await usecase.execute('nope', { name: 'x', email: 'x@x.com', birthDate: '2000-01-01' })
    } catch (err) {
      threw = true
      expect(err).toBeInstanceOf(NotFoundError)
    }
    expect(threw).toBe(true)
  })
})
