import { users } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  const hashedpass = await hashPassword(body.password)

  try {
    await db.insert(users).values({
      name: body.name,
      email: body.email,
      password: hashedpass,
      role: body.role,
      isActive: body.isActive ?? true,
    });

    return { message: "User Berhasil Ditambahkan" }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to insert users",
      cause: error,
    });
  }
})
