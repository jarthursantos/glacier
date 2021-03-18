import { InvalidContractError } from '~/core/errors/contract/InvalidContract'
import { InvalidKeyError } from '~/core/errors/key/InvalidKey'

const FILENAME_REGEXP = /[a-zA-Z]{2,4}[0-9]{8,10}.pdf/g

export function extractFilename(path: string): string {
  const [match] = path.match(FILENAME_REGEXP) || []

  if (!match) {
    throw new InvalidKeyError(path)
  }

  return match
}

const CONTRACT_REGEXP = /[a-zA-Z]{2,4}[0-9]{8,10}/g

export function extractContract(path: string): string {
  const [match] = path.match(CONTRACT_REGEXP) || []

  if (!match) {
    throw new InvalidContractError()
  }

  return match
}
