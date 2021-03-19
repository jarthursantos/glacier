/* eslint-disable prettier/prettier */
import { Archive, Page } from '~/core/domain/Archive'
import { Contract } from '~/core/domain/Contract'

function toParams(obj: any): string {
  const dataPair: string[] = []

  Object.keys(obj).forEach(key => {
    dataPair.push(`${key}: ${JSON.stringify(obj[key])}`)
  })

  return dataPair.join(', ')
}

export function formatCreateContractQuery(contract: Contract) {
  return `CREATE (:Contrato { ${toParams(contract)} })`
}

export function formatAttachArchiveToCotractQuery(
  archive: Archive,
  { matricula }: Pick<Contract, 'matricula'>,
  pages: Page[]
) {
  return `
    MATCH (contrato:Contrato { ${toParams({ matricula })} })
    CREATE (contrato)-[:POSSUI]->(arquivo:Arquivo { ${toParams(archive)} })
    ${pages
      .map(toParams)
      .map(params => `CREATE (arquivo)<-[:COMPOE]-(:Pagina { ${params} })`)
      .join('\n')}
  `
}

export function formatFindRetrieveJobFromContract({ matricula }: Pick<Contract, 'matricula'>) {
  return `
    MATCH (:Contrato { ${toParams({ matricula })} })-[:POSSUI]->(:Arquivo)<-[:EXTRAI]-(trabalho:Trabalho)
    WHERE trabalho.status <> "Expirou"
    RETURN trabalho
  `
}

export function formatFindContractArchivesQuery({ matricula }: Pick<Contract, 'matricula'>) {
  return `MATCH (:Contrato { ${toParams({ matricula })} })-[:POSSUI]->(arquivo:Arquivo) RETURN arquivo`
}

export function formatCreateRetrieveJobQuery({ id_glacier }: Pick<Archive, 'id_glacier'>) {
  return `
    MATCH (arquivo :Arquivo { ${toParams({ id_glacier })} })
    CREATE (:Trabalho { status: "Pendente", solicitado_em: datetime() })-[:EXTRAI]->(arquivo)
  `
}

export function formatCompleteRetrieveJobQuery({ id_glacier }: Pick<Archive, 'id_glacier'>) {
  return `
    MATCH (trabalho:Trabalho { status: "Pendente" })-[:EXTRAI]->(:Arquivo { ${toParams({ id_glacier })} })
    SET trabalho.status = "Concluido", trabalho.concluido_em = datetime()
  `
}

export function formatExpireRetrieveJobQuery({ id_glacier }: Pick<Archive, 'id_glacier'>) {
  return `
    MATCH (trabalho:Trabalho { status: "Concluido" })-[:EXTRAI]->(:Arquivo { ${toParams({ id_glacier })} })
    SET trabalho.status = "Expirou", trabalho.expirado_em = datetime()
  `
}

export function formatFindRetrieveJobFromArchive({ id_glacier }: Pick<Archive, 'id_glacier'>) {
  return `
    MATCH (trabalho:Trabalho)-[:EXTRAI]->(arquivo:Arquivo { ${toParams({ id_glacier })} })
    WHERE trabalho.status <> "Expirou"
    RETURN trabalho
  `
}
