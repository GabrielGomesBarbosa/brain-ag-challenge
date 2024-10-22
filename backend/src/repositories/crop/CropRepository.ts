import { Crop } from '../../models/Crop'
import prisma from '../../services/prisma'
import { ICropRepository } from './ICropRepository'
import { generateSlug } from '../../utils/generateSlug'
import { IPagination } from '../../interfaces/IPagination'

export class CropRepository implements ICropRepository {
  async create(data: { name: string; slug: string }): Promise<Crop> {
    const createdCrop = await prisma.crop.create({
      data,
    })

    return new Crop(
      createdCrop.id,
      createdCrop.name,
      createdCrop.slug,
      createdCrop.createdAt,
      createdCrop.updatedAt,
    )
  }

  async findById(id: string): Promise<Crop | null> {
    const crop = await prisma.crop.findUnique({
      where: { id },
    })

    if (!crop) {
      return null
    }

    return new Crop(
      crop.id,
      crop.name,
      crop.slug,
      crop.createdAt,
      crop.updatedAt,
    )
  }

  async update(
    id: string,
    data: { name?: string; slug?: string },
  ): Promise<Crop> {
    const updatedCrop = await prisma.crop.update({
      where: { id },
      data,
    })

    return new Crop(
      updatedCrop.id,
      updatedCrop.name,
      updatedCrop.slug,
      updatedCrop.createdAt,
      updatedCrop.updatedAt,
    )
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.crop.delete({
        where: { id },
      })
    } catch (error) {
      throw error
    }
  }

  async filter(
    where?: { name?: string },
    page: number = 1,
    size: number = 10,
  ): Promise<IPagination<Crop>> {
    const skip = (page - 1) * size
    const totalCrops = await prisma.crop.count({ where })

    const crops = await prisma.crop.findMany({
      where: {
        slug: {
          contains: generateSlug(where.name),
          mode: 'insensitive',
        },
      },
      skip,
      take: size,
    })

    const totalPages = Math.ceil(totalCrops / size)
    const hasMore = page < totalPages

    const cropModels = crops.map(
      (crop) =>
        new Crop(crop.id, crop.name, crop.slug, crop.createdAt, crop.updatedAt),
    )

    return {
      data: cropModels,
      totalPages,
      hasMore,
      currentPage: page,
    }
  }
}
