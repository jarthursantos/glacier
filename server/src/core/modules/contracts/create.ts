import { Driver } from 'neo4j-driver'

import { Contract } from '~/core/domain/Contract'
import { Module } from '~/core/modules'
import { formatCreateContractQuery } from '~/core/queries'

export type CreateContractModule = Module<Contract>

export function instantiateCreateContractModule(
  neo4jClient: Driver
): CreateContractModule {
  return {
    async execute(contract: Contract) {
      const session = neo4jClient.session()

      await session.run(formatCreateContractQuery(contract))

      await session.close()
    }
  }
}
