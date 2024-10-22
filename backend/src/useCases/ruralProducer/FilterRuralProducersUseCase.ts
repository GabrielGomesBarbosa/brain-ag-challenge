import { RuralProducer } from '../../models/RuralProducer'
import { IRuralProducerRepository } from '../../repositories/ruralProducer/IRuralProducerRepository'
import { IPagination } from '../../interfaces/IPagination'

export class FilterRuralProducersUseCase {
  private ruralProducerRepository: IRuralProducerRepository

  constructor(ruralProducerRepository: IRuralProducerRepository) {
    this.ruralProducerRepository = ruralProducerRepository
  }

  async execute(
    filterCriteria: { name?: string; cpfCnpj?: string },
    page: number = 1,
    size: number = 10,
  ): Promise<IPagination<RuralProducer>> {
    return this.ruralProducerRepository.filter(filterCriteria, page, size)
  }
}
