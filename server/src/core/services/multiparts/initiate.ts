import { Vault } from '~/core/domain/Vault'
import { InitiateMultipartsUploadModule } from '~/core/modules/multiparts/initiate'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface InitiateMultipartUploadParams {
  vault: Vault | string
  description?: string
}

export type InitiateMultipartUploadService = Service<
  InitiateMultipartUploadParams,
  string
>

export function instantiateInitiateMultipartUploadService(
  extractVaultFromParams: ExtractVaultFromParams,
  initiateMultipartsUploadModule: InitiateMultipartsUploadModule
): InitiateMultipartUploadService {
  return {
    async execute(params) {
      const { description } = params

      const vault = await extractVaultFromParams.extract(params)

      const multipartId = await initiateMultipartsUploadModule.execute({
        vault,
        description
      })

      return multipartId
    }
  }
}
