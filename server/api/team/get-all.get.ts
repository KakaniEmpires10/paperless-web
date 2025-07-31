import { desc, eq } from "drizzle-orm";
import { team } from "../../db/schema";

export default defineEventHandler(async event => {
  try {
    const teamMembers = await db
      .select()
      .from(team)
      .where(eq(team.isActive, true))
      .orderBy(desc(team.updatedAt));

    return teamMembers;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Mengambil Data Tim",
      message: (error as Error).message,
      cause: error,
    });
  }
});
