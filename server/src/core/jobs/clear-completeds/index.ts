import { EnqueueFunction, registerJob } from '~/core/jobs/register'
import { createDebuger } from '~/utils/debug'

const debug = createDebuger('clear-completed-job')

export function instanteateEnqueueClearCompletedJob(): EnqueueClearCompleted {
  return registerJob({
    name: 'ClearCompleted',
    onError: console.error,
    onFinished: console.log,

    // initiateOnRegister: void,

    defaultOptions: {
      stackTraceLimit: 1,
      repeat: { cron: '0 0 * * *' }
    },

    async handler() {
      debug(`Executing clear at ${new Date().toISOString()}`)
    }
  })
}

export type EnqueueClearCompleted = EnqueueFunction<void>
