import { GlacierClient, DeleteArchiveCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { Module } from '~/core/modules'

export interface DeleteGlacierArchiveParams {
  vault: Vault
  archiveId: string
}

export type DeleteGlacierArchiveModule = Module<DeleteGlacierArchiveParams>

export function instantiateDeleteGlacierArchiveModule(
  glacierClient: GlacierClient
): DeleteGlacierArchiveModule {
  return {
    async execute({ vault, archiveId }) {
      const command = new DeleteArchiveCommand({
        vaultName: vault.name,
        accountId: ACCOUNT_ID,
        archiveId
      })

      await glacierClient.send(command)
    }
  }
}
