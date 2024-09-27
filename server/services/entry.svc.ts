import { SqlClient as Sql } from '@effect/sql'
import { Effect, Layer } from 'effect'
import { logStatement } from '@server/helpers/sql.helper'
import { Schema } from '@effect/schema'
import { Entry } from '@server/schemas/entry'

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

export class EntryRepo extends Effect.Tag('@services/EntryRepo')<
  EntryRepo,
  Effect.Effect.Success<typeof makeEntryRepo>
>() {
  static layer = Layer.effect(EntryRepo, makeEntryRepo)
}
