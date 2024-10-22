import { NextFunction, Request, Response } from 'express'

import { CreateRuralProducerUseCase } from '../useCases/ruralProducer/CreateRuralProducerUseCase'
import { UpdateRuralProducerUseCase } from '../useCases/ruralProducer/UpdateRuralProducerUseCase'
import { DeleteRuralProducerUseCase } from '../useCases/ruralProducer/DeleteRuralProducerUseCase'
import { FilterRuralProducersUseCase } from '../useCases/ruralProducer/FilterRuralProducersUseCase'
import { FindByIdRuralProducerUseCase } from '../useCases/ruralProducer/FindByIdRuralProducerUseCase'

export class RuralProducerController {
  constructor(
    private createRuralProducerUseCase: CreateRuralProducerUseCase,
    private findByIdRuralProducerUseCase: FindByIdRuralProducerUseCase,
    private updateRuralProducerUseCase: UpdateRuralProducerUseCase,
    private deleteRuralProducerUseCase: DeleteRuralProducerUseCase,
    private filterRuralProducersUseCase: FilterRuralProducersUseCase,
  ) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const producer = await this.createRuralProducerUseCase.execute(req.body)
      return res.status(201).json(producer)
    } catch (error) {
      next(error)
    }
  }

  async read(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const producer = await this.findByIdRuralProducerUseCase.execute(
        req.params.id,
      )
      return res.json(producer)
    } catch (error) {
      next(error)
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const producer = await this.updateRuralProducerUseCase.execute(
        req.params.id,
        req.body,
      )
      return res.json(producer)
    } catch (error) {
      next(error)
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      await this.deleteRuralProducerUseCase.execute(req.params.id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  async filter(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { page = 1, size = 10, ...filterCriteria } = req.query
      const producers = await this.filterRuralProducersUseCase.execute(
        filterCriteria,
        Number(page),
        Number(size),
      )
      return res.json(producers)
    } catch (error) {
      next(error)
    }
  }
}
