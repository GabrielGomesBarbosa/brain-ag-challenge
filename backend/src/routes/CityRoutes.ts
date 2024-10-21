import { Router } from 'express'

import { CityController } from '../controllers/CityController'
import { CityRepository } from '../repositories/CityRepository'
import { SearchCityUseCase } from '../useCases/searchCity/SearchCityUseCase'

const cityRoutes = Router()

const cityRepository = new CityRepository()
const searchCityUseCase = new SearchCityUseCase(cityRepository)

const cityController = new CityController(searchCityUseCase)

cityRoutes.get('/cities/search', (req, res) => {
  cityController.searchCity(req, res)
})

export { cityRoutes }
