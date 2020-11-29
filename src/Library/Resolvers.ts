// src/Library/Resolvers.ts
/* eslint-disable @typescript-eslint/ban-types */
// src/Library/Resolvers.ts
import { GraphQLSchema } from 'graphql';
import { buildSchema, NonEmptyArray, ResolverData } from 'type-graphql';
import { findModuleFiles } from '../Utils/moduleFileFinder';
import { Context } from './Context';

type ResolverModule = { [key: string]: Function };

export async function getResolvers(): Promise<Function[]> {
  const resolverModules = await findModuleFiles<ResolverModule>(
    /.*Resolver\.ts/,
  );

  return resolverModules.flatMap((resolverModule) =>
    Object.values(resolverModule),
  );
}

export async function buildGQLSchema(
  resolvers: Function[],
): Promise<GraphQLSchema> {
  return buildSchema({
    resolvers: resolvers as NonEmptyArray<Function>,
    container: ({ context }: ResolverData<Context>) => context.container,
  });
}
