import { Crop, Prisma } from '@prisma/client';

export interface ICropRepository {
  filter(where?: Prisma.CropWhereInput, skip?: number, take?: number): Promise<Crop[]>;
  findById(id: string): Promise<Crop | null>;
  create(data: Prisma.CropCreateInput): Promise<Crop>;
  update(id: string, data: Prisma.CropUpdateInput): Promise<Crop>;
  delete(id: string): Promise<Crop>;
}
