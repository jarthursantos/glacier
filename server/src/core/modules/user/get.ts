import { Driver, Node } from 'neo4j-driver'

import { User } from '~/core/domain/User'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'

export interface GetUserParams {
  userId: string
}

export type GetUserModule = Module<GetUserParams, User>

export function instantiateGetUserModule(neo4jClient: Driver): GetUserModule {
  return {
    async execute({ userId }) {
      const session = neo4jClient.session()

      let result = await session.run(queries.user.find({ id: userId }))

      if (result.records.length === 0) {
        result = await session.run(queries.user.create({ id: userId }))
      }

      const record = result.records[0].get('usuario') as Node

      await session.close()

      return record.properties as User
    }
  }
}
