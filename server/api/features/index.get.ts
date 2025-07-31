import { desc } from "drizzle-orm";
import { features } from "~/server/db/schema";

export default defineEventHandler(async event => {
  try {
    const res = await db
      .select()
      .from(features)
      .orderBy(desc(features.createdAt));

    return res;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Mengambil Data Fitur",
      message: (error as Error).message,
      cause: error,
    });
  }
});
