import { Schema } from '@effect/schema'
import { EntryItem } from './entryItem'

export const _Entry = Schema.Struct({
  id: Schema.Number,
  description: Schema.String,
  type: Schema.Literal('Payment', 'Income'),
  entryItems: EntryItem,
})

export interface Entry extends Schema.Schema.Type<typeof _Entry> { }

export const Entry: Schema.Schema<Entry> = _Entry
