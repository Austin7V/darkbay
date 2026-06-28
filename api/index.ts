import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';

import { AppModule } from '../src/app.module';

let cachedServer: express.Express | null = null;

async function createServer() {
  if (cachedServer) {
    return cachedServer;
  }

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  await app.init();

  cachedServer = server;

  return server;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  const server = await createServer();

  server(request, response);
}
