import { RuralProducer } from '../../models/RuralProducer'
import { createRuralProducerSchema } from '../../validations/RuralProducerValidation'
import { IRuralProducerRepository } from '../../repositories/ruralProducer/IRuralProducerRepository'

export class CreateRuralProducerUseCase {
  private ruralProducerRepository: IRuralProducerRepository

  constructor(ruralProducerRepository: IRuralProducerRepository) {
    this.ruralProducerRepository = ruralProducerRepository
  }

  async execute(data: {
    name: string
    cpfCnpj: string
    farmName: string
    totalArea: number
    agriculturalArea: number
    vegetationArea: number
    cityId: string
    crops?: string[]
  }): Promise<RuralProducer> {
    const {
      name,
      agriculturalArea,
      cpfCnpj,
      crops,
      farmName,
      totalArea,
      vegetationArea,
      cityId,
    } = createRuralProducerSchema.parse(data)

    if (agriculturalArea + vegetationArea > totalArea) {
      throw new Error(
        'The sum of agricultural and vegetation areas cannot exceed the total area of the farm.',
      )
    }

    return this.ruralProducerRepository.create({
      cpfCnpj,
      name,
      farmName,
      agriculturalArea,
      totalArea,
      vegetationArea,
      crops,
      cityId,
    })
  }
}
