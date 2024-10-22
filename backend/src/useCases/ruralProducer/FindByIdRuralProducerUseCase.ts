import { RuralProducer } from '../../models/RuralProducer'
import { IRuralProducerRepository } from '../../repositories/ruralProducer/IRuralProducerRepository'

export class FindByIdRuralProducerUseCase {
  private ruralProducerRepository: IRuralProducerRepository

  constructor(ruralProducerRepository: IRuralProducerRepository) {
    this.ruralProducerRepository = ruralProducerRepository
  }

  async execute(id: string): Promise<RuralProducer | null> {
    if (!id || id.trim() === '') {
      throw new Error('Rural Producer ID is required.')
    }

    return this.ruralProducerRepository.findById(id)
  }
}
