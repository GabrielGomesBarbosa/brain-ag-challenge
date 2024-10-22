import prisma from '../../services/prisma'
import { RuralProducer } from '../../models/RuralProducer'
import { IRuralProducerRepository } from './IRuralProducerRepository'

export class RuralProducerRepository implements IRuralProducerRepository {
  async create(data: {
    name: string
    cpfCnpj: string
    farmName: string
    totalArea: number
    agriculturalArea: number
    vegetationArea: number
    cityId: string
    crops?: string[]
  }): Promise<RuralProducer> {
    const createdProducer = await prisma.ruralProducer.create({
      data: {
        name: data.name,
        cpfCnpj: data.cpfCnpj,
        farmName: data.farmName,
        totalArea: data.totalArea,
        agriculturalArea: data.agriculturalArea,
        vegetationArea: data.vegetationArea,
        city: { connect: { id: data.cityId } },
        ruralProducerCrop: {
          connect: data.crops
            ? data.crops.map((cropId) => ({ id: cropId }))
            : undefined,
        },
      },
    })

    return new RuralProducer(
      createdProducer.id,
      createdProducer.name,
      createdProducer.cpfCnpj,
      createdProducer.farmName,
      createdProducer.totalArea,
      createdProducer.agriculturalArea,
      createdProducer.vegetationArea,
      createdProducer.createdAt,
      createdProducer.updatedAt,
    )
  }

  async findById(id: string): Promise<RuralProducer | null> {
    const producer = await prisma.ruralProducer.findUnique({
      where: { id },
    })

    if (!producer) return null

    return new RuralProducer(
      producer.id,
      producer.name,
      producer.cpfCnpj,
      producer.farmName,
      producer.totalArea,
      producer.agriculturalArea,
      producer.vegetationArea,
      producer.createdAt,
      producer.updatedAt,
    )
  }

  async update(
    id: string,
    data: {
      name?: string
      cpfCnpj?: string
      farmName?: string
      totalArea?: number
      agriculturalArea?: number
      vegetationArea?: number
    },
  ): Promise<RuralProducer> {
    const updatedProducer = await prisma.ruralProducer.update({
      where: { id },
      data,
    })

    return new RuralProducer(
      updatedProducer.id,
      updatedProducer.name,
      updatedProducer.cpfCnpj,
      updatedProducer.farmName,
      updatedProducer.totalArea,
      updatedProducer.agriculturalArea,
      updatedProducer.vegetationArea,
      updatedProducer.createdAt,
      updatedProducer.updatedAt,
    )
  }

  async delete(id: string): Promise<void> {
    await prisma.ruralProducer.delete({
      where: { id },
    })
  }

  async filter(
    where?: { name?: string },
    page: number = 1,
    size: number = 10,
  ): Promise<{
    data: RuralProducer[]
    totalPages: number
    hasMore: boolean
    currentPage: number
  }> {
    const skip = (page - 1) * size
    const totalProducers = await prisma.ruralProducer.count({ where })

    const producers = await prisma.ruralProducer.findMany({
      where,
      skip,
      take: size,
    })

    const producerModels = producers.map(
      (producer) =>
        new RuralProducer(
          producer.id,
          producer.name,
          producer.cpfCnpj,
          producer.farmName,
          producer.totalArea,
          producer.agriculturalArea,
          producer.vegetationArea,
          producer.createdAt,
          producer.updatedAt,
        ),
    )

    const totalPages = Math.ceil(totalProducers / size)
    const hasMore = page < totalPages

    return {
      data: producerModels,
      totalPages,
      hasMore,
      currentPage: page,
    }
  }
}
