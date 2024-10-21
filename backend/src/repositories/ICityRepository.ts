import { City } from '@prisma/client'

export interface ICityRepository {
  findByName(searchTerm: string, fields?: string[]): Promise<Partial<City>[]>
}
