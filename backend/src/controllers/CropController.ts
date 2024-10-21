import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

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

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const crop = await this.createCropUseCase.execute(req.body)
      return res.status(201).json(crop)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        })
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        return res.status(409).json({
          error: 'A crop with the slug already exists.',
        })
      }

      return res.status(500).json({
        error: 'An unexpected error occurred.',
      })
    }
  }

  async read(req: Request, res: Response): Promise<Response> {
    try {
      const crop = await this.findByIdCropUseCase.execute(req.params.id)
      return res.json(crop)
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const crop = await this.updateCropUseCase.execute(req.params.id, req.body)
      return res.json(crop)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        })
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(409).json({
            error: 'A crop with the slug already exists.',
          })
        }
      }

      if (error.message === 'Record not found') {
        return res.status(404).json({
          error: error.message,
        })
      }

      return res.status(500).json({
        error: 'An unexpected error occurred.',
      })
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteCropUseCase.execute(req.params.id)
      return res.status(204).send()
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return res.status(404).json({
            error: error.meta?.cause,
          })
        }
      }

      return res.status(500).json({ error: error.message })
    }
  }

  async filter(req: Request, res: Response): Promise<Response> {
    try {
      const { page = 1, size = 10, ...filterCriteria } = req.query
      const crops = await this.filterCropsUseCase.execute(
        filterCriteria,
        Number(page),
        Number(size),
      )
      return res.json(crops)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
