import fastify from 'fastify';
import { ServerResponse } from '../Interface/contract';

const serverB = fastify();

serverB.get('/data', async (request, reply) => {
  const responseData: ServerResponse = { message: 'Hello from Server B' };
  reply.send(responseData); // Отправляем запрос
});

export default serverB;