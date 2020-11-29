// src/Library/TypeORM.ts
import { ClassType } from 'type-graphql';
import { Container } from 'typedi';
import {
  Connection,
  createConnection,
  EntitySchema,
  EntitySubscriberInterface,
  useContainer,
} from 'typeorm';
import { findModuleFiles } from '../Utils//moduleFileFinder';
import { config } from './Config';

/**
 * Load all TypeORM Entity Models
 *
 * @returns Array containing Model Module file from `srsc/Modules/` matching `*Model.(ts|js)x?`
 */
export async function getEntities(): Promise<EntitySchema[]> {
  const modelModules = await findModuleFiles(/.*Model\.((ts|js)x?)/);

  return modelModules.flatMap((resolverModule) =>
    Object.values(resolverModule as { [key: string]: EntitySchema }),
  );
}

interface EntitySubscriberModule {
  [key: string]: ClassType<EntitySubscriberInterface>;
}

export async function getEntitySubscribers(): Promise<
  ClassType<EntitySubscriberInterface>[]
> {
  const entitySubscriberModules = await findModuleFiles<EntitySubscriberModule>(
    /.*EntitySubscriber\.((ts|js)x?)/,
  );

  return entitySubscriberModules.flatMap((entitySubscriberModule) =>
    Object.values(entitySubscriberModule),
  );
}

/**
 * Connect to the TypeORM Database
 * @param testing Testing Mode
 *
 * @returns TypeORM Connection Object
 */
export async function connectDatabase(testing = false): Promise<Connection> {
  const [entities, subscribers] = await Promise.all([
    getEntities(),
    getEntitySubscribers(),
  ]);

  useContainer(Container);

  return createConnection({
    type: 'postgres',
    database: testing ? 'test-db' : config.database.database,
    username: config.database.username,
    password: config.database.password,
    port: config.database.port,
    host: config.database.hostname,
    synchronize: true,
    subscribers,

    entities,
  });
}
