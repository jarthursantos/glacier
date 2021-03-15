import { GlacierClient, GetJobOutputCommand } from '@aws-sdk/client-glacier'
import { Readable } from 'stream'

import { ACCOUNT_ID } from '~/configs/aws'
import { InventoryRetrievalJob } from '~/domain/Job'
import { Vault } from '~/domain/Vault'
import { NonCompletedJobError } from '~/errors/jobs/NonCompletedJob'
import { Module } from '~/modules'

export interface InventoryOutputJobParams {
  vault: Vault
  job: InventoryRetrievalJob
}

export type InventoryOutputJobModule = Module<
  InventoryOutputJobParams,
  Readable
>

export function instantiateInventoryOutputJobModule(
  client: GlacierClient
): InventoryOutputJobModule {
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

      const response = await client.send(command)

      // console.log(response)

      return response.body
    }
  }
}
