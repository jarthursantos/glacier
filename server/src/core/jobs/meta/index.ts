import Zip from 'adm-zip'
import fs from 'fs'
import os from 'os'
import path from 'path'

import { BaseDocument } from '~/core/domain/Document'
import { EnqueueFunction, registerJob } from '~/core/jobs/register'
import { UploadArchiveModule } from '~/core/modules/archives/upload'
import { DownloadS3ObjectModule } from '~/core/modules/s3/download'
import { ListS3ObjectsModule } from '~/core/modules/s3/list'
import { FindVaultService } from '~/core/services/vaults/find'

import { extractFilename, extractProposal } from './extractors'

export function instanteateEnqueueMetaJob(
  findVaultService: FindVaultService,
  downloadS3ObjectModule: DownloadS3ObjectModule,
  uploadArchiveModule: UploadArchiveModule,
  listS3ObjectsModule: ListS3ObjectsModule
): EnqueueMetaJob {
  return registerJob<MetaJobParams, BaseDocument>({
    name: 'MetaJob',
    onError: console.error,
    onFinished: console.log,

    async handler({ folderPath, bucket, vaultName }) {
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

      const vault = await findVaultService.execute({ vaultName })

      const archiveId = await uploadArchiveModule.execute({
        description: `${proposal}.zip`,
        vault,
        file: zip.toBuffer()
      })

      paths.forEach(fs.unlinkSync)

      return { archiveId, contract: String(proposal) }
    }
  })
}

export type EnqueueMetaJob = EnqueueFunction<MetaJobParams>
export interface MetaJobParams {
  folderPath: string
  bucket: string
  vaultName: string
}
