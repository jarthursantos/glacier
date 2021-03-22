import { Vault } from '~/core/domain/Vault'
import { InitiateGlacierMultipartsUploadModule } from '~/core/modules/glacier/multiparts/initiate'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface InitiateGlacierMultipartUploadParams {
  vault: Vault | string
  description?: string
}

export type InitiateGlacierMultipartUploadService = Service<
  InitiateGlacierMultipartUploadParams,
  string
>

export function instantiateInitiateGlacierMultipartUploadService(
  extractVaultFromParams: ExtractVaultFromParams,
  initiateGlacierMultipartsUploadModule: InitiateGlacierMultipartsUploadModule
): InitiateGlacierMultipartUploadService {
  return {
    async execute(params) {
      const { description } = params

      const vault = await extractVaultFromParams.extract(params)

      const multipartId = await initiateGlacierMultipartsUploadModule.execute({
        vault,
        description
      })

      return multipartId
    }
  }
}
