import fs from 'fs'

import { GlacierArchive } from '~/core/domain/GlacierArchive'
import { Vault } from '~/core/domain/Vault'
import { InvalidPathError } from '~/core/errors/path/InvalidPath'
import { UploadGlacierArchiveModule } from '~/core/modules/glacier/archives/upload'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface UploadGlacierArchiveParams {
  vault: Vault | string
  path: string
  description?: string
}

export type UploadGlacierArchiveService = Service<
  UploadGlacierArchiveParams,
  GlacierArchive
>

export function instantiateUploadGlacierArchiveService(
  extractVaultFromParams: ExtractVaultFromParams,
  uploadGlacierArchiveModule: UploadGlacierArchiveModule
): UploadGlacierArchiveService {
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

      const archiveId = await uploadGlacierArchiveModule.execute({
        vault,
        file,
        description
      })

      return archiveId
    }
  }
}
