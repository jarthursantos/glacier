import { Job } from '~/core/domain/Job'
import { FindArchiveModule } from '~/core/modules/archives/find'
import { FindContractModule } from '~/core/modules/contracts/find'
import { ActiveJobPerArchiveModule } from '~/core/modules/jobs/active-per-archive'
import { JobAlreadyRequestedByUserModule } from '~/core/modules/jobs/already-requested'
import { AttachJobUserModule } from '~/core/modules/jobs/attach-user'
import { CreateRetrievalJobModule } from '~/core/modules/jobs/create'
import { GetUserModule } from '~/core/modules/user/get'
import { Service } from '~/core/services'
import { GlacierArchiveJobService } from '~/core/services/glacier/jobs/archive'

export interface CreateRetrievalContractParams {
  contrato: string
  archiveId: string
  userId: string
}

export type CreateRetrievalContractService = Service<
  CreateRetrievalContractParams,
  Job
>

export function instantiateCreateRetrievalContractService(
  jobAlreadyRequestedByUserModule: JobAlreadyRequestedByUserModule,
  activeJobPerArchiveModule: ActiveJobPerArchiveModule,
  createRetrievalJobModule: CreateRetrievalJobModule,
  glacierArchiveJobService: GlacierArchiveJobService,
  attachJobUserModule: AttachJobUserModule,
  findContractModule: FindContractModule,
  findArchiveModule: FindArchiveModule,
  getUserModule: GetUserModule
): CreateRetrievalContractService {
  return {
    async execute({ contrato, archiveId, userId }) {
      const contract = await findContractModule.execute({ matricula: contrato })

      if (!contract) {
        throw new Error()
      }

      const archive = await findArchiveModule.execute({ id_glacier: archiveId })

      if (!archive) {
        throw new Error()
      }

      let job = await activeJobPerArchiveModule.execute({ archive })

      const user = await getUserModule.execute({ userId })

      if (job) {
        const userAlreadyRequestedJob = await jobAlreadyRequestedByUserModule.execute(
          { job, user }
        )

        if (userAlreadyRequestedJob) {
          return job
        }

        await attachJobUserModule.execute({ job, user })
      } else {
        const glacierJob = await glacierArchiveJobService.execute({
          vault: 'main',
          archiveId
        })

        job = await createRetrievalJobModule.execute({
          glacierJob,
          archive,
          user
        })
      }

      return job
    }
  }
}
