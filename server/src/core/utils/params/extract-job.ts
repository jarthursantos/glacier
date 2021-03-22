import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { FindGlacierJobService } from '~/core/services/glacier/jobs/find'

interface Params {
  vault: Vault
  job: GlacierJob | string
}

export interface ExtractJobFromParams {
  extract(params: Params): Promise<GlacierJob>
}

export function instantiateExtractJobFromParams(
  findGlacierJobService: FindGlacierJobService
): ExtractJobFromParams {
  return {
    async extract({ vault, job }) {
      if (typeof job === 'string') {
        return await findGlacierJobService.execute({ vault, jobId: job })
      }

      return job
    }
  }
}
