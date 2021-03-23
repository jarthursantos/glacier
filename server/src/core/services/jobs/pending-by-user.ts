import { RetrievalJob } from '~/core/domain/Job'
import { PendingJobsByUserModule } from '~/core/modules/jobs/pending-by-user'
import { GetUserModule } from '~/core/modules/user/get'
import { Service } from '~/core/services'

export interface PendingJobsByUserParams {
  userId: string
}

export type PendingJobsByUserService = Service<
  PendingJobsByUserParams,
  RetrievalJob[]
>

export function instantiatePendingJobsByUserService(
  pendingJobsByUserModule: PendingJobsByUserModule,
  getUserModule: GetUserModule
): PendingJobsByUserService {
  return {
    async execute(params) {
      const { userId } = params

      const user = await getUserModule.execute({ userId })

      const jobs = await pendingJobsByUserModule.execute({ user })

      return jobs
    }
  }
}
