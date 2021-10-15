import { Router } from 'express'

import { UsersController } from '../../controllers/UsersController'

import { checkAuthMiddleware } from '../middlewares/checkAuthMiddleware'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/me', checkAuthMiddleware, usersController.show);

export default usersRouter