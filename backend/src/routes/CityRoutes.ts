import { Router } from 'express'

import { asyncHandler } from '../utils/asyncHandler'
import { CityController } from '../controllers/CityController'
import { CityRepository } from '../repositories/city/CityRepository'
import { SearchCityUseCase } from '../useCases/searchCity/SearchCityUseCase'

const cityRoutes = Router()

const cityRepository = new CityRepository()
const searchCityUseCase = new SearchCityUseCase(cityRepository)

const cityController = new CityController(searchCityUseCase)

cityRoutes.get(
  '/search',
  asyncHandler(cityController.searchCity.bind(cityController)),
)

export { cityRoutes }
