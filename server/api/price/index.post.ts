import { pricingPlans } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  try {
    await db.insert(pricingPlans).values({
      name: body.name,
      price: body.price,
      type: body.type,
      description: body.description,
      features: body.features,
      isActive: body.isActive ?? true,
      isPopular: body.isPopular,
    })

    return { message: "Berhasil Menambah Paket" }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to insert pricing plan",
      cause: error,
    });
  }
})
