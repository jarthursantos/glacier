import { MultipartUpload } from '~/core/domain/MultipartUpload'
import { Vault } from '~/core/domain/Vault'
import { ListGlacierMultipartsUploadsModule } from '~/core/modules/glacier/multiparts/list'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface ListGlacierMultipartUploadParams {
  vault: Vault | string
}

export type ListGlacierMultipartUploadService = Service<
  ListGlacierMultipartUploadParams,
  MultipartUpload[]
>

export function instantiateListGlacierMultipartUploadService(
  extractVaultFromParams: ExtractVaultFromParams,
  listGlacierMultipartsUploadsModule: ListGlacierMultipartsUploadsModule
): ListGlacierMultipartUploadService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const uploads = await listGlacierMultipartsUploadsModule.execute({
        vault
      })

      return uploads
    }
  }
}
