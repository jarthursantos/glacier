import { GlacierClient, InitiateJobCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { CreateJobError } from '~/errors/jobs/CreateJob'
import { Module } from '~/modules'
import { DateParser } from '~/utils/date/parse'

export interface InventoryJobParams {
  vault: Vault
  periodStart?: Date
  periodEnd?: Date
  description?: string
}

export type InventoryJobModule = Module<InventoryJobParams, string>

export function instantiateInventoryJobModule(
  glacierClient: GlacierClient,
  dateParser: DateParser
): InventoryJobModule {
  return {
    async execute({ vault, description, periodStart, periodEnd }) {
      const command = new InitiateJobCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        jobParameters: {
          // SNSTopic: `glacier:${vault.name}:inventory`,
          Description: description,
          InventoryRetrievalParameters: {
            StartDate: periodStart && dateParser.stringify(periodStart),
            EndDate: periodEnd && dateParser.stringify(periodEnd)
          },
          Type: 'inventory-retrieval'
        }
      })

      const { jobId } = await glacierClient.send(command)

      if (!jobId) {
        throw new CreateJobError()
      }

      return jobId
    }
  }
}
