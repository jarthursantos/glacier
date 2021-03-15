import { Request, Response } from 'express'

import { container } from '~/container'
import { createDebuger } from '~/debug'
import { CreateVaultService } from '~/services/vaults/create'
import { DeleteVaultService } from '~/services/vaults/delete'
import { FindVaultService } from '~/services/vaults/find'
import { ListVaultsService } from '~/services/vaults/list'

const debug = createDebuger('controllers:vaults')

const createVaultService = container.resolve<CreateVaultService>(
  'createVaultService'
)
const deleteVaultService = container.resolve<DeleteVaultService>(
  'deleteVaultService'
)
const findVaultService = container.resolve<FindVaultService>('findVaultService')
const listVaultsService = container.resolve<ListVaultsService>(
  'listVaultsService'
)

export async function handleCreateVault(req: Request, res: Response) {
  debug('Handling vault creation')

  const { name } = req.body

  const vault = await createVaultService.execute({ name })

  return res.status(201).json(vault)
}

export async function handleListVaults(_req: Request, res: Response) {
  debug('Handling vault listing')

  const vaults = await listVaultsService.execute()

  return res.json(vaults)
}

export async function handleFindVault(req: Request, res: Response) {
  debug('Handling vault finding')

  const vaultName = req.params.vaultName

  const vault = await findVaultService.execute({ vaultName })

  return res.json(vault)
}
