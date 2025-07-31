import { pricingDemands } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  try {
    await db.insert(pricingDemands).values({
      name: body.name,
      instanceName: body.instanceName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      pricingPlanId: body.pricingPlanId
    })

    return { success: true }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Pesan anda gagal terkirim",
      message: (error as Error).message,
      cause: error,
    });
  }
})
