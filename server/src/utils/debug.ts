import debug from 'debug'

export function createDebuger(name: string) {
  return debug(`glacier:${name}`)
}
