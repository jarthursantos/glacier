import { Router } from 'express'

import {
  handleCreateVault,
  handleListVaults
} from '~/apps/server/controllers/vaults'
import { validateBody } from '~/apps/server/middlewares/validate-body'
import { CreateVaultValidator } from '~/apps/server/validators/vaults/create'

const vaultsRoutes = Router()

vaultsRoutes.post('/', validateBody(CreateVaultValidator), handleCreateVault)
vaultsRoutes.get('/', handleListVaults)

export { vaultsRoutes }
