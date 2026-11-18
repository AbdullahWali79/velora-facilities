import type { Instrumentation } from 'next'

const MAX_CAUSE_DEPTH = 5

type ErrorLike = Error & {
  address?: unknown
  code?: unknown
  errors?: unknown
  port?: unknown
  severity?: unknown
  syscall?: unknown
}

const describeError = (error: ErrorLike) => ({
  name: error.name,
  message: error.message,
  code: error.code,
  severity: error.severity,
  syscall: error.syscall,
  address: error.address,
  port: error.port,
})

/**
 * Collects the errors behind a request failure. The outermost error is skipped
 * on purpose: Next.js already logs it, and for database failures its message
 * contains the query parameters, which can hold user data.
 */
const collectCauses = (error: unknown): ReturnType<typeof describeError>[] => {
  const causes: ReturnType<typeof describeError>[] = []
  let current = (error as ErrorLike | undefined)?.cause

  for (let depth = 0; current instanceof Error && depth < MAX_CAUSE_DEPTH; depth++) {
    const cause = current as ErrorLike
    causes.push(describeError(cause))

    // Failed connections can report one AggregateError covering each address tried.
    if (Array.isArray(cause.errors)) {
      causes.push(
        ...cause.errors
          .filter((item): item is ErrorLike => item instanceof Error)
          .map(describeError),
      )
    }

    current = cause.cause
  }

  return causes
}

export const onRequestError: Instrumentation.onRequestError = (error, _request, context) => {
  const causes = collectCauses(error)

  if (causes.length > 0) {
    console.error('[request-error] Underlying cause:', {
      routePath: context.routePath,
      causes,
    })
  }
}
