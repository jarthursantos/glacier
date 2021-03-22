// import { Document } from '~/core/domain/Document'
// import { PaginationResult } from '~/core/domain/PaginationResult'
// import { PaginationParamsError } from '~/core/errors/pagination/PaginationParams'
// import { SearchDocumentsModule } from '~/core/modules/contracts/search'
// import { Service } from '~/core/services'

// export interface SearchDocumentsParams {
//   query: string
//   page?: number
//   perPage?: number
// }

// export type SearchDocumentsService = Service<
//   SearchDocumentsParams,
//   PaginationResult<Document>
// >

// export function instantiateSearchDocumentsService(
//   searchDocumentsModule: SearchDocumentsModule
// ): SearchDocumentsService {
//   return {
//     async execute({ query, page = 0, perPage = 5 }) {
//       if (page < 0 || perPage < 1) {
//         throw new PaginationParamsError()
//       }

//       const normalizedQuery = query.trim().toUpperCase()

//       const documents = await searchDocumentsModule.execute({
//         query: normalizedQuery,
//         page,
//         perPage
//       })

//       return documents
//     }
//   }
// }
