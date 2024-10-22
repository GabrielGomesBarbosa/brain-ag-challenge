import { Crop } from '../../models/Crop'
import { IPagination } from '../../interfaces/IPagination'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

export class FilterCropsUseCase {
  private cropRepository: ICropRepository

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository
  }

  async execute(
    filterCriteria: { name?: string; slug?: string },
    page: number = 1,
    size: number = 10,
  ): Promise<IPagination<Crop>> {
    return this.cropRepository.filter(filterCriteria, page, size)
  }
}
