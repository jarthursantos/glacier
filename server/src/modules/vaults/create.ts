import { GlacierClient, CreateVaultCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Module } from '~/modules'

export interface CreateVaultParams {
  vaultName: string
}

export type CreateVaultModule = Module<CreateVaultParams>

export function instantiateCreateVaultModule(
  glacierClient: GlacierClient
): CreateVaultModule {
  return {
    async execute({ vaultName }) {
      const command = new CreateVaultCommand({
        vaultName,
        accountId: ACCOUNT_ID
      })

      await glacierClient.send(command)
    }
  }
}
