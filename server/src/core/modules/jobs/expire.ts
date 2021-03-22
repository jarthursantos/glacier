import { Driver } from 'neo4j-driver'

import { Job } from '~/core/domain/Job'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface ExpireJobParams {
  job: Job
}

export type ExpireJobModule = Module<ExpireJobParams>

export function instantiateExpireJobModule(
  neo4jClient: Driver
): ExpireJobModule {
  return {
    async execute({ job }) {
      const session = neo4jClient.session()

      await session.run(queries.jobs.expire(job))

      await session.close()
    }
  }
}
