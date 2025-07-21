import { eq } from "drizzle-orm";
import { team } from "../../db/schema";

export default defineEventHandler(async event => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "ID is required",
    });
  }

  try {
    await db.delete(team).where(eq(team.id, id));

    return { message: "Tim Berhasil Dihapus" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
});
