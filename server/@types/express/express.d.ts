import { User } from '~/domain/User'

declare global {
  namespace Express {
    interface Request {
      auth: {
        user: User
      }
    }
  }
}
