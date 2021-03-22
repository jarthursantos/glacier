import { Vault } from '~/core/domain/Vault'
import { CreateVaultError } from '~/core/errors/vault/CreateVault'
import { VaultAlreadyExistsError } from '~/core/errors/vault/VaultAlreadyExists'
import { CreateGlacierVaultModule } from '~/core/modules/glacier/vaults/create'
import { FindGlacierVaultModule } from '~/core/modules/glacier/vaults/find'
import { Service } from '~/core/services'

export interface CreateGlacierVaultParams {
  name: string
}

export type CreateGlacierVaultService = Service<CreateGlacierVaultParams, Vault>

export function instantiateCreateGlacierVaultService(
  createGlacierVaultModule: CreateGlacierVaultModule,
  findGlacierVaultModule: FindGlacierVaultModule
): CreateGlacierVaultService {
  return {
    async execute({ name: vaultName }) {
      const vaultExists = await findGlacierVaultModule.execute({ vaultName })

      if (vaultExists) {
        throw new VaultAlreadyExistsError(
          `A vault with name '${vaultName}' already exists`
        )
      }

      try {
        await createGlacierVaultModule.execute({ vaultName })
      } catch (error) {
        throw new CreateVaultError()
      }

      const vault = await findGlacierVaultModule.execute({ vaultName })

      if (!vault) {
        throw new CreateVaultError()
      }

      return vault
    }
  }
}
