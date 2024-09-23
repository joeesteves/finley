import { Schema } from '@effect/schema'

const _EntryItem = Schema.Struct({
  id: Schema.Number,
  type: Schema.String,
  amount: Schema.NumberFromString,
  due_date: Schema.DateFromSelf,
  entry_id: Schema.Number,
}).pipe(Schema.rename({ entry_id: 'entryId', due_date: 'dueDate' }))

interface EntryItem extends Schema.Schema.Type<typeof _EntryItem> {}
interface EntryItemEncoded extends Schema.Schema.Encoded<typeof _EntryItem> {}

export const EntryItem: Schema.Schema<EntryItem, EntryItemEncoded> = _EntryItem
