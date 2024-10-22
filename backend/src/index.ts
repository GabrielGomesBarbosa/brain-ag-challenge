import express from 'express'

import { routes } from './routes'
import { errorHandler } from './utils/errorHandling'

const HOST = process.env.HOST
const PORT = process.env.PORT || 3333

const server = express()

server.use(express.json())

server.use(routes)

server.use(errorHandler)

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Server running on: ${HOST}:${PORT}`))
