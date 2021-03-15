import { Vault } from '~/domain/Vault'
import { ArchiveNotFoundError } from '~/errors/archives/ArchiveNotFound'
import { DeleteArchiveModule } from '~/modules/archives/delete'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

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
