import { Driver } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { Job } from '~/core/domain/Job'
import { Module } from '~/core/modules'
import { formatFindRetrieveJobFromArchive } from '~/core/queries'
import { DateParser } from '~/core/utils/date/parse'

export interface CreateJobParams {
  archive: Archive
}

export type CreateJobModule = Module<CreateJobParams, Job | undefined>

export function instantiateCreateJobModule(
  neo4jClient: Driver,
  dateParser: DateParser
): CreateJobModule {
  return {
    async execute({ archive }) {
      const session = neo4jClient.session()

      const { records } = await session.run(
        formatFindRetrieveJobFromArchive(archive)
      )

      if (records.length !== 0) {
        const record = records[0]

        return {
          status: record.get('status'),
          solicitado_em: dateParser.from(record.get('solicitado_em'))
        }
      }

      await session.close()
    }
  }
}
