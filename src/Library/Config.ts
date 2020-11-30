// src/Library/Config.ts
export interface Config {
  /**
   * Database connection config
   */
  database: {
    /**
     * Database Hostname
     *
     * Default: `Database`
     */
    hostname: string;

    /**
     * Database Port
     *
     * Default: `5432`
     */
    port: number;

    /**
     * Database/table
     *
     * Default: `SSH-Proxy`
     */
    database: string;

    /**
     * Database Username
     *
     * Default: `postgres`
     */
    username: string;

    /**
     * Password for the database user
     *
     * Default: `pgpass`
     */
    password: string;
  };

  /**
   * Address to bind to. (Only needed when not running in container)
   *
   * Default: `0.0.0.0`
   */
  bindHost: string;

  /**
   * Port to bind to.
   *
   * Default: `8080`
   */
  bindPort: string;

  /**
   * Redis Job Que & Cache Settings
   */
  redis: {
    /**
     * Host of the redis server
     *
     * Default: `Redis`
     */
    host: string;
  };
}

export const config: Config = {
  database: {
    hostname: process.env.DB_HOST || 'Database',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_DATABASE || 'ts-brain',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'pgpass',
  },

  bindHost: process.env.HOST || '0.0.0.0',
  bindPort: process.env.PORT || '8080',

  redis: {
    host: process.env.REDIS_HOST || 'Redis',
  },
};
