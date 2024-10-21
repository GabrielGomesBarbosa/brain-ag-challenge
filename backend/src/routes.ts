import { Router } from 'express'

const router = Router()

router.post('/crops/filter', (_, response) => {
  response.status(200).send()
})

router.get('/crops/:id', (_, response) => {
  response.status(200).send()
})

router.post('/crops', (_, response) => {
  response.status(200).send()
})

router.delete('/crops/:id', (_, response) => {
  response.status(200).send()
})

export { router }
