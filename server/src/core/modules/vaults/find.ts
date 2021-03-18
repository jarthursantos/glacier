import { GlacierClient, DescribeVaultCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { Module } from '~/core/modules'
import { DateParser } from '~/core/utils/date/parse'

export interface FindVaultParams {
  vaultName: string
}

export type FindVaultModule = Module<FindVaultParams, Vault | undefined>

export function instantiateFindVaultModule(
  glacierClient: GlacierClient,
  dateParser: DateParser
): FindVaultModule {
  return {
    async execute({ vaultName }) {
      const command = new DescribeVaultCommand({
        vaultName,
        accountId: ACCOUNT_ID
      })

      try {
        const result = await glacierClient.send(command)

        if (result.$metadata.httpStatusCode === 404) {
          return undefined
        }

        const vault: Vault = {
          name: result.VaultName || '',
          location: result.VaultARN || '',
          archivesCount: result.NumberOfArchives || 0,
          sizeInBytes: result.SizeInBytes || 0,
          lastInventoryAt: result.LastInventoryDate
            ? dateParser.from(result.LastInventoryDate)
            : undefined,
          createdAt: result.CreationDate
            ? dateParser.from(result.CreationDate)
            : new Date()
        }

        return vault
      } catch (error) {
        return undefined
      }
    }
  }
}
