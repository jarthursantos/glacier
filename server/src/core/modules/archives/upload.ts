import { GlacierClient, UploadArchiveCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { UploadFileError } from '~/core/errors/archives/UploadFile'
import { Module } from '~/core/modules'

export interface UploadArchiveParams {
  vault: Vault
  file: Buffer
  description?: string
}

export type UploadArchiveModule = Module<UploadArchiveParams, string>

export function instantiateUploadArchiveModule(
  glacierClient: GlacierClient
): UploadArchiveModule {
  return {
    async execute({ vault, file, description }) {
      const command = new UploadArchiveCommand({
        vaultName: vault.name,
        accountId: ACCOUNT_ID,
        archiveDescription: description,
        body: file
      })

      const { archiveId } = await glacierClient.send(command)

      if (!archiveId) {
        throw new UploadFileError()
      }

      return archiveId
    }
  }
}
