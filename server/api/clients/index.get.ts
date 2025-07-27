import { desc, eq } from "drizzle-orm";
import { clients, pricingPlans } from "~/server/db/schema";

export default defineEventHandler(async event => {
  try {
    const res = await db
      .select({
        id: clients.id,
        userId: clients.userId,
        name: clients.name,
        email: clients.email,
        phone: clients.phone,
        joinedAt: clients.joinedAt,
        address: clients.address,
        pricingPlanId: clients.pricingPlanId,
        isActive: clients.isActive,
        createdAt: clients.createdAt,
        updatedAt: clients.updatedAt,
        pricing: {
          name: pricingPlans.name
        }
      })
      .from(clients)
      .innerJoin(pricingPlans, eq(clients.pricingPlanId, pricingPlans.id))
      .orderBy(desc(clients.createdAt));

    return res;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Terjadi Kesalahan Dalam mengambil data klien",
    });
  }
});
