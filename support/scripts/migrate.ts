import 'dotenv/config'
import { Effect as E, LogLevel, Logger, Match, pipe } from 'effect'
import { PgLive } from '@config/db'
import { migration } from '../migrations/0002_add_entry_items'
import { logStatement } from '@server/helpers/sql.helper'

const migrationFx = pipe(
  process.env.MIGRATION_DIRECTION as string,
  Match.value,
  Match.when('up', migration.up),
  Match.when('down', migration.down),
  Match.orElse(() => E.fail('Invalid migration direction')),
)

pipe(
  migrationFx,
  E.andThen(logStatement),
  E.provide(PgLive),
  E.provide(Logger.minimumLogLevel(LogLevel.Debug)),
  E.runPromise,
).catch(console.error)
