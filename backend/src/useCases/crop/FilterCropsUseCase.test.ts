import { FilterCropsUseCase } from './FilterCropsUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'
import { IPagination } from '../../interfaces/IPagination'
import { Crop } from '../../models/Crop'

const mockCropRepository: jest.Mocked<ICropRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  filter: jest.fn(),
}

describe('FilterCropsUseCase', () => {
  let filterCropsUseCase: FilterCropsUseCase

  beforeEach(() => {
    filterCropsUseCase = new FilterCropsUseCase(mockCropRepository)
  })

  it('should return paginated crops successfully', async () => {
    const mockPagination: IPagination<Crop> = {
      data: [
        {
          id: '1',
          name: 'Wheat',
          slug: 'wheat',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      totalPages: 1,
      hasMore: false,
      currentPage: 1,
    }

    mockCropRepository.filter.mockResolvedValue(mockPagination)

    const result = await filterCropsUseCase.execute({ name: 'Wheat' }, 1, 10)

    expect(mockCropRepository.filter).toHaveBeenCalledWith(
      { name: 'Wheat' },
      1,
      10,
    )
    expect(result).toEqual(mockPagination)
  })
})
