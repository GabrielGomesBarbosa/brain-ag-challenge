import { Crop, Prisma } from '@prisma/client';

export interface IPagination<T> {
  data: T[];
  totalPages: number;
  hasMore: boolean;
  currentPage: number
}

export interface ICropRepository {
  filter(where?: Prisma.CropWhereInput, page?: number, size?: number): Promise<IPagination<Crop>>;
  findById(id: string): Promise<Crop | null>;
  create(data: Prisma.CropCreateInput): Promise<Crop>;
  update(id: string, data: Prisma.CropUpdateInput): Promise<Crop>;
  delete(id: string): Promise<void>;
}
