import { GlacierClient, DescribeJobCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { GlacierJob, BaseGlacierJob } from '~/core/domain/GlacierJob'
import { GlacierJobActions } from '~/core/domain/GlacierJobActions'
import { GlacierJobStatus } from '~/core/domain/GlacierJobStatus'
import { Tiers } from '~/core/domain/Tiers'
import { Vault } from '~/core/domain/Vault'
import { InvalidJobStatusError } from '~/core/errors/jobs/InvalidJobStatus'
import { Module } from '~/core/modules'
import { DateParser } from '~/core/utils/date/parse'

export interface GlacierFindJobParams {
  vault: Vault
  jobId: string
}

export type GlacierFindJobModule = Module<
  GlacierFindJobParams,
  GlacierJob | undefined
>

export function instantiateGlacierFindJobModule(
  glacierClient: GlacierClient,
  dateParser: DateParser
): GlacierFindJobModule {
  return {
    async execute({ vault, jobId }) {
      const command = new DescribeJobCommand({
        vaultName: vault.name,
        jobId,
        accountId: ACCOUNT_ID
      })

      const response = await glacierClient.send(command)

      if (response.$metadata.httpStatusCode === 404) {
        return undefined
      }

      let job: GlacierJob | undefined

      let status: GlacierJobStatus

      switch (response.StatusCode) {
        case 'Succeeded':
          status = GlacierJobStatus.SUCCEEDED
          break
        case 'Failed':
          status = GlacierJobStatus.FAILED
          break
        case 'InProgress':
          status = GlacierJobStatus.IN_PROGRESS
          break
        default:
          throw new InvalidJobStatusError()
      }

      const baseJob: BaseGlacierJob = {
        completed: response.Completed || false,
        completedAt: response.CompletionDate
          ? dateParser.from(response.CompletionDate)
          : undefined,
        id: response.JobId || '',
        location: response.VaultARN || '',
        snsTopic: response.SNSTopic,
        status,
        statusMessage: response.StatusMessage || '',
        description: response.JobDescription,
        createdAt: response.CreationDate
          ? dateParser.from(response.CreationDate)
          : new Date()
      }

      switch (response.Action) {
        case 'Select':
          job = { ...baseJob, action: GlacierJobActions.SELECT }
          break
        case 'ArchiveRetrieval':
          let tier: Tiers | undefined

          switch (response.Tier) {
            case 'Standard':
              tier = Tiers.STANDARD
              break
          }

          job = {
            ...baseJob,
            action: GlacierJobActions.ARCHIVE_RETRIEVAL,
            archiveId: response.ArchiveId || '',
            tier
          }
          break
        case 'InventoryRetrieval':
          job = {
            ...baseJob,
            action: GlacierJobActions.INVENTORY_RETRIEVAL,
            inventorySizeInBytes: response.InventorySizeInBytes
          }
          break
        default:
          break
      }

      return job
    }
  }
}
