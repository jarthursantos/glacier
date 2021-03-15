export class VaultNotFoundError extends Error {
  name = 'VaultNotFoundError'

  constructor(name: string) {
    super(`A vault with name '${name}' don't exists`)
  }
}
