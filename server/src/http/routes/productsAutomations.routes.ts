import { Router } from 'express'
import { Joi, Segments, celebrate } from 'celebrate'

import { checkAuthMiddleware } from '../middlewares/checkAuthMiddleware'

import { 
  ProductsAutomationsController
} from '../../controllers/ProductsAutomationsController'

const productsAutomationsRouter = Router()

const productsAutomationsController = new ProductsAutomationsController()

productsAutomationsRouter.use(checkAuthMiddleware)

productsAutomationsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string(),
      per_page: Joi.string(),
    }
  }),
  productsAutomationsController.index
)

productsAutomationsRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().max(50).required(),
    },
  }),
  productsAutomationsController.create
)

productsAutomationsRouter.delete(
  '/delete',
  celebrate({
    [Segments.QUERY]: {
      productAutomationId: Joi.string().uuid().required(),
    }
  }),
  productsAutomationsController.delete
)

export default productsAutomationsRouter