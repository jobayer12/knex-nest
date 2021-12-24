export default {
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
  },
  pool: {
    min: 10,
    max: 30,
    idleTimeoutMillis: 60000
  },
  acquireConnectionTimeout: 20000,
  migrations: {
    enabled: 1 === 1,
    tableName: 'migrations',
    directory: './migrations'
  },
  seeds: {
    enabled: 1 === 1,
    directory: './seeds'
  }
};
