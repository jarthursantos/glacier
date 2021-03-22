import { Readable } from 'stream'

import { GlacierJob } from '~/core/domain/GlacierJob'
import { GlacierJobActions } from '~/core/domain/GlacierJobActions'
import { Vault } from '~/core/domain/Vault'
import { InvalidJobActionError } from '~/core/errors/jobs/InvalidJobAction'
import { GlacierInventoryOutputJobModule } from '~/core/modules/glacier/jobs/inventory-output'
import { Service } from '~/core/services'
import { ExtractJobFromParams } from '~/core/utils/params/extract-job'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface GlacierInventoryOutputJobParams {
  vault: Vault | string
  job: GlacierJob | string
}

export type GlacierInventoryOutputJobService = Service<
  GlacierInventoryOutputJobParams,
  Readable
>

export function instantiateGlacierInventoryOutputJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  extractJobFromParams: ExtractJobFromParams,
  glacierInventoryOutputJobModule: GlacierInventoryOutputJobModule
): GlacierInventoryOutputJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)
      const job = await extractJobFromParams.extract({ ...params, vault })

      if (job.action !== GlacierJobActions.INVENTORY_RETRIEVAL) {
        throw new InvalidJobActionError()
      }

      const archives = await glacierInventoryOutputJobModule.execute({
        vault,
        job
      })

      return archives
    }
  }
}
