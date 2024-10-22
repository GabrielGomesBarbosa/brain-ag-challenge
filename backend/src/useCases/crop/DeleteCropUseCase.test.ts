import { DeleteCropUseCase } from './DeleteCropUseCase'
import { ICropRepository } from '../../repositories/crop/ICropRepository'

const mockCropRepository: jest.Mocked<ICropRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  filter: jest.fn(),
}

describe('DeleteCropUseCase', () => {
  let deleteCropUseCase: DeleteCropUseCase

  beforeEach(() => {
    deleteCropUseCase = new DeleteCropUseCase(mockCropRepository)
  })

  it('should delete a crop successfully', async () => {
    mockCropRepository.delete.mockResolvedValueOnce()

    await deleteCropUseCase.execute('1')

    expect(mockCropRepository.delete).toHaveBeenCalledWith('1')
  })
})
