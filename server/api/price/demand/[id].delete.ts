import { eq } from "drizzle-orm";
import { pricingDemands } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

  // Tambahan cek role
  if (session.user.role !== "superadmin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Anda tidak memiliki permisi untuk melakukan aksi ini",
    });
  }

  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "ID is required",
    });
  }

  try {
    await db.delete(pricingDemands).where(eq(pricingDemands.id, id));

    return { message: "Permintaan Paket Berhasil Dihapus" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal menghapus permintaan paket",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
});
