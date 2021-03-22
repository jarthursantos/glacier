import Zip from 'adm-zip'
import fs from 'fs'
import os from 'os'
import path from 'path'

import { UploadGlacierArchiveModule } from '~/core/modules/glacier/archives/upload'
import { DownloadS3ObjectModule } from '~/core/modules/s3/download'
import { ListS3ObjectsModule } from '~/core/modules/s3/list'
import { Service } from '~/core/services'
import { FindGlacierVaultService } from '~/core/services/glacier/vaults/find'

export interface ImportMetaParams {
  folderPath: string
  bucket: string
  vaultName: string
}

export type ImportMetaService = Service<ImportMetaParams>

export function instantiateImportMetaService(
  findGlacierVaultService: FindGlacierVaultService,
  downloadS3ObjectModule: DownloadS3ObjectModule,
  uploadGlacierArchiveModule: UploadGlacierArchiveModule,
  listS3ObjectsModule: ListS3ObjectsModule
): ImportMetaService {
  return {
    async execute({ folderPath, bucket, vaultName }) {
      const proposal = extractProposal(folderPath)

      const objects = await listS3ObjectsModule.execute({ bucket, folderPath })

      const paths: string[] = []

      const zip = new Zip()

      for (let i = 0; i < objects.length; i++) {
        const key = objects[i]
        const filename = extractFilename(key)

        const outputPath = path.resolve(os.tmpdir(), filename)
        await downloadS3ObjectModule.execute({ bucket, key, outputPath })

        zip.addLocalFile(outputPath)
        paths.push(outputPath)
      }

      const vault = await findGlacierVaultService.execute({ vaultName })

      const { archiveId } = await uploadGlacierArchiveModule.execute({
        description: `${proposal}.zip`,
        vault,
        file: zip.toBuffer()
      })

      paths.forEach(fs.unlinkSync)
    }
  }
}

function extractProposal(path: string): number {
  const [match] = path.match(/\d+$/) || []

  if (!match) {
    throw new Error()
  }

  return parseInt(match)
}

function extractFilename(path: string): string {
  const [match] = path.match(/\/page.\.[a-zA-Z]{3,4}$/) || []

  if (!match) {
    throw new Error()
  }

  return match.substr(1)
}
