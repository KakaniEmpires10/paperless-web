import { desc, eq } from "drizzle-orm";
import { pricingPlans } from "~/server/db/schema";

export default defineEventHandler(async event => {
  try {
    const res = await db
      .select()
      .from(pricingPlans)
      .where(eq(pricingPlans.isActive, true))
      .orderBy(desc(pricingPlans.createdAt));

    return res;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Mengambil Data Paket",
      message: (error as Error).message,
      cause: error,
    });
  }
});