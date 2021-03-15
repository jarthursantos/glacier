import {
  GlacierClient,
  UploadMultipartPartCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { UploadFileError } from '~/errors/archives/UploadFile'
import { Module } from '~/modules'

export interface UploadMultipartParams {
  vault: Vault
  uploadId: string
  file: Buffer
}

export type UploadMultipartsModule = Module<UploadMultipartParams>

export function instantiateUploadMultipartsModule(
  client: GlacierClient
): UploadMultipartsModule {
  return {
    async execute({ vault, uploadId, file }) {
      const command = new UploadMultipartPartCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        uploadId,
        body: file
      })

      try {
        await client.send(command)
      } catch (error) {
        throw new UploadFileError()
      }
    }
  }
}
