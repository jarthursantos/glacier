import { Job } from '~/core/domain/Job'
import { User } from '~/core/domain/User'
import { Vault } from '~/core/domain/Vault'
import { GlacierArchiveJobModule } from '~/core/modules/glacier/jobs/archive'
import { CreateRetrievalJobModule } from '~/core/modules/jobs/create'
import { Service } from '~/core/services'
import { FindGlacierJobService } from '~/core/services/glacier/jobs/find'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface CreateJobParams {
  archiveId: string
  vault: Vault | string
  user: User
}

export type CreateJobService = Service<CreateJobParams, Job>

export function instantiateCreateJobService(
  createRetrievalJobModule: CreateRetrievalJobModule,
  glacierArchiveJobModule: GlacierArchiveJobModule,
  findGlacierJobService: FindGlacierJobService,
  extractVaultFromParams: ExtractVaultFromParams
): CreateJobService {
  return {
    async execute(params) {
      const { archiveId, user } = params

      const vault = await extractVaultFromParams.extract(params)
      const jobId = await glacierArchiveJobModule.execute({ archiveId, vault })
      const glacierJob = await findGlacierJobService.execute({ jobId, vault })

      const job = await createRetrievalJobModule.execute({
        archive: { id_glacier: archiveId },
        glacierJob,
        user
      })

      return job
    }
  }
}
