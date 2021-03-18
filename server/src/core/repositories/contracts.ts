import { Driver } from 'neo4j-driver'

import { Contract } from '~/core/domain/Contract'
import { formatCreateContractQuery } from '~/core/queries'

export interface ContractsRepository {
  register(contract: Contract): Promise<void>
}

export function instantiateContractsRepository(
  neo4jClient: Driver
): ContractsRepository {
  return {
    async register(contract) {
      const session = neo4jClient.session()

      await session.run(formatCreateContractQuery(contract))

      await session.close()
    }
  }
}
