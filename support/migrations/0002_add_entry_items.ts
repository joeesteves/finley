import { Effect as E } from 'effect'
import * as Sql from '@effect/sql'

export const migration = {
  up: () =>
    E.map(
      Sql.SqlClient.SqlClient,
      (sql) => sql`
    CREATE TABLE IF NOT EXISTS  entry_items (
      id SERIAL PRIMARY KEY,
      amount DECIMAL(10, 2) NOT NULL,
      type VARCHAR(25) NOT NULL,
      entry_id INTEGER REFERENCES entries(id),
      due_date TIMESTAMP NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `,
    ),
  down: () =>
    E.map(
      Sql.SqlClient.SqlClient,
      (sql) => sql`DROP TABLE IF EXISTS entry_items`,
    ),
}
