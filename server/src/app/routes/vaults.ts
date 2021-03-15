import { Router } from 'express'

import { handleCreateVault, handleListVaults } from '~/app/controllers/vaults'
import { validateBody } from '~/app/middlewares/validate-body'
import { CreateVaultValidator } from '~/app/validators/vaults/create'
import { Populate, PopulateParams } from '~/jobs/populate'
import { enqueueJob } from '~/libs/Queue'

const vaultsRoutes = Router()

vaultsRoutes.post('/', validateBody(CreateVaultValidator), handleCreateVault)
vaultsRoutes.get('/', handleListVaults)

vaultsRoutes.get('/queue', async (_req, res) => {
  await enqueueJob<PopulateParams>(Populate.key, { vault: { name: 'teste', archivesCount: 0, createdAt: new Date(), location: '', sizeInBytes: 0 } })

  res.send()
})

export { vaultsRoutes }
