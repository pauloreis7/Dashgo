import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { UsersController } from '../../controllers/UsersController'

import { checkAuthMiddleware } from '../middlewares/checkAuthMiddleware'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/me', checkAuthMiddleware, usersController.show);
usersRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    },
  }),
  usersController.create
);

export default usersRouter