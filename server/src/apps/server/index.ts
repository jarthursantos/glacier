import 'express-async-errors'

import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import { isHttpError } from 'http-errors'

import { auth } from '~/apps/server/middlewares/auth'
import { jobsRouter } from '~/apps/server/routes/jobs'
import { isVaultAlreadyExistsError } from '~/core/errors/vault/VaultAlreadyExists'

const app = express()

app.use(express.json())
app.use(cors())

app.use(auth)

app.use('/trabalhos', jobsRouter)

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
