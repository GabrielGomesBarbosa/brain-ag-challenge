import { Router } from 'express'

import { cityRoutes } from './CityRoutes'
import { cropRoutes } from './CropRoutes'
import { ruralProducerRoutes } from './RuralProducer'

const routes = Router()

routes.use('/cities', cityRoutes)
routes.use('/crops', cropRoutes)
routes.use('/ruralProducers', ruralProducerRoutes)

export { routes }
