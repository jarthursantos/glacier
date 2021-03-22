import { Vault } from '~/core/domain/Vault'
import { CompleteGlacierMultipartsUploadModule } from '~/core/modules/glacier/multiparts/complete'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface CompleteGlacierMultipartUploadParams {
  vault: Vault | string
  uploadId: string
}

export type CompleteGlacierMultipartUploadService = Service<
  CompleteGlacierMultipartUploadParams,
  string
>

export function instantiateCompleteGlacierMultipartUploadService(
  extractVaultFromParams: ExtractVaultFromParams,
  completeGlacierMultipartsUploadModule: CompleteGlacierMultipartsUploadModule
): CompleteGlacierMultipartUploadService {
  return {
    async execute(params) {
      const { uploadId } = params

      const vault = await extractVaultFromParams.extract(params)

      const archiveId = await completeGlacierMultipartsUploadModule.execute({
        vault,
        uploadId
      })

      return archiveId
    }
  }
}
