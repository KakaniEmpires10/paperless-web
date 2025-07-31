import { eq } from "drizzle-orm";
import { pricingDemands, pricingPlans } from "~/server/db/schema";

export default defineEventHandler(async event => {
  try {
    const res = await db
      .select({
        id: pricingDemands.id,
        name: pricingDemands.name,
        instanceName: pricingDemands.instanceName,
        email: pricingDemands.email,
        phone: pricingDemands.phone,
        address: pricingDemands.address,
        createdAt: pricingDemands.createdAt,
        updatedAt: pricingDemands.updatedAt,
        pricing: {
          id: pricingPlans.id,
          name: pricingPlans.name,
          type: pricingPlans.type,
        },
      })
      .from(pricingDemands)
      .leftJoin(
        pricingPlans,
        eq(pricingDemands.pricingPlanId, pricingPlans.id)
      );

    return res;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Mengambil Data Permintaan",
      message: (error as Error).message,
      cause: error,
    });
  }
});
