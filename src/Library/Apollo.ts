/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// src/Library/Apollo.ts
import { Container, ContainerInstance } from 'typedi';
import { GraphQLRequestContext } from 'apollo-server-plugin-base';
import { Context, getGQLContext } from './Context';

type ApolloServer = import('apollo-server-fastify').ApolloServer;
type ApolloServerTestClient = import('apollo-server-testing').ApolloServerTestClient;

let gqlServer: ApolloServer;

/**
 * Create Apollo GraphQL Server
 *
 * @returns Promise that resolves to a ApolloServer Instance
 */
export async function createApolloServer(): Promise<ApolloServer> {
  if (!gqlServer) {
    const [
      { ApolloServer },
      { getResolvers, buildGQLSchema },
    ] = await Promise.all([
      import('apollo-server-fastify'),
      import('./Resolvers'),
    ]);

    const resolvers = await getResolvers();

    gqlServer = new ApolloServer({
      schema: await buildGQLSchema(resolvers),
      context: getGQLContext,
      plugins: [
        {
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          requestDidStart(requestContext: GraphQLRequestContext<Context>) {
            return {
              willSendResponse(): void {
                // remember to dispose the scoped container to prevent memory leaks
                Container.reset(requestContext.context.requestId);

                // for developers curiosity purpose, here is the logging of current scoped container instances
                // we can make multiple parallel requests to see in console how this works
                const instancesIds = ((Container as any)
                  .instances as ContainerInstance[]).map(
                  (instance) => instance.id,
                );
                console.log('instances left in memory:', instancesIds);
              },
            };
          },
        },
      ],
      introspection: true,
      playground: {
        settings: {
          'editor.theme': 'light',
          'general.betaUpdates': true,
        },
        workspaceName: 'TS-ESWeb',
      },
    });
  }

  return gqlServer;
}

/**
 * Create a Apollo Server Testing instance
 */
export async function createApolloTestClient(): Promise<
  ApolloServerTestClient
> {
  const { createTestClient } = await import('apollo-server-testing');

  const gqlServer = await createApolloServer();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return createTestClient(gqlServer);
}

/**
 *       plugins: [
        {
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          requestDidStart: () => ({
            willSendResponse(requestContext): void {
              // remember to dispose the scoped container to prevent memory leaks
              Container.reset(requestContext.context.requestId);
            },
          }),
        },
      ],
 */
