import { Elysia, t } from 'elysia';

import { AddUserImpl, DeleteUserImpl, GetUserImpl, ListUsersImpl, UpdateUserImpl } from '@application/useCase';
import { CacheRepository, UserRepository } from '@infrastructure/repository';

const cacheRepository = new CacheRepository();
const userRepository = new UserRepository();

export const routeV1 = () => {
  const routes = new Elysia({ prefix: '/v1' });

  routes.get('/users', async () => {
    const listUsersUseCase = new ListUsersImpl(userRepository, cacheRepository);
    return await listUsersUseCase.execute();
  }, {
    tags: ['v1']
  });

  routes.get('/users/:id', async ({ params: { id } }) => {
    const getUserUseCase = new GetUserImpl(userRepository, cacheRepository);
    return await getUserUseCase.execute(id);
  }, {
    tags: ['v1'],
    params: t.Object({
      id: t.String(),
    }),
  });

  routes.post('/users', async ({ body }) => {
    const addUserUseCase = new AddUserImpl(userRepository);
    return await addUserUseCase.execute(body);
  }, {
    tags: ['v1'],
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
      birthDate: t.String({ format: 'date' }),
    }),
  });

  routes.put('/users/:id', async ({ body, params: { id } }) => {
    const updateUserUseCase = new UpdateUserImpl(userRepository);
    return await updateUserUseCase.execute(id, body);
  }, {
    tags: ['v1'],
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      name: t.String(),
      email: t.String({ format: 'email' }),
      birthDate: t.String({ format: 'date' }),
    }),
  });

  routes.delete('/users/:id', async ({ params: { id } }) => {
    const deleteUserUseCase = new DeleteUserImpl(userRepository);
    return await deleteUserUseCase.execute(id);
  }, {
    tags: ['v1'],
    params: t.Object({
      id: t.String(),
    }),
  });

  return routes;
}