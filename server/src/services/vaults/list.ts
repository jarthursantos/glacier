import { Vault } from '~/domain/Vault'
import { ListVaultsModule } from '~/modules/vaults/list'
import { Service } from '~/services'

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
