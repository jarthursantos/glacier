import { Driver, Node } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { Job } from '~/core/domain/Job'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'
import { DateParser } from '~/core/utils/date/parse'

export interface ActiveJobPerArchiveParams {
  archive: Archive
}

export type ActiveJobPerArchiveModule = Module<
  ActiveJobPerArchiveParams,
  Job | undefined
>

export function instantiateActiveJobPerArchiveModule(
  neo4jClient: Driver,
  dateParser: DateParser
): ActiveJobPerArchiveModule {
  return {
    async execute({ archive }) {
      const session = neo4jClient.session()

      const { records } = await session.run(queries.jobs.findByArchive(archive))

      await session.close()

      if (records.length !== 0) {
        const record = records[0].get('trabalho') as Node
        const props = record.properties as any

        return {
          status: props.status,
          solicitado_em: dateParser.fromDateTime(props.solicitado_em),
          id_glacier: props.id_glacier
        }
      }
    }
  }
}
