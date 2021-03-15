export interface Vault {
  name: string
  location: string
  sizeInBytes: number
  archivesCount: number
  lastInventoryAt?: Date
  createdAt: Date
}
