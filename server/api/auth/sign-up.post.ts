import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { clients, team, users } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

  // Tambahan cek role
  if (session.user.role !== "superadmin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Anda tidak memiliki permisi untuk melakukan aksi ini",
    });
  }

  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  const hashedpass = await hashPassword(body.password);

  const userId = createId();

  try {
    await db.insert(users).values({
      id: userId,
      name: body.name,
      email: body.email,
      password: hashedpass,
      role: body.role,
      isActive: body.isActive ?? true,
    });

    if (body.type === "team") {
      if (!body.refId)
        throw createError({
          statusCode: 400,
          statusMessage: "Missing team id",
        });
      await db.update(team).set({ userId }).where(eq(team.id, body.refId));
    } else if (body.type === "client") {
      if (!body.refId)
        throw createError({
          statusCode: 400,
          statusMessage: "Missing client id",
        });
      await db
        .update(clients)
        .set({ userId })
        .where(eq(clients.id, body.refId));
    }

    return { message: "User Berhasil Ditambahkan" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal menyimpan user",
      message: (error as Error).message,
      cause: error,
    });
  }
});
