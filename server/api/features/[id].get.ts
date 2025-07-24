import { eq } from "drizzle-orm";
import { features } from "~/server/db/schema";

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
    const res = await db.select().from(features).where(eq(features.id, id));

    return res[0];
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to process request",
      cause: error,
    });
  }
});
