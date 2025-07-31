import { eq } from "drizzle-orm";
import { team } from "../../db/schema";

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
      .update(team)
      .set({
        name: body.name,
        bio: body.bio,
        photo: body.photo ?? undefined,
        position: body.position,
        email: body.email,
        phone: body.phone,
        instagram: body.instagram,
        linkedin: body.linkedin,
        twitter: body.twitter,
        isActive: body.isActive,
      })
      .where(eq(team.id, id));

    return { message: "Tim Berhasil DiPerbaharui" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Memperbaharui Anggota Tim",
      message: (error as Error).message,
      cause: error,
    });
  }
});
