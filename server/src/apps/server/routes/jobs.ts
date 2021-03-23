import { Router } from 'express'

import {
  handleCreateRetrievalArchiveJob,
  handleFindCompletedJobs,
  handleFindPendingJobs
} from '~/apps/server/controllers/jobs'

const jobsRouter = Router()

jobsRouter.get('/pendentes', handleFindPendingJobs)
jobsRouter.get('/concluidos', handleFindCompletedJobs)
jobsRouter.post('/:contrato/arquivos/:arquivo', handleCreateRetrievalArchiveJob)

export { jobsRouter }
