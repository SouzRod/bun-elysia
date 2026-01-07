import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'
import { cors } from '@elysiajs/cors'

import { routeV1 } from '@presentation/router'

const app = new Elysia()
  .use(cors())
  .use(openapi())
  .use(routeV1())
  .listen(Number(process.env.PORT))

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)