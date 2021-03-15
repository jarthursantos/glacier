import { Vault } from '~/domain/Vault'
import { CreateVaultError } from '~/errors/vault/CreateVault'
import { VaultAlreadyExistsError } from '~/errors/vault/VaultAlreadyExists'
import { CreateVaultModule } from '~/modules/vaults/create'
import { FindVaultModule } from '~/modules/vaults/find'
import { Service } from '~/services'

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
