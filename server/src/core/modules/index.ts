import { asFunction, NameAndRegistrationPair } from 'awilix'

import { instantiateAttachArchiveModule } from './archives/attach'
import { instantiateFindArchiveModule } from './archives/find'
import { instantiateFindArchivePerContractModule } from './archives/find-per-contract'
import { instantiateCreateContractModule } from './contracts/create'
import { instantiateFindContractModule } from './contracts/find'
import { instantiateDeleteGlacierArchiveModule } from './glacier/archives/delete'
import { instantiateUploadGlacierArchiveModule } from './glacier/archives/upload'
import { instantiateGlacierArchiveJobModule } from './glacier/jobs/archive'
import { instantiateGlacierArchiveOutputJobModule } from './glacier/jobs/archive-output'
import { instantiateGlacierFindJobModule } from './glacier/jobs/find'
import { instantiateGlacierInventoryJobModule } from './glacier/jobs/inventory'
import { instantiateGlacierInventoryOutputJobModule } from './glacier/jobs/inventory-output'
import { instantiateGlacierListJobsModule } from './glacier/jobs/list'
import { instantiateAbortGlacierMultipartsUploadModule } from './glacier/multiparts/abort'
import { instantiateCompleteGlacierMultipartsUploadModule } from './glacier/multiparts/complete'
import { instantiateInitiateGlacierMultipartsUploadModule } from './glacier/multiparts/initiate'
import { instantiateListGlacierMultipartsUploadsModule } from './glacier/multiparts/list'
import { instantiateUploadGlacierMultipartsModule } from './glacier/multiparts/upload'
import { instantiateCreateGlacierVaultModule } from './glacier/vaults/create'
import { instantiateDeleteGlacierVaultModule } from './glacier/vaults/delete'
import { instantiateFindGlacierVaultModule } from './glacier/vaults/find'
import { instantiateListGlacierVaultsModule } from './glacier/vaults/list'
import { instantiateActiveJobPerArchiveModule } from './jobs/active-per-archive'
import { instantiateJobAlreadyRequestedByUserModule } from './jobs/already-requested'
import { instantiateAttachJobUserModule } from './jobs/attach-user'
import { instantiateCreateRetrievalJobModule } from './jobs/create'
import { instantiateExpireJobModule } from './jobs/expire'
import { instantiateFinishJobModule } from './jobs/finish'
import { instantiateDownloadS3ObjectModule } from './s3/download'
import { instantiateListS3ObjectsModule } from './s3/list'
import { instantiateGetUserModule } from './user/get'

export const modulesRegistrations: NameAndRegistrationPair<any> = {
  // S3
  downloadS3ObjectModule: asFunction(instantiateDownloadS3ObjectModule),
  listS3ObjectsModule: asFunction(instantiateListS3ObjectsModule),

  // Contracts
  createContractModule: asFunction(instantiateCreateContractModule),
  findContractModule: asFunction(instantiateFindContractModule),
  // searchDocumentsModule: asFunction(instantiateSearchDocumentsModule),

  // Archives
  attachArchiveModule: asFunction(instantiateAttachArchiveModule),
  findArchiveModule: asFunction(instantiateFindArchiveModule),
  findArchivePerContractModule: asFunction(
    instantiateFindArchivePerContractModule
  ),

  // Glacier Archives
  deleteGlacierArchiveModule: asFunction(instantiateDeleteGlacierArchiveModule),
  uploadGlacierArchiveModule: asFunction(instantiateUploadGlacierArchiveModule),

  // Glacier Jobs
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

  // Glacier Multiparts
  abortGlacierMultipartsUploadModule: asFunction(
    instantiateAbortGlacierMultipartsUploadModule
  ),
  completeGlacierMultipartsUploadModule: asFunction(
    instantiateCompleteGlacierMultipartsUploadModule
  ),
  initiateGlacierMultipartsUploadModule: asFunction(
    instantiateInitiateGlacierMultipartsUploadModule
  ),
  listGlacierMultipartsUploadsModule: asFunction(
    instantiateListGlacierMultipartsUploadsModule
  ),
  uploadGlacierMultipartsModule: asFunction(
    instantiateUploadGlacierMultipartsModule
  ),

  // Glacier Vaults
  createGlacierVaultModule: asFunction(instantiateCreateGlacierVaultModule),
  deleteGlacierVaultModule: asFunction(instantiateDeleteGlacierVaultModule),
  findGlacierVaultModule: asFunction(instantiateFindGlacierVaultModule),
  listGlacierVaultsModule: asFunction(instantiateListGlacierVaultsModule),

  // Jobs
  activeJobPerArchiveModule: asFunction(instantiateActiveJobPerArchiveModule),
  jobAlreadyRequestedByUserModule: asFunction(
    instantiateJobAlreadyRequestedByUserModule
  ),
  attachJobUserModule: asFunction(instantiateAttachJobUserModule),
  createRetrievalJobModule: asFunction(instantiateCreateRetrievalJobModule),
  expireJobModule: asFunction(instantiateExpireJobModule),
  finishJobModule: asFunction(instantiateFinishJobModule),

  // User
  getUserModule: asFunction(instantiateGetUserModule)
}

export interface Module<Params = void, Result = void> {
  execute(params: Params): Promise<Result>
}
