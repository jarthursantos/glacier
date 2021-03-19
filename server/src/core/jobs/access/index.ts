import fs from 'fs'
import os from 'os'
import path from 'path'

import { BaseDocument } from '~/core/domain/Document'
import { EnqueueFunction, registerJob } from '~/core/jobs/register'
import { UploadArchiveModule } from '~/core/modules/archives/upload'
// import { CreateContractModule } from '~/core/modules/contracts/create'
import { DownloadS3ObjectModule } from '~/core/modules/s3/download'
import { FindVaultService } from '~/core/services/vaults/find'

import { extractContract, extractFilename } from './extractors'

export function instanteateEnqueueAccessJob(
  // createContractModule: CreateContractModule,
  findVaultService: FindVaultService,
  downloadS3ObjectModule: DownloadS3ObjectModule,
  uploadArchiveModule: UploadArchiveModule
): EnqueueAccessJob {
  return registerJob<AccessJobParams, BaseDocument>({
    name: 'AccessJob',
    onError: console.error,
    onFinished: console.log,

    async handler({ key, bucket, vaultName }) {
      const filename = extractFilename(key)
      const contract = extractContract(filename)
      const outputPath = path.resolve(os.tmpdir(), filename)

      await downloadS3ObjectModule.execute({ bucket, key, outputPath })
      const vault = await findVaultService.execute({ vaultName })

      const file = fs.readFileSync(outputPath)

      const archiveId = await uploadArchiveModule.execute({
        description: filename,
        vault,
        file
      })

      fs.unlinkSync(outputPath)

      // await createContractModule.execute({})

      return { archiveId, contract }
    }
  })
}

export type EnqueueAccessJob = EnqueueFunction<AccessJobParams>
export interface AccessJobParams {
  key: string
  bucket: string
  vaultName: string
}
