import { eq } from "drizzle-orm";
import { pricingPlans } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "ID is required",
    });
  }

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  try {
    await db
      .update(pricingPlans)
      .set({
        name: body.name,
        price: body.price,
        type: body.type,
        description: body.description,
        features: body.features,
        isActive: body.isActive,
        isPopular: body.isPopular,
      })
      .where(eq(pricingPlans.id, id));

    return { message: "Berhasil Memperbaharui Paket" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to update pricing plan",
      cause: error,
    });
  }
});
