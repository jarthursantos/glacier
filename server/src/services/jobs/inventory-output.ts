import { Readable } from 'stream'

import { Job } from '~/domain/Job'
import { JobActions } from '~/domain/JobActions'
import { Vault } from '~/domain/Vault'
import { InvalidJobActionError } from '~/errors/jobs/InvalidJobAction'
import { InventoryOutputJobModule } from '~/modules/jobs/inventory-output'
import { Service } from '~/services'
import { ExtractJobFromParams } from '~/utils/params/extract-job'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

export interface InventoryOutputJobParams {
  vault: Vault | string
  job: Job | string
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
