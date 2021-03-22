import { GlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { GlacierListJobsModule } from '~/core/modules/glacier/jobs/list'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface ListGlacierJobsParams {
  vault: Vault | string
}

export type ListGlacierJobsService = Service<
  ListGlacierJobsParams,
  GlacierJob[]
>

export function instantiateListGlacierJobsService(
  glacierListJobsModule: GlacierListJobsModule,
  extractVaultFromParams: ExtractVaultFromParams
): ListGlacierJobsService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobs = await glacierListJobsModule.execute(vault)

      return jobs
    }
  }
}
