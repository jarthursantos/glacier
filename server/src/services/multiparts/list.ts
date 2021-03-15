import { MultipartUpload } from '~/domain/MultipartUpload'
import { Vault } from '~/domain/Vault'
import { ListMultipartsUploadsModule } from '~/modules/multiparts/list'
import { Service } from '~/services'
import { ExtractVaultFromParams } from '~/utils/params/extract-vault'

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
