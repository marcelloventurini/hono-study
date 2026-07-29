import { createMiddleware } from 'hono/factory';

const secretKey = 'secret';

export const apiKeyAuth = createMiddleware(async (c, next) => {
  // lendo e armazenando o cabeçalho http
  const key = c.req.header('x-api-key');

  // comparação entre os valores
  if (key !== secretKey) {
    return c.json({ message: 'unauthorized: invalid api key' }, 401);
  }

  // permitindo o acesso passando o controle adiante
  await next();
});
