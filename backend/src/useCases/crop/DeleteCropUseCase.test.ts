import { DeleteCropUseCase } from './DeleteCropUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

describe('DeleteCropUseCase', () => {
  let deleteCropUseCase: DeleteCropUseCase
  let mockCropRepository: jest.Mocked<ICropRepository>

  beforeEach(() => {
    mockCropRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      filter: jest.fn(),
    }

    deleteCropUseCase = new DeleteCropUseCase(mockCropRepository)
  })

  it('should delete a crop by ID successfully', async () => {
    const cropId = 'crop-id-1'

    mockCropRepository.delete.mockResolvedValue()

    await deleteCropUseCase.execute(cropId)

    expect(mockCropRepository.delete).toHaveBeenCalledWith(cropId)
  })

  it('should throw an error when crop ID is not provided', async () => {
    await expect(deleteCropUseCase.execute('')).rejects.toThrow(
      'Crop ID is required.',
    )
    expect(mockCropRepository.delete).not.toHaveBeenCalled()
  })
})
