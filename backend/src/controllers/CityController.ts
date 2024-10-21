import { Request, Response } from 'express'

import { SearchCityUseCase } from '../useCases/searchCity/SearchCityUseCase'

export interface SearchCityQueryParams {
  name: string
  fields?: string
}

export class CityController {
  constructor(private readonly searchCityUseCase: SearchCityUseCase) {}

  async searchCity(
    req: Request<{}, {}, {}, SearchCityQueryParams>,
    res: Response,
  ) {
    const { name, fields } = req.query

    try {
      if (typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid search term' })
      }

      const cities = await this.searchCityUseCase.execute(name, fields)

      return res.json(cities)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
