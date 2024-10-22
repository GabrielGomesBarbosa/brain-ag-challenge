import { NextFunction, Request, Response } from 'express'

import { CreateCropUseCase } from '../useCases/crop/CreateCropUseCase'
import { UpdateCropUseCase } from '../useCases/crop/UpdateCropUseCase'
import { DeleteCropUseCase } from '../useCases/crop/DeleteCropUseCase'
import { FilterCropsUseCase } from '../useCases/crop/FilterCropsUseCase'
import { FindByIdCropUseCase } from '../useCases/crop/FindByIdCropUseCase'

export class CropController {
  constructor(
    private createCropUseCase: CreateCropUseCase,
    private findByIdCropUseCase: FindByIdCropUseCase,
    private updateCropUseCase: UpdateCropUseCase,
    private deleteCropUseCase: DeleteCropUseCase,
    private filterCropsUseCase: FilterCropsUseCase,
  ) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const crop = await this.createCropUseCase.execute(req.body)
      return res.status(201).json(crop)
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
      const crop = await this.findByIdCropUseCase.execute(req.params.id)
      return res.json(crop)
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
      const crop = await this.updateCropUseCase.execute(req.params.id, req.body)
      return res.json(crop)
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
      await this.deleteCropUseCase.execute(req.params.id)
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

      const crops = await this.filterCropsUseCase.execute(
        filterCriteria,
        Number(page),
        Number(size),
      )
      return res.json(crops)
    } catch (error) {
      next(error)
    }
  }
}
