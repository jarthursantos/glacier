import fs from 'fs'

import { Vault } from '~/domain/Vault'
import { InvalidPathError } from '~/errors/path/InvalidPath'
import { UploadMultipartsModule } from '~/modules/multiparts/upload'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

export interface UploadMultipartParams {
  vault: Vault | string
  uploadId: string
  path: string
}

export type UploadMultipartService = Service<UploadMultipartParams>

export function instantiateUploadMultipartService(
  extractVaultFromParams: ExtractVaultFromParams,
  uploadMultipartsModule: UploadMultipartsModule
): UploadMultipartService {
  return {
    async execute(params) {
      const { uploadId, path } = params

      const vault = await extractVaultFromParams.extract(params)

      const fileExists = fs.existsSync(path)

      if (!fileExists) {
        throw new InvalidPathError()
      }

      const file = fs.readFileSync(path)

      await uploadMultipartsModule.execute({ vault, uploadId, file })
    }
  }
}