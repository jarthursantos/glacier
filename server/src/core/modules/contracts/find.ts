import { Driver, Node } from 'neo4j-driver'

import { Contract } from '~/core/domain/Contract'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface FindContractParams {
  matricula: string
}

export type FindContractModule = Module<
  FindContractParams,
  Contract | undefined
>

export function instantiateFindContractModule(
  neo4jClient: Driver
): FindContractModule {
  return {
    async execute({ matricula }) {
      const session = neo4jClient.session()

      const { records } = await session.run(
        queries.contract.find({ matricula })
      )

      await session.close()

      if (records.length !== 0) {
        const record = records[0].get('contrato') as Node

        return record.properties as Contract
      }
    }
  }
}
