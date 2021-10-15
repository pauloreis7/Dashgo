import { Router } from 'express'

import { SessionsController } from '../../controllers/SessionsController'

import { addUserInformationToRequest } from '../middlewares/addUserInformationToRequest'

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post('/', sessionsController.create);

sessionsRouter.post(
  '/refresh', 
  addUserInformationToRequest,
  sessionsController.refresh
);

sessionsRouter.delete('/logout', sessionsController.logout)

export default sessionsRouter