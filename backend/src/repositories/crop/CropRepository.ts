import { Crop, Prisma } from '@prisma/client';

import prisma from '../../services/prisma';
import { ICropRepository, IPagination } from './ICropRepository';

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

  async delete(id: string): Promise<void> {
    await prisma.crop.delete({
      where: { id },
    });
  }

  async filter(
    where?: Prisma.CropWhereInput,
    page: number = 1,
    size: number = 10
  ): Promise<IPagination<Crop>> {
    const skip = (page - 1) * size;
    const totalCrops = await prisma.crop.count({ where });

    const crops = await prisma.crop.findMany({
      where,
      skip,
      take: size,
    });

    const totalPages = Math.ceil(totalCrops / size);
    const hasMore = page < totalPages;

    return {
      data: crops,
      totalPages,
      hasMore,
      currentPage: page,
    };
  }
}
