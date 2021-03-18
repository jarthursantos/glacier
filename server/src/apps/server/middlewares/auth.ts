import { Request, Response, NextFunction } from 'express'

export async function auth(req: Request, _res: Response, next: NextFunction) {
  req.auth = {
    user: {
      id: 0,
      name: 'Arthur Santos'
    }
  }

  return next()
}
