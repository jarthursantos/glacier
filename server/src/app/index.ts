import 'express-async-errors'

import express, { Request, Response, NextFunction } from 'express'
import { isHttpError } from 'http-errors'

import { vaultsRoutes } from '~/app/routes/vaults'
import { isVaultAlreadyExistsError } from '~/errors/vault/VaultAlreadyExists'

const app = express()

app.use(express.json())

// vaults
app.use('/cofres', vaultsRoutes)
app.use('/vaults', vaultsRoutes)

app.use(
  async (error: any, _req: Request, res: Response, next: NextFunction) => {
    if (isHttpError(error)) {
      return res.status(error.statusCode).json({ message: error.message })
    }

    if (isVaultAlreadyExistsError(error)) {
      return res.status(400).json({ message: error.message })
    }

    next(error)
  }
)

export { app }
