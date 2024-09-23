import { Schema } from '@effect/schema'
import { EntryItem } from './entryItem'

export const _Entry = Schema.Struct({
  id: Schema.Number,
  description: Schema.String,
  type: Schema.Literal('Payment', 'Income'),
  entryItems: Schema.Array(EntryItem),
})

export interface Entry extends Schema.Schema.Type<typeof _Entry> {}
export interface EntryEncoded extends Schema.Schema.Encoded<typeof _Entry> {}

export const Entry: Schema.Schema<Entry, EntryEncoded> = _Entry
