import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { JobNotFoundError } from '~/core/errors/jobs/JobNotFound'
import { GlacierFindJobModule } from '~/core/modules/glacier/jobs/find'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface FindGlacierJobParams {
  vault: Vault | string
  jobId: string
}

export type FindGlacierJobService = Service<FindGlacierJobParams, GlacierJob>

export function instantiateFindGlacierJobService(
  glacierFindJobModule: GlacierFindJobModule,
  extractVaultFromParams: ExtractVaultFromParams
): FindGlacierJobService {
  return {
    async execute(params) {
      const { jobId } = params

      const vault = await extractVaultFromParams.extract(params)

      const job = await glacierFindJobModule.execute({ vault, jobId })

      if (!job) {
        throw new JobNotFoundError()
      }

      return job
    }
  }
}
