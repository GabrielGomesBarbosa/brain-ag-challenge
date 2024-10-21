import { Prisma, Crop } from '@prisma/client'

import { generateSlug } from '../../utils/generateSlug'
import { createCropSchema } from '../../validations/CropValidation' // Updated validation schema
import { ICropRepository } from '../../repositories/crop/ICropRepository'

export class CreateCropUseCase {
  private cropRepository: ICropRepository

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository
  }

  async execute(data: Prisma.CropCreateInput): Promise<Crop> {
    try {
      const validatedData = createCropSchema.parse(data)
      const slug = generateSlug(validatedData.name)

      return await this.cropRepository.create({
        name: validatedData.name,
        slug,
      })
    } catch (error) {
      throw error
    }
  }
}
