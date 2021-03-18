import { GlacierClient, DeleteArchiveCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { Module } from '~/core/modules'

export interface DeleteArchiveParams {
  vault: Vault
  archiveId: string
}

export type DeleteArchiveModule = Module<DeleteArchiveParams>

export function instantiateDeleteArchiveModule(
  glacierClient: GlacierClient
): DeleteArchiveModule {
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
