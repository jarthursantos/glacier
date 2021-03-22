import { Vault } from '~/core/domain/Vault'
import { FindGlacierVaultService } from '~/core/services/glacier/vaults/find'

interface Params {
  vault: Vault | string
}

export interface ExtractVaultFromParams {
  extract(params: Params): Promise<Vault>
}

export function instantiateExtractVaultFromParams(
  findGlacierVaultService: FindGlacierVaultService
): ExtractVaultFromParams {
  return {
    async extract({ vault }) {
      if (typeof vault === 'string') {
        return await findGlacierVaultService.execute({ vaultName: vault })
      }

      return vault
    }
  }
}
