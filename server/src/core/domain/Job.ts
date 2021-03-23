import { Archive } from './Archive'
import { Contract } from './Contract'

export interface Job {
  status: string
  solicitado_em: Date
  id_glacier: string
}

export interface RetrievalJob {
  archive: Archive
  contract: Contract
  job: Job
}
