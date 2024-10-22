import { v4 } from 'uuid'

import { SearchCityDTO } from './SearchCityDTO'
import { SearchCityUseCase } from './SearchCityUseCase'
import { ICityRepository } from '../../repositories/city/ICityRepository'

describe('SearchCityUseCase', () => {
  let searchCityUseCase: SearchCityUseCase
  let mockCityRepository: jest.Mocked<ICityRepository>

  beforeEach(() => {
    mockCityRepository = {
      findByName: jest.fn(),
    }

    searchCityUseCase = new SearchCityUseCase(mockCityRepository)
  })

  it('should throw an error if the search term is less than 3 characters', async () => {
    await expect(searchCityUseCase.execute('Af')).rejects.toThrow(
      'Search term must be at least 3 characters long.',
    )

    expect(mockCityRepository.findByName).not.toHaveBeenCalled()
  })

  it('should call the repository with the correct search term', async () => {
    const cityId = v4()

    mockCityRepository.findByName.mockResolvedValue([
      {
        id: cityId,
        name: 'Afonso Cláudio',
        ibge: '3200102',
        latLong: '123,456',
        latitude: 12.3456,
        longitude: 65.4321,
        tomCode: 123,
        state: {
          id: 'state-uuid',
          name: 'Espírito Santo',
          acronym: 'ES',
          ibge: '3200000',
          ddd: '27',
        },
      },
    ])

    const result = await searchCityUseCase.execute('Afonso')

    expect(result[0].id).toEqual(cityId)
    expect(result[0].name).toEqual('Afonso Cláudio - ES')
  })

  it('should return the correct result when repository resolves with cities', async () => {
    const mockCities = [
      {
        id: 'city-uuid-1',
        name: 'Afonso Cláudio',
        ibge: '3200102',
        latLong: '123,456',
        latitude: 12.3456,
        longitude: 65.4321,
        tomCode: 123,
        state: {
          id: 'state-uuid-1',
          name: 'Espírito Santo',
          acronym: 'ES',
          ibge: '3200000',
          ddd: '27',
        },
      },
      {
        id: 'city-uuid-2',
        name: 'Água Doce do Norte',
        ibge: '3200169',
        latLong: '123,456',
        latitude: 12.3456,
        longitude: 65.4321,
        tomCode: 123,
        state: {
          id: 'state-uuid-2',
          name: 'Espírito Santo',
          acronym: 'ES',
          ibge: '3200000',
          ddd: '27',
        },
      },
    ]

    // Mock the repository to resolve with the mock cities
    mockCityRepository.findByName.mockResolvedValue(mockCities)

    // Execute the use case
    const result = await searchCityUseCase.execute('Afonso')

    // Ensure the repository is called with the correct parameters
    expect(mockCityRepository.findByName).toHaveBeenCalledWith('Afonso')

    // Expected result based on SearchCityDTO mapping
    expect(result).toEqual([
      new SearchCityDTO('city-uuid-1', 'Afonso Cláudio - ES'),
      new SearchCityDTO('city-uuid-2', 'Água Doce do Norte - ES'),
    ])
  })
})
