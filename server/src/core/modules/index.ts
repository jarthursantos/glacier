import { asFunction, NameAndRegistrationPair } from 'awilix'

import { instantiateDeleteArchiveModule } from './archives/delete'
import { instantiateUploadArchiveModule } from './archives/upload'
import { instantiateSearchDocumentsModule } from './contracts/search'
import { instantiateGlacierArchiveJobModule } from './glacier-jobs/archive'
import { instantiateGlacierArchiveOutputJobModule } from './glacier-jobs/archive-output'
import { instantiateGlacierFindJobModule } from './glacier-jobs/find'
import { instantiateGlacierInventoryJobModule } from './glacier-jobs/inventory'
import { instantiateGlacierInventoryOutputJobModule } from './glacier-jobs/inventory-output'
import { instantiateGlacierListJobsModule } from './glacier-jobs/list'
import { instantiateAbortMultipartsUploadModule } from './multiparts/abort'
import { instantiateCompleteMultipartsUploadModule } from './multiparts/complete'
import { instantiateInitiateMultipartsUploadModule } from './multiparts/initiate'
import { instantiateListMultipartsUploadsModule } from './multiparts/list'
import { instantiateUploadMultipartsModule } from './multiparts/upload'
import { instantiateDownloadS3ObjectModule } from './s3/download'
import { instantiateListS3ObjectsModule } from './s3/list'
import { instantiateCreateVaultModule } from './vaults/create'
import { instantiateDeleteVaultModule } from './vaults/delete'
import { instantiateFindVaultModule } from './vaults/find'
import { instantiateListVaultsModule } from './vaults/list'

export const modulesRegistrations: NameAndRegistrationPair<any> = {
  // S3
  downloadS3ObjectModule: asFunction(instantiateDownloadS3ObjectModule),
  listS3ObjectsModule: asFunction(instantiateListS3ObjectsModule),

  // Documents
  searchDocumentsModule: asFunction(instantiateSearchDocumentsModule),

  // Archives
  deleteArchiveModule: asFunction(instantiateDeleteArchiveModule),
  uploadArchiveModule: asFunction(instantiateUploadArchiveModule),

  // Jobs
  glacierArchiveJobModule: asFunction(instantiateGlacierArchiveJobModule),
  glacierFindJobModule: asFunction(instantiateGlacierFindJobModule),
  glacierInventoryJobModule: asFunction(instantiateGlacierInventoryJobModule),
  glacierInventoryOutputJobModule: asFunction(
    instantiateGlacierInventoryOutputJobModule
  ),
  glacierListJobsModule: asFunction(instantiateGlacierListJobsModule),
  glacierArchiveOutputJobModule: asFunction(
    instantiateGlacierArchiveOutputJobModule
  ),

  // Multiparts
  abortMultipartsUploadModule: asFunction(
    instantiateAbortMultipartsUploadModule
  ),
  completeMultipartsUploadModule: asFunction(
    instantiateCompleteMultipartsUploadModule
  ),
  initiateMultipartsUploadModule: asFunction(
    instantiateInitiateMultipartsUploadModule
  ),
  listMultipartsUploadsModule: asFunction(
    instantiateListMultipartsUploadsModule
  ),
  uploadMultipartsModule: asFunction(instantiateUploadMultipartsModule),

  // Vaults
  createVaultModule: asFunction(instantiateCreateVaultModule),
  deleteVaultModule: asFunction(instantiateDeleteVaultModule),
  findVaultModule: asFunction(instantiateFindVaultModule),
  listVaultsModule: asFunction(instantiateListVaultsModule)
}

export interface Module<Params = void, Result = void> {
  execute(params: Params): Promise<Result>
}
