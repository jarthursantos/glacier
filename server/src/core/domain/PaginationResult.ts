export interface PaginationResult<Result> {
  results: Result[]
  page: number
  perPage: number
  totalResults: number
}
