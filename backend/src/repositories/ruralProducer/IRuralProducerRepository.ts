import { Prisma, RuralProducer } from '@prisma/client'

import { IPagination } from '../../interfaces/IPagination'

export interface IRuralProducerRepository {
  create(data: Prisma.RuralProducerCreateInput): Promise<RuralProducer>
  update(
    id: string,
    data: Prisma.RuralProducerUpdateInput,
  ): Promise<RuralProducer>
  delete(id: string): Promise<void>
  findById(id: string): Promise<RuralProducer | null>
  filter(
    filterCriteria: Prisma.RuralProducerWhereInput,
    skip?: number,
    take?: number,
  ): Promise<IPagination<RuralProducer>>
}
