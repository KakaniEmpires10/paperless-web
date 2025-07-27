import { contactMessages } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  try {
    await db.insert(contactMessages).values({
      name: body.name,
      email: body.email,
      phone: body.phone,
      position: body.position,
      hospitalName: body.hospitalName,
      message: body.message
    })

    return { success: true }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to insert Message",
      cause: error,
    });
  }
})
