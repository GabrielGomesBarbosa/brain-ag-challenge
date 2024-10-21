import { z } from 'zod';

export const createCropSchema = z.object({
  name: z.string().min(1, 'Crop name is required').max(100),
});

export const updateCropSchema = z.object({
  name: z.string().min(1, 'Crop name is required').max(100),
});

export const filterCropSchema = z.object({
  page: z.number().min(1).optional().default(1),
  size: z.number().min(1).optional().default(10),
  name: z.string().optional(),
  slug: z.string().optional(),
});
