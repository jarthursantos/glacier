import { RetrievalJob } from '~/core/domain/Job'
import { CompleteJobsByUserModule } from '~/core/modules/jobs/complete-by-user'
import { GetUserModule } from '~/core/modules/user/get'
import { Service } from '~/core/services'

export interface CompleteJobsByUserParams {
  userId: string
}

export type CompleteJobsByUserService = Service<
  CompleteJobsByUserParams,
  RetrievalJob[]
>

export function instantiateCompleteJobsByUserService(
  completeJobsByUserModule: CompleteJobsByUserModule,
  getUserModule: GetUserModule
): CompleteJobsByUserService {
  return {
    async execute(params) {
      const { userId } = params

      const user = await getUserModule.execute({ userId })

      const jobs = await completeJobsByUserModule.execute({ user })

      return jobs
    }
  }
}
