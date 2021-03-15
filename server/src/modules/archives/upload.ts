import { GlacierClient, UploadArchiveCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { UploadFileError } from '~/errors/archives/UploadFile'
import { Module } from '~/modules'

export interface UploadArchiveParams {
  vault: Vault
  file: Buffer
  description?: string
}

export type UploadArchiveModule = Module<UploadArchiveParams, string>

export function instantiateUploadArchiveModule(
  client: GlacierClient
): UploadArchiveModule {
  return {
    async execute({ vault, file, description }) {
      const command = new UploadArchiveCommand({
        vaultName: vault.name,
        accountId: ACCOUNT_ID,
        archiveDescription: description,
        body: file
      })

      const { archiveId } = await client.send(command)

      if (!archiveId) {
        throw new UploadFileError()
      }

      return archiveId
    }
  }
}
