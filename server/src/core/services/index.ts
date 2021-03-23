import { asFunction, NameAndRegistrationPair } from 'awilix'

import { instantiateCreateRetrievalContractService } from './contracts/retrieval'
import { instantiateDeleteGlacierArchiveService } from './glacier/archives/delete'
import { instantiateUploadGlacierArchiveService } from './glacier/archives/upload'
import { instantiateGlacierArchiveJobService } from './glacier/jobs/archive'
import { instantiateGlacierArchiveOutputJobService } from './glacier/jobs/archive-output'
import { instantiateFindGlacierJobService } from './glacier/jobs/find'
import { instantiateGlacierInventoryJobService } from './glacier/jobs/inventory'
import { instantiateGlacierInventoryOutputJobService } from './glacier/jobs/inventory-output'
import { instantiateListGlacierJobsService } from './glacier/jobs/list'
import { instantiateAbortGlacierMultipartUploadService } from './glacier/multiparts/abort'
import { instantiateCompleteGlacierMultipartUploadService } from './glacier/multiparts/complete'
import { instantiateInitiateGlacierMultipartUploadService } from './glacier/multiparts/initiate'
import { instantiateListGlacierMultipartUploadService } from './glacier/multiparts/list'
import { instantiateUploadGlacierMultipartService } from './glacier/multiparts/upload'
import { instantiateCreateGlacierVaultService } from './glacier/vaults/create'
import { instantiateDeleteGlacierVaultService } from './glacier/vaults/delete'
import { instantiateFindGlacierVaultService } from './glacier/vaults/find'
import { instantiateListGlacierVaultsService } from './glacier/vaults/list'
import { instantiateImportAccessService } from './import/access'
import { instantiateImportMetaService } from './import/meta'
import { instantiateCompleteJobsByUserService } from './jobs/complete-by-user'
import { instantiateCreateJobService } from './jobs/create'
import { instantiatePendingJobsByUserService } from './jobs/pending-by-user'

export const servicesRegistrations: NameAndRegistrationPair<any> = {
  // Archives
  deleteGlacierArchiveService: asFunction(
    instantiateDeleteGlacierArchiveService
  ),
  uploadGlacierArchiveService: asFunction(
    instantiateUploadGlacierArchiveService
  ),

  // Contracts
  createRetrievalContractService: asFunction(
    instantiateCreateRetrievalContractService
  ),

  // Import
  importAccessService: asFunction(instantiateImportAccessService),
  importMetaService: asFunction(instantiateImportMetaService),

  // Jobs
  completeJobsByUserService: asFunction(instantiateCompleteJobsByUserService),
  createJobService: asFunction(instantiateCreateJobService),
  pendingJobsByUserService: asFunction(instantiatePendingJobsByUserService),

  // Glacier Jobs
  glacierArchiveJobService: asFunction(instantiateGlacierArchiveJobService),
  findGlacierJobService: asFunction(instantiateFindGlacierJobService),
  glacierInventoryJobService: asFunction(instantiateGlacierInventoryJobService),
  glacierInventoryOutputJobService: asFunction(
    instantiateGlacierInventoryOutputJobService
  ),
  listGlacierJobsService: asFunction(instantiateListGlacierJobsService),
  glacierArchiveOutputJobService: asFunction(
    instantiateGlacierArchiveOutputJobService
  ),

  // Multiparts
  abortGlacierMultipartUploadService: asFunction(
    instantiateAbortGlacierMultipartUploadService
  ),
  completeGlacierMultipartUploadService: asFunction(
    instantiateCompleteGlacierMultipartUploadService
  ),
  initiateGlacierMultipartUploadService: asFunction(
    instantiateInitiateGlacierMultipartUploadService
  ),
  listGlacierMultipartUploadService: asFunction(
    instantiateListGlacierMultipartUploadService
  ),
  uploadGlacierMultipartService: asFunction(
    instantiateUploadGlacierMultipartService
  ),

  // Vaults
  createGlacierVaultService: asFunction(instantiateCreateGlacierVaultService),
  deleteGlacierVaultService: asFunction(instantiateDeleteGlacierVaultService),
  findGlacierVaultService: asFunction(instantiateFindGlacierVaultService),
  listGlacierVaultsService: asFunction(instantiateListGlacierVaultsService)
}

export interface Service<Params = void, Result = void> {
  execute(params: Params): Promise<Result>
}
