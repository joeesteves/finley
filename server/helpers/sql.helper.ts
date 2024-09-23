import type { Row } from '@effect/sql/SqlConnection'
import type { Statement } from '@effect/sql/Statement'

import { Effect, pipe } from 'effect'
import { highlight } from 'sql-highlight'

export const logStatement = (statement: Statement<Row>) => {
  const [sql, params] = statement.compile()

  const log = pipe(sql, highlight, (statement) =>
    Effect.logDebug(statement, params),
  )

  return Effect.all([statement, log]).pipe(Effect.map(([r, _l]) => r))
}
