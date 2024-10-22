import { Crop } from '../../models/Crop'
import { generateSlug } from '../../utils/generateSlug'
import { updateCropSchema } from '../../validations/CropValidation'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

export class UpdateCropUseCase {
  private cropRepository: ICropRepository

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository
  }

  async execute(id: string, data: { name?: string }): Promise<Crop> {
    try {
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
