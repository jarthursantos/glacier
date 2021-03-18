import { GlacierJob } from '~/core/domain/GlacierJob'
import { Tiers } from '~/core/domain/Tiers'
import { Vault } from '~/core/domain/Vault'
import { ArchiveJobModule } from '~/core/modules/jobs/archive'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

import { FindJobService } from './find'

export interface ArchiveJobParams {
  vault: Vault | string
  archiveId: string
  tier?: Tiers
  description?: string
}

export type ArchiveJobService = Service<ArchiveJobParams, GlacierJob>

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
