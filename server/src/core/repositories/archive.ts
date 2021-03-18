import { Driver } from 'neo4j-driver'

import { Archive, Page } from '~/core/domain/Archive'
import { Contract } from '~/core/domain/Contract'
import {
  formatCreateArchiveQuery,
  formatAttachArchiveToCotractQuery,
  formatFindContractArchivesQuery
} from '~/core/queries'

export interface ArchivesRepository {
  register(archive: Archive, pages: Page[]): Promise<void>
  attachToContract(archive: Archive, contract: Contract): Promise<void>
  findPerContract(contract: Contract): Promise<Archive[]>
}

export function instantiateArchivesRepository(
  neo4jClient: Driver
): ArchivesRepository {
  return {
    async register(archive, pages) {
      const session = neo4jClient.session()

      await session.run(formatCreateArchiveQuery(archive, pages))

      await session.close()
    },

    async attachToContract(archive, contract) {
      const session = neo4jClient.session()

      await session.run(formatAttachArchiveToCotractQuery(archive, contract))

      await session.close()
    },

    async findPerContract(contract) {
      const session = neo4jClient.session()

      const archives: Archive[] = []

      const { records } = await session.run(
        formatFindContractArchivesQuery(contract)
      )

      records.forEach(record => {
        archives.push({
          ano: record.get('ano'),
          aplicacao: record.get('aplicacao'),
          id_glacier: record.get('id_glacier'),
          mes: record.get('mes'),
          nome: record.get('nome'),
          operadora: record.get('operadora'),
          origem: record.get('origem')
        })
      })

      await session.close()

      return archives
    }
  }
}
