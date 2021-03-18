import { Request, Response } from 'express'

import { container } from '~/core/container'
import { CreateVaultService } from '~/core/services/vaults/create'
import { DeleteVaultService } from '~/core/services/vaults/delete'
import { FindVaultService } from '~/core/services/vaults/find'
import { ListVaultsService } from '~/core/services/vaults/list'
import { createDebuger } from '~/utils/debug'

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
