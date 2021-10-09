import { Router } from 'express'

import { UsersController } from '../controllers/ProfileController'
import { SessionsController } from '../controllers/SessionsController'

import { checkAuthMiddleware } from './middlewares/checkAuthMiddleware'
import { addUserInformationToRequest } from './middlewares/addUserInformationToRequest'

const profileController = new UsersController()
const sessionsController = new SessionsController()

const app = Router()

app.get('/me', checkAuthMiddleware, profileController.show);

app.post('/sessions', sessionsController.create);

app.post(
  '/refresh', 
  addUserInformationToRequest, 
  sessionsController.refresh
);

export default app