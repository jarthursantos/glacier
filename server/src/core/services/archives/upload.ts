import fs from 'fs'

import { Vault } from '~/core/domain/Vault'
import { InvalidPathError } from '~/core/errors/path/InvalidPath'
import { UploadArchiveModule } from '~/core/modules/archives/upload'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface UploadArchiveParams {
  vault: Vault | string
  path: string
  description?: string
}

export type UploadArchiveService = Service<UploadArchiveParams, string>

export function instantiateUploadArchiveService(
  extractVaultFromParams: ExtractVaultFromParams,
  uploadArchiveModule: UploadArchiveModule
): UploadArchiveService {
  return {
    async execute(params) {
      const { path, description } = params

      const vault = await extractVaultFromParams.extract(params)

      const fileExists = fs.existsSync(path)

      if (!fileExists) {
        throw new InvalidPathError()
      }

      // TODO: check file size, limit are 100MB
      const file = fs.readFileSync(path)

      const archiveId = await uploadArchiveModule.execute({
        vault,
        file,
        description
      })

      return archiveId
    }
  }
}
