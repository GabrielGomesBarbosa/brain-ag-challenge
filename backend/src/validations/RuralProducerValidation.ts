import { z } from 'zod'

import { validateCPF } from '../utils/validateCPF'
import { validateCNPJ } from '../utils/validateCNPJ'

export const createRuralProducerSchema = z.object({
  cpfCnpj: z.string().refine((val) => validateCPF(val) || validateCNPJ(val), {
    message: 'Invalid CPF',
  }),
  name: z.string().min(1),
  farmName: z.string().min(1, 'Farm name is required'),
  totalArea: z.number().positive('Total area must be a positive number'),
  agriculturalArea: z
    .number()
    .nonnegative('Agricultural area must be a non-negative number'),
  vegetationArea: z
    .number()
    .nonnegative('Vegetation area must be a non-negative number'),
  cityId: z.string().uuid(),
  crops: z.array(z.string().uuid()).optional(),
})
