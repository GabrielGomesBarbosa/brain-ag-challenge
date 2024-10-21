import { SearchCityUseCase } from './SearchCityUseCase'
import { ICityRepository } from '../../repositories/city/ICityRepository'

describe('SearchCityUseCase', () => {
  let searchCityUseCase: SearchCityUseCase;
  let mockCityRepository: jest.Mocked<ICityRepository>;

  beforeEach(() => {
    mockCityRepository = {
      findByName: jest.fn(),
    }

    searchCityUseCase = new SearchCityUseCase(mockCityRepository)
  })

  it('should throw an error if the search term is less than 3 characters', async () => {
    await expect(searchCityUseCase.execute('Af', 'id, name')).rejects.toThrow(
      'Search term must be at least 3 characters long.',
    )

    expect(mockCityRepository.findByName).not.toHaveBeenCalled()
  })

  it('should call the repository with the correct search term and no fields', async () => {
    mockCityRepository.findByName.mockResolvedValue([])

    await searchCityUseCase.execute('Afonso', undefined)

    expect(mockCityRepository.findByName).toHaveBeenCalledWith(
      'Afonso',
      undefined
    )
  })

  it('should call the repository with the correct search term and fields', async () => {
    mockCityRepository.findByName.mockResolvedValue([
      { name: 'Afonso Cláudio', ibge: '3200102' },
    ])

    const fields = 'name, ibge'
    const result = await searchCityUseCase.execute('Afonso', fields)

    expect(mockCityRepository.findByName).toHaveBeenCalledWith('Afonso', 
      { name: true, ibge: true }
    )

    expect(result).toEqual([{ name: 'Afonso Cláudio', ibge: '3200102' }])
  })

  it('should return the correct result when repository resolves with cities', async () => {
    const mockCities = [
      { name: 'Afonso Cláudio', ibge: '3200102' },
      { name: 'Água Doce do Norte', ibge: '3200169' },
    ]
    mockCityRepository.findByName.mockResolvedValue(mockCities)

    const result = await searchCityUseCase.execute('Afonso', 'name, ibge')

    expect(mockCityRepository.findByName).toHaveBeenCalledWith('Afonso', { name: true, ibge: true })

    expect(result).toEqual(mockCities)
  })
})
