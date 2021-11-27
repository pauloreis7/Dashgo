import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { UsersController } from '../../controllers/UsersController'

import { checkAuthMiddleware } from '../middlewares/checkAuthMiddleware'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/me', checkAuthMiddleware, usersController.show)

usersRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().required().valid(Joi.ref('password'))
      }),
    },
  }),
  usersController.create
)

usersRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().allow(''),
      password: Joi.when('old_password', {
        is: Joi.string().min(1),
        then: Joi.string().min(6)
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().required().valid(Joi.ref('password'))
      }),
    },
  }),
  checkAuthMiddleware,
  usersController.update
)

export default usersRouter