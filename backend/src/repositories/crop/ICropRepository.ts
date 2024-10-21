import { Crop, Prisma } from '@prisma/client'

import { IPagination } from '../../interfaces/IPagination'

export interface ICropRepository {
  filter(
    where?: Prisma.CropWhereInput,
    page?: number,
    size?: number,
  ): Promise<IPagination<Crop>>
  findById(id: string): Promise<Crop | null>
  create(data: Prisma.CropCreateInput): Promise<Crop>
  update(id: string, data: Prisma.CropUpdateInput): Promise<Crop>
  delete(id: string): Promise<void>
}
