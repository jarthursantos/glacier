import { Vault } from '~/core/domain/Vault'
import { VaultNotEmptyError } from '~/core/errors/vault/VaultNotEmpty'
import { DeleteGlacierVaultModule } from '~/core/modules/glacier/vaults/delete'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface DeleteGlacierVaultParams {
  vault: Vault | string
}

export type DeleteGlacierVaultService = Service<DeleteGlacierVaultParams>

export function instantiateDeleteGlacierVaultService(
  extractVaultFromParams: ExtractVaultFromParams,
  deleteGlacierVaultModule: DeleteGlacierVaultModule
): DeleteGlacierVaultService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      try {
        await deleteGlacierVaultModule.execute({ vault })
      } catch (error) {
        throw new VaultNotEmptyError()
      }
    }
  }
}
