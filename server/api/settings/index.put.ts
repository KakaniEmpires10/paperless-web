import { eq } from "drizzle-orm"
import { settings } from "~/server/db/schema"

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Settings tidak ditemukan',
    })
  }

  try {
    await db.update(settings).set({
      companyName: body.company_name,
      companyAbbr: body.company_abbr,
      about: body.about,
      excerpt: body.excerpt,
      moto: body.moto,
      logo: body.logo ? body.logo : undefined,
      keywords: body.keywords,
      vision: body.vision,
      mission: body.mission,
      email: body.email,
      address: body.address,
      phoneNumber: body.phone_number,
      linkedin: body.linkedin,
      instagram: body.instagram,
      twitter: body.twitter,
      youtube: body.youtube
    })
    .where(eq(settings.id, 1))

    return { message: 'Settings berhasil di-update' }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Terjadi kesalahan saat mengupdate settings',
    })
  }
})