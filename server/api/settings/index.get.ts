import { settings } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const settingsData = await db.select().from(settings)
  return settingsData[0]
})
