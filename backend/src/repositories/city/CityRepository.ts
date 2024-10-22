import prisma from '../../services/prisma'

import { City } from '../../models/City'
import { State } from '../../models/State'
import { ICityRepository } from './ICityRepository'

export class CityRepository implements ICityRepository {
  async findByName(searchTerm: string): Promise<City[]> {
    const cities = await prisma.city.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      include: {
        state: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return cities.map((city) => {
      const state = new State(
        city.state.id,
        city.state.name,
        city.state.acronym,
        city.state.ibge,
        city.state.ddd,
      )

      return new City(
        city.id,
        city.name,
        city.ibge,
        city.latLong,
        city.latitude,
        city.longitude,
        city.tomCode,
        state,
      )
    })
  }
}
