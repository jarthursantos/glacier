// import { Response } from 'express'
// import createHttpError from 'http-errors'

// import { QueryRequest } from '~/apps/server/requests/query-request'
// import { container } from '~/core/container'
// import { SearchDocumentsService } from '~/core/services/documents/search'

// const searchDocumentsService = container.resolve<SearchDocumentsService>(
//   'searchDocumentsService'
// )

// interface SearchQuery {
//   query?: string
//   page?: string
//   perPage?: string
// }

// export async function handleSearchDocuments(
//   req: QueryRequest<SearchQuery>,
//   res: Response
// ) {
//   const { query } = req.query

//   if (!query) {
//     throw new createHttpError.BadRequest(
//       'Nenhum parâmetro passado para a pesquisa'
//     )
//   }

//   let page: number | undefined

//   if (req.query.page) {
//     page = parseInt(req.query.page)

//     if (!Number.isInteger(page)) {
//       throw new Error()
//     }
//   }

//   let perPage: number | undefined

//   if (req.query.perPage) {
//     perPage = parseInt(req.query.perPage)

//     if (!Number.isInteger(perPage)) {
//       throw new Error()
//     }
//   }

//   const documents = await searchDocumentsService.execute({
//     query,
//     page,
//     perPage
//   })

//   return res.json(documents)
// }
