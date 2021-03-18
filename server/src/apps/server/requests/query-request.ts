import { Request } from 'express'

export type QueryRequest<Query> = Request<any, any, any, Query>
