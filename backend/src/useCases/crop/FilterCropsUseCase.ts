import { Crop, Prisma } from '@prisma/client';

import { ICropRepository } from '../../repositories/crop/ICropRepository';

export class FilterCropsUseCase {
  private cropRepository: ICropRepository;

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository;
  }

  async execute(
    filterCriteria: Prisma.CropWhereInput,
    skip?: number,
    take?: number
  ): Promise<Crop[]> {
    return this.cropRepository.filter(filterCriteria, skip, take);
  }
}
