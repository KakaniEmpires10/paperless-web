import { eq } from "drizzle-orm";
import { clients } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "ID is required",
    });
  }

  try {
    await db.delete(clients).where(eq(clients.id, id));

    return { message: "Klien Berhasil Dihapus" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Menghapus Klien",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
});
