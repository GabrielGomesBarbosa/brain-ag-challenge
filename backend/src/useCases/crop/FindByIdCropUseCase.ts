import { Crop } from '@prisma/client';

import { ICropRepository } from '../../repositories/crop/ICropRepository';

export class FindByIdCropUseCase {
  private cropRepository: ICropRepository;

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository;
  }

  async execute(id: string): Promise<Crop | null> {
    if (!id) {
      throw new Error('Crop ID is required.');
    }

    return this.cropRepository.findById(id);
  }
}
