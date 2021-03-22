import { Driver } from 'neo4j-driver'

import { Job } from '~/core/domain/Job'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface FinishJobParams {
  job: Job
}

export type FinishJobModule = Module<FinishJobParams>

export function instantiateFinishJobModule(
  neo4jClient: Driver
): FinishJobModule {
  return {
    async execute({ job }) {
      const session = neo4jClient.session()

      await session.run(queries.jobs.complete(job))

      await session.close()
    }
  }
}
