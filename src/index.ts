// src/index.ts
import fastify from 'fastify';
import hyperid from 'hyperid';
import 'reflect-metadata';
import { createApolloServer } from './Library/Apollo';
import { config } from './Library/Config';
import { connectDatabase } from './Library/Database';
import { logger, LogMode } from './Library/Logging';

/**
 * Fastify Web Server
 */
const webServer = fastify({
  genReqId: () => hyperid().uuid,
});

logger.log(LogMode.INFO, 'Connecting to database');

await connectDatabase();

logger.log(LogMode.INFO, 'Database connected. Creating Apollo Server');

/**
 * Apollo GraphQL Server
 */
const gqlServer = await createApolloServer();

await webServer.register(gqlServer.createHandler());

logger.log(LogMode.INFO, 'API Server setup.');

await webServer.listen(config.bindPort, config.bindHost);

logger.log(LogMode.INFO, 'Listening on port 8080');

export {};
