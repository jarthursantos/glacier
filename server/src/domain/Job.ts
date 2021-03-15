import { JobActions } from '~/domain/JobActions'
import { JobStatus } from '~/domain/JobStatus'

import { Tiers } from './Tiers'

export interface BaseJob {
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

export interface SelectJob extends BaseJob {
  action: typeof JobActions.SELECT
}

export interface ArchiveRetrievalJob extends BaseJob {
  action: typeof JobActions.ARCHIVE_RETRIEVAL
  archiveId?: string
  tier?: Tiers
}

export interface InventoryRetrievalJob extends BaseJob {
  action: typeof JobActions.INVENTORY_RETRIEVAL
  inventorySizeInBytes?: number
}

export type Job = SelectJob | ArchiveRetrievalJob | InventoryRetrievalJob
