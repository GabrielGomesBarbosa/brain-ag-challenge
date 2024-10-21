import { ICityRepository } from '../../repositories/ICityRepository'

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

export class SearchCityUseCase {
  private cityRepository: ICityRepository

  constructor(cityRepository: ICityRepository) {
    this.cityRepository = cityRepository
  }

  async execute(searchTerm: string, fields?: string) {
    if (searchTerm.length < 3) {
      throw new Error('Search term must be at least 3 characters long.')
    }

    let selectedFields = fields
      ?.split(',')
      .filter((field) => !!field)
      .map((field) => field.trim()) || []

    const invalidFields = selectedFields?.filter(
      (field) => !allowedFields.includes(field),
    )

    if (invalidFields && invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`)
    }

    const select =
      selectedFields.length > 0
        ? selectedFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
        : undefined

    return this.cityRepository.findByName(searchTerm, select)
  }
}
