import { Router } from 'express'

import { handleCreateVault, handleListVaults } from '~/app/controllers/vaults'
import { validateBody } from '~/app/middlewares/validate-body'
import { CreateVaultValidator } from '~/app/validators/vaults/create'

const vaultsRoutes = Router()

vaultsRoutes.post('/', validateBody(CreateVaultValidator), handleCreateVault)
vaultsRoutes.get('/', handleListVaults)

export { vaultsRoutes }
