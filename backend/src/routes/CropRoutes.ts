import { Router } from 'express'

import { CropController } from '../controllers/CropController'
import { CropRepository } from '../repositories/crop/CropRepository'
import { CreateCropUseCase } from '../useCases/crop/CreateCropUseCase'
import { UpdateCropUseCase } from '../useCases/crop/UpdateCropUseCase'
import { DeleteCropUseCase } from '../useCases/crop/DeleteCropUseCase'
import { FilterCropsUseCase } from '../useCases/crop/FilterCropsUseCase'
import { FindByIdCropUseCase } from '../useCases/crop/FindByIdCropUseCase'

const cropRoutes = Router()

const cropRepository = new CropRepository()
const createCropUseCase = new CreateCropUseCase(cropRepository)
const findByIdCropUseCase = new FindByIdCropUseCase(cropRepository)
const updateCropUseCase = new UpdateCropUseCase(cropRepository)
const deleteCropUseCase = new DeleteCropUseCase(cropRepository)
const filterCropsUseCase = new FilterCropsUseCase(cropRepository)

const cropController = new CropController(
  createCropUseCase,
  findByIdCropUseCase,
  updateCropUseCase,
  deleteCropUseCase,
  filterCropsUseCase,
)

cropRoutes.post('/', (req, res, next) => {
  cropController.create(req, res, next)
})
cropRoutes.get('/:id', (req, res, next) => {
  cropController.read(req, res, next)
})

cropRoutes.put('/:id', (req, res, next) => {
  cropController.update(req, res, next)
})

cropRoutes.delete('/:id', (req, res, next) => {
  cropController.delete(req, res, next)
})

cropRoutes.post('/filter', (req, res, next) => {
  cropController.filter(req, res, next)
})

export { cropRoutes }
