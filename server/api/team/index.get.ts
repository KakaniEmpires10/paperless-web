import { desc } from "drizzle-orm";
import { team } from "../../db/schema";

export default defineEventHandler(async (event) => {
  try {
    const teamMembers = await db.select().from(team).orderBy(desc(team.updatedAt))

    return { teamMembers }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Failed to process request',
      cause: error
    })
  }
})
