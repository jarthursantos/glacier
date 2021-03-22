import { Vault } from '~/core/domain/Vault'
import { ArchiveNotFoundError } from '~/core/errors/archives/ArchiveNotFound'
import { DeleteGlacierArchiveModule } from '~/core/modules/glacier/archives/delete'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface DeleteGlacierArchiveParams {
  vault: Vault | string
  archiveId: string
}

export type DeleteGlacierArchiveService = Service<DeleteGlacierArchiveParams>

export function instantiateDeleteGlacierArchiveService(
  extractVaultFromParams: ExtractVaultFromParams,
  deleteGlacierArchiveModule: DeleteGlacierArchiveModule
): DeleteGlacierArchiveService {
  return {
    async execute(params) {
      const { archiveId } = params

      const vault = await extractVaultFromParams.extract(params)

      try {
        await deleteGlacierArchiveModule.execute({ vault, archiveId })
      } catch (error) {
        throw new ArchiveNotFoundError()
      }
    }
  }
}
