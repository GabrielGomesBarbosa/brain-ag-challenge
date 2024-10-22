import { CreateCropUseCase } from './CreateCropUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

const mockCropRepository: jest.Mocked<ICropRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  filter: jest.fn(),
}

describe('CreateCropUseCase', () => {
  let createCropUseCase: CreateCropUseCase

  beforeEach(() => {
    createCropUseCase = new CreateCropUseCase(mockCropRepository)
  })

  it('should create a crop successfully', async () => {
    const data = { name: 'Wheat' }
    const crop = {
      id: '1',
      name: 'Wheat',
      slug: 'wheat',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockCropRepository.create.mockResolvedValue(crop)

    const result = await createCropUseCase.execute(data)

    expect(mockCropRepository.create).toHaveBeenCalledWith({
      name: 'Wheat',
      slug: 'wheat',
    })
    expect(result).toEqual(crop)
  })
})
