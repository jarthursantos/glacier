import { Readable } from 'stream'

import { Job } from '~/domain/Job'
import { JobActions } from '~/domain/JobActions'
import { Vault } from '~/domain/Vault'
import { InvalidJobActionError } from '~/errors/jobs/InvalidJobAction'
import { ArchiveOutputJobModule } from '~/modules/jobs/archive-output'
import { Service } from '~/services'
import { ExtractJobFromParams } from '~/utils/params/extract-job'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

export interface ArchiveOutputJobParams {
  vault: Vault | string
  job: Job | string
}

export type ArchiveOutputJobService = Service<ArchiveOutputJobParams, Readable>

export function instantiateArchiveOutputJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  extractJobFromParams: ExtractJobFromParams,
  archiveOutputJobModule: ArchiveOutputJobModule
): ArchiveOutputJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)
      const job = await extractJobFromParams.extract({ ...params, vault })

      if (job.action !== JobActions.ARCHIVE_RETRIEVAL) {
        throw new InvalidJobActionError()
      }

      const readable = await archiveOutputJobModule.execute({ vault, job })

      return readable
    }
  }
}
