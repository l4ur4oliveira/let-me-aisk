import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { db } from '../../../infra/db/connections.ts';
import { schema } from '../../../infra/db/schema/index.ts';

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async () => {
    const result = await db.select({
      id: schema.rooms.id,
      name: schema.rooms.name,
    }).from(schema.rooms).orderBy(schema.rooms.createdAt);

    return result;
  });
};
