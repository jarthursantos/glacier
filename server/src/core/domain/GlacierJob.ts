import { JobActions } from '~/core/domain/JobActions'
import { JobStatus } from '~/core/domain/JobStatus'

import { Tiers } from './Tiers'

export interface BaseGlacierJob {
  id: string
  description?: string
  completed: boolean
  completedAt?: Date
  createdAt: Date
  status: JobStatus
  statusMessage: string
  location: string
  snsTopic?: string
}

export interface SelectGlacierJob extends BaseGlacierJob {
  action: typeof JobActions.SELECT
}

export interface ArchiveRetrievalGlacierJob extends BaseGlacierJob {
  action: typeof JobActions.ARCHIVE_RETRIEVAL
  archiveId?: string
  tier?: Tiers
}

export interface InventoryRetrievalGlacierJob extends BaseGlacierJob {
  action: typeof JobActions.INVENTORY_RETRIEVAL
  inventorySizeInBytes?: number
}

export type GlacierJob =
  | SelectGlacierJob
  | ArchiveRetrievalGlacierJob
  | InventoryRetrievalGlacierJob
