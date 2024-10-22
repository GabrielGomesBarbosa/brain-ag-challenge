import { RuralProducer } from '../../models/RuralProducer'
import { createRuralProducerSchema } from '../../validations/RuralProducerValidation'
import { IRuralProducerRepository } from '../../repositories/ruralProducer/IRuralProducerRepository'

export class UpdateRuralProducerUseCase {
  private ruralProducerRepository: IRuralProducerRepository

  constructor(ruralProducerRepository: IRuralProducerRepository) {
    this.ruralProducerRepository = ruralProducerRepository
  }

  async execute(
    id: string,
    data: {
      name?: string
      cpfCnpj?: string
      farmName?: string
      totalArea?: number
      agriculturalArea?: number
      vegetationArea?: number
    },
  ): Promise<RuralProducer> {
    // Validate the input data
    const validatedData = createRuralProducerSchema.parse(data)

    // Ensure agricultural and vegetation areas don't exceed total area
    if (
      validatedData.agriculturalArea + validatedData.vegetationArea >
      validatedData.totalArea
    ) {
      throw new Error(
        'The sum of agricultural and vegetation areas cannot exceed the total area of the farm.',
      )
    }

    // Call the repository to update the rural producer
    return this.ruralProducerRepository.update(id, validatedData)
  }
}
