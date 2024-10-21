import { ICityRepository } from '../../repositories/ICityRepository'

export class SearchCityUseCase {
  private cityRepository: ICityRepository

  constructor(cityRepository: ICityRepository) {
    this.cityRepository = cityRepository
  }

  async execute(searchTerm: string, fields: string[]) {
    if (searchTerm.length < 3) {
      throw new Error('Search term must be at least 3 characters long.')
    }

    return this.cityRepository.findByName(searchTerm, fields)
  }
}
