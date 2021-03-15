import { GlacierClient, GetJobOutputCommand } from '@aws-sdk/client-glacier'
import { Readable } from 'stream'

import { ACCOUNT_ID } from '~/configs/aws'
import { ArchiveRetrievalJob } from '~/domain/Job'
import { Vault } from '~/domain/Vault'
import { NonCompletedJobError } from '~/errors/jobs/NonCompletedJob'
import { Module } from '~/modules'

export interface ArchiveOutputJobParams {
  vault: Vault
  job: ArchiveRetrievalJob
}

export type ArchiveOutputJobModule = Module<ArchiveOutputJobParams, Readable>

export function instantiateArchiveOutputJobModule(
  glacierClient: GlacierClient
): ArchiveOutputJobModule {
  return {
    async execute({ vault, job }) {
      if (!job.completed) {
        throw new NonCompletedJobError()
      }

      const command = new GetJobOutputCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        jobId: job.id
      })

      const response = await glacierClient.send(command)

      return response.body
    }
  }
}
