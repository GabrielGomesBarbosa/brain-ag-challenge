import { NextFunction, Request, Response } from 'express'

import { SearchCityUseCase } from '../useCases/searchCity/SearchCityUseCase'
import { cityFilterSchema } from '../validations/CityFilterValidation'

export class CityController {
  constructor(private readonly searchCityUseCase: SearchCityUseCase) {}

  async searchCity(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = cityFilterSchema.parse(req.query)

      const cities = await this.searchCityUseCase.execute(name)

      return res.json(cities)
    } catch (error) {
      next(error)
    }
  }
}
