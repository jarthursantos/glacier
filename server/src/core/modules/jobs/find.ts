import { GlacierClient, DescribeJobCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { GlacierJob, BaseGlacierJob } from '~/core/domain/GlacierJob'
import { JobActions } from '~/core/domain/JobActions'
import { JobStatus } from '~/core/domain/JobStatus'
import { Tiers } from '~/core/domain/Tiers'
import { Vault } from '~/core/domain/Vault'
import { InvalidJobStatusError } from '~/core/errors/jobs/InvalidJobStatus'
import { Module } from '~/core/modules'
import { DateParser } from '~/core/utils/date/parse'

export interface FindJobParams {
  vault: Vault
  jobId: string
}

export type FindJobModule = Module<FindJobParams, GlacierJob | undefined>

export function instantiateFindJobModule(
  glacierClient: GlacierClient,
  dateParser: DateParser
): FindJobModule {
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

      let status: JobStatus

      switch (response.StatusCode) {
        case 'Succeeded':
          status = JobStatus.SUCCEEDED
          break
        case 'Failed':
          status = JobStatus.FAILED
          break
        case 'InProgress':
          status = JobStatus.IN_PROGRESS
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
          job = { ...baseJob, action: JobActions.SELECT }
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
            action: JobActions.ARCHIVE_RETRIEVAL,
            archiveId: response.ArchiveId || '',
            tier
          }
          break
        case 'InventoryRetrieval':
          job = {
            ...baseJob,
            action: JobActions.INVENTORY_RETRIEVAL,
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
