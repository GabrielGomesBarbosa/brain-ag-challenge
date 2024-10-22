import { UpdateCropUseCase } from './UpdateCropUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

const mockCropRepository: jest.Mocked<ICropRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  filter: jest.fn(),
}

describe('UpdateCropUseCase', () => {
  let updateCropUseCase: UpdateCropUseCase

  beforeEach(() => {
    updateCropUseCase = new UpdateCropUseCase(mockCropRepository)
  })

  it('should update a crop successfully', async () => {
    const crop = {
      id: '1',
      name: 'Wheat',
      slug: 'wheat',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockCropRepository.update.mockResolvedValue(crop)

    const result = await updateCropUseCase.execute('1', { name: 'Wheat' })

    expect(mockCropRepository.update).toHaveBeenCalledWith('1', {
      name: 'Wheat',
      slug: 'wheat',
    })
    expect(result).toEqual(crop)
  })
})
