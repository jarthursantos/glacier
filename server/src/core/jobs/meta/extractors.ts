const PROPOSAL_REGEXP = /\d+$/

export function extractProposal(path: string): number {
  const [match] = path.match(PROPOSAL_REGEXP) || []

  if (!match) {
    throw new Error()
  }

  return parseInt(match)
}

const FILENAME_REGEXP = /\/page.\.[a-zA-Z]{3,4}$/

export function extractFilename(path: string): string {
  const [match] = path.match(FILENAME_REGEXP) || []

  if (!match) {
    throw new Error()
  }

  return match.substr(1)
}
