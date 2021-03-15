import {
  GlacierClient,
  InitiateMultipartUploadCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { InitializeMultipartUploadError } from '~/errors/multipart/InitializeMultipartUpload'
import { Module } from '~/modules'

export interface InitiateMultipartUploadParams {
  vault: Vault
  description?: string
}

export type InitiateMultipartsUploadModule = Module<
  InitiateMultipartUploadParams,
  string
>

export function instantiateInitiateMultipartsUploadModule(
  client: GlacierClient
): InitiateMultipartsUploadModule {
  return {
    async execute({ vault, description }) {
      const command = new InitiateMultipartUploadCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        archiveDescription: description
      })

      const { uploadId } = await client.send(command)

      if (!uploadId) {
        throw new InitializeMultipartUploadError()
      }

      return uploadId
    }
  }
}
