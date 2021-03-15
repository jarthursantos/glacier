import { GlacierClient, InitiateJobCommand } from '@aws-sdk/client-glacier'

import { ACCOUNT_ID } from '~/configs/aws'
import { Vault } from '~/domain/Vault'
import { CreateJobError } from '~/errors/jobs/CreateJob'
import { Module } from '~/modules'

export interface SelectJobParams {
  vault: Vault
  archiveId: string
  query: string
  queryType: string
  inputSerialization: string
  outputSerialization: string
  description?: string
}

export type SelectJobModule = Module<SelectJobParams, string>

export function instantiateSelectJobModule(
  client: GlacierClient
): SelectJobModule {
  return {
    async execute({ vault, description, archiveId, query, queryType }) {
      const command = new InitiateJobCommand({
        accountId: ACCOUNT_ID,
        vaultName: vault.name,
        jobParameters: {
          // SNSTopic: `glacier:${vault.name}:select`,
          ArchiveId: archiveId,
          Description: description,
          OutputLocation: {
            S3: {
              BucketName: ''
            }
          },
          SelectParameters: {
            Expression: query,
            ExpressionType: queryType,
            InputSerialization: {
              csv: {}
            },
            OutputSerialization: {
              csv: {}
            }
          },
          Type: 'select'
        }
      })

      const { jobId } = await client.send(command)

      if (!jobId) {
        throw new CreateJobError()
      }

      return jobId
    }
  }
}
