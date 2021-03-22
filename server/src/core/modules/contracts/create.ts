import { Driver } from 'neo4j-driver'

import { Contract } from '~/core/domain/Contract'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export type CreateContractModule = Module<Contract>

export function instantiateCreateContractModule(
  neo4jClient: Driver
): CreateContractModule {
  return {
    async execute(contract) {
      const session = neo4jClient.session()

      await session.run(queries.contract.create(contract))

      await session.close()
    }
  }
}
