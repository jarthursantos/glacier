import { Driver } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { Module } from '~/core/modules'
import { formatExpireRetrieveJobQuery } from '~/core/queries'

export interface ExpireJobParams {
  archive: Archive
}

export type ExpireJobModule = Module<ExpireJobParams>

export function instantiateExpireJobModule(
  neo4jClient: Driver
): ExpireJobModule {
  return {
    async execute({ archive }) {
      const session = neo4jClient.session()

      await session.run(formatExpireRetrieveJobQuery(archive))

      await session.close()
    }
  }
}
