import { Layer, ManagedRuntime } from 'effect'
import { PgLive } from './db'
import { EntryRepo } from '@server/services/entry.svc'

// This layer provides the EventRepo and PgLive to the runtime
const DevLive = Layer.provide(EntryRepo.layer, PgLive)

export const DevRuntime = ManagedRuntime.make(DevLive)
