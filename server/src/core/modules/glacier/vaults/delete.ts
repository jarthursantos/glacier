import { GlacierClient, DeleteVaultCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { Module } from '~/core/modules'

export interface DeleteGlacierVaultParams {
  vault: Vault
}

export type DeleteGlacierVaultModule = Module<DeleteGlacierVaultParams>

export function instantiateDeleteGlacierVaultModule(
  glacierClient: GlacierClient
): DeleteGlacierVaultModule {
  return {
    async execute({ vault }) {
      const command = new DeleteVaultCommand({
        vaultName: vault.name,
        accountId: ACCOUNT_ID
      })

      await glacierClient.send(command)
    }
  }
}
