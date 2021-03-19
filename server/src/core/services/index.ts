import { asFunction, NameAndRegistrationPair } from 'awilix'

import { instantiateDeleteArchiveService } from './archives/delete'
import { instantiateUploadArchiveService } from './archives/upload'
import { instantiateSearchDocumentsService } from './documents/search'
import { instantiateArchiveJobService } from './jobs/archive'
import { instantiateArchiveOutputJobService } from './jobs/archive-output'
import { instantiateFindJobService } from './jobs/find'
import { instantiateInventoryJobService } from './jobs/inventory'
import { instantiateInventoryOutputJobService } from './jobs/inventory-output'
import { instantiateListJobsService } from './jobs/list'
import { instantiateAbortMultipartUploadService } from './multiparts/abort'
import { instantiateCompleteMultipartUploadService } from './multiparts/complete'
import { instantiateInitiateMultipartUploadService } from './multiparts/initiate'
import { instantiateListMultipartUploadService } from './multiparts/list'
import { instantiateUploadMultipartService } from './multiparts/upload'
import { instantiateCreateVaultService } from './vaults/create'
import { instantiateDeleteVaultService } from './vaults/delete'
import { instantiateFindVaultService } from './vaults/find'
import { instantiateListVaultsService } from './vaults/list'

export const servicesRegistrations: NameAndRegistrationPair<any> = {
  // Archives
  deleteArchiveService: asFunction(instantiateDeleteArchiveService),
  uploadArchiveService: asFunction(instantiateUploadArchiveService),

  // Documents
  searchDocumentsService: asFunction(instantiateSearchDocumentsService),

  // Jobs
  archiveJobService: asFunction(instantiateArchiveJobService),
  findJobService: asFunction(instantiateFindJobService),
  inventoryJobService: asFunction(instantiateInventoryJobService),
  inventoryOutputJobService: asFunction(instantiateInventoryOutputJobService),
  listJobsService: asFunction(instantiateListJobsService),
  archiveOutputJobService: asFunction(instantiateArchiveOutputJobService),

  // Multiparts
  abortMultipartUploadService: asFunction(
    instantiateAbortMultipartUploadService
  ),
  completeMultipartUploadService: asFunction(
    instantiateCompleteMultipartUploadService
  ),
  initiateMultipartUploadService: asFunction(
    instantiateInitiateMultipartUploadService
  ),
  listMultipartUploadService: asFunction(instantiateListMultipartUploadService),
  uploadMultipartService: asFunction(instantiateUploadMultipartService),

  // Vaults
  createVaultService: asFunction(instantiateCreateVaultService),
  deleteVaultService: asFunction(instantiateDeleteVaultService),
  findVaultService: asFunction(instantiateFindVaultService),
  listVaultsService: asFunction(instantiateListVaultsService)
}

export interface Service<Params = void, Result = void> {
  execute(params: Params): Promise<Result>
}
