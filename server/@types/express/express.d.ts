import { User } from '~/core/domain/User'

declare global {
  namespace Express {
    interface Request {
      auth: {
        user: User
      }
    }
  }
}
