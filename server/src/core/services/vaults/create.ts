import { Vault } from '~/core/domain/Vault'
import { CreateVaultError } from '~/core/errors/vault/CreateVault'
import { VaultAlreadyExistsError } from '~/core/errors/vault/VaultAlreadyExists'
import { CreateVaultModule } from '~/core/modules/vaults/create'
import { FindVaultModule } from '~/core/modules/vaults/find'
import { Service } from '~/core/services'

export interface CreateVaultParams {
  name: string
}

export type CreateVaultService = Service<CreateVaultParams, Vault>

export function instantiateCreateVaultService(
  createVaultModule: CreateVaultModule,
  findVaultModule: FindVaultModule
): CreateVaultService {
  return {
    async execute({ name: vaultName }) {
      const vaultExists = await findVaultModule.execute({ vaultName })

      if (vaultExists) {
        throw new VaultAlreadyExistsError(
          `A vault with name '${vaultName}' already exists`
        )
      }

      try {
        await createVaultModule.execute({ vaultName })
      } catch (error) {
        console.log(error)

        throw new CreateVaultError()
      }

      const vault = await findVaultModule.execute({ vaultName })

      if (!vault) {
        throw new CreateVaultError()
      }

      return vault
    }
  }
}
