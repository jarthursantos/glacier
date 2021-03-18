import { Vault } from '~/core/domain/Vault'
import { FindVaultService } from '~/core/services/vaults/find'

interface Params {
  vault: Vault | string
}

export interface ExtractVaultFromParams {
  extract(params: Params): Promise<Vault>
}

export function instantiateExtractVaultFromParams(
  findVaultService: FindVaultService
): ExtractVaultFromParams {
  return {
    async extract({ vault }) {
      if (typeof vault === 'string') {
        return await findVaultService.execute({ vaultName: vault })
      }

      return vault
    }
  }
}
