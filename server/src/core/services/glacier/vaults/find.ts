import { Vault } from '~/core/domain/Vault'
import { VaultNotFoundError } from '~/core/errors/vault/VaultNotFound'
import { FindGlacierVaultModule } from '~/core/modules/glacier/vaults/find'
import { Service } from '~/core/services'

export interface FindGlacierVaultParams {
  vaultName: string
}

export type FindGlacierVaultService = Service<FindGlacierVaultParams, Vault>

export function instantiateFindGlacierVaultService(
  findGlacierVaultModule: FindGlacierVaultModule
): FindGlacierVaultService {
  return {
    async execute({ vaultName }) {
      const vault = await findGlacierVaultModule.execute({ vaultName })

      if (!vault) {
        throw new VaultNotFoundError(vaultName)
      }

      return vault
    }
  }
}
