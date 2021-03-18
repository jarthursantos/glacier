import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { FindJobService } from '~/core/services/jobs/find'

interface Params {
  vault: Vault
  job: GlacierJob | string
}

export interface ExtractJobFromParams {
  extract(params: Params): Promise<GlacierJob>
}

export function instantiateExtractJobFromParams(
  findJobService: FindJobService
): ExtractJobFromParams {
  return {
    async extract({ vault, job }) {
      if (typeof job === 'string') {
        return await findJobService.execute({ vault, jobId: job })
      }

      return job
    }
  }
}
