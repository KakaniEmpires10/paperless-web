import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Id ",
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
      .update(users)
      .set({
        name: body.name,
        role: body.role,
        email: body.email,
        isActive: body.isActive,
      })
      .where(eq(users.id, id));

    return { message: "User Berhasil DiPerbaharui" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Meng-update User",
      message: (error as Error).message,
      cause: error,
    });
  }
});
