import { eq } from "drizzle-orm";
import { team } from "../../db/schema";

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

  const imagePathResult = await db
    .select({ profile: team.photo })
    .from(team)
    .where(eq(team.id, id));

  const imagePath = imagePathResult[0].profile;

  try {
    await db.delete(team).where(eq(team.id, id));

    if (imagePath) {
      await $fetch("/api/images/delete", {
        method: "POST",
        body: { imagePath },
      });
    }

    return { message: "Tim Berhasil Dihapus" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Menghapus Tim",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
});
