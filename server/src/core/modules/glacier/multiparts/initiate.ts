import {
  GlacierClient,
  InitiateMultipartUploadCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { InitializeMultipartUploadError } from '~/core/errors/multipart/InitializeMultipartUpload'
import { Module } from '~/core/modules'

export interface InitiateGlacierMultipartUploadParams {
  vault: Vault
  description?: string
}

export type InitiateGlacierMultipartsUploadModule = Module<
  InitiateGlacierMultipartUploadParams,
  string
>

export function instantiateInitiateGlacierMultipartsUploadModule(
  glacierClient: GlacierClient
): InitiateGlacierMultipartsUploadModule {
  return {
    async execute({ vault, description }) {
      const command = new InitiateMultipartUploadCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        archiveDescription: description
      })

      const { uploadId } = await glacierClient.send(command)

      if (!uploadId) {
        throw new InitializeMultipartUploadError()
      }

      return uploadId
    }
  }
}
