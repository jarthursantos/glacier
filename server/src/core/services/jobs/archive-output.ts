import { Readable } from 'stream'

import { GlacierJob } from '~/core/domain/GlacierJob'
import { JobActions } from '~/core/domain/JobActions'
import { Vault } from '~/core/domain/Vault'
import { InvalidJobActionError } from '~/core/errors/jobs/InvalidJobAction'
import { ArchiveOutputJobModule } from '~/core/modules/jobs/archive-output'
import { Service } from '~/core/services'
import { ExtractJobFromParams } from '~/core/utils/params/extract-job'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface ArchiveOutputJobParams {
  vault: Vault | string
  job: GlacierJob | string
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
