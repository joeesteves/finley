import { Effect as E } from 'effect'
import * as Sql from '@effect/sql'

export const migration = {
  up: () =>
    E.map(
      Sql.SqlClient.SqlClient,
      (sql) => sql`
    CREATE TABLE IF NOT EXISTS  entries (
      id SERIAL PRIMARY KEY,
      type VARCHAR(25) NOT NULL,
      description VARCHAR(26) NOT NULL,

      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `,
    ),
  down: () =>
    E.map(Sql.SqlClient.SqlClient, (sql) => sql`DROP TABLE IF EXISTS entries`),
}
