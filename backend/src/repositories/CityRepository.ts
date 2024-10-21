import prisma from '../services/prisma'

import { ICityRepository } from './ICityRepository'

export class CityRepository implements ICityRepository {
  async findByName(searchTerm: string, select?: Record<string, boolean>) {
    return prisma.city.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      select,
      orderBy: {
        name: 'asc',
      },
    })
  }
}
