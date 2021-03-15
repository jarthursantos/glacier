import { Job } from '~/domain/Job'
import { Vault } from '~/domain/Vault'
import { InventoryJobModule } from '~/modules/jobs/inventory'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

import { FindJobService } from './find'

export interface InventoryJobParams {
  vault: Vault | string
  periodStart?: Date
  periodEnd?: Date
  description?: string
}

export type InventoryJobService = Service<InventoryJobParams, Job>

export function instantiateInventoryJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  inventoryJobModule: InventoryJobModule,
  findJobService: FindJobService
): InventoryJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobId = await inventoryJobModule.execute({ ...params, vault })

      const job = await findJobService.execute({ vault, jobId })

      return job
    }
  }
}
