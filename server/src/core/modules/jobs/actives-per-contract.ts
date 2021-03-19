import { Driver } from 'neo4j-driver'

import { Contract } from '~/core/domain/Contract'
import { Job } from '~/core/domain/Job'
import { Module } from '~/core/modules'
import { formatFindRetrieveJobFromContract } from '~/core/queries'
import { DateParser } from '~/core/utils/date/parse'

export interface CreateJobParams {
  contract: Contract
}

export type CreateJobModule = Module<CreateJobParams, Job[]>

export function instantiateCreateJobModule(
  neo4jClient: Driver,
  dateParser: DateParser
): CreateJobModule {
  return {
    async execute({ contract }) {
      const session = neo4jClient.session()

      const { records } = await session.run(
        formatFindRetrieveJobFromContract(contract)
      )

      const jobs: Job[] = []

      records.forEach(record => {
        jobs.push({
          status: record.get('status'),
          solicitado_em: dateParser.from(record.get('solicitado_em'))
        })
      })

      await session.close()

      return jobs
    }
  }
}
