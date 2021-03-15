import { Job } from '~/domain/Job'
import { Tiers } from '~/domain/Tiers'
import { Vault } from '~/domain/Vault'
import { ArchiveJobModule } from '~/modules/jobs/archive'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

import { FindJobService } from './find'

export interface ArchiveJobParams {
  vault: Vault | string
  archiveId: string
  tier?: Tiers
  description?: string
}

export type ArchiveJobService = Service<ArchiveJobParams, Job>

export function instantiateArchiveJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  archiveJobModule: ArchiveJobModule,
  findJobService: FindJobService
): ArchiveJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobId = await archiveJobModule.execute({ ...params, vault })

      const job = await findJobService.execute({ vault, jobId })

      return job
    }
  }
}
