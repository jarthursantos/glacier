import { Driver } from 'neo4j-driver'

import { Job } from '~/core/domain/Job'
import { User } from '~/core/domain/User'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface AttachJobUserParams {
  job: Job
  user: User
}

export type AttachJobUserModule = Module<AttachJobUserParams>

export function instantiateAttachJobUserModule(
  neo4jClient: Driver
): AttachJobUserModule {
  return {
    async execute({ job, user }) {
      const session = neo4jClient.session()

      await session.run(queries.jobs.attachUser(job, user))

      await session.close()
    }
  }
}
