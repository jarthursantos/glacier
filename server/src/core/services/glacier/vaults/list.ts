import { Vault } from '~/core/domain/Vault'
import { ListGlacierVaultsModule } from '~/core/modules/glacier/vaults/list'
import { Service } from '~/core/services'

export type ListGlacierVaultsService = Service<void, Vault[]>

export function instantiateListGlacierVaultsService(
  listGlacierVaultsModule: ListGlacierVaultsModule
): ListGlacierVaultsService {
  return {
    async execute() {
      const vault = await listGlacierVaultsModule.execute()

      return vault
    }
  }
}
