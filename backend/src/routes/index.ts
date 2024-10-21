import { Router } from 'express'

import { cityRoutes } from './CityRoutes'
import { cropRoutes } from './CropRoutes'

const routes = Router()

routes.use('/cities', cityRoutes)
routes.use('/crops', cropRoutes)

export { routes }
