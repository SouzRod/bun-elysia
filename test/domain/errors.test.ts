import { describe, it, expect } from 'bun:test'
import { BaseError } from '../../src/domain/errors/baseError'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../src/domain/errors'
import { HttpStatus, HttpStatusName } from '../../src/domain/enum/http-status.enum'
import { Document } from 'mongodb'

describe('Domain Errors', () => {
  it('BaseError sets name and statusCode and toResponse works', async () => {
    const err = new BaseError('boom', 418, 'TEAPOT')

    expect(err).toBeInstanceOf(Error)
    expect(err.name).toBe('TEAPOT')
    expect(err.statusCode).toBe(418)
    expect(err.message).toBe('boom')

    const res = err.toResponse()
    expect(res).toBeInstanceOf(Response)
    expect(res.status).toBe(418)
    const body = await res.json()
    expect(body).toEqual({ error: 'TEAPOT', message: 'boom', statusCode: 418 })
  })

  it('BadRequestError uses BAD_REQUEST status and name', async () => {
    const err = new BadRequestError('bad')
    expect(err).toBeInstanceOf(BaseError)
    expect(err.statusCode).toBe(HttpStatus.BAD_REQUEST)
    expect(err.name).toBe(HttpStatusName.BAD_REQUEST)
    const res = err.toResponse()
    expect(res.status).toBe(HttpStatus.BAD_REQUEST)
    const body:Document = await err.toResponse().json() as Document
    expect(body.message).toBe('bad')
  })

  it('NotFoundError uses NOT_FOUND status and name', async () => {
    const err = new NotFoundError('missing')
    expect(err.statusCode).toBe(HttpStatus.NOT_FOUND)
    expect(err.name).toBe(HttpStatusName.NOT_FOUND)
    const body:Document = await err.toResponse().json() as Document
    expect(body.statusCode).toBe(HttpStatus.NOT_FOUND)
  })

  it('UnauthorizedError uses UNAUTHORIZED status and name', async () => {
    const err = new UnauthorizedError('nope')
    expect(err.statusCode).toBe(HttpStatus.UNAUTHORIZED)
    expect(err.name).toBe(HttpStatusName.UNAUTHORIZED)
    const body:Document = await err.toResponse().json() as Document
    expect(body.error).toBe(HttpStatusName.UNAUTHORIZED)
  })
})
