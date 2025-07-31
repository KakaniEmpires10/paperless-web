import { features } from "~/server/db/schema";

export default defineEventHandler(async event => {
  const session = await requireUserSession(event);

  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Request body is required",
    });
  }

  try {
    await db.insert(features).values({
      title: body.title,
      category: body.category,
      icon: body.icon,
      shortDescription: body.excerpt,
      longDescription: body.description,
      featuresList: body.featureList,
      isActive: body.isActive,
      isFeatured: body.isFeatured,
    });

    return { message: "Berhasil Menambah Fitur" };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal Menambah Fitur",
      message: (error as Error).message,
      cause: error,
    });
  }
});
