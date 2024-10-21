import { Crop } from '@prisma/client'

import { FindByIdCropUseCase } from './FindByIdCropUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

describe('FindByIdCropUseCase', () => {
  let findByIdCropUseCase: FindByIdCropUseCase
  let mockCropRepository: jest.Mocked<ICropRepository>

  beforeEach(() => {
    mockCropRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      filter: jest.fn(),
    }

    findByIdCropUseCase = new FindByIdCropUseCase(mockCropRepository)
  })

  it('should find a crop by ID successfully', async () => {
    const cropId = 'crop-id-1'
    const cropData: Crop = {
      id: cropId,
      name: 'Wheat',
      slug: 'wheat',
      createdAt: new Date('2024-10-21'),
      updatedAt: new Date('2024-10-21'),
      ruralProducerId: null,
    }

    mockCropRepository.findById.mockResolvedValue(cropData)

    const result = await findByIdCropUseCase.execute(cropId)

    expect(result).toEqual(cropData)
    expect(mockCropRepository.findById).toHaveBeenCalledWith(cropId)
  })

  it('should return null when crop is not found', async () => {
    const cropId = 'non-existent-crop-id'

    mockCropRepository.findById.mockResolvedValue(null)

    const result = await findByIdCropUseCase.execute(cropId)

    expect(result).toBeNull()
    expect(mockCropRepository.findById).toHaveBeenCalledWith(cropId)
  })

  it('should throw an error when crop ID is not provided', async () => {
    await expect(findByIdCropUseCase.execute('')).rejects.toThrow(
      'Crop ID is required.',
    )
    expect(mockCropRepository.findById).not.toHaveBeenCalled()
  })
})
