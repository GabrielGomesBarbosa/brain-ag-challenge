import express from 'express'

import { cityRoutes } from './routes'

const HOST = process.env.HOST
const PORT = process.env.PORT || 3333

const server = express()

server.use(express.json())

server.use(cityRoutes)

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Server running on: ${HOST}:${PORT}`))
