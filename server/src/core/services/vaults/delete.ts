import { Vault } from '~/core/domain/Vault'
import { VaultNotEmptyError } from '~/core/errors/vault/VaultNotEmpty'
import { DeleteVaultModule } from '~/core/modules/vaults/delete'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

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
