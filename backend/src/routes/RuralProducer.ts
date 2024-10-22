import { Router } from 'express'

import { RuralProducerController } from '../controllers/RuralProducerController'
import { RuralProducerRepository } from '../repositories/ruralProducer/RuralProducerRepository'
import { CreateRuralProducerUseCase } from '../useCases/ruralProducer/CreateRuralProducerUseCase'
import { UpdateRuralProducerUseCase } from '../useCases/ruralProducer/UpdateRuralProducerUseCase'
import { DeleteRuralProducerUseCase } from '../useCases/ruralProducer/DeleteRuralProducerUseCase'
import { FilterRuralProducersUseCase } from '../useCases/ruralProducer/FilterRuralProducersUseCase'
import { FindByIdRuralProducerUseCase } from '../useCases/ruralProducer/FindByIdRuralProducerUseCase'

const ruralProducerRoutes = Router()

const ruralProducerRepository = new RuralProducerRepository()
const createRuralProducerUseCase = new CreateRuralProducerUseCase(
  ruralProducerRepository,
)
const findByIdRuralProducerUseCase = new FindByIdRuralProducerUseCase(
  ruralProducerRepository,
)
const updateRuralProducerUseCase = new UpdateRuralProducerUseCase(
  ruralProducerRepository,
)
const deleteRuralProducerUseCase = new DeleteRuralProducerUseCase(
  ruralProducerRepository,
)
const filterRuralProducersUseCase = new FilterRuralProducersUseCase(
  ruralProducerRepository,
)

const ruralProducerController = new RuralProducerController(
  createRuralProducerUseCase,
  findByIdRuralProducerUseCase,
  updateRuralProducerUseCase,
  deleteRuralProducerUseCase,
  filterRuralProducersUseCase,
)

ruralProducerRoutes.post('/', (req, res, next) => {
  ruralProducerController.create(req, res, next)
})
ruralProducerRoutes.get('/:id', (req, res, next) => {
  ruralProducerController.read(req, res, next)
})
ruralProducerRoutes.put('/:id', (req, res, next) => {
  ruralProducerController.update(req, res, next)
})
ruralProducerRoutes.delete('/:id', (req, res, next) => {
  ruralProducerController.delete(req, res, next)
})

ruralProducerRoutes.post('/filter', (req, res, next) => {
  ruralProducerController.filter(req, res, next)
})

export { ruralProducerRoutes }
