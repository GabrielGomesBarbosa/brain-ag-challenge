import { ICropRepository } from '../../repositories/crop/ICropRepository'

export class DeleteCropUseCase {
  private cropRepository: ICropRepository

  constructor(cropRepository: ICropRepository) {
    this.cropRepository = cropRepository
  }

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Crop ID is required.')
    }

    await this.cropRepository.delete(id)
  }
}
