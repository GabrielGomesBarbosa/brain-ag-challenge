import { PrismaClient } from '@prisma/client'

const DEBUG_ORM = process.env.DEBUG_ORM === 'true'

const prisma = new PrismaClient(
  DEBUG_ORM
    ? {
        log: [
          {
            emit: 'event',
            level: 'query',
          },
        ],
      }
    : undefined,
)

prisma.$on('query', async (e) => {
  // eslint-disable-next-line no-console
  if (DEBUG_ORM) console.log(`${e.query} ${e.params}`)
})

export default prisma
