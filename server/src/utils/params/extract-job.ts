import { Job } from '~/domain/Job'
import { Vault } from '~/domain/Vault'
import { FindJobService } from '~/services/jobs/find'

interface Params {
  vault: Vault
  job: Job | string
}

export interface ExtractJobFromParams {
  extract(params: Params): Promise<Job>
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
