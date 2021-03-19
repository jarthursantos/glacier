import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { GlacierInventoryJobModule } from '~/core/modules/glacier-jobs/inventory'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

import { FindJobService } from './find'

export interface InventoryJobParams {
  vault: Vault | string
  periodStart?: Date
  periodEnd?: Date
  description?: string
}

export type InventoryJobService = Service<InventoryJobParams, GlacierJob>

export function instantiateInventoryJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  glacierInventoryJobModule: GlacierInventoryJobModule,
  findJobService: FindJobService
): InventoryJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobId = await glacierInventoryJobModule.execute({
        ...params,
        vault
      })

      const job = await findJobService.execute({ vault, jobId })

      return job
    }
  }
}
