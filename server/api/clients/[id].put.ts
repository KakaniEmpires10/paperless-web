import { eq } from "drizzle-orm";
import { clients } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request Id is required",
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
      .update(clients)
      .set({
        name: body.name,
        email: body.email,
        address: body.address,
        phone: body.phone,
        pricingPlanId: body.pricingPlanId,
        isActive: body.isActive,
      })
      .where(eq(clients.id, id));

    return { message: "Klien Berhasil Di Perbaharui" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Mempernaharui Klien",
      message: (error as Error).message,
      cause: error,
    });
  }
});
