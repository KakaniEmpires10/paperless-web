import { eq } from "drizzle-orm";
import { pricingPlans } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

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
        excerpt: body.excerpt,
        description: body.description,
        features: body.features,
        isActive: body.isActive,
        isPopular: body.isPopular,
        order: body.order,
      })
      .where(eq(pricingPlans.id, id));

    return { message: "Berhasil Memperbaharui Paket" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Memperbaharui Paket",
      message: (error as Error).message,
      cause: error,
    });
  }
});
