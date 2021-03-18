import { GlacierClient, ListVaultsCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Vault } from '~/core/domain/Vault'
import { Module } from '~/core/modules'
import { DateParser } from '~/core/utils/date/parse'

export type ListVaultsModule = Module<void, Vault[]>

export function instantiateListVaultsModule(
  glacierClient: GlacierClient,
  dateParser: DateParser
): ListVaultsModule {
  return {
    async execute() {
      const command = new ListVaultsCommand({ accountId: ACCOUNT_ID })

      try {
        const result = await glacierClient.send(command)

        console.log({ result })

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
