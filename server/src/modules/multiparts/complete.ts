import {
  GlacierClient,
  CompleteMultipartUploadCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { UploadFileError } from '~/errors/archives/UploadFile'
import { Module } from '~/modules'

export interface CompleteMultipartUploadParams {
  vault: Vault
  uploadId: string
}

export type CompleteMultipartsUploadModule = Module<
  CompleteMultipartUploadParams,
  string
>

export function instantiateCompleteMultipartsUploadModule(
  client: GlacierClient
): CompleteMultipartsUploadModule {
  return {
    async execute({ vault, uploadId }) {
      const command = new CompleteMultipartUploadCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        uploadId
      })

      const { archiveId } = await client.send(command)

      if (!archiveId) {
        throw new UploadFileError()
      }

      return archiveId
    }
  }
}
