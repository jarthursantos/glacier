import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { GlacierInventoryJobModule } from '~/core/modules/glacier/jobs/inventory'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

import { FindGlacierJobService } from './find'

export interface GlacierInventoryJobParams {
  vault: Vault | string
  periodStart?: Date
  periodEnd?: Date
  description?: string
}

export type GlacierInventoryJobService = Service<
  GlacierInventoryJobParams,
  GlacierJob
>

export function instantiateGlacierInventoryJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  glacierInventoryJobModule: GlacierInventoryJobModule,
  findGlacierJobService: FindGlacierJobService
): GlacierInventoryJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobId = await glacierInventoryJobModule.execute({
        ...params,
        vault
      })

      const job = await findGlacierJobService.execute({ vault, jobId })

      return job
    }
  }
}
