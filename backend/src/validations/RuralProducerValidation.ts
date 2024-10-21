import { z } from 'zod'

import { validateCPF } from '../utils/validateCPF'
import { validateCNPJ } from '../utils/validateCNPJ'

export const createRuralProducerSchema = z.object({
  cpfCnpj: z.string().refine((val) => validateCPF(val) || validateCNPJ(val), {
    message: 'Invalid CPF',
  }),
  name: z.string().min(1),
  farmName: z.string().min(1),
  totalArea: z.number().positive(),
  agriculturalArea: z.number().positive(),
  vegetationArea: z.number().positive(),
  crops: z.array(z.string()).nonempty(),
})

export const updateRuralProducerSchema = createRuralProducerSchema.merge(
  z.object({
    id: z.string().uuid(),
  }),
)
