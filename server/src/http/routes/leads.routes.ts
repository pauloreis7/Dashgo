import { Router } from 'express'
import { Joi, Segments, celebrate } from 'celebrate'

import { checkAuthMiddleware } from '../middlewares/checkAuthMiddleware'

import { LeadsController } from '../../controllers/LeadsController'

const leadsRouter = Router()

const leadsController = new LeadsController()

leadsRouter.use(checkAuthMiddleware)

leadsRouter.get('/', leadsController.index)

leadsRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  leadsController.create
)

leadsRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.QUERY]: {
      leadId: Joi.string().uuid().required(),
    }
  }),
  leadsController.update
)

export default leadsRouter