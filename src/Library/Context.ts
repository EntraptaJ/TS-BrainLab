// src/Library/Context.ts
import { FastifyRequest } from 'fastify';
import { Container } from 'typedi';
import { ContainerInterface } from 'typeorm';

export interface Context {
  requestId: string;

  container: ContainerInterface;
}

interface ContextRequest {
  request: FastifyRequest;
}

/**
 * Get the GraphQL Context
 */
export function getGQLContext({ request }: ContextRequest): Context {
  const container = Container.of(request.id as string); // get the scoped container

  const context = { requestId: request.id as string, container }; // create fresh context object
  container.set('context', context); // place context or other data in container

  return context;
}
