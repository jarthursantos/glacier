import { Archive, Page } from '~/core/domain/Archive'
import { Contract } from '~/core/domain/Contract'

import { GlacierJob } from './domain/GlacierJob'
import { Job } from './domain/Job'
import { User } from './domain/User'

function toParams(obj: any): string {
  const dataPair: string[] = []

  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && obj[key] !== undefined) {
      dataPair.push(`${key}: ${JSON.stringify(obj[key])}`)
    }
  })

  return dataPair.join(', ')
}

export const queries = {
  contract: {
    create(contract: Contract) {
      return `CREATE (:Contrato { ${toParams(contract)} })`
    },

    find({ matricula }: Pick<Contract, 'matricula'>) {
      return `
        MATCH (contrato:Contrato { ${toParams({ matricula })} })
        RETURN contrato
      `
    },

    attachArchive(
      archive: Archive,
      { matricula }: Pick<Contract, 'matricula'>,
      pages: Page[]
    ) {
      const pagesQueries = pages.map(
        params =>
          `CREATE (arquivo)<-[:COMPOE]-(:Pagina { ${toParams(params)} })`
      )

      return `
        MATCH (contrato:Contrato { ${toParams({ matricula })} })
        CREATE (contrato)-[:POSSUI]->(arquivo:Arquivo { ${toParams(archive)} })
        ${pagesQueries.join('\n')}
    `
    }
  },

  archive: {
    find({ id_glacier }: Pick<Archive, 'id_glacier'>) {
      return `
        MATCH (arquivo:Arquivo { ${toParams({ id_glacier })} }) RETURN arquivo
      `
    },

    findByContract({ matricula }: Pick<Contract, 'matricula'>) {
      return `
        MATCH (:Contrato { ${toParams({
          matricula
        })} })-[:POSSUI]->(arquivo:Arquivo)
        RETURN arquivo
      `
    }
  },

  jobs: {
    create(
      { id_glacier }: Pick<Archive, 'id_glacier'>,
      { id: id_trabalho }: Pick<GlacierJob, 'id'>,
      { id }: Pick<User, 'id'>
    ) {
      return `
        MATCH (arquivo:Arquivo { ${toParams({ id_glacier })} })
        MATCH (usuario:Usuario { ${toParams({ id })} })
        CREATE (trabalho:Trabalho { status: "Pendente", solicitado_em: datetime(), ${toParams(
          { id_glacier: id_trabalho }
        )} })-[:EXTRAI]->(arquivo)
        CREATE (usuario)-[:SOLICITOU { solicitou_em: datetime() }]->(trabalho)
        RETURN trabalho
      `
    },

    complete({ id_glacier }: Pick<Job, 'id_glacier'>) {
      return `
        MATCH (trabalho:Trabalho { status: "Pendente" })-[:EXTRAI]->(:Arquivo { ${toParams(
          { id_glacier }
        )} })
        SET trabalho.status = "Concluido", trabalho.concluido_em = datetime()
      `
    },

    expire({ id_glacier }: Pick<Job, 'id_glacier'>) {
      return `
        MATCH (trabalho:Trabalho { status: "Concluido" })-[:EXTRAI]->(:Arquivo { ${toParams(
          { id_glacier }
        )} })
        SET trabalho.status = "Expirou", trabalho.expirado_em = datetime()
      `
    },

    findByArchive({ id_glacier }: Pick<Archive, 'id_glacier'>) {
      return `
        MATCH (trabalho:Trabalho)-[:EXTRAI]->(arquivo:Arquivo { ${toParams({
          id_glacier
        })} })
        WHERE trabalho.status <> "Expirou"
        RETURN trabalho
      `
    },

    findPendings() {
      return 'MATCH (trabalho:Trabalho { status: "Pendente" }) RETURN trabalho'
    },

    attachUser(
      { id_glacier }: Pick<Job, 'id_glacier'>,
      { id }: Pick<User, 'id'>
    ) {
      return `
        MATCH (trabalho:Trabalho { ${toParams({ id_glacier })} })
        MATCH (usuario:Usuario { ${toParams({ id })} })
        CREATE (usuario)-[:SOLICITOU { solicitou_em: datetime() }]->(trabalho)
      `
    },

    requestedByUser(
      { id_glacier }: Pick<Job, 'id_glacier'>,
      { id }: Pick<User, 'id'>
    ) {
      return `
        MATCH (:Usuario { ${toParams({
          id
        })} })-[solicitou:SOLICITOU]->(trabalho:Trabalho { ${toParams({
        id_glacier
      })} })
        WHERE trabalho.status <> 'Expirou'
        RETURN solicitou
      `
    },

    pendingByUser({ id }: Pick<User, 'id'>) {
      return `
        MATCH (:Usuario { ${toParams({
          id
        })} })-[:SOLICITOU]->(trabalho:Trabalho { status: 'Pendente' })-[:EXTRAI]->(arquivo:Arquivo)<-[:POSSUI]-(contrato:Contrato)
        RETURN contrato, trabalho, arquivo
      `
    },

    completeByUser({ id }: Pick<User, 'id'>) {
      return `
        MATCH (:Usuario { ${toParams({
          id
        })} })-[:SOLICITOU]->(trabalho:Trabalho { status: 'Concluido' })-[:EXTRAI]->(arquivo:Arquivo)<-[:POSSUI]-(contrato:Contrato)
        RETURN contrato, trabalho, arquivo
      `
    }
  },

  user: {
    find({ id }: Pick<User, 'id'>) {
      return `MATCH (usuario:Usuario { ${toParams({ id })} }) RETURN usuario`
    },

    create({ id }: Pick<User, 'id'>) {
      return `CREATE (usuario:Usuario { ${toParams({ id })} }) RETURN usuario`
    }
  }
}
