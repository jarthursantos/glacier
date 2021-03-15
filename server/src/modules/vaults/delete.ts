import { GlacierClient, DeleteVaultCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { Module } from '~/modules'

export interface DeleteVaultParams {
  vault: Vault
}

export type DeleteVaultModule = Module<DeleteVaultParams>

export function instantiateDeleteVaultModule(
  glacierClient: GlacierClient
): DeleteVaultModule {
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
