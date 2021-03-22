import { Vault } from '~/core/domain/Vault'
import { AbortGlacierMultipartsUploadModule } from '~/core/modules/glacier/multiparts/abort'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface AbortGlacierMultipartUploadParams {
  vault: Vault | string
  uploadId: string
}

export type AbortGlacierMultipartUploadService = Service<AbortGlacierMultipartUploadParams>

export function instantiateAbortGlacierMultipartUploadService(
  extractVaultFromParams: ExtractVaultFromParams,
  abortGlacierMultipartsUploadModule: AbortGlacierMultipartsUploadModule
): AbortGlacierMultipartUploadService {
  return {
    async execute(params) {
      const { uploadId } = params

      const vault = await extractVaultFromParams.extract(params)

      await abortGlacierMultipartsUploadModule.execute({ vault, uploadId })
    }
  }
}
