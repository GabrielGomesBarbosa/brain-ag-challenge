import { FindByIdCropUseCase } from './FindByIdCropUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

const mockCropRepository: jest.Mocked<ICropRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  filter: jest.fn(),
}

describe('FindByIdCropUseCase', () => {
  let findByIdCropUseCase: FindByIdCropUseCase

  beforeEach(() => {
    findByIdCropUseCase = new FindByIdCropUseCase(mockCropRepository)
  })

  it('should find crop by ID', async () => {
    const crop = {
      id: '1',
      name: 'Wheat',
      slug: 'wheat',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockCropRepository.findById.mockResolvedValue(crop)

    const result = await findByIdCropUseCase.execute('1')

    expect(mockCropRepository.findById).toHaveBeenCalledWith('1')
    expect(result).toEqual(crop)
  })
})
