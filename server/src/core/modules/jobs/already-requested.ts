import { Driver } from 'neo4j-driver'

import { Job } from '~/core/domain/Job'
import { User } from '~/core/domain/User'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface JobAlreadyRequestedByUserParams {
  job: Job
  user: User
}

export type JobAlreadyRequestedByUserModule = Module<
  JobAlreadyRequestedByUserParams,
  boolean
>

export function instantiateJobAlreadyRequestedByUserModule(
  neo4jClient: Driver
): JobAlreadyRequestedByUserModule {
  return {
    async execute({ job, user }) {
      const session = neo4jClient.session()

      const { records } = await session.run(
        queries.jobs.requestedByUser(job, user)
      )

      await session.close()

      return records.length !== 0
    }
  }
}
