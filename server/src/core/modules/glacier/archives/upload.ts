import { GlacierClient, UploadArchiveCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { GlacierArchive } from '~/core/domain/GlacierArchive'
import { Vault } from '~/core/domain/Vault'
import { UploadFileError } from '~/core/errors/archives/UploadFile'
import { Module } from '~/core/modules'

export interface UploadGlacierArchiveParams {
  vault: Vault
  file: Buffer
  description?: string
}

export type UploadGlacierArchiveModule = Module<
  UploadGlacierArchiveParams,
  GlacierArchive
>

export function instantiateUploadGlacierArchiveModule(
  glacierClient: GlacierClient
): UploadGlacierArchiveModule {
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

      return { archiveId }
    }
  }
}
