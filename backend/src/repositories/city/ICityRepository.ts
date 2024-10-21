import { City } from '../../models/City'

export interface ICityRepository {
  findByName(searchTerm: string): Promise<City[]>
}
