import { Driver, Node, Integer } from 'neo4j-driver'

import { Contract } from '~/core/domain/Contract'
import { RetrievalJob } from '~/core/domain/Job'
import { User } from '~/core/domain/User'
import { Module } from '~/core/modules'
import { queries } from '~/core/queries'
import { DateParser } from '~/core/utils/date/parse'

export interface CompleteJobsByUserParams {
  user: User
}

export type CompleteJobsByUserModule = Module<
  CompleteJobsByUserParams,
  RetrievalJob[]
>

export function instantiateCompleteJobsByUserModule(
  neo4jClient: Driver,
  dateParser: DateParser
): CompleteJobsByUserModule {
  return {
    async execute({ user }) {
      const session = neo4jClient.session()

      const { records } = await session.run(queries.jobs.completeByUser(user))

      const jobs: RetrievalJob[] = []

      records.forEach(record => {
        const workNode = record.get('trabalho') as Node
        const workProps = workNode.properties as any

        const archiveNode = record.get('arquivo') as Node
        const archive = archiveNode.properties as any
        const ano = (archive.ano as Integer).toInt()
        const mes = (archive.mes as Integer).toInt()

        const contractNode = record.get('contrato') as Node
        const contract = contractNode.properties as Contract

        console.log(contract, archive)

        jobs.push({
          archive: { ...archive, ano, mes },
          contract,
          job: {
            status: workProps.status,
            solicitado_em: dateParser.fromDateTime(workProps.solicitado_em),
            id_glacier: workProps.id_glacier
          }
        })
      })

      await session.close()

      return jobs
    }
  }
}
