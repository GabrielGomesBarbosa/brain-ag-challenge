import { Crop, Prisma } from '@prisma/client'

import { IPagination } from '../../interfaces/IPagination'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

export class FilterCropsUseCase {
  private cropRepository: ICropRepository

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository
  }

  async execute(
    filterCriteria: Prisma.CropWhereInput,
    skip?: number,
    take?: number,
  ): Promise<IPagination<Crop>> {
    return this.cropRepository.filter(filterCriteria, skip, take)
  }
}
