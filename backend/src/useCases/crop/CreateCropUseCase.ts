import { Crop } from '@prisma/client';

import { generateSlug } from '../../utils/generateSlug';
import { ICropRepository } from '../../repositories/crop/ICropRepository';

export class CreateCropUseCase {
  private cropRepository: ICropRepository;

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository;
  }

  async execute(name: string): Promise<Crop> {
    if (!name || name.trim() === '') {
      throw new Error('Crop name is required.');
    }

    return this.cropRepository.create({
      name,
      slug: generateSlug(name)
    });
  }
}
