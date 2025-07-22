import { settings } from "~/server/db/schema";

export default defineEventHandler(async event => {
  try {
    const settingsData = await db.select().from(settings).limit(1);
  
    if (!settingsData.length) {
      return null;
    }
  
    return settingsData[0];
  } catch (error) {
    console.error("DB ERROR:", error);
    throw createError({
      statusCode: 500,
      message: "Gagal terhubung ke database",
    });
  }
});
