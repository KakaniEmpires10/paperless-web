import { clients } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  try {
    await db.insert(clients).values({
      name: body.name,
      email: body.email,
      address: body.address,
      phone: body.phone,
      pricingPlanId: body.pricingPlanId,
      isActive: body.isActive ?? true,
    });

    return { message: "Klien Berhasil Ditambahkan" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Menambah Data Klien",
      message: (error as Error).message,
      cause: error,
    });
  }
});
