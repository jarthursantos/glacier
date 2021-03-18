export interface BaseDocument {
  contract: string
  archiveId: string
}

export interface Document extends BaseDocument {
  id: number
  name: string
  cpf: string
  entity: string
  operator: string
  proposal: number
  status: string
}
