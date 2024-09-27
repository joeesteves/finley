import { Effect } from 'effect'
import express from 'express'
import { DevRuntime } from '@config/runtime'
import { EntryRepo } from '@services/entry.svc'

const router = express.Router()

// REST API route
router.get('/entry/:entry_id', (_req, res) => {
  void EntryRepo.pipe(
    Effect.andThen((repo) => repo.find(1)),
    Effect.andThen((event) => res.json(event)),
    Effect.catchAll((err) => Effect.succeed(res.json({ error: err.message }))),
    DevRuntime.runPromise,
  )
})

export const apiRouter = router
