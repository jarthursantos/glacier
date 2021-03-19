import { Driver } from 'neo4j-driver'

import { Archive, Page } from '~/core/domain/Archive'
import { Contract } from '~/core/domain/Contract'
import { Module } from '~/core/modules'
import { formatAttachArchiveToCotractQuery } from '~/core/queries'

export interface DeleteArchiveParams {
  archive: Archive
  contract: Contract
  pages: Page[]
}

export type DeleteArchiveModule = Module<DeleteArchiveParams>

export function instantiateDeleteArchiveModule(
  neo4jClient: Driver
): DeleteArchiveModule {
  return {
    async execute({ archive, contract, pages }) {
      const session = neo4jClient.session()

      await session.run(
        formatAttachArchiveToCotractQuery(archive, contract, pages)
      )

      await session.close()
    }
  }
}
