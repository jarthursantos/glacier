import { GlacierJob } from '~/core/domain/GlacierJob'
import { Tiers } from '~/core/domain/Tiers'
import { Vault } from '~/core/domain/Vault'
import { GlacierArchiveJobModule } from '~/core/modules/glacier/jobs/archive'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

import { FindGlacierJobService } from './find'

export interface GlacierArchiveJobParams {
  vault: Vault | string
  archiveId: string
  tier?: Tiers
  description?: string
}

export type GlacierArchiveJobService = Service<
  GlacierArchiveJobParams,
  GlacierJob
>

export function instantiateGlacierArchiveJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  glacierArchiveJobModule: GlacierArchiveJobModule,
  findGlacierJobService: FindGlacierJobService
): GlacierArchiveJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobId = await glacierArchiveJobModule.execute({ ...params, vault })

      const job = await findGlacierJobService.execute({ vault, jobId })

      return job
    }
  }
}
