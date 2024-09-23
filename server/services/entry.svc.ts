import { SqlClient as Sql } from '@effect/sql'
import { Effect, Layer, Logger, LogLevel } from 'effect'
import { logStatement } from '@server/helpers/sql.helper'
import { Schema } from '@effect/schema'
import { Entry } from '@server/schemas/entry'
import { PgLive } from '@config/db'

const makeEntryRepo = Effect.gen(function* () {
  const sql = yield* Sql.SqlClient

  return {
    find: (id: number) =>
      Effect.gen(function* () {
        const entryItems = yield* logStatement(
          sql`SELECT * FROM entry_items WHERE entry_id = ${id}`,
        )
        const entries = yield* logStatement(
          sql`SELECT * FROM entries WHERE id = ${id}`,
        )
        const entry = { entryItems, ...entries[0] }

        return yield* Schema.decodeUnknown(Entry)(entry)
      }),
  }
})

export class EntryRepo extends Effect.Tag('@services/MessageRepo')<
  EntryRepo,
  Effect.Effect.Success<typeof makeEntryRepo>
>() {
  static layer = Layer.effect(EntryRepo, makeEntryRepo)
}

EntryRepo.pipe(
  Effect.andThen((repo) => repo.find(1)),
  Effect.provide(EntryRepo.layer),
  Effect.provide(PgLive),
  Effect.provide(Logger.minimumLogLevel(LogLevel.Debug)),
  Effect.tap(console.log),
  Effect.runPromise,
).catch(console.error)
