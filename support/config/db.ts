import 'dotenv/config'
import { Config } from 'effect'
import * as Pg from '@effect/sql-pg'

export const PgLive = Pg.PgClient.layer({
  url: Config.redacted('DATABASE_URL'),
})
