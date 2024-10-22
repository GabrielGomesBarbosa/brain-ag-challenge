/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

class ApiError extends Error {
  public statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation failed',
      details: err.errors,
    })
    return
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({
        error: 'Record already exists.',
      })
      return
    }

    if (err.code === 'P2025') {
      res.status(404).json({
        error: err.meta?.cause || 'Record not found',
      })
      return
    }
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.message,
    })
    return
  }

  res.status(500).json({
    error: err.message ?? 'An unexpected error occurred.',
  })
  return
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Record not found') {
    super(message, 404)
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = 'Validation failed') {
    super(message, 400)
  }
}
