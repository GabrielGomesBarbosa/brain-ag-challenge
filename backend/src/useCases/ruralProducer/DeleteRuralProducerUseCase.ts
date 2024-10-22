import { IRuralProducerRepository } from '../../repositories/ruralProducer/IRuralProducerRepository'

export class DeleteRuralProducerUseCase {
  private ruralProducerRepository: IRuralProducerRepository

  constructor(ruralProducerRepository: IRuralProducerRepository) {
    this.ruralProducerRepository = ruralProducerRepository
  }

  async execute(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('Rural Producer ID is required.')
    }

    await this.ruralProducerRepository.delete(id)
  }
}
