import { GlacierClient, GetJobOutputCommand } from '@aws-sdk/client-glacier'
import { Readable } from 'stream'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { ArchiveRetrievalGlacierJob } from '~/core/domain/GlacierJob'
import { Vault } from '~/core/domain/Vault'
import { NonCompletedJobError } from '~/core/errors/jobs/NonCompletedJob'
import { Module } from '~/core/modules'

export interface ArchiveOutputJobParams {
  vault: Vault
  job: ArchiveRetrievalGlacierJob
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
