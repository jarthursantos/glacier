import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { ObjectSchema, ValidationError } from 'yup'

import { createDebuger } from '~/debug'

const debug = createDebuger('validate-body')

export function validateBody(schema: ObjectSchema<any>) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    debug('Validating request body')

    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      if (err instanceof ValidationError) {
        err.message = err.errors.join(', ')
      }

      throw new createHttpError.BadRequest(err.message || 'Erro inesperado')
    }

    return next()
  }
}
