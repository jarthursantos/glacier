import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { GlacierListJobsModule } from '~/core/modules/glacier-jobs/list'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface ListJobsParams {
  vault: Vault | string
}

export type ListJobsService = Service<ListJobsParams, GlacierJob[]>

export function instantiateListJobsService(
  glacierListJobsModule: GlacierListJobsModule,
  extractVaultFromParams: ExtractVaultFromParams
): ListJobsService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobs = await glacierListJobsModule.execute(vault)

      return jobs
    }
  }
}
