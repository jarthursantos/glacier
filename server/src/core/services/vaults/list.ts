import { Vault } from '~/core/domain/Vault'
import { ListVaultsModule } from '~/core/modules/vaults/list'
import { Service } from '~/core/services'

export type ListVaultsService = Service<void, Vault[]>

export function instantiateListVaultsService(
  listVaultsModule: ListVaultsModule
): ListVaultsService {
  return {
    async execute() {
      const vault = await listVaultsModule.execute()

      return vault
    }
  }
}
