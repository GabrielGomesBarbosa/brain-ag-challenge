import { City } from '@prisma/client'

export interface ICityRepository {
  findByName(
    searchTerm: string,
    fields?: Record<string, boolean>,
  ): Promise<Partial<City>[]>
}
