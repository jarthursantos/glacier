import { GlacierJobActions } from '~/core/domain/GlacierJobActions'
import { GlacierJobStatus } from '~/core/domain/GlacierJobStatus'

import { Tiers } from './Tiers'

export interface BaseGlacierJob {
  id: string
  description?: string
  completed: boolean
  completedAt?: Date
  createdAt: Date
  status: GlacierJobStatus
  statusMessage: string
  location: string
  snsTopic?: string
}

export interface SelectGlacierJob extends BaseGlacierJob {
  action: typeof GlacierJobActions.SELECT
}

export interface ArchiveRetrievalGlacierJob extends BaseGlacierJob {
  action: typeof GlacierJobActions.ARCHIVE_RETRIEVAL
  archiveId?: string
  tier?: Tiers
}

export interface InventoryRetrievalGlacierJob extends BaseGlacierJob {
  action: typeof GlacierJobActions.INVENTORY_RETRIEVAL
  inventorySizeInBytes?: number
}

export type GlacierJob =
  | SelectGlacierJob
  | ArchiveRetrievalGlacierJob
  | InventoryRetrievalGlacierJob
