import { Driver } from 'neo4j-driver'

import { Archive } from '~/core/domain/Archive'
import { Contract } from '~/core/domain/Contract'
import { Job } from '~/core/domain/Job'
import {
  formatCreateRetrieveJobQuery,
  formatCompleteRetrieveJobQuery,
  formatExpireRetrieveJobQuery,
  formatFindRetrieveJobFromArchive,
  formatFindRetrieveJobFromContract
} from '~/core/queries'

export interface JobsRepository {
  register(archive: Archive): Promise<void>
  complete(archive: Archive): Promise<void>
  expire(archive: Archive): Promise<void>
  findActivePerArchive(archive: Archive): Promise<Job | undefined>
  findActiveFromContract(contract: Contract): Promise<Job | undefined>
}

export function instantiateJobsRepository(neo4jClient: Driver): JobsRepository {
  return {
    async register(archive) {
      const session = neo4jClient.session()

      await session.run(formatCreateRetrieveJobQuery(archive))

      await session.close()
    },

    async complete(archive) {
      const session = neo4jClient.session()

      await session.run(formatCompleteRetrieveJobQuery(archive))

      await session.close()
    },

    async expire(archive) {
      const session = neo4jClient.session()

      await session.run(formatExpireRetrieveJobQuery(archive))

      await session.close()
    },

    async findActivePerArchive(archive) {
      const session = neo4jClient.session()

      const { records } = await session.run(
        formatFindRetrieveJobFromArchive(archive)
      )

      if (records.length !== 0) {
        const record = records[0]

        return { status: record.get('status') }
      }

      await session.close()
    },

    async findActiveFromContract(contract) {
      const session = neo4jClient.session()

      const { records } = await session.run(
        formatFindRetrieveJobFromContract(contract)
      )

      if (records.length !== 0) {
        const record = records[0]

        return { status: record.get('status') }
      }

      await session.close()
    }
  }
}
