import { SearchCityDTO } from './SearchCityDTO'
import { ICityRepository } from '../../repositories/city/ICityRepository'

export class SearchCityUseCase {
  private cityRepository: ICityRepository

  constructor(cityRepository: ICityRepository) {
    this.cityRepository = cityRepository
  }

  async execute(searchTerm: string) {
    if (searchTerm.length < 3) {
      throw new Error('Search term must be at least 3 characters long.')
    }

    const cities = await this.cityRepository.findByName(searchTerm)

    return cities.map((item) => {
      return new SearchCityDTO(item.id, `${item.name} - ${item.state.acronym}`)
    })
  }
}
