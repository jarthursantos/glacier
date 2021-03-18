import {
  GlacierClient,
  ListMultipartUploadsCommand
} from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { MultipartUpload } from '~/core/domain/MultipartUpload'
import { Vault } from '~/core/domain/Vault'
import { Module } from '~/core/modules'
import { DateParser } from '~/core/utils/date/parse'

export interface ListMultipartUploadPsarams {
  vault: Vault
}

export type ListMultipartsUploadsModule = Module<
  ListMultipartUploadPsarams,
  MultipartUpload[]
>

export function instantiateListMultipartsUploadsModule(
  glacierClient: GlacierClient,
  dateParser: DateParser
): ListMultipartsUploadsModule {
  return {
    async execute({ vault }) {
      const command = new ListMultipartUploadsCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name
      })

      const multiparts: MultipartUpload[] = []

      const result = await glacierClient.send(command)

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