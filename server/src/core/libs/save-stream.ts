import fs from 'fs'
import { Readable } from 'stream'

export async function saveStream(
  stream: Readable,
  outputPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath)

    file.on('close', resolve)
    file.on('error', reject)

    stream.pipe(file)
  })
}
