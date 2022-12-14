import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/signup'

export default async (router: Router): Promise<void> => {
  const controller = adaptRoute(makeSignUpController())
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', controller)
}
