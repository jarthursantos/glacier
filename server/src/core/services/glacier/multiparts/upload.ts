import fs from 'fs'

import { Vault } from '~/core/domain/Vault'
import { InvalidPathError } from '~/core/errors/path/InvalidPath'
import { UploadGlacierMultipartsModule } from '~/core/modules/glacier/multiparts/upload'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface UploadGlacierMultipartParams {
  vault: Vault | string
  uploadId: string
  path: string
}

export type UploadGlacierMultipartService = Service<UploadGlacierMultipartParams>

export function instantiateUploadGlacierMultipartService(
  extractVaultFromParams: ExtractVaultFromParams,
  uploadGlacierMultipartsModule: UploadGlacierMultipartsModule
): UploadGlacierMultipartService {
  return {
    async execute(params) {
      const { uploadId, path } = params

      const vault = await extractVaultFromParams.extract(params)

      const fileExists = fs.existsSync(path)

      if (!fileExists) {
        throw new InvalidPathError()
      }

      const file = fs.readFileSync(path)

      await uploadGlacierMultipartsModule.execute({ vault, uploadId, file })
    }
  }
}
