import {
  GlacierClient,
  ListMultipartUploadsCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { MultipartUpload } from '~/domain/MultipartUpload'
import { Vault } from '~/domain/Vault'
import { Module } from '~/modules'
import { DateParser } from '~/utils/date/parse'

export interface ListMultipartUploadPsarams {
  vault: Vault
}

export type ListMultipartsUploadsModule = Module<
  ListMultipartUploadPsarams,
  MultipartUpload[]
>

export function instantiateListMultipartsUploadsModule(
  client: GlacierClient,
  dateParser: DateParser
): ListMultipartsUploadsModule {
  return {
    async execute({ vault }) {
      const command = new ListMultipartUploadsCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name
      })

      const multiparts: MultipartUpload[] = []

      const result = await client.send(command)

      if (result.$metadata.httpStatusCode === 404) {
        return []
      }

      result.UploadsList?.forEach(currentMultipartUpload => {
        multiparts.push({
          id: currentMultipartUpload.MultipartUploadId || '',
          description: currentMultipartUpload.ArchiveDescription,
          location: currentMultipartUpload.VaultARN || '',
          sizeInBytes: currentMultipartUpload.PartSizeInBytes || 0,
          createdAt: currentMultipartUpload.CreationDate
            ? dateParser.from(currentMultipartUpload.CreationDate)
            : new Date()
        })
      })

      return multiparts
    }
  }
}
