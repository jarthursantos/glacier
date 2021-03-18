import { MultipartUpload } from '~/core/domain/MultipartUpload'
import { Vault } from '~/core/domain/Vault'
import { ListMultipartsUploadsModule } from '~/core/modules/multiparts/list'
import { Service } from '~/core/services'
import { ExtractVaultFromParams } from '~/core/utils/params/extract-vault'

export interface ListMultipartUploadParams {
  vault: Vault | string
}

export type ListMultipartUploadService = Service<
  ListMultipartUploadParams,
  MultipartUpload[]
>

export function instantiateListMultipartUploadService(
  extractVaultFromParams: ExtractVaultFromParams,
  listMultipartsUploadsModule: ListMultipartsUploadsModule
): ListMultipartUploadService {
  return {
    async execute(params) {
      const vault = await extractVaultFromParams.extract(params)

      const uploads = await listMultipartsUploadsModule.execute({ vault })

      return uploads
    }
  }
}
