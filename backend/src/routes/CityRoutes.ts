import { Router, Request } from 'express'

import {
  CityController,
  SearchCityQueryParams,
} from '../controllers/CityController'
import { CityRepository } from '../repositories/city/CityRepository'
import { SearchCityUseCase } from '../useCases/searchCity/SearchCityUseCase'

const cityRoutes = Router()

const cityRepository = new CityRepository()
const searchCityUseCase = new SearchCityUseCase(cityRepository)

const cityController = new CityController(searchCityUseCase)

cityRoutes.get(
  '/cities/search',
  (req: Request<{}, {}, {}, SearchCityQueryParams>, res) => {
    cityController.searchCity(req, res)
  },
)

export { cityRoutes }
