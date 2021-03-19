import { Document } from '~/core/domain/Document'
import { PaginationResult } from '~/core/domain/PaginationResult'
import { Module } from '~/core/modules'

export interface SearchDocumentsParams {
  query: string
  page: number
  perPage: number
}

export type SearchDocumentsModule = Module<
  SearchDocumentsParams,
  PaginationResult<Document>
>

export function instantiateSearchDocumentsModule(): SearchDocumentsModule {
  return {
    async execute({ query, page, perPage }) {
      const documents = new Array<Document>(perPage).fill({
        id: Math.random(),
        name: query,
        cpf: '481.805.982-0',
        proposal: 3990807,
        status: 'Cancelada',
        contract: 'ABEV00001337',
        entity: 'ABEV',
        operator: 'Santa Barbara do Oeste / Americana (SP)',
        archiveId: ''
      })

      return {
        results: documents,
        page,
        perPage,
        totalResults: (page + 2) * perPage
      }
    }
  }
}
