import fastify from 'fastify';
import { ServerResponse } from '../Interface/contract';

const serverA = fastify();

serverA.get('/data', async (request, reply) => {
  const responseData: ServerResponse = { message: 'Hello from Server A' };
  reply.send(responseData); // Отправляем запрос
});

export default serverA;