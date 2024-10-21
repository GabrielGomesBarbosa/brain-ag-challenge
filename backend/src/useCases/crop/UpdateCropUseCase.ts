import { Crop } from '@prisma/client';

import { generateSlug } from '../../utils/generateSlug';
import { ICropRepository } from '../../repositories/crop/ICropRepository';

export class UpdateCropUseCase {
  private cropRepository: ICropRepository;

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository;
  }

  async execute(id: string, name: string): Promise<Crop> {
    if (!id) {
      throw new Error('Crop ID is required.');
    }

    if (!name || name.trim() === '') {
      throw new Error('Crop name is required.');
    }

    return this.cropRepository.update(id, {
      name,
      slug: generateSlug(name)
    });
  }
}
