import { desc } from "drizzle-orm";
import { pricingPlans } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  try {
    const res = await db.select().from(pricingPlans).orderBy(desc(pricingPlans.createdAt))

    return res
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Mengambil Data Paket",
      message: (error as Error).message,
      cause: error,
    });
  }
})