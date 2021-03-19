import { Driver } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { Module } from '~/core/modules'
import { formatCompleteRetrieveJobQuery } from '~/core/queries'

export interface FinishJobParams {
  archive: Archive
}

export type FinishJobModule = Module<FinishJobParams>

export function instantiateFinishJobModule(
  neo4jClient: Driver
): FinishJobModule {
  return {
    async execute({ archive }) {
      const session = neo4jClient.session()

      await session.run(formatCompleteRetrieveJobQuery(archive))

      await session.close()
    }
  }
}
