import { team } from "../../db/schema"

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);

  const body = await readBody(event)

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Request body is required'
    })
  }

  try {
    await db.insert(team).values({
      name: body.name,
      bio: body.bio,
      photo: body.photo ?? undefined,
      position: body.position,
      email: body.email,
      phone: body.phone,
      instagram: body.instagram,
      linkedin: body.linkedin,
      twitter: body.twitter,
      isActive: body.isActive ?? true,
    })

    return { message: 'Tim Berhasil Ditambahkan' }
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal Menambah Anggota Tim',
      message: (error as Error).message,
      cause: error
    })
  }
})
