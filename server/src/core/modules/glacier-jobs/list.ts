import { GlacierClient, ListJobsCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { GlacierJob, BaseGlacierJob } from '~/core/domain/GlacierJob'
import { GlacierJobActions } from '~/core/domain/GlacierJobActions'
import { GlacierJobStatus } from '~/core/domain/GlacierJobStatus'
import { Tiers } from '~/core/domain/Tiers'
import { Vault } from '~/core/domain/Vault'
import { InvalidJobStatusError } from '~/core/errors/jobs/InvalidJobStatus'
import { Module } from '~/core/modules'
import { DateParser } from '~/core/utils/date/parse'

export type GlacierListJobsModule = Module<Vault, GlacierJob[]>

export function instantiateGlacierListJobsModule(
  glacierClient: GlacierClient,
  dateParser: DateParser
): GlacierListJobsModule {
  return {
    async execute(vault) {
      const command = new ListJobsCommand({
        vaultName: vault.name,
        accountId: ACCOUNT_ID
      })

      const response = await glacierClient.send(command)

      const jobs: GlacierJob[] = []

      response.JobList?.forEach(currentJob => {
        let status: GlacierJobStatus

        switch (currentJob.StatusCode) {
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
          completed: currentJob.Completed || false,
          completedAt: currentJob.CompletionDate
            ? dateParser.from(currentJob.CompletionDate)
            : undefined,
          id: currentJob.JobId || '',
          location: currentJob.VaultARN || '',
          snsTopic: currentJob.SNSTopic,
          status,
          statusMessage: currentJob.StatusMessage || '',
          description: currentJob.JobDescription,
          createdAt: currentJob.CreationDate
            ? dateParser.from(currentJob.CreationDate)
            : new Date()
        }

        switch (currentJob.Action) {
          case 'Select':
            jobs.push({ ...baseJob, action: GlacierJobActions.SELECT })
            break
          case 'ArchiveRetrieval':
            let tier: Tiers | undefined

            switch (currentJob.Tier) {
              case 'Standard':
                tier = Tiers.STANDARD
                break
            }

            jobs.push({
              ...baseJob,
              action: GlacierJobActions.ARCHIVE_RETRIEVAL,
              archiveId: currentJob.ArchiveId || '',
              tier
            })
            break
          case 'InventoryRetrieval':
            jobs.push({
              ...baseJob,
              action: GlacierJobActions.INVENTORY_RETRIEVAL,
              inventorySizeInBytes: currentJob.InventorySizeInBytes
            })
            break
          default:
            break
        }
      })

      return jobs
    }
  }
}
