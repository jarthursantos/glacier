export class VaultAlreadyExistsError extends Error {
  name = 'VaultAlreadyExistsError'

  constructor(message: string) {
    super(message)
  }
}

export function isVaultAlreadyExistsError(
  err: any
): err is VaultAlreadyExistsError {
  return err.name === 'VaultAlreadyExistsError'
}
