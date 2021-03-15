import { Job } from '~/domain/Job'
import { Vault } from '~/domain/Vault'
import { JobNotFoundError } from '~/errors/jobs/JobNotFound'
import { FindJobModule } from '~/modules/jobs/find'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

export interface FindJobParams {
  vault: Vault | string
  jobId: string
}

export type FindJobService = Service<FindJobParams, Job>

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
