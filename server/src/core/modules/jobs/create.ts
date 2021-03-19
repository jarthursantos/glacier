import { Driver } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { Module } from '~/core/modules'
import { formatCreateRetrieveJobQuery } from '~/core/queries'

export interface CreateJobParams {
  archive: Archive
}

export type CreateJobModule = Module<CreateJobParams>

export function instantiateCreateJobModule(
  neo4jClient: Driver
): CreateJobModule {
  return {
    async execute({ archive }) {
      const session = neo4jClient.session()

      await session.run(formatCreateRetrieveJobQuery(archive))

      await session.close()
    }
  }
}
