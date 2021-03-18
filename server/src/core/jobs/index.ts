import { asFunction, NameAndRegistrationPair } from 'awilix'
import { JobOptions } from 'bull'

import { instanteateEnqueueAccessJob } from './access'
import { instanteateEnqueueClearCompletedJob } from './clear-completeds'
import { instanteateEnqueueMetaJob } from './meta'

export const queueJobsRegistrations: NameAndRegistrationPair<any> = {
  enqueueAccessJob: asFunction(instanteateEnqueueAccessJob),
  enqueueClearCompletedJob: asFunction(instanteateEnqueueClearCompletedJob),
  enqueueMetaJob: asFunction(instanteateEnqueueMetaJob)
}

export interface QueueJob<Params = void, Result = void> {
  name: string
  handler(params: Params): Promise<Result>
  onFinished?(result: Result): void
  onError?(error: Error): void
  defaultOptions?: JobOptions
  // initiateOnRegister?: Params | true | false | undefined
}
