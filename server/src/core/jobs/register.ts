import Bull, { JobOptions, Queue } from 'bull'

import { QueueJob } from '~/core/jobs'
import { createDebuger } from '~/utils/debug'

interface QueueDict {
  [key: string]: {
    queue: Queue
    job: QueueJob<any, any>
  }
}

const queues: QueueDict = {}

const debug = createDebuger('queue:register')

export interface EnqueueFunction<Params> {
  (params: Params, options?: JobOptions): Promise<void>
}

export function registerJob<Params, Result>(
  job: QueueJob<Params, Result>
): EnqueueFunction<Params> {
  debug(`${job.name} has been registered`)

  const queue = new Bull(job.name)

  queues[job.name] = { queue, job }

  const enqueue: EnqueueFunction<Params> = async function (params, options) {
    await queue.add(params, options || job.defaultOptions)
  }

  // if (job.initiateOnRegister) {
  //   enqueue()
  // }

  return enqueue
}

export { queues }
