export interface Archive {
  id_glacier: string
  nome: string // [proposta, matricula]
  ano: number
  mes: number
  operadora: string
  aplicacao: string
  origem: string // [meta, access]
}

export interface Page {
  nome: string
}
