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

  ssh: {
    /**
     * Address to bind to. (Only needed when not running in container)
     *
     * Default: Config.HOST
     */
    bindHost: string;

    /**
     * SSH Port
     */
    port: number;
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

  ssh: {
    bindHost: process.env.SSH_HOST || process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.SSH_PORT || '8022'),
  },
};
