import { Crop, Prisma } from '@prisma/client'

import { FilterCropsUseCase } from './FilterCropsUseCase'
import { IPagination } from '../../interfaces/IPagination'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

describe('FilterCropsUseCase', () => {
  let filterCropsUseCase: FilterCropsUseCase
  let mockCropRepository: jest.Mocked<ICropRepository>

  beforeEach(() => {
    mockCropRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      filter: jest.fn(),
    }

    filterCropsUseCase = new FilterCropsUseCase(mockCropRepository)
  })

  it('should filter crops successfully based on filter criteria', async () => {
    const filterCriteria: Prisma.CropWhereInput = { name: 'Wheat' }
    const crops: Crop[] = [
      {
        id: 'crop-id-1',
        name: 'Wheat',
        slug: 'wheat',
        createdAt: new Date('2024-10-21'),
        updatedAt: new Date('2024-10-21'),
      },
    ]

    const paginationResult: IPagination<Crop> = {
      data: crops,
      currentPage: 1,
      totalPages: 1,
      hasMore: false,
    }

    mockCropRepository.filter.mockResolvedValue(paginationResult)

    const result = await filterCropsUseCase.execute(filterCriteria, 0, 10)

    expect(result).toEqual(paginationResult)
    expect(mockCropRepository.filter).toHaveBeenCalledWith(
      filterCriteria,
      0,
      10,
    )
  })

  it('should handle pagination with skip and take values', async () => {
    const filterCriteria: Prisma.CropWhereInput = {}
    const crops: Crop[] = [
      {
        id: 'crop-id-1',
        name: 'Wheat',
        slug: 'wheat',
        createdAt: new Date('2024-10-21'),
        updatedAt: new Date('2024-10-21'),
      },
      {
        id: 'crop-id-2',
        name: 'Corn',
        slug: 'corn',
        createdAt: new Date('2024-10-21'),
        updatedAt: new Date('2024-10-21'),
      },
    ]

    const paginationResult: IPagination<Crop> = {
      data: crops,
      currentPage: 1,
      totalPages: 1,
      hasMore: false,
    }

    mockCropRepository.filter.mockResolvedValue(paginationResult)

    const result = await filterCropsUseCase.execute(filterCriteria, 10, 20)

    expect(result).toEqual(paginationResult)
    expect(mockCropRepository.filter).toHaveBeenCalledWith(
      filterCriteria,
      10,
      20,
    )
  })
})
