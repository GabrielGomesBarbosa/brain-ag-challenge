import { Request, Response } from 'express'

import { SearchCityUseCase } from '../useCases/searchCity/SearchCityUseCase'

export class CityController {
  constructor(private readonly searchCityUseCase: SearchCityUseCase) {}

  async searchCity(req: Request, res: Response) {
    const { name, fields } = req.query

    try {
      if (typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid search term' })
      }

      let selectedFields =
        (fields as string)
          ?.split(',')
          .filter((field) => !!field)
          .map((field) => field.trim()) || []

      const cities = await this.searchCityUseCase.execute(name, selectedFields)

      return res.json(cities)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
