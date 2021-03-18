import { Vault } from '~/core/domain/Vault'
import { CompleteMultipartsUploadModule } from '~/core/modules/multiparts/complete'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface CompleteMultipartUploadParams {
  vault: Vault | string
  uploadId: string
}

export type CompleteMultipartUploadService = Service<
  CompleteMultipartUploadParams,
  string
>

export function instantiateCompleteMultipartUploadService(
  extractVaultFromParams: ExtractVaultFromParams,
  completeMultipartsUploadModule: CompleteMultipartsUploadModule
): CompleteMultipartUploadService {
  return {
    async execute(params) {
      const { uploadId } = params

      const vault = await extractVaultFromParams.extract(params)

      const archiveId = await completeMultipartsUploadModule.execute({
        vault,
        uploadId
      })

      return archiveId
    }
  }
}
