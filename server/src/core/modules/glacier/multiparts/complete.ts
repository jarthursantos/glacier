import {
  GlacierClient,
  CompleteMultipartUploadCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { UploadFileError } from '~/core/errors/archives/UploadFile'
import { Module } from '~/core/modules'

export interface CompleteGlacierMultipartUploadParams {
  vault: Vault
  uploadId: string
}

export type CompleteGlacierMultipartsUploadModule = Module<
  CompleteGlacierMultipartUploadParams,
  string
>

export function instantiateCompleteGlacierMultipartsUploadModule(
  glacierClient: GlacierClient
): CompleteGlacierMultipartsUploadModule {
  return {
    async execute({ vault, uploadId }) {
      const command = new CompleteMultipartUploadCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        uploadId
      })

      const { archiveId } = await glacierClient.send(command)

      if (!archiveId) {
        throw new UploadFileError()
      }

      return archiveId
    }
  }
}
