import { Prisma, Crop } from '@prisma/client'

import { generateSlug } from '../../utils/generateSlug'
import { updateCropSchema } from '../../validations/CropValidation'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

export class UpdateCropUseCase {
  private cropRepository: ICropRepository

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository
  }

  async execute(id: string, data: Prisma.CropUpdateInput): Promise<Crop> {
    try {
      const existingCrop = await this.cropRepository.findById(id)

      if (!existingCrop) {
        throw new Error('Record not found')
      }

      const validatedData = updateCropSchema.parse(data)

      const slug = generateSlug(validatedData.name)

      return await this.cropRepository.update(id, {
        ...validatedData,
        slug,
      })
    } catch (error) {
      throw error
    }
  }
}
