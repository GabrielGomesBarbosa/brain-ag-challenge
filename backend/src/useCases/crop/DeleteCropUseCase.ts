import { Crop } from '@prisma/client';

import { ICropRepository } from '../../repositories/crop/ICropRepository';

export class DeleteCropUseCase {
  private cropRepository: ICropRepository;

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository;
  }

  async execute(id: string): Promise<Crop> {
    if (!id) {
      throw new Error('Crop ID is required.');
    }

    return this.cropRepository.delete(id);
  }
}
