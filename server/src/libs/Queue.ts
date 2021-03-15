import Bull from 'bull'

import { host, port } from '~/configs/redis'
import { createDebuger } from '~/debug'
import { Job } from '~/jobs'
import { Access } from '~/jobs/access'
import { Populate } from '~/jobs/populate'

const debug = createDebuger('queue')

export interface JobQueue<T = any> {
  queue: Bull.Queue
  handler(data: T): Promise<void>
}

const jobs: Job[] = [Access, Populate]

const queues: { [key: string]: JobQueue } = {}

jobs.forEach(({ key, handler }) => {
  queues[key] = {
    queue: new Bull(key, { redis: { host, port } }),
    handler
  }
})

export async function enqueueJob<Data>(queue: string, data: Data) {
  debug(
    `Enqueueing ${JSON.stringify(queue)} with data '${JSON.stringify(data)}'`
  )

  await queues[queue].queue.add(data)
}

export function processQueue() {
  jobs.forEach(job => {
    const { queue, handler } = queues[job.key]

    queue.process(({ data }) => {
      debug(
        `Executing ${JSON.stringify(job.key)} job with data '${JSON.stringify(
          data
        )}'`
      )

      handler(data)
    })

    debug(`Registering ${job.key} handler`)
  })
}
