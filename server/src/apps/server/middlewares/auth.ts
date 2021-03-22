import { Request, Response, NextFunction } from 'express'

export async function auth(req: Request, _res: Response, next: NextFunction) {
  req.auth = {
    user: {
      id: '8cd79b63-c2b6-4474-bad6-2b63343a7219',
      name: 'Arthur Santos'
    }
  }

  return next()
}
