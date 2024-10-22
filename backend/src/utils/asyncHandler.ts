import { Request, Response, NextFunction } from 'express'

export const asyncHandler =
  <Params = any, ResBody = any, ReqBody = any, ReqQuery = any>(
    fn: (
      req: Request<Params, ResBody, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction,
    ) => Promise<any>,
  ) =>
  (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
