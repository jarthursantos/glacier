import { Readable } from 'stream'

import { GlacierJob } from '~/core/domain/GlacierJob'
import { JobActions } from '~/core/domain/JobActions'
import { Vault } from '~/core/domain/Vault'
import { InvalidJobActionError } from '~/core/errors/jobs/InvalidJobAction'
import { InventoryOutputJobModule } from '~/core/modules/jobs/inventory-output'
import { Service } from '~/core/services'
import { ExtractJobFromParams } from '~/core/utils/params/extract-job'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface InventoryOutputJobParams {
  vault: Vault | string
  job: GlacierJob | string
}

export type InventoryOutputJobService = Service<
  InventoryOutputJobParams,
  Readable
>

export function instantiateInventoryOutputJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  extractJobFromParams: ExtractJobFromParams,
  inventoryOutputJobModule: InventoryOutputJobModule
): InventoryOutputJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)
      const job = await extractJobFromParams.extract({ ...params, vault })

      if (job.action !== JobActions.INVENTORY_RETRIEVAL) {
        throw new InvalidJobActionError()
      }

      const archives = await inventoryOutputJobModule.execute({ vault, job })

      return archives
    }
  }
}
