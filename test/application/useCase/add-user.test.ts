import { describe, it, expect, beforeEach } from 'bun:test'
import { AddUserImpl } from '../../../src/application/useCase/add-user.usecase'
import type { MongoDB } from '../../../src/domain/interfaces/mongodb.interface'
import type { UserInput, User } from '../../../src/domain/interfaces'

class MockMongo implements MongoDB<User> {
  public inserted: any = null
  async findMany() { return [] }
  async findOne() { return null }
  async insertOne(document: any) { this.inserted = document }
  async updateOne() { }
  async deleteOne() { }
}

describe('AddUserImpl', () => {
  let repo: MockMongo
  let usecase: AddUserImpl

  beforeEach(() => {
    repo = new MockMongo()
    usecase = new AddUserImpl(repo as unknown as MongoDB<User>)
  })

  it('inserts a user with proper date fields', async () => {
    const input: UserInput = { name: 'John', email: 'a@b.com', birthDate: '2000-01-01' }

    const res = await usecase.execute(input)

    expect(res).toEqual({ message: 'User added successfully' })
    expect(repo.inserted).toBeTruthy()
    expect(repo.inserted.name).toBe('John')
    expect(repo.inserted.email).toBe('a@b.com')
    expect(repo.inserted.birthDate instanceof Date).toBe(true)
    expect(repo.inserted.createdAt instanceof Date).toBe(true)
    expect(repo.inserted.updatedAt instanceof Date).toBe(true)
  })
})
