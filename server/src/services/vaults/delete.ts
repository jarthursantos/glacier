import { Vault } from '~/domain/Vault'
import { VaultNotEmptyError } from '~/errors/vault/VaultNotEmpty'
import { DeleteVaultModule } from '~/modules/vaults/delete'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

export interface DeleteVaultParams {
  vault: Vault | string
}

export type DeleteVaultService = Service<DeleteVaultParams>

export function instantiateDeleteVaultService(
  extractVaultFromParams: ExtractVaultFromParams,
  deleteVaultModule: DeleteVaultModule
): DeleteVaultService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      try {
        await deleteVaultModule.execute({ vault })
      } catch (error) {
        throw new VaultNotEmptyError()
      }
    }
  }
}
