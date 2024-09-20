import { Schema } from '@effect/schema'

const _EntryItem = Schema.Struct({
  id: Schema.Number,
  description: Schema.String,
  amount: Schema.Number,
  dueDate: Schema.DateFromSelf,
  entryId: Schema.Number,
})

interface EntryItem extends Schema.Schema.Type<typeof _EntryItem> { }

export const EntryItem: Schema.Schema<EntryItem> = _EntryItem
