import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { JobNotFoundError } from '~/core/errors/jobs/JobNotFound'
import { FindJobModule } from '~/core/modules/jobs/find'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface FindJobParams {
  vault: Vault | string
  jobId: string
}

export type FindJobService = Service<FindJobParams, GlacierJob>

export function instantiateFindJobService(
  findJobModule: FindJobModule,
  extractVaultFromParams: ExtractVaultFromParams
): FindJobService {
  return {
    async execute(params) {
      const { jobId } = params

      const vault = await extractVaultFromParams.extract(params)

      const job = await findJobModule.execute({ vault, jobId })

      if (!job) {
        throw new JobNotFoundError()
      }

      return job
    }
  }
}
