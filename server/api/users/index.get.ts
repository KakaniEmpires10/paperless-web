import { desc, getTableColumns, ne } from "drizzle-orm";
import { users } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const { password, ...rest } = getTableColumns(users);

  try {
    const usersData = await db
      .select({ ...rest })
      .from(users)
      .where(ne(users.role, "superadmin"))
      .orderBy(desc(users.updatedAt));

    return usersData;
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
