import fs from 'fs'
import os from 'os'
import path from 'path'

import { container } from '~/container'
import { Job } from '~/jobs'
import { UploadArchiveModule } from '~/modules/archives/upload'
import { DownloadS3ObjectsModule } from '~/modules/s3/download'
import { FindVaultService } from '~/services/vaults/find'

const CONTRACT_REGEXP = /[a-zA-Z]{2,4}[0-9]{8,10}.pdf/g

export interface AccessParams {
  fullBucketPath: string
}

const uploadModule = container.resolve<UploadArchiveModule>(
  'uploadArchiveModule'
)
const downloadModule = container.resolve<DownloadS3ObjectsModule>(
  'downloadS3ObjectsModule'
)
const findVaultService = container.resolve<FindVaultService>('findVaultService')

function extractFilename(path: string): string | false {
  const [match] = path.match(CONTRACT_REGEXP) || []

  if (!match) {
    return false
  }

  return match
}

const Access: Job<AccessParams> = {
  key: 'Access',
  handler: async ({ fullBucketPath }) => {
    const filename = extractFilename(fullBucketPath)

    if (!filename) return

    const vault = await findVaultService.execute({ vaultName: 'main' })

    // const basename = path.basename(filename)

    const outputPath = path.resolve(os.tmpdir(), filename)

    await downloadModule.execute({ inputPath: fullBucketPath, outputPath })

    console.log(outputPath, fs.existsSync(outputPath))

    const file = fs.readFileSync(outputPath)

    const archiveId = await uploadModule.execute({
      vault,
      description: '',
      file
    })

    fs.unlinkSync(outputPath)

    console.log(archiveId)
  }
}

export { Access }
