import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { ListJobsModule } from '~/core/modules/jobs/list'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface ListJobsParams {
  vault: Vault | string
}

export type ListJobsService = Service<ListJobsParams, GlacierJob[]>

export function instantiateListJobsService(
  listJobsModule: ListJobsModule,
  extractVaultFromParams: ExtractVaultFromParams
): ListJobsService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobs = await listJobsModule.execute(vault)

      return jobs
    }
  }
}
