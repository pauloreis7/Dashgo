import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { SessionsController } from '../../controllers/SessionsController'

import { addUserInformationToRequest } from '../middlewares/addUserInformationToRequest'

const sessionsRouter = Router()
const sessionsController = new SessionsController()

sessionsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    },
  }),
  sessionsController.create
)

sessionsRouter.post(
  '/refresh', 
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().uuid().required(),
    },
  }),
  addUserInformationToRequest,
  sessionsController.refresh
)

sessionsRouter.delete(
  '/logout',
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().uuid().required(),
    },
  }),
  sessionsController.logout
 )

export default sessionsRouter