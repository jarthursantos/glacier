import { Vault } from '~/core/domain/Vault'
import { ArchiveNotFoundError } from '~/core/errors/archives/ArchiveNotFound'
import { DeleteArchiveModule } from '~/core/modules/archives/delete'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface DeleteArchiveParams {
  vault: Vault | string
  archiveId: string
}

export type DeleteArchiveService = Service<DeleteArchiveParams>

export function instantiateDeleteArchiveService(
  extractVaultFromParams: ExtractVaultFromParams,
  deleteArchiveModule: DeleteArchiveModule
): DeleteArchiveService {
  return {
    async execute(params) {
      const { archiveId } = params

      const vault = await extractVaultFromParams.extract(params)

      try {
        await deleteArchiveModule.execute({ vault, archiveId })
      } catch (error) {
        throw new ArchiveNotFoundError()
      }
    }
  }
}
