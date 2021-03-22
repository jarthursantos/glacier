import {
  GlacierClient,
  UploadMultipartPartCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { UploadFileError } from '~/core/errors/archives/UploadFile'
import { Module } from '~/core/modules'

export interface UploadGlacierMultipartParams {
  vault: Vault
  uploadId: string
  file: Buffer
}

export type UploadGlacierMultipartsModule = Module<UploadGlacierMultipartParams>

export function instantiateUploadGlacierMultipartsModule(
  glacierClient: GlacierClient
): UploadGlacierMultipartsModule {
  return {
    async execute({ vault, uploadId, file }) {
      const command = new UploadMultipartPartCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        uploadId,
        body: file
      })

      try {
        await glacierClient.send(command)
      } catch (error) {
        throw new UploadFileError()
      }
    }
  }
}
