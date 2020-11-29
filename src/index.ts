// src/index.ts
import fastify from 'fastify';
import hyperid from 'hyperid';
import 'reflect-metadata';
import { createApolloServer } from './Library/Apollo';
import { connectDatabase } from './Library/Database';
import { logger, LogMode } from './Library/Logging';
import { createSpeakersNetwork } from './Modules/Speakers/SpeakersNetwork';

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

logger.log(LogMode.INFO, 'API Server setup. Creating Neural Network');

await Promise.all([createSpeakersNetwork()]);

logger.log(LogMode.INFO, 'Neural Network created. Starting Web server');

await webServer.listen(8080, '0.0.0.0');

logger.log(LogMode.INFO, 'Listening on port 8080');

export {};
