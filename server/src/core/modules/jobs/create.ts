import { Driver, Node } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { GlacierJob } from '~/core/domain/GlacierJob'
import { Job } from '~/core/domain/Job'
import { User } from '~/core/domain/User'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'
import { DateParser } from '~/core/utils/date/parse'

export interface CreateRetrievalJobParams {
  archive: Archive
  glacierJob: GlacierJob
  user: User
}

export type CreateRetrievalJobModule = Module<CreateRetrievalJobParams, Job>

export function instantiateCreateRetrievalJobModule(
  neo4jClient: Driver,
  dateParser: DateParser
): CreateRetrievalJobModule {
  return {
    async execute({ archive, glacierJob, user }) {
      const session = neo4jClient.session()

      const { records } = await session.run(
        queries.jobs.create(archive, glacierJob, user)
      )

      await session.close()

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
