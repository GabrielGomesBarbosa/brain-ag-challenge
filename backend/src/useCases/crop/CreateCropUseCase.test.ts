import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { generateSlug } from '../../utils/generateSlug'
import { CreateCropUseCase } from './CreateCropUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

describe('CreateCropUseCase', () => {
  let createCropUseCase: CreateCropUseCase
  let mockCropRepository: jest.Mocked<ICropRepository>

  beforeEach(() => {
    mockCropRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      filter: jest.fn(),
    }
    createCropUseCase = new CreateCropUseCase(mockCropRepository)
  })

  it('should create a crop successfully', async () => {
    const input = { name: 'Wheat', slug: 'wheat' }
    const expectedSlug = generateSlug(input.name)

    mockCropRepository.create.mockResolvedValue({
      id: 'crop-id',
      name: input.name,
      slug: expectedSlug,
      createdAt: new Date('2024-10-21'),
      updatedAt: new Date('2024-10-21'),
    })

    const result = await createCropUseCase.execute(input)

    expect(result).toEqual({
      id: 'crop-id',
      name: 'Wheat',
      slug: expectedSlug,
      createdAt: new Date('2024-10-21'),
      updatedAt: new Date('2024-10-21'),
    })
    expect(mockCropRepository.create).toHaveBeenCalledWith({
      name: 'Wheat',
      slug: expectedSlug,
    })
  })

  it('should throw validation error when input is invalid', async () => {
    const invalidInput = { name: '', slug: '' }

    await expect(createCropUseCase.execute(invalidInput)).rejects.toThrow(
      ZodError,
    )
  })

  it('should throw an error when slug already exists', async () => {
    const input = { name: 'Corn', slug: 'corn' }
    const expectedSlug = generateSlug(input.name)

    const prismaError = new Prisma.PrismaClientKnownRequestError(
      'Unique constraint failed',
      {
        code: 'P2002',
        clientVersion: '5.21.1',
      },
    )

    prismaError.meta = { target: ['slug'] }

    mockCropRepository.create.mockRejectedValueOnce(prismaError)

    await expect(createCropUseCase.execute(input)).rejects.toThrow(
      'Unique constraint failed',
    )

    expect(mockCropRepository.create).toHaveBeenCalledWith({
      name: 'Corn',
      slug: expectedSlug,
    })
  })
})
