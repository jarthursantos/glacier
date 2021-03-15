import { Vault } from '~/domain/Vault'
import { VaultNotFoundError } from '~/errors/vault/VaultNotFound'
import { FindVaultModule } from '~/modules/vaults/find'
import { Service } from '~/services'

export interface FindVaultParams {
  vaultName: string
}

export type FindVaultService = Service<FindVaultParams, Vault>

export function instantiateFindVaultService(
  findVaultModule: FindVaultModule
): FindVaultService {
  return {
    async execute({ vaultName }) {
      const vault = await findVaultModule.execute({ vaultName })

      if (!vault) {
        throw new VaultNotFoundError(vaultName)
      }

      return vault
    }
  }
}
