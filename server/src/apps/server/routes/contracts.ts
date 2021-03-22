import { Router } from 'express'

import { handleCreateRetrievalContract } from '~/apps/server/controllers/contracts'

const contractsRouter = Router()

contractsRouter.post(
  '/:contrato/arquivos/:arquivo',
  handleCreateRetrievalContract
)

export { contractsRouter }
