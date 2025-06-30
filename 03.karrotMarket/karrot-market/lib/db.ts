import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_Prisma, // <- 새 환경변수 사용
    },
  },
})
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db
}

export default db