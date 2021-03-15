import { GlacierClient, ListVaultsCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { Module } from '~/modules'
import { DateParser } from '~/utils/date/parse'

export type ListVaultsModule = Module<void, Vault[]>

export function instantiateListVaultsModule(
  client: GlacierClient,
  dateParser: DateParser
): ListVaultsModule {
  return {
    async execute() {
      const command = new ListVaultsCommand({ accountId: ACCOUNT_ID })

      try {
        const result = await client.send(command)

        if (result.$metadata.httpStatusCode === 404) {
          return []
        }

        const vaults: Vault[] = []

        result.VaultList?.forEach(data => {
          vaults.push({
            name: data.VaultName || '',
            location: data.VaultARN || '',
            archivesCount: data.NumberOfArchives || 0,
            sizeInBytes: data.SizeInBytes || 0,
            lastInventoryAt: data.LastInventoryDate
              ? dateParser.from(data.LastInventoryDate)
              : undefined,
            createdAt: data.CreationDate
              ? dateParser.from(data.CreationDate)
              : new Date()
          })
        })

        return vaults
      } catch (error) {
        return []
      }
    }
  }
}
