import { RuralProducer } from '../../models/RuralProducer'

export interface IRuralProducerRepository {
  create(data: {
    name: string
    cpfCnpj: string
    farmName: string
    totalArea: number
    agriculturalArea: number
    vegetationArea: number
    crops?: string[]
    cityId: string
  }): Promise<RuralProducer>
  findById(id: string): Promise<RuralProducer | null>
  update(
    id: string,
    data: {
      name?: string
      cpfCnpj?: string
      farmName?: string
      totalArea?: number
      agriculturalArea?: number
      vegetationArea?: number
    },
  ): Promise<RuralProducer>
  delete(id: string): Promise<void>
  filter(
    where?: { name?: string },
    page?: number,
    size?: number,
  ): Promise<{
    data: RuralProducer[]
    totalPages: number
    hasMore: boolean
    currentPage: number
  }>
}
