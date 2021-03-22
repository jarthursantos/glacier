import { Driver, Node } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface FindArchiveParams {
  id_glacier: string
}

export type FindArchiveModule = Module<FindArchiveParams, Archive | undefined>

export function instantiateFindArchiveModule(
  neo4jClient: Driver
): FindArchiveModule {
  return {
    async execute({ id_glacier }) {
      const session = neo4jClient.session()

      const { records } = await session.run(
        queries.archive.find({ id_glacier })
      )

      if (records.length !== 0) {
        const record = records[0].get('arquivo') as Node

        return record.properties as Archive
      }

      await session.close()
    }
  }
}
