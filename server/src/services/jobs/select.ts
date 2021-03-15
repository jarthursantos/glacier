import { Job } from '~/domain/Job'
import { Vault } from '~/domain/Vault'
import { SelectJobModule } from '~/modules/jobs/select'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

import { FindJobService } from './find'

export interface SelectJobParams {
  vault: Vault | string
  archiveId: string
  query: string
  queryType: string
  inputSerialization: string
  outputSerialization: string
  description?: string
}

export type SelectJobService = Service<SelectJobParams, Job>

export function instantiateSelectJobService(
  extractVaultFromParams: ExtractVaultFromParams,
  selectJobModule: SelectJobModule,
  findJobService: FindJobService
): SelectJobService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const jobId = await selectJobModule.execute({ ...params, vault })

      const job = await findJobService.execute({ vault, jobId })

      return job
    }
  }
}
