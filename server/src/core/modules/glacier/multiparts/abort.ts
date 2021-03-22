import {
  GlacierClient,
  AbortMultipartUploadCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { AbortMultipartUploadError } from '~/core/errors/multipart/AbortMultipartUpload'
import { Module } from '~/core/modules'

export interface AbortGlacierMultipartUploadParams {
  vault: Vault
  uploadId: string
}

export type AbortGlacierMultipartsUploadModule = Module<AbortGlacierMultipartUploadParams>

export function instantiateAbortGlacierMultipartsUploadModule(
  glacierClient: GlacierClient
): AbortGlacierMultipartsUploadModule {
  return {
    async execute({ vault, uploadId }) {
      const command = new AbortMultipartUploadCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        uploadId
      })

      try {
        await glacierClient.send(command)
      } catch (error) {
        throw new AbortMultipartUploadError()
      }
    }
  }
}
