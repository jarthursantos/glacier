import { Driver } from 'neo4j-driver'

import { Job } from '~/core/domain/Job'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface CompleteJobParams {
  job: Job
}

export type CompleteJobModule = Module<CompleteJobParams>

export function instantiateCompleteJobModule(
  neo4jClient: Driver
): CompleteJobModule {
  return {
    async execute({ job }) {
      const session = neo4jClient.session()

      await session.run(queries.jobs.complete(job))

      await session.close()
    }
  }
}
