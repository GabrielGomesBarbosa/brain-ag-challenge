import express from 'express'

const HOST = process.env.HOST;
const PORT = process.env.PORT || 3333;

const server = express()

server.listen(PORT, () => console.log(`Server running on: ${HOST}:${PORT}`))