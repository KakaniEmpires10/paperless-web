import { team } from "../../db/schema"

export default defineEventHandler(async (event) => {
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
      statusMessage: 'Internal Server Error',
      message: 'Failed to insert team member',
      cause: error
    })
  }
})
