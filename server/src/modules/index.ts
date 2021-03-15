import { asFunction, NameAndRegistrationPair } from 'awilix'

import { instantiateDeleteArchiveModule } from './archives/delete'
import { instantiateUploadArchiveModule } from './archives/upload'
import { instantiateArchiveJobModule } from './jobs/archive'
import { instantiateArchiveOutputJobModule } from './jobs/archive-output'
import { instantiateFindJobModule } from './jobs/find'
import { instantiateInventoryJobModule } from './jobs/inventory'
import { instantiateInventoryOutputJobModule } from './jobs/inventory-output'
import { instantiateListJobsModule } from './jobs/list'
import { instantiateSelectJobModule } from './jobs/select'
import { instantiateAbortMultipartsUploadModule } from './multiparts/abort'
import { instantiateCompleteMultipartsUploadModule } from './multiparts/complete'
import { instantiateInitiateMultipartsUploadModule } from './multiparts/initiate'
import { instantiateListMultipartsUploadsModule } from './multiparts/list'
import { instantiateUploadMultipartsModule } from './multiparts/upload'
import { instantiateDownloadS3ObjectsModule } from './s3/download'
import { instantiateCreateVaultModule } from './vaults/create'
import { instantiateDeleteVaultModule } from './vaults/delete'
import { instantiateFindVaultModule } from './vaults/find'
import { instantiateListVaultsModule } from './vaults/list'

export const modulesRegistrations: NameAndRegistrationPair<any> = {
  // S3
  downloadS3ObjectsModule: asFunction(instantiateDownloadS3ObjectsModule),

  // Archives
  deleteArchiveModule: asFunction(instantiateDeleteArchiveModule),
  uploadArchiveModule: asFunction(instantiateUploadArchiveModule),

  // Jobs
  archiveJobModule: asFunction(instantiateArchiveJobModule),
  findJobModule: asFunction(instantiateFindJobModule),
  inventoryJobModule: asFunction(instantiateInventoryJobModule),
  inventoryOutputJobModule: asFunction(instantiateInventoryOutputJobModule),
  listJobsModule: asFunction(instantiateListJobsModule),
  archiveOutputJobModule: asFunction(instantiateArchiveOutputJobModule),
  selectJobModule: asFunction(instantiateSelectJobModule),

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
