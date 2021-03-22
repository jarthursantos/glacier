import { GlacierClient, InitiateJobCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/core/configs/aws'
import { Tiers } from '~/core/domain/Tiers'
import { Vault } from '~/core/domain/Vault'
import { CreateJobError } from '~/core/errors/jobs/CreateJob'
import { Module } from '~/core/modules'

export interface GlacierArchiveJobParams {
  vault: Vault
  archiveId: string
  tier?: Tiers
  description?: string
}

export type GlacierArchiveJobModule = Module<GlacierArchiveJobParams, string>

export function instantiateGlacierArchiveJobModule(
  glacierClient: GlacierClient
): GlacierArchiveJobModule {
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
