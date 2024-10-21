import { Crop, Prisma } from '@prisma/client';

import prisma from '../../services/prisma';
import { ICropRepository } from './ICropRepository';

export class CropRepository implements ICropRepository {
  
  async create(data: Prisma.CropCreateInput): Promise<Crop> {
    return prisma.crop.create({
      data,
    });
  }

  async findById(id: string): Promise<Crop | null> {
    return prisma.crop.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.CropUpdateInput): Promise<Crop> {
    return prisma.crop.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Crop> {
    return await prisma.crop.delete({
      where: { id },
    });
  }

  async filter(
    where?: Prisma.CropWhereInput, 
    skip?: number,
    take?: number
  ): Promise<Crop[]> {
    return prisma.crop.findMany({
      where,
      skip,
      take,
    });
  }
}
