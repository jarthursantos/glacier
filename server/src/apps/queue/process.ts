import { container } from '~/core/container'
import { queues } from '~/core/jobs/register'
import { createDebuger } from '~/utils/debug'

container.resolve('enqueueAccessJob')
container.resolve('enqueueClearCompletedJob')
container.resolve('enqueueMetaJob')

const debug = createDebuger('queue:process')

export function processQueues() {
  const keys = Object.keys(queues)

  keys.forEach(key => {
    const { job, queue } = queues[key]

    queue.on('error', err => job.onError && job.onError(err))
    queue.on('completed', (_, res) => job.onFinished && job.onFinished(res))

    queue.process(({ data }) => job.handler(data))
  })

  debug(`${keys.length} queues has been processed`)
}
