import prisma from '../services/prisma'

import { ICityRepository } from './ICityRepository'

const allowedFields = [
  'id',
  'name',
  'stateId',
  'ibge',
  'latLong',
  'latitude',
  'longitude',
  'tomCode',
]

export class CityRepository implements ICityRepository {
  async findByName(searchTerm: string, fields?: string[]) {
    const invalidFields = fields?.filter(
      (field) => !allowedFields.includes(field),
    )

    if (invalidFields && invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`)
    }

    return prisma.city.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      select:
        fields?.reduce((acc, field) => ({ ...acc, [field]: true }), {}) ||
        undefined,
      orderBy: {
        name: 'asc',
      },
    })
  }
}
