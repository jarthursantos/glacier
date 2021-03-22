import { Driver } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { Contract } from '~/core/domain/Contract'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface FindArchivePerContractParams {
  contract: Contract
}

export type FindArchivePerContractModule = Module<
  FindArchivePerContractParams,
  Archive[]
>

export function instantiateFindArchivePerContractModule(
  neo4jClient: Driver
): FindArchivePerContractModule {
  return {
    async execute({ contract }) {
      const session = neo4jClient.session()

      const archives: Archive[] = []

      const { records } = await session.run(
        queries.archive.findByContract(contract)
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
