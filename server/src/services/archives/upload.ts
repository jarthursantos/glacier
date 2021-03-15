import fs from 'fs'

import { Vault } from '~/domain/Vault'
import { InvalidPathError } from '~/errors/path/InvalidPath'
import { UploadArchiveModule } from '~/modules/archives/upload'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

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
