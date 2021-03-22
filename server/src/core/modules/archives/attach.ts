import { Driver } from 'neo4j-driver'

import { Archive, Page } from '~/core/domain/Archive'
import { Contract } from '~/core/domain/Contract'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface AttachArchiveParams {
  archive: Archive
  contract: Contract
  pages?: Page[]
}

export type AttachArchiveModule = Module<AttachArchiveParams>

export function instantiateAttachArchiveModule(
  neo4jClient: Driver
): AttachArchiveModule {
  return {
    async execute({ archive, contract, pages = [] }) {
      const session = neo4jClient.session()

      await session.run(
        queries.contract.attachArchive(archive, contract, pages)
      )

      await session.close()
    }
  }
}
