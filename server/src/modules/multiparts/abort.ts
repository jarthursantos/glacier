import {
  GlacierClient,
  AbortMultipartUploadCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { AbortMultipartUploadError } from '~/errors/multipart/AbortMultipartUpload'
import { Module } from '~/modules'

export interface AbortMultipartUploadParams {
  vault: Vault
  uploadId: string
}

export type AbortMultipartsUploadModule = Module<AbortMultipartUploadParams>

export function instantiateAbortMultipartsUploadModule(
  client: GlacierClient
): AbortMultipartsUploadModule {
  return {
    async execute({ vault, uploadId }) {
      const command = new AbortMultipartUploadCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        uploadId
      })

      try {
        await client.send(command)
      } catch (error) {
        throw new AbortMultipartUploadError()
      }
    }
  }
}
