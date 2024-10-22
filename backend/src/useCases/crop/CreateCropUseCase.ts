import { Crop } from '../../models/Crop'
import { generateSlug } from '../../utils/generateSlug'
import { createCropSchema } from '../../validations/CropValidation'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

export class CreateCropUseCase {
  private cropRepository: ICropRepository

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository
  }

  async execute(data: { name: string }): Promise<Crop> {
    const validatedData = createCropSchema.parse(data)

    const slug = generateSlug(validatedData.name)

    return await this.cropRepository.create({
      name: validatedData.name,
      slug,
    })
  }
}
