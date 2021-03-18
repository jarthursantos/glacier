import { GlacierClient, ListJobsCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { GlacierJob, BaseGlacierJob } from '~/core/domain/GlacierJob'
import { JobActions } from '~/core/domain/JobActions'
import { JobStatus } from '~/core/domain/JobStatus'
import { Tiers } from '~/core/domain/Tiers'
import { Vault } from '~/core/domain/Vault'
import { InvalidJobStatusError } from '~/core/errors/jobs/InvalidJobStatus'
import { Module } from '~/core/modules'
import { DateParser } from '~/core/utils/date/parse'

export type ListJobsModule = Module<Vault, GlacierJob[]>

export function instantiateListJobsModule(
  glacierClient: GlacierClient,
  dateParser: DateParser
): ListJobsModule {
  return {
    async execute(vault) {
      const command = new ListJobsCommand({
        vaultName: vault.name,
        accountId: ACCOUNT_ID
      })

      const response = await glacierClient.send(command)

      const jobs: GlacierJob[] = []

      response.JobList?.forEach(currentJob => {
        let status: JobStatus

        switch (currentJob.StatusCode) {
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
            jobs.push({ ...baseJob, action: JobActions.SELECT })
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
              action: JobActions.ARCHIVE_RETRIEVAL,
              archiveId: currentJob.ArchiveId || '',
              tier
            })
            break
          case 'InventoryRetrieval':
            jobs.push({
              ...baseJob,
              action: JobActions.INVENTORY_RETRIEVAL,
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
