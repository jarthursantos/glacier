import { Vault } from '~/core/domain/Vault'
import { AbortMultipartsUploadModule } from '~/core/modules/multiparts/abort'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface AbortMultipartUploadParams {
  vault: Vault | string
  uploadId: string
}

export type AbortMultipartUploadService = Service<AbortMultipartUploadParams>

export function instantiateAbortMultipartUploadService(
  extractVaultFromParams: ExtractVaultFromParams,
  abortMultipartsUploadModule: AbortMultipartsUploadModule
): AbortMultipartUploadService {
  return {
    async execute(params) {
      const { uploadId } = params

      const vault = await extractVaultFromParams.extract(params)

      await abortMultipartsUploadModule.execute({ vault, uploadId })
    }
  }
}
