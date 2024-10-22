import { Crop } from '../../models/Crop'
import { IPagination } from '../../interfaces/IPagination'

export interface ICropRepository {
  filter(
    where?: { name?: string; slug?: string },
    page?: number,
    size?: number,
  ): Promise<IPagination<Crop>>
  findById(id: string): Promise<Crop | null>
  create(data: { name: string; slug: string }): Promise<Crop>
  update(id: string, data: { name?: string; slug?: string }): Promise<Crop>
  delete(id: string): Promise<void>
}
