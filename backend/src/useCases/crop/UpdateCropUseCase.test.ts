import { v4 } from 'uuid'
import { ZodError } from 'zod'

import { UpdateCropUseCase } from './UpdateCropUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

describe('UpdateCropUseCase', () => {
  let updateCropUseCase: UpdateCropUseCase
  let mockCropRepository: jest.Mocked<ICropRepository>

  beforeEach(() => {
    mockCropRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      filter: jest.fn(),
    }
    updateCropUseCase = new UpdateCropUseCase(mockCropRepository)
  })

  it('should update the crop successfully', async () => {
    const cropId = v4()
    const input = { name: 'Updated Wheat' }

    mockCropRepository.findById.mockResolvedValue({
      id: cropId,
      name: 'Wheat',
      slug: 'wheat',
      createdAt: new Date('2024-10-21'),
      updatedAt: new Date('2024-10-21'),
      ruralProducerId: null,
    })

    mockCropRepository.update.mockResolvedValue({
      id: cropId,
      name: input.name,
      slug: 'wheat',
      createdAt: new Date('2024-10-21'),
      updatedAt: new Date('2024-10-21'),
      ruralProducerId: null,
    })

    const result = await updateCropUseCase.execute(cropId, input)

    expect(result).toEqual({
      id: cropId,
      name: 'Updated Wheat',
      slug: 'wheat',
      createdAt: new Date('2024-10-21'),
      updatedAt: new Date('2024-10-21'),
      ruralProducerId: null,
    })

    expect(mockCropRepository.findById).toHaveBeenCalledTimes(1)
    expect(mockCropRepository.findById).toHaveBeenCalledWith(cropId)
    expect(mockCropRepository.update).toHaveBeenCalledWith(cropId, {
      ...input,
      slug: 'updated-wheat',
    })
  })

  it('should throw an error if crop is not found', async () => {
    const cropId = 'non-existent-crop-id'
    const input = { name: 'Updated Wheat' }

    mockCropRepository.findById.mockResolvedValue(null)

    await expect(updateCropUseCase.execute(cropId, input)).rejects.toThrow(
      'Record not found',
    )
    expect(mockCropRepository.findById).toHaveBeenCalledWith(cropId)
    expect(mockCropRepository.update).not.toHaveBeenCalled()
  })

  it('should throw validation error when input is invalid', async () => {
    const cropId = v4()
    const invalidInput = { name: '' }

    mockCropRepository.findById.mockResolvedValue({
      id: cropId,
      name: 'Wheat',
      slug: 'wheat',
      createdAt: new Date('2024-10-21'),
      updatedAt: new Date('2024-10-21'),
      ruralProducerId: null,
    })

    await expect(
      updateCropUseCase.execute(cropId, invalidInput),
    ).rejects.toThrow(ZodError)

    expect(mockCropRepository.findById).toHaveBeenCalledWith(cropId)
    expect(mockCropRepository.update).not.toHaveBeenCalled()
  })
})
