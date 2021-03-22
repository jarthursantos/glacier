import { GlacierClient, CreateVaultCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Module } from '~/core/modules'

export interface CreateGlacierVaultParams {
  vaultName: string
}

export type CreateGlacierVaultModule = Module<CreateGlacierVaultParams>

export function instantiateCreateGlacierVaultModule(
  glacierClient: GlacierClient
): CreateGlacierVaultModule {
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
