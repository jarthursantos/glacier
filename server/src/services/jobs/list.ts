import { Job } from '~/domain/Job'
import { Vault } from '~/domain/Vault'
import { ListJobsModule } from '~/modules/jobs/list'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

export interface ListJobsParams {
  vault: Vault | string
}

export type ListJobsService = Service<ListJobsParams, Job[]>

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
