import { Prisma, RuralProducer } from '@prisma/client'

import prisma from '../../services/prisma'
import { IPagination } from '../../interfaces/IPagination'
import { IRuralProducerRepository } from './IRuralProducerRepository'

export class RuralProducerRepository implements IRuralProducerRepository {
  async filter(
    filterCriteria: Prisma.RuralProducerWhereInput,
    skip?: number,
    take?: number,
  ): Promise<IPagination<RuralProducer>> {
    const [items, totalItems] = await prisma.$transaction([
      prisma.ruralProducer.findMany({
        where: filterCriteria,
        skip,
        take,
        include: {
          ruralProducerCrop: {
            include: {
              crop: true,
            },
          },
          city: true,
        },
      }),
      prisma.ruralProducer.count({
        where: filterCriteria,
      }),
    ])

    const totalPages = Math.ceil(totalItems / (take || totalItems))
    const currentPage = Math.floor((skip || 0) / (take || totalItems)) + 1

    return {
      data: items,
      currentPage,
      totalPages,
      hasMore: currentPage < totalPages,
    }
  }

  async create(data: Prisma.RuralProducerCreateInput): Promise<RuralProducer> {
    return prisma.ruralProducer.create({
      data,
    })
  }

  async update(
    id: string,
    data: Prisma.RuralProducerUpdateInput,
  ): Promise<RuralProducer> {
    return prisma.ruralProducer.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.ruralProducer.delete({
      where: { id },
    })
  }

  async findById(id: string): Promise<RuralProducer | null> {
    return prisma.ruralProducer.findUnique({
      where: { id },
      include: {
        ruralProducerCrop: {
          include: {
            crop: true,
          },
        },
        city: true,
      },
    })
  }

  async findAll(): Promise<RuralProducer[]> {
    return prisma.ruralProducer.findMany({
      include: {
        ruralProducerCrop: {
          include: {
            crop: true,
          },
        },
        city: true,
      },
    })
  }
}
