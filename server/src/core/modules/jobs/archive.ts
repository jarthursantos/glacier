import { GlacierClient, InitiateJobCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Tiers } from '~/core/domain/Tiers'
import { Vault } from '~/core/domain/Vault'
import { CreateJobError } from '~/core/errors/jobs/CreateJob'
import { Module } from '~/core/modules'

export interface ArchiveJobParams {
  vault: Vault
  archiveId: string
  tier?: Tiers
  description?: string
}

export type ArchiveJobModule = Module<ArchiveJobParams, string>

export function instantiateArchiveJobModule(
  glacierClient: GlacierClient
): ArchiveJobModule {
  return {
    async execute({ vault, description, archiveId, tier }) {
      let jobTier: string

      switch (tier) {
        case Tiers.BULK:
          jobTier = 'Bulk'
          break
        case Tiers.EXPEDITED:
          jobTier = 'Expedited'
          break
        default:
          jobTier = 'Standard'
          break
      }

      const command = new InitiateJobCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        jobParameters: {
          SNSTopic:
            'arn:aws:sns:sa-east-1:713797556877:vault-archive-retrieval',
          Description: description,
          ArchiveId: archiveId,
          Type: 'archive-retrieval',
          Tier: jobTier
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
