import { z } from 'zod'

export const cityFilterSchema = z.object({
  name: z
    .string({
      message: 'City name is required',
    })
    .min(3)
    .max(100),
})
