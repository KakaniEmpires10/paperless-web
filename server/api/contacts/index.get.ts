import { desc } from "drizzle-orm";
import { contactMessages } from "~/server/db/schema";

export default defineEventHandler(async event => {
  try {
    const res = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));

    return res;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to process request",
      cause: error,
    });
  }
});